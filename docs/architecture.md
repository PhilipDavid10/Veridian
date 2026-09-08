# Veridian — System Architecture

## 1. Project Overview

Veridian is a configurable personal workspace that allows users to create their own organisational structures and populate them with reusable components.

Unlike a traditional productivity application built around fixed domains, Veridian does not fundamentally assume that a user needs a specific University, Entertainment, Finance or Shopping system.

Instead, the application provides a flexible underlying model:

```text
User/
└── Categories/
    └── Pages/
        └── Components / Blocks
```

Users determine what these structures represent.

For example:

```text
University/
└── Analysis/
    ├── Homework List
    ├── Notes
    └── Important Dates
```

and:

```text
Personal/
└── Fitness/
    ├── Workout List
    ├── Goals
    └── Progress
```

are both represented using the same underlying system.

Common use cases can be accelerated through presets.

---

# 2. High-Level Architecture

![High Level Architecture](diagrams/architecture/high_level_architecture.drawio.png)

The major architectural layers are:

![architectural Layers](diagrams/architecture/architectural_layers.drawio.png)

---

# 3. Core Application Architecture

The fundamental application structure is:

```text
User/
├── Categories/
│   └── Pages/
│       └── Components
├── Dashboard
├── Search
└── Presets
```

Authentication provides user identity and ownership across the workspace.

The dashboard and search systems operate across user-created content rather than being tied to predefined domains.

---

# 4. Frontend Architecture

The frontend is responsible for presentation, user interaction, client-side state and workspace manipulation.

```text
React Application/
├── Application/
│   ├── Routing
│   ├── Layout
│   └── Application State
├── Shared Components
├── Workspace/
│   ├── Categories
│   ├── Pages
│   ├── Components
│   └── Layout
├── Dashboard
├── Search
├── Authentication
├── Presets
├── API Services
└── Types
```

### Application

Handles application-wide concerns such as routing, layout and state.

### Workspace

Contains the core user-created hierarchy.

### Components

Provides reusable building blocks that can be placed onto pages.

### Dashboard

Aggregates information from the user's workspace.

### Search

Provides cross-workspace content discovery.

### Authentication

Handles account and authentication state.

### Presets

Provides preconfigured workspace structures.

---

# 5. Workspace Architecture

The workspace is the core of Veridian.

```text
Workspace/
├── Category/
│   ├── Page/
│   │   ├── Component
│   │   ├── Component
│   │   └── Component
│   └── Page
└── Category
```

Pages act as configurable workspaces.

Components can be added, configured and positioned within a page.

The architecture should avoid assuming what a page represents.

---

# 6. Component Architecture

Components are reusable units of functionality.

Conceptually:

```text
Page/
├── Component/
│   ├── Type
│   ├── Position
│   ├── Size
│   ├── Configuration
│   └── Data
└── Component
```

The component type determines its behaviour while its configuration determines how it is presented and used.

Potential component types include:

* Text
* Heading
* List
* Checklist
* Task
* Table
* Calendar
* Link
* Media
* Other future components

The component system should be designed so that new component types can be added without restructuring the entire application.

---

# 7. Preset Architecture

Presets are built on top of the normal workspace/component architecture.

![presets structure](diagrams/architecture/preset_structure.drawio.png)

For example:

![presets example](diagrams/architecture/preset_example.drawio.png)

The preset itself should not require a dedicated University backend subsystem.

This keeps the core platform generic.

---

# 8. Backend Architecture

The backend provides the API and application logic.

```text
Backend/
├── Configuration
├── HTTP / Server
├── Routes
├── Middleware
├── Modules
├── Services
├── Data Access
└── Shared Infastructure
```

Responsibilities:

**Configuration**

Environment variables and application configuration.

**HTTP / Server**

Node.js HTTP server and request handling.

**Routes**

Maps HTTP requests to application functionality.

**Middleware**

Handles cross-cutting concerns such as authentication and validation.

**Modules**

Groups related application functionality.

**Services**

Contains business/application logic.

**Data Access**

Handles PostgreSQL interaction.

**Shared Infrastructure**

Contains reusable backend functionality.

---

# 9. API Architecture

![API Architecture](diagrams/architecture/api_architecture.drawio.png)

Primary API groups:

```text
api/
├── Health
├── Auth
├── Categories
├── Pages
├── Components
├── Presets
├── Search
└── Dashboard
```

The API is therefore centred around the workspace model rather than fixed application domains.

---

# 10. Database Architecture

PostgreSQL provides persistent storage for:

* Users
* Categories
* Pages
* Components
* Component data/configuration
* Presets
* Authentication/session information

Conceptually:

![database architecture](diagrams/architecture/database_architecture.drawio.png)

The physical schema is introduced incrementally throughout development.

---

# 11. Authentication Architecture

Authentication is a core application subsystem.

![Authentication Architecture](diagrams/architecture/Authentication%20Architecture.drawio.png)

Authentication maturity increases with each iteration:

```text
I0 → Authentication architecture placeholder

I1 → Registration / Login / Logout

I2 → Sessions / protected routes / user ownership

I3 → Stronger authorisation and security

I4+ → Production security hardening
```

---

# 12. Search Architecture

Search operates across the user's configurable workspace.

![search architecture](diagrams/architecture/search_architecture.drawio.png)

Search begins as basic keyword matching and progressively develops into a cross-workspace search system.

---

# 13. Dashboard Architecture

The dashboard acts as an aggregation layer over existing workspace data.

![dashboard architecture](diagrams/architecture/dashboard_architecture.png)

The dashboard should not become a second source of truth.

Instead, it retrieves and aggregates information owned by the relevant workspace entities.

---

# 14. Testing Architecture

Testing is distributed across the system.

```text
Testing/
├── Frontend
├── Backend
├── Database
├── API
├── Integration
└── End-to-End
```

Testing maturity increases throughout development.

### I0

* Test framework
* Environment test
* Health endpoint test

### I1

* Basic feature tests
* API tests
* Authentication tests
* Database tests
* Component tests

### I2

* Unit tests
* Integration tests
* Validation tests
* Error cases
* Regression tests

### I3+

* End-to-end tests
* Performance testing
* Security testing
* Extensive regression coverage

---

# 15. Development Architecture

Development is organised around independent responsibilities while maintaining a single deployable application.

```text
Veridian/
├── Client/
│   └── React + TypeScript
├── Server/
│   └── Node.js + TypeScript
├── Database/
│   └── PostgreSQL
└── Documentation
```

The system initially remains a modular monolith.

Future architectural changes should be driven by actual requirements, performance constraints or maintainability problems.

---

# 16. Project Structure

```text
Veridian/
├── Client/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── services/
│   │   └── types/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── Server/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── modules/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── data/
│   │   └── server.ts
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
├── database/
│   ├── migrations/
│   ├── seeds/
├── docs/
│   ├── roadmap.md
│   ├── requirements.md
│   ├── architecture.md
│   ├── frontend.md
│   ├── api.md
│   ├── schema.md
│   ├── testing.md
│   ├── iterations/
│   └── diagrams/
├── .gitignore
├── README.md
├── LICENSE
└── package.json
```

---

# 17. Iteration Architecture

The architecture exists from Iteration 0 and becomes increasingly implemented over time.

| Layer / System | I0              | I1               | I2              | I3+            |
| -------------- | --------------- | ---------------- | --------------- | -------------- |
| Frontend       | Skeleton        | Basic UI         | Rich UI         | Advanced       |
| Backend        | Server skeleton | Basic routes     | Services        | Advanced logic |
| Database       | Connection      | Core schema      | Relationships   | Optimised      |
| Categories     | Structure       | Basic creation   | Full management | Advanced       |
| Pages          | Structure       | Basic pages      | Full management | Advanced       |
| Components     | Structure       | Basic components | Configurable    | Advanced       |
| Layout         | Structure       | Basic            | Positioning     | Advanced       |
| Authentication | Placeholder     | Basic auth       | User ownership  | Secure         |
| Search         | Structure       | Basic            | Cross-workspace | Advanced       |
| Dashboard      | Structure       | Basic            | Aggregated      | Customised     |
| Presets        | Structure       | Initial          | Expanded        | Customisable   |
| Testing        | Basic setup     | Feature tests    | Integration     | Extensive      |

The architecture and functionality therefore mature together rather than creating a large unused architectural structure in the foundation stage.
