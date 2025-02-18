## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /login/google`

- `GET /post`
- `POST /post`

- `POST /post/caption`

- `GET /post/:PostId`
- `PUT /post/:PostId`
- `DELETE /post/:PostId`

- `GET /post/:PostId/comment`
- `POST /post/:PostId/comment`

&nbsp;

## 1. POST /register 
Request:
- body:

```json
{  
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "username": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username is required"
}
OR
{
  "message": "username already taken"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "email is not correct"
}
OR
{
  "message": "email already taken"
}
OR
{
  "message": "password is required"
}
```

&nbsp;

## 2. POST /login

Request:
- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is required"
}
OR
{
  "message": "password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "email or password incorrect"
}
```

&nbsp;

## 3. POST /login/google

Request:
- headers: 

```json
{
  "google_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```
_Response (401 - Unauthorized)_

```json
{
  "message": "login with your email and password"
}
```

&nbsp;

## 4. GET /post

Description:
- Get all posts from database
- Need authentication

Request:
- headers: 

```json
{
  "Authorization": "Bearer access_token"
}
```

- user:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": 1,
        "imgUrl": "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80",
        "caption": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        "coordinate": "-22.275086, 129.236689",
        "location": "Australia",
        "likes": 0,
        "UserId": 1,
        "createdAt": "2025-01-02T05:16:46.684Z",
        "updatedAt": "2025-01-02T05:16:46.684Z",
        "User": {
            "id": 1,
            "username": "user1",
            "email": "user1@gmail.com",
            "createdAt": "2025-01-02T05:16:46.438Z",
            "updatedAt": "2025-01-02T05:16:46.438Z",
            "Profile": {
                "avatarUrl": "https://imgcdn.stablediffusionweb.com/2024/4/13/b3bec860-a583-42cd-a352-3f81dbc8fa0c.jpg"
            }
        },
        "Comments": [
            {
                "id": 1,
                "comment": "what a beautiful view right there!",
                "UserId": 1,
                "PostId": 1,
                "createdAt": "2025-01-02T05:16:46.696Z",
                "updatedAt": "2025-01-02T05:16:46.696Z",
                "User": {
                    "id": 1,
                    "username": "user1",
                    "email": "user1@gmail.com",
                    "createdAt": "2025-01-02T05:16:46.438Z",
                    "updatedAt": "2025-01-02T05:16:46.438Z",
                    "Profile": {
                        "avatarUrl": "https://imgcdn.stablediffusionweb.com/2024/4/13/b3bec860-a583-42cd-a352-3f81dbc8fa0c.jpg"
                    }
                }
            },
            {
                "id": 19,
                "comment": "Such vibrant colors! Nature's palette is truly amazing.",
                "UserId": 3,
                "PostId": 1,
                "createdAt": "2025-01-02T05:16:46.696Z",
                "updatedAt": "2025-01-02T05:16:46.696Z",
                "User": {
                    "id": 3,
                    "username": "user3",
                    "email": "user3@gmail.com",
                    "createdAt": "2025-01-02T05:16:46.651Z",
                    "updatedAt": "2025-01-02T05:16:46.651Z",
                    "Profile": {
                        "avatarUrl": "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-female-character-with-glasses-staring-at-a-red-shirt-image_2903732.jpg"
                    }
                }
            }
        ]
    }, 
    ...,
]
```

&nbsp;

## 5. POST /post

Description:
- Create post
- Need authentication

Request:

- headers: 

```json
{
  "Authorization": "Bearer access_token"
}
```

- user:

```json
{
  "id": "integer"
}
```

- body:

```json
{
    "caption": "string",
    "coordinate": "string"
}
```

- file:

```json
{
    "image": "image format",
}
```

_Response (201 - CREATED)_

```json
{
    "id": "integer",
    "caption": "string",
    "imgUrll": "string",
    "coordinate": "string",
    "UserId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "caption is required"
}
OR
{
  "message": "image is required"
}
OR
{
  "message": "coordinate is required"
}
OR
{
  "message": "location is required"
}
OR
{
  "message": "UserId is required"
}
```


&nbsp;

## 6. POST /post/caption

Description:
- Generate caption
- Need authentication

Request:

- headers: 

```json
{
  "Authorization": "Bearer access_token"
}
```

- user:

```json
{
  "id": "integer"
}
```
- file:

```json
{
    "image": "image format",
}
```

_Response (200 - OK)_

```json
{
    "caption": "string"
}
```

&nbsp;

## 7. GET /post/:PostId

Description:
- GET detail post
- Need authentication

Request:

- headers: 

```json
{
  "Authorization": "Bearer access_token"
}
```

- params: 

```json
{
  "PostId": "integer"
}
```

- user:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "imgUrl": "string",
    "caption": "string",
    "coordinate": "string",
    "location": "string",
    "likes": "integer",
    "UserId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

## 8. PUT /post/:PostId

Description:
- Edit post by id
- Need authentication and authorization

Request:

- headers: 

```json
{
  "Authorization": "Bearer access_token"
}
```

- params: 

```json
{
  "PostId": "integer"
}
```

- user:

```json
{
  "id": "integer"
}

- body:

```json
{
    "imgUrl": "string",
    "caption": "string",
    "coordinate": "string",
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "imgUrl": "string",
    "caption": "string",
    "coordinate": "string",
    "location": "string",
    "likes": "integer",
    "UserId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "caption is required"
}
OR
{
  "message": "image is required"
}
OR
{
  "message": "coordinate is required"
}
OR
{
  "message": "location is required"
}
OR
{
  "message": "UserId is required"
}
```



&nbsp;


## 9. DELETE /post/:PostId

Description:
- Delete post by id
- Need authentication and authorization

Request:

- headers: 

```json
{
  "Authorization": "Bearer access_token"
}
```

- params: 

```json
{
  "PostId": "integer"
}
```

- user:

```json
{
  "id": "integer"
}

_Response (200 - OK)_

```json
{
    "message": "Post success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

&nbsp;








Description:
- Get product by id
- Public

Request:
- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "baju1",
    "description": "ini baju1",
    "price": 50000,
    "stock": 10,
    "imgUrl": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2023/8/27/f76d131f-1a5b-4f52-ad72-abb2f0482537.jpg",
    "categoryId": 1,
    "authorId": 1,
    "createdAt": "2024-12-10T14:19:44.752Z",
    "updatedAt": "2024-12-10T14:19:44.752Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

&nbsp;



## 10. GET /post/:PostId/comment

Description:
- GET comments
- Need authentication

Request:

- headers: 

```json
{
  "Authorization": "Bearer access_token"
}
```

- params: 

```json
{
  "PostId": "integer"
}
```

- user:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "Comments": [
        {
            "comment": "string",
            "User": {
                "username": "string",
                "Profile": {
                    "avatarUrl": "string"
                }
            }
        }
    ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

## 11. POST /post/:PostId/comment

Description:
- POST comment
- Need authentication

Request:

- headers: 

```json
{
  "Authorization": "Bearer access_token"
}
```

- params: 

```json
{
  "PostId": "integer"
}
```

- user:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "comment": "string"
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "comment": "string",
    "PostId": "integer",
    "UserId": "integer",
    "updatedAt": "date",
    "createdAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "comment is required"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

