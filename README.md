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

<summary><strong>General Error</strong></summary>

```
{
    "statusType": "Client Error",
    "statusCode": "404 Not Found",
    "message": "Can't find ${req.originalUrl} on the server."
}
```
```
{
    "status": "Database Error",
    "statusType": "SequelizeDatabaseError, SequelizeConnectionError..."
}
```
```
{
    "status": "Programming Error",
    "statusType": "TypeError, ReferenceError..."
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
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Get data successfully.",
    "result": [
        {
            "id": 1,
            "name": "Pomeranian",
            "createdAt": "2024-06-11T10:23:27.000Z",
            "updatedAt": "2024-06-11T10:23:27.000Z"
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
