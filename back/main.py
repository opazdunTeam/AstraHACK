from fastapi import FastAPI, Form, Body, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import DataBase as DataBase
from fastapi.responses import JSONResponse
 
app = FastAPI()



origins = [

    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

 
 
 
@app.post("/register")
def register(form = Body()):
    db = DataBase.SQLdb()
    if not(db.check_user(form['username'])):
        db.add_user(form['username'], form['password'])
        return JSONResponse(status_code=200, content={"username": form['username']})
    else:
        return JSONResponse(status_code=403, content={"detail": "Ups"})
    


@app.post("/login")
def login(form: dict = Body()):
    db = DataBase.SQLdb()
    if db.authorization_user(form['username'], form['password']):
        return JSONResponse(status_code=200, content={"detail": "Ok"})
    else:
        return JSONResponse(status_code=403, content={"detail": "Ups"})



@app.post("/chats")
def chats(username: dict = Body()):
    db = DataBase.SQLdb()
    chats = db.get_chats(username['username'])
    return chats


@app.get("/search_chats")
def search_chats(query):
    db = DataBase.SQLdb()
    res = db.search_global_chats(query)
    return res
    


