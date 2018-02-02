const roles = {
    "total": 3,
    "items": [
        {
            "inUse": true,
            "isOob": true,
            "permissions": [
                {
                    "id": 0,
                    "name": "MANAGE_USERS"
                },
                {
                    "id": 1,
                    "name": "VIEW_USERS"
                },
                {
                    "id": 2,
                    "name": "MANAGE_ROLES"
                },
                {
                    "id": 3,
                    "name": "VIEW_ROLES"
                }
            ],
            "id": 1,
            "name": "ADMIN"
        },
        {
            "inUse": true,
            "isOob": true,
            "permissions": [
                {
                    "id": 1,
                    "name": "VIEW_USERS"
                },
                {
                    "id": 2,
                    "name": "MANAGE_ROLES"
                }
            ],
            "id": 2,
            "name": "COMPANY"
        },
        {
            "inUse": true,
            "isOob": true,
            "permissions": [],
            "id": 3,
            "name": "OTHER"
        },
    ]
};

export default roles;
