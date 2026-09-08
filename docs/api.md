# Veridian — API Documentation

## 1. Overview

Veridian uses a REST-style HTTP API to provide communication between the React frontend and Node.js backend.

The API is centred around Veridian's configurable workspace model rather than fixed application domains.

![api overview](diagrams/api/api_overview.drawio.png)

The API is designed before full implementation so that frontend and backend development can proceed against a defined interface.

---

# 2. Base URL

Development:

```text
/api
```

Example:

```http
GET /api/health
```

---

# 3. API Conventions

## HTTP Methods

| Method | Purpose             |
| ------ | ------------------- |
| GET    | Retrieve data       |
| POST   | Create data         |
| PUT    | Replace/update data |
| PATCH  | Partial update      |
| DELETE | Remove data         |

---

## Status Codes

| Status | Meaning                                  |
| ------ | ---------------------------------------- |
| 200    | Successful request                       |
| 201    | Resource created                         |
| 204    | Successful request with no response body |
| 400    | Invalid request                          |
| 401    | Unauthenticated                          |
| 403    | Forbidden                                |
| 404    | Resource not found                       |
| 409    | Resource conflict                        |
| 500    | Internal server error                    |

---

# 4. Error Format

API errors should use a consistent structure.

```json
{
    "error": "Description of the error"
}
```

Example:

```http
HTTP/1.1 404 Not Found
```

```json
{
    "error": "Page not found"
}
```

---

# 5. API Structure

```text
api/
├── health
├── auth
├── categories
├── pages
├── components
├── presets
├── search
└── dashboard
```

The API is centred around the configurable workspace.

Lists, checklists, tasks and other functionality are represented through components rather than necessarily requiring separate top-level API domains.

---

# 6. Health

## GET `/api/health`

Checks whether the backend is operational.

### Input

None.

### Response

**200 OK**

```json
{
    "status": "OK"
}
```

### Implementation

Introduced during Iteration 0.

This provides the initial end-to-end verification of the backend.

---

# 7. Authentication

## POST `/api/auth/register`

Creates a new user account.

### Input

```json
{
    "email": "user@example.com",
    "password": "password"
}
```

### Output

**201 Created**

```json
{
    "id": 1,
    "email": "user@example.com"
}
```

### Errors

* `400` Invalid input
* `409` Account already exists

Introduced in Iteration 1.

---

## POST `/api/auth/login`

Authenticates an existing user.

### Input

```json
{
    "email": "user@example.com",
    "password": "password"
}
```

### Output

**200 OK**

```json
{
    "user": {
        "id": 1,
        "email": "user@example.com"
    }
}
```

### Errors

* `400` Invalid input
* `401` Invalid credentials

Introduced in Iteration 1.

---

## POST `/api/auth/logout`

Ends the current authenticated session.

### Input

None.

### Output

**204 No Content**

Introduced in Iteration 1.

---

# 8. Categories

## POST `/api/categories`

Creates a category.

### Input

```json
{
    "name": "University"
}
```

### Output

**201 Created**

```json
{
    "id": 1,
    "name": "University"
}
```

Introduced in Iteration 1.

---

## GET `/api/categories`

Retrieves the user's categories.

### Input

None.

### Output

**200 OK**

```json
{
    "categories": [
        {
            "id": 1,
            "name": "University"
        }
    ]
}
```

Introduced in Iteration 1.

---

## GET `/api/categories/:id`

Retrieves a specific category.

### Input

Path parameter:

```text
id
```

### Output

**200 OK**

```json
{
    "id": 1,
    "name": "University"
}
```

Errors:

* `404` Category not found

Introduced in Iteration 1.

---

## PUT `/api/categories/:id`

Updates a category.

### Input

```json
{
    "name": "University"
}
```

### Output

**200 OK**

```json
{
    "id": 1,
    "name": "University"
}
```

Introduced in Iteration 2.

---

## DELETE `/api/categories/:id`

Deletes a category.

### Output

**204 No Content**

Introduced in Iteration 2.

---

# 9. Pages

## POST `/api/pages`

Creates a page.

### Input

```json
{
    "category_id": 1,
    "name": "Analysis"
}
```

### Output

**201 Created**

```json
{
    "id": 1,
    "category_id": 1,
    "name": "Analysis"
}
```

Introduced in Iteration 1.

---

## GET `/api/pages/:id`

Retrieves a page.

### Output

**200 OK**

```json
{
    "id": 1,
    "category_id": 1,
    "name": "Analysis",
    "components": []
}
```

Introduced in Iteration 1.

---

## PUT `/api/pages/:id`

Updates a page.

### Input

```json
{
    "name": "Analysis Revision"
}
```

### Output

**200 OK**

```json
{
    "id": 1,
    "category_id": 1,
    "name": "Analysis Revision"
}
```

Introduced in Iteration 2.

---

## DELETE `/api/pages/:id`

Deletes a page.

### Output

**204 No Content**

Introduced in Iteration 2.

---

# 10. Components

## POST `/api/pages/:id/components`

Adds a component to a page.

### Input

```json
{
    "type": "list",
    "configuration": {
        "title": "Homework"
    }
}
```

### Output

**201 Created**

```json
{
    "id": 1,
    "page_id": 1,
    "type": "list",
    "configuration": {
        "title": "Homework"
    }
}
```

Introduced in Iteration 1.

---

## GET `/api/pages/:id/components`

Retrieves the components belonging to a page.

### Output

**200 OK**

```json
{
    "components": [
        {
            "id": 1,
            "type": "list",
            "configuration": {
                "title": "Homework"
            }
        }
    ]
}
```

Introduced in Iteration 1.

---

## PUT `/api/components/:id`

Updates a component.

### Input

```json
{
    "configuration": {
        "title": "Updated Homework"
    }
}
```

### Output

**200 OK**

```json
{
    "id": 1,
    "type": "list",
    "configuration": {
        "title": "Updated Homework"
    }
}
```

Introduced in Iteration 2.

---

## DELETE `/api/components/:id`

Deletes a component.

### Output

**204 No Content**

Introduced in Iteration 2.

---

# 11. Component Positioning

As users gain the ability to customise page layouts, component positioning must be persisted.

## PUT `/api/components/:id/layout`

Updates the position/layout of a component.

### Input

Example:

```json
{
    "position": {
        "x": 2,
        "y": 1
    },
    "size": {
        "width": 4,
        "height": 2
    }
}
```

### Output

**200 OK**

```json
{
    "id": 1,
    "position": {
        "x": 2,
        "y": 1
    },
    "size": {
        "width": 4,
        "height": 2
    }
}
```

Introduced during Iteration 2 as layout functionality develops.

---

# 12. Presets

## GET `/api/presets`

Retrieves available presets.

### Output

**200 OK**

```json
{
    "presets": [
        {
            "id": 1,
            "name": "Shopping"
        },
        {
            "id": 2,
            "name": "University"
        }
    ]
}
```

---

## POST `/api/presets/:id/apply`

Applies a preset to the user's workspace.

### Input

Optional configuration depending on the preset.

### Output

**201 Created**

```json
{
    "category_id": 5,
    "page_ids": [10, 11]
}
```

The resulting categories, pages and components become normal user-owned workspace objects.

Presets are therefore a convenience layer over the core workspace system.

Initial preset functionality may be introduced during Iteration 1 and expanded in later iterations.

---

# 13. Search

## GET `/api/search`

Provides application-wide workspace search.

### Input

Query parameter:

```text
/api/search?q=homework
```

### Output

**200 OK**

```json
{
    "results": [
        {
            "type": "component",
            "id": 1,
            "title": "Homework",
            "page_id": 4
        }
    ]
}
```

Iteration 1 provides basic keyword search.

Iteration 2 expands search across categories, pages and multiple component types.

Later iterations may introduce:

* Advanced filtering
* Search ranking
* Relationship-aware search
* Query optimisation

---

# 14. Dashboard

## GET `/api/dashboard`

Retrieves aggregated information for the user's dashboard.

### Input

None.

### Output

**200 OK**

```json
{
    "categories": [],
    "recent_pages": [],
    "recent_components": []
}
```

The dashboard should aggregate information from the user's workspace rather than maintain duplicate copies of that information.

Basic dashboard functionality is introduced during Iteration 1.

Later iterations introduce richer aggregation and customisation.

---

# 15. API Evolution

The API evolves alongside the rest of the application.

| Area           | I0          | I1               | I2                 | I3+          |
| -------------- | ----------- | ---------------- | ------------------ | ------------ |
| Health         | Implemented | Maintained       | Maintained         | Production   |
| Authentication | Structure   | Basic auth       | Sessions/ownership | Secure       |
| Categories     | Planned     | Basic CRUD       | Full CRUD          | Advanced     |
| Pages          | Planned     | Basic CRUD       | Full CRUD          | Advanced     |
| Components     | Planned     | Basic components | Configurable       | Advanced     |
| Layout         | Planned     | Basic            | Positioning        | Advanced     |
| Presets        | Planned     | Initial          | Expanded           | Customisable |
| Search         | Structure   | Basic            | Cross-workspace    | Advanced     |
| Dashboard      | Structure   | Basic            | Aggregated         | Customised   |

---

# 16. API Development Principles

The API should maintain:

* Consistent naming
* Predictable HTTP semantics
* Consistent error responses
* Input validation
* Authentication and authorisation
* Clear resource ownership
* Separation between routing and business logic
* Testable services
* Version-controlled documentation

The API should remain simple during early iterations and gain complexity only as the requirements of the configurable workspace justify it.
