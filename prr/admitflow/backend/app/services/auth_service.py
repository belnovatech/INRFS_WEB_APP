from typing import Dict

USERS: Dict[str, dict] = {}

USER_ID_COUNTER = 1

def register_user(data):
    global USER_ID_COUNTER

    if data.email in USERS:
        return {
            "success": False,
            "message": "User already exists"
        }

    if data.password != data.confirm_password:
        return {
            "success": False,
            "message": "Passwords do not match"
        }

    user_id = USER_ID_COUNTER
    USER_ID_COUNTER += 1  

    USERS[data.email] = {
        "id": user_id,
        "first_name": data.first_name,
        "last_name": data.last_name,
        "email": data.email,
        "mobile": data.mobile,
        "password": data.password,  
        "role": "admin",
    }

    return {
        "success": True,
        "user": USERS[data.email]
    }


def authenticate_user(identifier: str, password: str):
    for user in USERS.values():
        if (
            user["email"] == identifier
            or user["mobile"] == identifier
        ) and user["password"] == password:
            return user

    return None
