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
    "statusType": "Server Error (SequelizeDatabaseError, SequelizeConnectionError...)",
    "statusCode": "500 Internal Server Error",
    "message": "Database or ORM Error"
}
```
```
{
    "statusType": "Server Error (TypeError, ReferenceError...)",
    "statusCode": "500 Internal Server Error",
    "message": "Programming Error"
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
    "message": "Get all Breeds table data successfully.",
    "result": [
        {
            "id": 1,
            "name": "Weimaraner",
            "createdAt": "2024-06-11T12:38:20.000Z",
            "updatedAt": "2024-06-11T12:38:20.000Z"
        },
        {...}
    ]
}
```

**Response (Error) :**

```
No custom operational error.
```

</details>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>GET /breeds/:breedId</strong></summary>

**Parameter :** `breedId`

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Get Breeds table data from id 1 successfully.",
    "result": {
        "id": 1,
        "name": "Weimaraner",
        "createdAt": "2024-06-11T12:38:20.000Z",
        "updatedAt": "2024-06-11T12:38:20.000Z"
    }
}
```

**Response (Error) :**

```
{
    "statusType": "Client Error",
    "statusCode": "404 Not Found",
    "message": "Table data not found with parameter id."
}
```

</details>

</details>
