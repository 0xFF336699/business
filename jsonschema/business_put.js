module.exports = {
    "type": "object",
    "definitions": {},
    "$schema": "http://json-schema.org/draft-06/schema#",
    "properties": {
    "key": {
        "$id": "/properties/key",
            "type": "integer",
            "title": "The Key Schema ",
            "default": 0
    },
    "manager": {
        "$id": "/properties/manager",
            "type": "string",
            "title": "The Manager Schema ",
            "default": "",
            "examples": [
            "admin"
        ]
    },
    "title": {
        "$id": "/properties/title",
            "type": "string",
            "title": "The Title Schema ",
            "default": "",
            "examples": [
            "business"
        ]
    },
    "users": {
        "$id": "/properties/users",
            "type": "array",
            "items": {
            "$id": "/properties/users/items",
                "type": "object",
                "properties": {
                "name": {
                    "$id": "/properties/users/items/properties/name",
                        "type": "string",
                        "title": "The Name Schema ",
                        "default": "",
                        "examples": [
                        "pitter"
                    ]
                }
            }
        }
    }
},
    "required": [
        "key",
        "manager",
        "title",
        "users"
    ]
}