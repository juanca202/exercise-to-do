## ADDED Requirements

### Requirement: Create and edit tasks in a modal dialog

The system SHALL present the create and edit task form inside a modal dialog. The task list MUST remain the primary surface when the dialog is closed. Closing the dialog without saving MUST discard unsaved form input without asking for confirmation.

#### Scenario: Open create dialog

- **WHEN** the user activates the “Nueva tarea” control
- **THEN** a modal dialog MUST open with the create form (title indicating nueva tarea)

#### Scenario: Open edit dialog

- **WHEN** the user activates “Editar” on a task
- **THEN** a modal dialog MUST open with the edit form prefilled for that task

#### Scenario: Successful create closes dialog

- **WHEN** the user submits a valid new task from the dialog
- **THEN** the task MUST appear in the list and the dialog MUST close

#### Scenario: Successful edit closes dialog

- **WHEN** the user submits valid changes from the edit dialog
- **THEN** the list MUST reflect the updates and the dialog MUST close

#### Scenario: Dismiss discards draft without confirmation

- **WHEN** the user closes the dialog via Cancel, Escape, or backdrop while fields have unsaved input
- **THEN** the dialog MUST close without a confirmation prompt and the unsaved input MUST NOT be persisted
