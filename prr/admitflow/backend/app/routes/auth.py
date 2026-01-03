from fastapi import APIRouter, Request, HTTPException
from app.schemas.auth_schema import RegisterRequest, LoginRequest
from app.services.auth_service import register_user, authenticate_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(data: RegisterRequest):
    result = register_user(data)

    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["message"])

    return {
        "message": "Registered successfully",
        "user_id": result["user"]["id"]   
    }


@router.post("/login")
def login(request: Request, data: LoginRequest):
    user = authenticate_user(data.identifier, data.password)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    request.session["user"] = {
        "id": user["id"],                
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "email": user["email"],
        "role": user["role"],
    }

    return {
        "message": "Login successful",
        "user": request.session["user"]
    }


@router.post("/logout")
def logout(request: Request):
    request.session.clear()
    return {"message": "Logged out successfully"}
