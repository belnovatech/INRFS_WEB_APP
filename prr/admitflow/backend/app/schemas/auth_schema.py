from pydantic import BaseModel, EmailStr

class RegisterRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    mobile:str
    password: str
    confirm_password: str

class LoginRequest(BaseModel):
    identifier: str  
    password: str
