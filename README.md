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
    "statusCode": "400 Bad Request",
    "message": "Invalid parameter id. It must be a positive integer."
}
```

```
{
    "statusType": "Client Error",
    "statusCode": "404 Not Found",
    "message": "Table data not found with parameter or body id."
}
```

</details>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>POST /breeds</strong></summary>

**Body :**

| Field | Required | Type | Note   |
| ----- | -------- | ---- | ------ |
| name  | O        | str  | unique |

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "201 Created",
    "message": "Created new Breeds table data successfully.",
    "result": {
        "id": 12,
        "name": "Curly-Coated Retriever",
        "updatedAt": "2024-06-12T02:57:51.042Z",
        "createdAt": "2024-06-12T02:57:51.042Z"
    }
}
```

**Response (Error) :**

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Name is required"
    "message": "Name must be a string"
    "message": "Name is not allowed to be empty"
}
```

```
{
    "statusType": "Server Error (SequelizeUniqueConstraintError)",
    "statusCode": "500 Internal Server Error",
    "message": "The value '${value}' for the field 'name' already exists."
}
```

</details>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>PUT /breeds/:breedId</strong></summary>

**Parameter :** `breedId`

**Body :**

| Field | Required | Type | Note   |
| ----- | -------- | ---- | ------ |
| name  | O        | str  | unique |

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Updated table data with id 1 successfully."
}
```

**Response (Error) :**

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Name is required"
    "message": "Name must be a string"
    "message": "Name is not allowed to be empty"
}
```

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Invalid parameter id. It must be a positive integer."
}
```

```
{
    "statusType": "Client Error",
    "statusCode": "404 Not Found",
    "message": "Table data not found with parameter or body id."
}
```

```
{
    "statusType": "Server Error (SequelizeUniqueConstraintError)",
    "statusCode": "500 Internal Server Error",
    "message": "The value '${value}' for the field 'name' already exists."
}
```

</details>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>DELETE /breeds/:breedId</strong></summary>

**Parameter :** `breedId`

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Deleted table data with id 1 successfully."
}
```

**Response (Error) :**

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Invalid parameter id. It must be a positive integer."
}
```

```
{
    "statusType": "Client Error",
    "statusCode": "404 Not Found",
    "message": "Table data not found with parameter or body id."
}
```

</details>

</details>

<details>

<summary><strong>Address</strong></summary>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>GET /address/cities</strong></summary>

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Get all Cities table data successfully.",
    "result": [
        {
            "id": 1,
            "name": "宜蘭縣",
            "createdAt": "2024-06-12T12:48:58.000Z",
            "updatedAt": "2024-06-12T12:48:58.000Z"
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
<strong>GET /address/cities/:cityId</strong></summary>

**Parameter :** `cityId`

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Get Breeds table data from id 1 successfully.",
    "result": {
        "id": 1,
        "name": "宜蘭縣",
        "createdAt": "2024-06-12T12:48:58.000Z",
        "updatedAt": "2024-06-12T12:48:58.000Z",
        "districts": [
            {
                "id": 2,
                "name": "大同鄉",
                "cityId": 1,
                "createdAt": "2024-06-12T12:48:58.000Z",
                "updatedAt": "2024-06-12T12:48:58.000Z"
            },
            {...}
        ]
    }
}
```

**Response (Error) :**

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Invalid parameter id. It must be a positive integer."
}
```

```
{
    "statusType": "Client Error",
    "statusCode": "404 Not Found",
    "message": "Table data not found with parameter or body id."
}
```

</details>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>GET /address/districts</strong></summary>

**Body :**

| Field  | Required | Type    | Note        |
| ------ | -------- | ------- | ----------- |
| limit  | X        | str/int | default: 10 |
| offset | X        | str/int | default: 0  |

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Get all Districts table data successfully.",
    "result": [
        {
            "id": 2,
            "name": "大同鄉",
            "cityId": 1,
            "createdAt": "2024-06-12T12:48:58.000Z",
            "updatedAt": "2024-06-12T12:48:58.000Z"
        },
        {...}
    ]
}
```

**Response (Error) :**

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Limit must be a number"
    "message": "Limit must be greater than or equal to 0"
    "message": "Limit must be an integer"
    "message": "offset must be a number"
    "message": "offset must be greater than or equal to 0"
    "message": "offset must be an integer"
}
```

</details>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>GET /address/districts/:districtId</strong></summary>

**Parameter :** `districtId`

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Get Districts table data from id 1 successfully.",
    "result": {
        "id": 1,
        "name": "三星鄉",
        "cityId": 1,
        "createdAt": "2024-06-12T12:48:58.000Z",
        "updatedAt": "2024-06-12T12:48:58.000Z",
        "roads": [
            {
                "id": 2,
                "name": "人和一路",
                "districtId": 1,
                "createdAt": "2024-06-12T12:48:58.000Z",
                "updatedAt": "2024-06-12T12:48:58.000Z"
            },
            {...}
        ]
    }
}
```

**Response (Error) :**

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Invalid parameter id. It must be a positive integer."
}
```

```
{
    "statusType": "Client Error",
    "statusCode": "404 Not Found",
    "message": "Table data not found with parameter or body id."
}
```

</details>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>GET /address/roads</strong></summary>

**Body :**

| Field  | Required | Type    | Note        |
| ------ | -------- | ------- | ----------- |
| limit  | X        | str/int | default: 10 |
| offset | X        | str/int | default: 0  |

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Get all Roads table data successfully.",
    "result": [
        {
            "id": 2,
            "name": "人和一路",
            "districtId": 1,
            "createdAt": "2024-06-12T12:48:58.000Z",
            "updatedAt": "2024-06-12T12:48:58.000Z"
        },
        {...}
    ]
}
```

**Response (Error) :**

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Limit must be a number"
    "message": "Limit must be greater than or equal to 0"
    "message": "Limit must be an integer"
    "message": "offset must be a number"
    "message": "offset must be greater than or equal to 0"
    "message": "offset must be an integer"
}
```

</details>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>GET /address/roads/:roadId</strong></summary>

**Parameter :** `roadId`

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Get Roads table data from id 1 successfully.",
    "result": {
        "id": 1,
        "name": "廣洲仔路",
        "districtId": 1,
        "createdAt": "2024-06-12T12:11:22.000Z",
        "updatedAt": "2024-06-12T12:11:22.000Z"
    }
}
```

**Response (Error) :**

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Invalid parameter id. It must be a positive integer."
}
```

```
{
    "statusType": "Client Error",
    "statusCode": "404 Not Found",
    "message": "Table data not found with parameter or body id."
}
```

</details>

</details>

<details>

<summary><strong>Pets</strong></summary>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>GET /pets</strong></summary>

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Get all Pets table data successfully.",
    "result": [
        {
            "id": 1,
            "name": "Corrine",
            "age": 14,
            "size": "medium",
            "breedId": 4,
            "userId": 2,
            "createdAt": "2024-06-17T04:22:49.000Z",
            "updatedAt": "2024-06-17T04:22:49.000Z",
            "breed": {
                "name": "McNab dog"
            },
            "image": {
                "link": "https://i.imgur.com/eBJWiig.jpeg"
            },
            "owner": {
                "username": "user1"
            }
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
<strong>GET /pets/:petId</strong></summary>

**Parameter :** `petId`

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Get Pets table data from id 1 successfully.",
    "result": {
        "id": 1,
        "name": "Corrine",
        "age": 14,
        "size": "medium",
        "breedId": 4,
        "userId": 2,
        "createdAt": "2024-06-17T04:22:49.000Z",
        "updatedAt": "2024-06-17T04:22:49.000Z",
        "breed": {
            "name": "McNab dog"
        },
        "image": {
            "link": "https://i.imgur.com/eBJWiig.jpeg"
        },
        "owner": {
            "username": "user1"
        }
    }
}
```

**Response (Error) :**

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Invalid parameter id. It must be a positive integer."
}
```

```
{
    "statusType": "Client Error",
    "statusCode": "404 Not Found",
    "message": "Table data not found with parameter or body id."
}
```

</details>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>POST /pets</strong></summary>

**Body :**

| Field   | Required | Type | Note                 |
| ------- | -------- | ---- | -------------------- |
| name    | O        | str  |                      |
| age     | O        | int  | positive             |
| size    | O        | str  | small, medium, large |
| breedId | O        | int  |                      |
| userId  | O        | int  |                      |

**Form Data :**

| File     | Note                  |
| -------- | --------------------- |
| mimetype | image/jpeg, image/png |
| size     | 3MB                   |

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "201 Created",
    "message": "Created new Pets table data successfully.",
    "result": {
        "id": 11,
        "name": "Blacky",
        "age": 10,
        "size": "large",
        "breedId": 5,
        "userId": 2,
        "createdAt": "2024-06-17T04:48:17.000Z",
        "updatedAt": "2024-06-17T04:48:17.000Z",
        "image": {
            "link": "https://i.imgur.com/UTijqmp.jpg"
        }
    }
}
```

**Response (Error) :**

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Name is required"
    "message": "Name must be a string"
    "message": "Name is not allowed to be empty"
    "message": "Age is required"
    "message": "Age must be an integer"
    "message": "Age must be a positive number"
    "message": "Age must be a number"
    "message": "Size must be one of [small, medium, large]"
    "message": "breedId is required"
    "message": "breedId must be an integer"
    "message": "breedId must be a positive number"
    "message": "breedId must be a number"
    "message": "userId is required"
    "message": "userId must be an integer"
    "message": "userId must be a positive number"
    "message": "userId must be a number"
    "message": "Mimetype must be one of [image/jpeg, image/png]"
    "message": "Size must be less than or equal to 3145728"
}
```

```
{
    "statusType": "Client Error",
    "statusCode": "404 Not Found",
    "message": "Table data not found with parameter or body id."
}

```

```
{
    "statusType": "Server Error (SequelizeUniqueConstraintError)",
    "statusCode": "500 Internal Server Error",
    "message": "The value '${value}' for the field 'name' already exists."
}
```

</details>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>PUT /pets/:petId</strong></summary>

**Parameter :** `petId`

**Body :**

| Field   | Required | Type | Note                 |
| ------- | -------- | ---- | -------------------- |
| name    | O        | str  |                      |
| age     | O        | int  | positive             |
| size    | O        | str  | small, medium, large |
| breedId | O        | int  |                      |

**Form Data :**

| File     | Note                  |
| -------- | --------------------- |
| mimetype | image/jpeg, image/png |
| size     | 3MB                   |

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Updated table data with id 20 successfully."
}
```

**Response (Error) :**

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Name is required"
    "message": "Name must be a string"
    "message": "Name is not allowed to be empty"
    "message": "Age is required"
    "message": "Age must be an integer"
    "message": "Age must be a positive number"
    "message": "Age must be a number"
    "message": "Size must be one of [small, medium, large]"
    "message": "breedId is required"
    "message": "breedId must be an integer"
    "message": "breedId must be a positive number"
    "message": "breedId must be a number"
    "message": "Mimetype must be one of [image/jpeg, image/png]"
    "message": "Size must be less than or equal to 3145728"
}
```

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Invalid parameter id. It must be a positive integer."
}
```

```
{
    "statusType": "Client Error",
    "statusCode": "404 Not Found",
    "message": "Table data not found with parameter or body id."
}
```

```
{
    "statusType": "Server Error (SequelizeUniqueConstraintError)",
    "statusCode": "500 Internal Server Error",
    "message": "The value '${value}' for the field 'name' already exists."
}
```

</details>

<details>

<summary style="color: black; background: #f5f5f5;">
<strong>DELETE /pets/:petId</strong></summary>

**Parameter :** `petId`

**Response (Success) :**

```
{
    "statusType": "Success",
    "statusCode": "200 OK",
    "message": "Deleted table data with id 1 successfully."
}
```

**Response (Error) :**

```
{
    "statusType": "Client Error",
    "statusCode": "400 Bad Request",
    "message": "Invalid parameter id. It must be a positive integer."
}
```

```
{
    "statusType": "Client Error",
    "statusCode": "404 Not Found",
    "message": "Table data not found with parameter or body id."
}
```

</details>

</details>
