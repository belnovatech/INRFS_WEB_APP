from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware 
from app.routes.auth import router as auth_router


app = FastAPI(title="AdmitFlow Auth API")
app.add_middleware(SessionMiddleware, 
                   secret_key="your_secret_key_here",
                   same_site="lax")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
@app.get("/")
async def root():
    return {"message": "Welcome to AdmitFlow Auth API"}

def get_current_user(request:Request):
    user = request.session.get("user")
    if not user:
        raise {"authenticated": False}
    return {"authenticated": True, "user": user}
    