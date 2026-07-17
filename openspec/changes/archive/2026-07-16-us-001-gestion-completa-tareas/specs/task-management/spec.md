## ADDED Requirements

### Requirement: Create task with required fields

The system SHALL allow the user to create a new task by providing a non-empty description (after trimming whitespace), a due date, and a priority of high, medium, or low.

#### Scenario: Successful create

- **WHEN** the user submits a task with description, due date, and a valid priority
- **THEN** the task MUST appear in the task list with those values and as not completed

#### Scenario: Reject empty description

- **WHEN** the user attempts to save a task with an empty description or a description that contains only whitespace
- **THEN** the system MUST NOT create the task and MUST show a validation error for the description

#### Scenario: Reject missing due date

- **WHEN** the user attempts to save a task without a due date
- **THEN** the system MUST NOT create the task and MUST show a validation error for the due date

### Requirement: Priority restricted to three values

The system SHALL restrict task priority to exactly three values: high (alta), medium (media), and low (baja). The priority control in the UI MUST expose only those three options.

#### Scenario: Priority selector offers three options

- **WHEN** the user opens the priority selector for create or edit
- **THEN** the system MUST present exactly the options alta, media, and baja

#### Scenario: Invalid priority in storage is rejected

- **WHEN** persisted data contains a task with a priority outside high, medium, or low
- **THEN** the system MUST NOT load that invalid task into the working list (discard the item or reset storage) and MUST remain usable without crashing

### Requirement: Edit existing task

The system SHALL allow the user to edit the description, due date, and priority of an existing task, applying the same validation rules as create.

#### Scenario: Successful edit

- **WHEN** the user changes description, due date, and/or priority of an existing task and saves valid values
- **THEN** the list MUST reflect the updated values for that task

#### Scenario: Edit with empty description rejected

- **WHEN** the user clears the description (or leaves only whitespace) while editing and attempts to save
- **THEN** the system MUST NOT apply the update and MUST show a validation error

### Requirement: Delete task

The system SHALL allow the user to delete an existing task from the list.

#### Scenario: Delete one task

- **WHEN** the user deletes a task
- **THEN** that task MUST disappear from the list and MUST NOT reappear after a page reload if persistence is intact

#### Scenario: Delete last remaining task

- **WHEN** the user deletes the only remaining task
- **THEN** the list MUST become empty and the empty state MUST be shown

### Requirement: Toggle completion state

The system SHALL allow the user to mark a pending task as completed and to revert a completed task to pending.

#### Scenario: Mark as completed

- **WHEN** the user marks a pending task as completed
- **THEN** the task MUST be recorded as completed and MUST remain in the list

#### Scenario: Unmark completed task

- **WHEN** the user marks a completed task as pending again
- **THEN** the task MUST be recorded as not completed

### Requirement: Visual distinction for completed tasks

The system SHALL visually distinguish completed tasks from pending ones in the list.

#### Scenario: Completed task looks different

- **WHEN** at least one completed and one pending task are visible in the list
- **THEN** completed tasks MUST be visually distinguishable from pending tasks (e.g. strikethrough, muted style, or equivalent)

### Requirement: Default sort by priority

The system SHALL sort the task list by priority by default: high first, then medium, then low. Tasks with the same priority MUST keep a stable secondary order (e.g. by creation time ascending).

#### Scenario: Mixed priorities ordered

- **WHEN** the list contains tasks of different priorities
- **THEN** all high-priority tasks MUST appear before medium, and medium before low

#### Scenario: Same priority stable order

- **WHEN** multiple tasks share the same priority
- **THEN** their relative order MUST be stable according to the secondary sort key (creation order)

### Requirement: Persist tasks in localStorage

The system SHALL persist tasks in the browser `localStorage` so they remain available after a full page reload, without a backend.

#### Scenario: Data survives reload

- **WHEN** the user has created or modified tasks and then reloads the page
- **THEN** the system MUST restore those tasks with the same description, due date, priority, and completion state

#### Scenario: Corrupt storage handled safely

- **WHEN** `localStorage` contains corrupt or unparseable task data
- **THEN** the system MUST NOT crash and MUST present an empty or recovered usable list

### Requirement: List tasks on load

The system SHALL list all registered tasks when the application loads.

#### Scenario: Existing tasks shown on load

- **WHEN** the application loads and persisted tasks exist
- **THEN** all of those tasks MUST be listed (subject to sort rules)

#### Scenario: Empty list when no tasks

- **WHEN** the application loads and there are no tasks
- **THEN** the system MUST show an empty list state
