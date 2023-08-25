import dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import json_util

app = FastAPI()
origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dotenv.load_dotenv()

uri = os.environ.get('MONGO_URI')
BF_KEY = os.environ.get('BF_KEY')
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.Nutritrack


class User(BaseModel):
    username: str
    password: str


class UserOnly(BaseModel):
    username: str
class UserGoal(BaseModel):
    username: str
    goal: dict


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/signup")
async def read_item(user: User):
    found = list(db.users.find({"username": user.username}))
    if len(found) > 0:
        return {"success": False, "msg": "User Already Exists"}
    else:
        db.users.insert_one({"username": user.username, "password": user.password})
        return {"success": True, "msg": "User Inserted successfully"}


@app.post("/login")
async def read_item(user: User):
    found = list(db.users.find({"username": user.username}))
    if len(found) > 0:
        return {"success": True, "msg": "User Logged In"}
    else:
        return {"success": False, "msg": "Invalid Details"}


@app.post("/goal")
async def getGoal(user: UserOnly):
    found = db.users.find_one({"username": user.username})
    if 'goal' in found.keys():
        return {"success": True, 'setgoal': True, "goal": found['goal']}
    else:
        return {"success": True, 'setgoal': False}

@app.post("/setgoal")
def setgoal(user: UserGoal):
    db.users.update_one(
        {"username": user.username},
        {"$set": {"goal": user.goal}},
    )
    return {"success": True}

@app.get("/food")
def getfood():
    food = json_util.dumps(list(db.items.find())[0:10])
    return {"success": True, "food": food}