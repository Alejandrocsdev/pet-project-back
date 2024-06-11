# API DOC

<details>

<summary><strong>BASE URL</strong></summary>

`http://localhost:${process.env.PORT || 3000}/api`

</details>

<details>

<summary><strong>NPM Scripts</strong></summary>

`npm run start`: start server

`npm run dev`: start server in development mode

`npm run seed`: seed data to the database

`npm run reset`: reset the database with seed data

</details>

<details>

<summary><strong>Environment Variables</strong></summary>

```
# 伺服器端口
PORT =
```

</details>

<details>

<summary><strong>Default Error</strong></summary>

```
{
    "code": "404 Not Found",
    "status": "Client Error",
    "message": "Can't find ${req.originalUrl} on the server."
}
```

</details>

# APIs

<details>

<summary><strong>Breeds</strong></summary>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>GET /breeds</strong></summary>

**Response (Success) :**

```
{
    "code": "200 OK",
    "status": "Success",
    "message": "Get data successfully.",
    "result": [
        {
            "id": 1,
            "name": "Greater Swiss Mountain Dog",
            "createdAt": "2024-06-11T02:12:30.000Z",
            "updatedAt": "2024-06-11T02:12:30.000Z"
        },
        {...}
    ]
}
```

**Response (Error) :**

```
{

}
```

</details>

</details>
