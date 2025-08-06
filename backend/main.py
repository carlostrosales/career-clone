from fastapi import FastAPI
from openai import OpenAI
import json
import os
import requests
from pypdf import PdfReader
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List, Dict

class ChatInput(BaseModel):
    message: str
    history: List[Dict[str, str]]

load_dotenv(override=True)
openai = OpenAI()

app = FastAPI()

push_over_user = os.getenv("PUSHOVER_USER_KEY")
push_over_email = os.getenv("PUSHOVER_EMAIL_KEY")
push_over_api = os.getenv("PUSHOVER_API_KEY")
pushover_url = "https://api.pushover.net/1/messages.json"

if push_over_user:
    print(f"Push over user found and user starts with {push_over_user[0:3]}")
else:
    print("Push over user not found")

if push_over_email:
    print(f"Push over email found and email starts with {push_over_email[0:3]}")
else:
    print("Push over email not found")

if push_over_api:
    print(f"Push over api found and api starts with {push_over_api[0:3]}")
else:
    print("Push over token not found")

def push(message):
    print(f"Push: {message}")
    payload = {"user": push_over_user, "token": push_over_api, "message": message}
    requests.post(pushover_url, payload)

def record_user_details(email, name="Name not provided", notes="Notes not provided"):
    push(f"Recording interest from {name} with email {email} and notes {notes}")
    return {"recorded": "ok"}

def record_unknown_question(question):
    push(f"Recording {question} asked that I couldn't answer")
    return {"recorded": "ok"}

record_user_details_json = {
"name": "record_user_details",
"description": "Use this tool to record that a user is interested in being in touch and provided an email address",
"parameters": {
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
            "description": "This email address of this user"
        },
        "name": {
            "type": "string",
            "description": "the users name, if they provided it"
        },
        "notes": {
            "type": "string",
            "description": "Any additional information about the conversation that's worth recording to give context"
        }
    },
    "required": ["email"],
    "additionalProperties": False
    }
}

record_unknown_question_json = {
    "name": "record_unknown_question",
    "description": "Always use this tool to record any question that couldn't be answered as you didn't know the answer",
    "parameters": {
        "type": "object",
        "properties": {
            "question": {
                "type": "string",
                "description": "The question that couldn't be answered"
            },
        },
        "required": ["question"],
        "additionalProperties": False
    }
}

tools = [{"type": "function", "function": record_user_details_json}, {"type": "function", "function": record_unknown_question_json}]

def handle_tools_calls(tool_calls):
    results = []
    for tool_call in tool_calls:
        tool_name = tool_call.function.name
        arguments = json.loads(tool_call.function.arguments)
        print(f"Tool called: {tool_name}", flush=True)

        if tool_name == "record_user_details":
            result = record_user_details(**arguments)
        elif tool_name == "record_unknown_question":
            result = record_unknown_question(**arguments)
        
        results.append({"role": "tool", "content": json.dumps(result), "tool_call_id": tool_call.id})

    return results

def provide_system_prompt(file_name):
    reader = PdfReader(file_name)
    linkedin = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            linkedin += text
    
    with open("me/summary.txt", "r", encoding="utf-8") as f:
        summary = f.read()
    
    name = "Carlos Rosales"

    system_prompt = f"You are acting as {name}. You are answeringe questions on {name}'s website, \
    particularly questions related to {name}'s career, background, skills and experience. \
    Your responsibility is to represent {name} for interactions on the website as faithfully as possible. \
    You are given a summary of {name}'s background and LinkedIn profile which you can use to answer questions. \
    Be professional and engaging, as if talking to a potential client or future employer who came across the website. \
    If you don't know the answer to any question, use your record_unknown_question tool to record the question that you couldn't answer, even if it's about something trivial or unrelated to career. \
    If the user is engaging in discussion, try to steer them towards getting in touch via email; ask for their email and record it using your record_user_details tool. "

    system_prompt += f"\n\n## Summary:\n{summary}\n\n## LinkedIn Profile:\n{linkedin}\n"
    system_prompt += f"With this context, please chat with the user, always staying in character as {name}."

    return system_prompt

def chat(message, history):

    system_prompt = provide_system_prompt("me/resume.pdf")

    messages = [{"role": "system", "content": system_prompt}] + history + [{"role": "user", "content": message}]
    done = False
    while not done:

        # This is the call to the LLM - see that we pass in the tools json

        response = openai.chat.completions.create(model="gpt-4o-mini", messages=messages, tools=tools)

        finish_reason = response.choices[0].finish_reason

        # If the LLM wants to call a tool, we do that!

        if finish_reason == "tool_calls":
            message = response.choices[0].message
            tool_calls = message.tool_calls
            results = handle_tools_calls(tool_calls)
            messages.append(message)
            messages.extend(results)
        else:
            done = True
        
    return response.choices[0].message.content



@app.post("/chat")
def chat_endpoint(payload: ChatInput):
    result = chat(payload.message, payload.history)
    return {"response": result}