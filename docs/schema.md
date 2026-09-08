# Veridian — Database Schema

## 1. Overview

Veridian uses PostgreSQL as its primary persistent data store.

The database is designed around a configurable workspace rather than a collection of fixed application domains.

The fundamental data model is:

```text
User/
└── Categories/
    └── Pages/
        └── Components / Blocks
```

This allows users to create structures for any purpose.

University, shopping, entertainment, finance and other use cases are represented through the same underlying entities.

Presets create preconfigured combinations of these entities.

---

# 2. Conceptual Data Model

The initial conceptual model is:

![conceptual data model](diagrams/schema/conceptual_data_model.png)

The exact implementation of component data will evolve as different component types are introduced.

---

# 3. Core Entities

## User

Represents an authenticated Veridian user.

Planned fields:

| Field         | Type           | Constraints      |
| ------------- | -------------- | ---------------- |
| id            | INTEGER / UUID | Primary Key      |
| email         | VARCHAR        | Unique, Not Null |
| password_hash | VARCHAR        | Not Null         |
| created_at    | TIMESTAMP      | Not Null         |
| updated_at    | TIMESTAMP      | Not Null         |

---

## Categories

Categories provide high-level organisation within a user's workspace.

Planned fields:

| Field      | Type           | Constraints          |
| ---------- | -------------- | -------------------- |
| id         | INTEGER / UUID | Primary Key          |
| user_id    | INTEGER / UUID | Foreign Key          |
| parent_id  | INTEGER / UUID | Optional Foreign Key |
| name       | VARCHAR        | Not Null             |
| position   | INTEGER        | Not Null             |
| created_at | TIMESTAMP      | Not Null             |
| updated_at | TIMESTAMP      | Not Null             |

`parent_id` can support nested category structures if required.

Example:

```text
University/
└── Year 2
```

---

## Pages

Pages provide configurable workspaces within categories.

Planned fields:

| Field       | Type           | Constraints          |
| ----------- | -------------- | -------------------- |
| id          | INTEGER / UUID | Primary Key          |
| category_id | INTEGER / UUID | Foreign Key          |
| parent_id   | INTEGER / UUID | Optional Foreign Key |
| name        | VARCHAR        | Not Null             |
| position    | INTEGER        | Not Null             |
| created_at  | TIMESTAMP      | Not Null             |
| updated_at  | TIMESTAMP      | Not Null             |

Pages may support nesting where appropriate.

---

## Components

Components are reusable building blocks placed onto pages.

Planned fields:

| Field         | Type           | Constraints |
| ------------- | -------------- | ----------- |
| id            | INTEGER / UUID | Primary Key |
| page_id       | INTEGER / UUID | Foreign Key |
| type          | VARCHAR        | Not Null    |
| position      | INTEGER / JSON | Not Null    |
| configuration | JSON / JSONB   | Optional    |
| created_at    | TIMESTAMP      | Not Null    |
| updated_at    | TIMESTAMP      | Not Null    |

The `type` identifies the component implementation.

Examples:

```text
text
list
checklist
table
calendar
task
media
```

The exact component model will evolve as the component system develops.

---

# 4. Component Data

Different components may require different data structures.

For example:

```text
List Component/
├── Component
└── List Items
```

A component may therefore reference additional records where required.

The database architecture should avoid creating a completely separate top-level system for every possible component type.

Instead, the component framework should provide a common structure while allowing component-specific data where necessary.

---

# 5. List Component

A list is a component rather than a fundamental application domain.

Conceptually:

```text
Page/
└── List Component/
    ├── Item
    ├── Item
    └── Item
```

Potential list-item schema:

```sql
CREATE TABLE list_items (
    id SERIAL PRIMARY KEY,
    component_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    position INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_list_component
        FOREIGN KEY (component_id)
        REFERENCES components(id)
        ON DELETE CASCADE
);
```

This allows lists to exist anywhere a user places a list component.

For example:

```text
Shopping → Weekly Shop → List Component

University → Coursework → List Component

Personal → Goals → List Component
```

All three use the same underlying list functionality.

---

# 6. Presets

Presets represent reusable workspace configurations.

Conceptually:

```text
Preset/
├── Category configuration
├── Page configuration
└── Component configuration
```

A preset may define:

* Categories
* Pages
* Components
* Default component configuration
* Initial layout

For example:

![schema preset example](diagrams/schema/schema_preset_example.drawio.png)

The generated objects become normal user-owned Veridian entities after creation.

This means users can customise the result without requiring special handling for the preset.

---

# 7. Relationships

Core relationships include:

![schema database architecture](diagrams/schema/schema_database_architecture.drawio.png)

Where:

```text
A ──< B
```

represents a one-to-many relationship.

---

# 8. User Ownership

User ownership is fundamental to the database design.

```text
USER/
├── Categories
├── Pages
├── Components
└── Presets
```

Application data should be associated with the appropriate user.

Authorisation should ensure that a user cannot access or modify another user's workspace data.

---

# 9. Schema Evolution

The physical database develops incrementally.

## Iteration 0

Database infrastructure only.

![database infastructure](diagrams/schema/database_infastructure.drawio.png)

The conceptual schema is documented, but application tables do not need to be fully implemented.

## Iteration 1

Introduce the core entities required for the basic configurable workspace.

Potential tables:

* Users
* Categories
* Pages
* Components
* List Items
* Authentication/session data

## Iteration 2

Introduce richer relationships and configuration.

Potential additions:

* Nested categories/pages
* Component configuration
* Component-specific data
* Positioning/layout information
* Presets
* User ownership improvements

## Iteration 3+

Introduce:

* Advanced relationships
* Additional component data structures
* Indexes
* Query optimisation
* More sophisticated constraints
* Performance improvements

---

# 10. Data Integrity

The database should enforce important constraints rather than relying exclusively on application code.

Examples include:

* Primary keys
* Foreign keys
* Unique constraints
* `NOT NULL`
* Appropriate data types
* Controlled cascading behaviour
* Referential integrity

Example:

```text
Category/
└── Page/
    └── Component
```

Deleting a page can therefore remove its associated components through controlled foreign-key behaviour where appropriate.

---

# 11. Layout Persistence

Because users can customise the arrangement of components on a page, layout information must be persistable.

Conceptually:

```text
Component/
├── Position
├── Size
├── Configuration
└── Data
```

The exact representation of position and layout will be determined during implementation.

Possible approaches include:

* Ordered positions
* Grid coordinates
* JSON layout definitions

The final implementation should be chosen based on the requirements of the component/layout system.

---

# 12. Indexing Strategy

Indexes should be introduced based on actual query requirements.

Likely candidates include:

* User ownership fields
* Category relationships
* Page relationships
* Component relationships
* Frequently searched content
* Component types

Indexes should not be added indiscriminately.

The process should be:

![indexing stratergy](diagrams/schema/indexing_stratergy.drawio.png)

---

# 13. Migration Strategy

Database changes should be managed through versioned migrations.

![migration stratergy](diagrams/schema/migration_stratergy.drawio.png)

Each migration should represent a controlled schema change.

Examples:

```text
001 → Initial database infrastructure

002 → Add users

003 → Add categories and pages

004 → Add components

005 → Add component-specific data

006 → Add presets
```

The exact migration sequence will be determined during implementation.

Migration history should be committed to version control so development environments can reproduce the database structure.
