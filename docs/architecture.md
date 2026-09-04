# Veridian Architecture

## Overview

Veridian is a full-stack personal organisation and productivity platform.

The application is separated into three main parts:

* **Frontend** — React + TypeScript
* **Backend** — Node.js + TypeScript
* **Database** — PostgreSQL + SQL

The main architecture is:

```text
                         VERIDIAN
                            │
                    ┌───────┴───────┐
                    │               │
                 FRONTEND        BACKEND
                    │               │
                  React          Node.js
                    │               │
                TypeScript      TypeScript
                    │               │
                    └───────┬───────┘
                            │
                           HTTP
                            │
                         REST API
                            │
                           SQL
                            │
                       PostgreSQL
```

The frontend communicates with the backend through HTTP requests. The backend handles application logic and communicates with the PostgreSQL database.

The frontend does not communicate directly with the database.

---

## Frontend

### Technologies

* React
* TypeScript
* HTML
* CSS

### Responsibilities

The frontend is responsible for:

* Displaying the user interface
* Handling user interaction
* Managing frontend state
* Sending HTTP requests to the backend
* Displaying data returned by the backend
* Providing responsive layouts and reusable components

### Planned Structure

```text
client/
└── src/
    ├── components/
    ├── pages/
    ├── types/
    ├── App.tsx
    └── main.tsx
```

### Folder Responsibilities

**`components/`**

Contains reusable UI components.

Examples:

* Navigation
* Buttons
* Forms
* Cards
* Modals

**`pages/`**

Contains larger application pages or views.

Examples:

* Dashboard
* Tasks
* Notes
* Entertainment
* University

**`types/`**

Contains TypeScript types used by the frontend.

---

## Backend

### Technologies

* Node.js
* TypeScript
* Native Node.js HTTP functionality initially

### Responsibilities

The backend is responsible for:

* Handling HTTP requests
* Routing requests to the appropriate functionality
* Validating incoming data
* Implementing application/business logic
* Communicating with the database
* Returning responses to the frontend
* Handling authentication and authorisation
* Handling errors

### Planned Structure

```text
server/
└── src/
    ├── routes/
    ├── controllers/
    ├── services/
    ├── database/
    ├── types/
    └── server.ts
```

### Folder Responsibilities

**`routes/`**

Defines the API endpoints available to the frontend.

**`controllers/`**

Handles incoming requests and determines the appropriate response.

**`services/`**

Contains application and business logic.

**`database/`**

Contains code responsible for communicating with PostgreSQL.

**`types/`**

Contains TypeScript types used by the backend.

**`server.ts`**

Responsible for starting the Node.js HTTP server.

---

## Database

### Technologies

* PostgreSQL
* SQL

The database stores persistent Veridian data.

### Initial Entities

The initial database may contain entities such as:

```text
users
tasks
notes
entertainment
lists
recipes
```

A simplified relationship could look like:

```text
User
 │
 ├── Tasks
 ├── Notes
 ├── Entertainment
 ├── Lists
 └── Recipes
```

Most user-specific data will be associated with a user through a foreign key.

The database schema will evolve as additional Veridian features are implemented.

---

## Communication

The frontend communicates with the backend using HTTP requests.

A typical request will follow this process:

```text
React Frontend
      │
      │ HTTP Request
      │ GET /api/tasks
      ↓
Node.js Backend
      │
      │ SQL Query
      ↓
PostgreSQL
      │
      │ Query Result
      ↓
Node.js Backend
      │
      │ JSON Response
      ↓
React Frontend
```

### Example API Endpoints

The API will eventually contain endpoints similar to:

```text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id

GET    /api/notes
POST   /api/notes
PUT    /api/notes/:id
DELETE /api/notes/:id

GET    /api/entertainment
POST   /api/entertainment
PUT    /api/entertainment/:id
DELETE /api/entertainment/:id
```

The exact API structure may change as development progresses.

---

## Architecture Principles

Veridian will follow several principles during development:

* Keep frontend and backend responsibilities separate.
* The frontend communicates with the backend through an API.
* The frontend should not directly access the database.
* The backend is responsible for database access.
* Business logic should be separated from HTTP request handling where practical.
* Use TypeScript throughout the JavaScript/Node.js ecosystem.
* Prefer simple solutions before introducing additional frameworks or abstractions.
* Write reusable and maintainable code.
* Keep the architecture flexible as the application grows.
* Document significant architectural decisions.

---

## Framework Strategy

Veridian will initially be developed using the underlying technologies before introducing additional frameworks.

### Backend

Node.js's built-in HTTP functionality will initially be used instead of Express.

The purpose is to understand:

* HTTP requests and responses
* Routing
* Status codes
* Headers
* JSON responses
* Server-side application structure

Express may be evaluated later once these concepts are understood.

### Frontend

React will be used to build the frontend after the fundamentals of JavaScript, TypeScript, HTML and CSS have been established.

### Next.js

Next.js will not be introduced during the initial development stages.

It will be evaluated later after the underlying React and web application architecture are understood.

The goal is to understand what frameworks provide and what problems their abstractions solve rather than relying on them without understanding the underlying concepts.

---

## Future Architecture

As Veridian develops, the architecture may be expanded to support:

* User authentication
* Authorisation
* More advanced database relationships
* External APIs
* Automated testing
* Docker
* Continuous integration and deployment
* Cloud deployment
* Progressive Web App functionality
* Desktop application support through Tauri
* Mobile support
* AI-powered features

These additions will be documented here as they are designed and implemented.

---

## Architecture Evolution

This document describes the intended architecture of Veridian and will evolve throughout development.

Architectural decisions may change as:

* New requirements are identified
* The application becomes more complex
* Performance requirements change
* New technologies are learned
* Better design approaches are discovered

Changes to the architecture should be reflected in this document so that it remains an accurate representation of the project.
