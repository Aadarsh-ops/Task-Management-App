# Project Name
Realtime Task Management App

The Realtime Task Management App is a powerful and user-friendly web application built using Angular for the frontend and Firebase for the backend. This app aims to streamline task management and collaboration for individuals and teams, offering a seamless real-time experience.

## Table of Contents
- [Tasks](#tasks)
- [Libraries Used](#libraries-used)
- [How to Run the Project](#how-to-run-the-project)

- [Approach](#approach)
  - [Technology Stack Selection](#technology-stack-selection)
  - [User Authentication](#user-authentication)
  - [Angular TypeScript Enhancements](#angular-typescript-enhancements)
  - [Firebase Configuration](#firebase-configuration)
  - [Create Components](#create-components)
  - [Routing](#routing)
  - [User Service](#user-service)
  - [Database Configuration](#database-configuration)
  - [CRUD Operations](#crud-operations)
  - [Task Components](#task-components)
  - [Task Filtering and Sorting](#task-filtering-and-sorting)
  - [Form Validation](#form-validation)
  - [Google Maps Integration](#google-maps-integration)
  - [Bug Fixing and Testing](#bug-fixing-and-testing)
  - [Code Quality Check](#code-quality-check)
  - [Version Control](#version-control)



## Tasks
The following tasks have been completed in this project:

1. Setup project in Firebase.
2. User authentication.
3. Task dashboard.
4. Task creation.
5. Task modification and task deletion.
6. Real-time updates.
7. Task filtering and sorting.
8. Task detailed view.
9. Error handling and validations.
10. Maps-task synchronization.
11. Hosting and Development.

## Libraries Used
This project utilizes the following libraries:

- Angular Material: Used for UI components.
- Google Maps for Angular: Used for integrating Google Maps into the project.
- Firebase: Used for authentication and data storage.

To install the required libraries, run the following command:

## How to Run the Project
Follow these steps to run the project locally:

1. Clone the repository.
2. Install the necessary dependencies by running the following command: npm install
3. Set up your Firebase project and obtain the necessary configuration details.
4. Add the Firebase configuration to the project.
5. Run the development server: ng serve
6. Open your web browser and navigate to `http://localhost:4200` to view the project.




## Approach

The approach for the Realtime Task Management App project is outlined below:

### Technology Stack Selection
- Choose Firebase for datastore and Firebase Authentication.
- Opt for Angular for UI development.

### User Authentication
- Implement sign-in functionality using username/password.
- Enable sign-up with email/password.
- Add a feature for recovering forgotten passwords.
- Implement email verification for newly registered users.
- Protect inner pages routes using CanActivate guard to ensure authorized access.
- Restrict access for non-authenticated users.
- Manage the logged-in state of Firebase users with LocalStorage.

### Angular TypeScript Enhancements
- Remove Angular TypeScript errors like "dot" (obj.key) syntax and "indexed" (obj["key"]).

### Firebase Configuration
- Set up Firebase packages.
- Create an environment for Firebase configuration.

### Create Components
- Develop the following components: dashboard, sign-in (for username/password), sign-up (for email/password), forgot-password, and verify-email.

### Routing
- Set up routing for different components.

### User Service
- Create a user service to handle forgot password, sign-in, sign-up, email verification, and sign-out functionalities.

### Database Configuration
- Set up the Firebase database.

### CRUD Operations
- Implement CRUD operations for Firebase to manage tasks.
- Enable real-time data synchronization across all devices.

### Task Components
- Develop components for adding tasks, editing tasks, and displaying the task list.

### Task Filtering and Sorting
- Implement filtering based on task status.
- Enable sorting based on the date of the tasks.

### Form Validation
- Apply error handling and validation for forms.

### Google Maps Integration
- Allow users to attach locations to tasks using Google Maps integration.
- Implement markers on the map to show attached locations for all tasks.
- Add an option to view the location of a specific task on the map.

### Bug Fixing and Testing
- Thoroughly test the application for any bugs or issues.
- Fix identified bugs.

### Code Quality Check
- Review and ensure high-quality code.

### Version Control
- Push all the code to GitHub for version control.

### Deployment
- Use Hub CLI for hosting the project.




