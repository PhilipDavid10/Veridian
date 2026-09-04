# Veridian

**Veridian** is a full-stack personal organisation and productivity platform designed to bring different areas of everyday life into one central application.

The project is being developed incrementally, starting with the fundamentals of web development and gradually progressing towards a complete full-stack application.

> **Status:** 🚧 In Development

---

## Overview

Veridian is designed as a personalised central hub for organising and tracking different areas of life.

Planned functionality includes:

* 📋 Tasks and deadlines
* 📝 Notes
* 🛒 Custom and shopping lists
* 🎓 University organisation
* 🎬 Entertainment tracking
* 🍳 Recipes and cooking
* 🎮 Gaming and aim-training tracking
* 🔎 Search, filtering and sorting
* 📊 Personal dashboards and progress tracking
* 🤖 AI-powered recommendations and assistance

The application is intended to be flexible enough to accommodate additional systems and features as development progresses.

---

## Goals

The main goals of Veridian are to:

* Build a practical application that I can use personally.
* Develop full-stack software engineering skills.
* Gain a strong understanding of frontend, backend and database architecture.
* Learn the underlying technologies before relying heavily on frameworks.
* Practise designing and maintaining a larger software project.
* Explore authentication, testing, deployment and cross-platform development.
* Eventually integrate AI into a real application rather than as a standalone experiment.

---

## Technology Stack

### Frontend

* HTML
* CSS
* JavaScript
* TypeScript
* React

### Backend

* Node.js
* TypeScript
* HTTP / REST API

### Database

* SQL
* PostgreSQL

### Planned Technologies

* Testing
* Docker
* CI/CD
* Progressive Web Apps (PWA)
* Tauri
* AI APIs
* Next.js

---

## Architecture

Veridian is designed around a separation between the frontend, backend and database.

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

The frontend communicates with the backend through HTTP requests.

The backend handles application logic and communicates with the PostgreSQL database.

The frontend does not communicate directly with the database.

For a more detailed explanation of the architecture, see [`docs/architecture.md`](docs/architecture.md).

---

## Project Structure

The project is organised into separate areas for the frontend, backend, database and documentation.

```text
Veridian/
│
├── client/             # Frontend application
│
├── server/             # Backend application
│
├── database/            # Database schemas and seed data
│
├── docs/                # Project documentation
│   ├── architecture.md
│   └── roadmap.md
│
├── .gitignore
├── README.md
└── LICENSE
```

The structure will evolve as additional functionality is implemented.

---

## Development Roadmap

The project is being developed in stages:

```text
Project Planning
       ↓
JavaScript Fundamentals
       ↓
TypeScript
       ↓
HTML & CSS
       ↓
React
       ↓
Veridian Frontend
       ↓
HTTP Fundamentals
       ↓
Node.js
       ↓
Veridian API
       ↓
SQL & PostgreSQL
       ↓
Full-Stack Integration
       ↓
Authentication
       ↓
Feature Expansion
       ↓
Testing
       ↓
Cross-Platform Support
       ↓
Deployment
       ↓
AI Integration
       ↓
Framework Evaluation
```

The complete roadmap can be found in [`docs/roadmap.md`](docs/roadmap.md).

---

## Current Status

Veridian is currently in the **initial development and learning stage**.

The current focus is on establishing a strong foundation in:

* JavaScript
* TypeScript
* Web fundamentals
* React
* Node.js
* HTTP
* SQL
* PostgreSQL

The application will initially be developed without relying heavily on backend frameworks. This is intentional, allowing the underlying concepts behind web applications and frameworks to be understood first.

As the project develops, completed features and architectural decisions will be reflected in this repository.

---

## Development Philosophy

Veridian is being developed as both a practical application and a learning project.

Rather than immediately introducing abstractions and frameworks, the project aims to understand the technologies underneath them first.

For example:

* Node.js HTTP functionality will be explored before introducing Express.
* React fundamentals will be established before evaluating Next.js.
* SQL and relational database concepts will be learned before building more complex database abstractions.

Frameworks and additional technologies will be introduced when they provide a clear benefit to the project.

---

## Future Plans

Long-term development may include:

### Application

* Advanced task and deadline management
* Rich note-taking
* Calendar and timetable integration
* Personal dashboards
* Advanced entertainment tracking
* External API integrations
* Personal progress tracking

### Cross-Platform

* Installable web application
* Progressive Web App functionality
* Desktop application
* Mobile support

### Engineering

* Automated testing
* Authentication and authorisation
* Docker
* CI/CD
* Production deployment
* Monitoring and logging

### AI

* Personalised entertainment recommendations
* AI-assisted organisation
* Natural-language interaction with Veridian
* Context-aware suggestions based on relevant user data

---

## Documentation

| Document                               | Description                                 |
| -------------------------------------- | ------------------------------------------- |
| [`Architecture`](docs/architecture.md) | Technical architecture and design decisions |
| [`Roadmap`](docs/roadmap.md)           | Development and learning roadmap            |
