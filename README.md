# tavrimizfit-api

This is a fitness application api built using `express`, `mongoose` and `typescript`.

## Installation

- Install dependencies `yarn install`
- Create `.env` file like below

        DB_URI = "mongodb://username:password@server_ip:server_port/tavrimizfit"
        TOKEN_SECRET = "SOME_STRONG_RANDOM_STRING"
        PORT = 3001

## Scripts

- `start`: starts developement server
- `build`: builds into `dist/` folder

## Endpoints

- **POST** /login

```
{
    "email": "admin@admin.com",
    "password": "adminadmin"
}
```

- **POST** /register - _create user_

```
{
    "name": "admin",
    "surname": "admin",
    "password": "adminadmin",
    "email": "admin@admin.com"
}
```

- **POST** /profile - _update profile_

```
{
    "name": "name",
    "surname": "surname",
    "password": "password123"
}
```

- **POST** /tutorials - _create tutorial_

```
{
    title: "title",
    description: "description",
    media: [
        "url1",
        "url2"
    ],
    tags: [
        "tag1",
        "tag2"
    ],
    type: "premium"
}
```

- **PATCH** /tutorials/:id - _update tutorial_

```
{
    title: "title",
    description: "description",
    media: [
        "url1",
        "url2"
    ],
    tags: [
        "tag1",
        "tag2"
    ],
    type: "premium"
}
```

- **GET** /tutorials - _get tutorials_

- **GET** /tutorials/:id - _get tutorial_

- **DELETE** /tutorials/:id - _delete tutorial_

- **POST** /trainings - _create training_

```
{
	"title": "title",
	"description": "description",
	"tutorials": [
        "tutorial_id_1",
        "tutorial_id_2"
    ],
    tags: [
        "tag1",
        "tag2"
    ],
    type: "premium"
}
```

- **PATCH** /trainings/:id - _update training_

```
{
	"title": "title",
	"description": "description",
	"tutorials": [
        "tutorial_id_1",
        "tutorial_id_2"
    ],
    tags: [
        "tag1",
        "tag2"
    ],
    type: "premium"
}
```

- **GET** /trainings - _get trainings_

- **GET** /trainings/:id - _get training_

- **DELETE** /trainings/:id - _delete trainings_

- **POST** /recipes - _create recipe_

```
{
	"title": "title",
	"description": "description",
	"ingredients": [
        "ingredient one",
        "ingredient two"
    ],
    tags: [
        "tag1",
        "tag2"
    ],
    calorie: "123"
}
```

- **PATCH** /recipes/:id - _update recipe_

```
{
	"title": "title",
	"description": "description",
	"ingredients": [
        "ingredient one",
        "ingredient two"
    ],
    tags: [
        "tag1",
        "tag2"
    ],
    calorie: "123"
}
```

- **GET** /recipes - _get recipes_

- **GET** /recipes/:id - _get recipe_

- **DELETE** /recipes/:id - _delete recipes_
