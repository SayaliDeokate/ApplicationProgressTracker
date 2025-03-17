Application Progress Tracker
This React-based web application is designed to manage progress statuses and applications. It allows users to view, create, and edit progress statuses and applications with an intuitive UI. The app integrates with an API to perform CRUD operations, displaying data in tabular format using ag-grid-react and providing smooth navigation using react-router-dom.


Features

•	View Progress Status List: Display a list of progress statuses, which can be filtered by active status.

•	Create and Edit Progress Status: Add new progress statuses and update existing ones.

•	View Application List: Display a list of applications, their statuses, and relevant details.

•	Create and Edit Application: Add new applications and update existing ones.

•	User-Friendly Navigation: Seamless navigation between pages using React Router.

•	Real-Time Data: Fetch and display data from the backend API dynamically.

•	Responsive UI: The app uses reactstrap for responsive and stylish UI components.


Technologies Used

•	React: Front-end framework to build interactive user interfaces.

•	React-Router-Dom: For routing and navigation between components.

•	Reactstrap: UI component library for responsive design.

•	ag-Grid-React: For displaying tabular data with sorting, filtering, and pagination.

•	CSS: Custom styling for the components and layout.
________________________________________
Components

1. ProgressStatusList.js
   
This component is responsible for displaying the list of progress statuses in a table format using ag-grid-react. It fetches the data from the backend API and displays it in a grid. Users can filter the displayed statuses by their active status, and clicking a row will navigate the user to the relevant page to either view or edit the progress status.


Key Functionality:

•	Fetches progress status data from the API and populates the table.

•	Filters the table to show only active progress statuses.

•	Displays progress statuses in a sortable, filterable grid.

•	Provides a button to navigate to the "Create New Progress Status" page.

•	Allows users to edit or view individual progress statuses by clicking on a row.
________________________________________
2. AddEditProgressStatus.js
   
This component handles the creation and editing of progress statuses. It is used to add new progress statuses or edit existing ones. The form collects input data such as the name and active status of the progress status, and then it communicates with the backend API to save the data.


Key Functionality:

•	Displays a form for adding or editing progress statuses.

•	Fetches existing progress status data when in edit mode.

•	Sends form data to the API to create or update progress status.

•	Displays success or error messages after the form submission.

•	Handles checkbox to mark the progress status as active.
________________________________________
3. ApplicationList.js
   
This component displays a list of applications. Like the ProgressStatusList component, it fetches data from the backend API and displays the application details in a table format using ag-grid-react. It allows users to view, edit, and manage each application's status.


Key Functionality:

•	Fetches application data from the API and populates the table.

•	Displays the application details in a grid with filtering and sorting capabilities.

•	Provides options to edit application details by clicking a row.

•	Filters application data based on criteria such as the application status.
________________________________________
4. AddEditApplication.js
   
This component is used to add new applications or edit existing ones. It provides a form where users can enter or modify application details, including the application name, status, and other relevant information. The component communicates with the backend API to save the new or updated application.


Key Functionality:

•	Displays a form for adding or editing applications.

•	Allows users to fill out details such as application name, status, etc.

•	Send the form data to the backend API to create or update the application.

•	Displays success or error messages based on the result of the API request.

•	Handles form validation and manages the submission state.
________________________________________
5. Home.js
   
The Home.js component serves as the application's landing page. It displays a welcome message and provides navigation links to other parts of the application, such as the list of progress statuses and applications. This page is an entry point to the app's main features.


Key Functionality:

•	Displays a welcome message and brief instructions for the app.

•	Provides navigation buttons that direct users to the ProgressStatusList and ApplicationList pages.

•	Simple, clean design to serve as the first point of contact for the user.
________________________________________
API Endpoints


The following API endpoints are used for managing Progress Status and Application data:


Progress Status Endpoints:

1.	GET /api/progressStatus: Fetches all progress statuses.
2.	GET /api/progressStatus/{id}: Fetches a single progress status by its ID.
3.	POST /api/progressStatus: Creates a new progress status.
4.	PUT /api/progressStatus/{id}: Updates an existing progress status by its ID.
________________________________________
Application Endpoints:

1.	GET /api/application: Fetches all applications.
2.	GET /api/application/{id}: Fetches a single application by its ID.
3.	POST /api/application: Creates a new application.
4.	PUT /api/application/{id}: Updates an existing application by its ID.
________________________________________

Setup Instructions

1. Clone the Repository
2. Install Dependencies
3. Start the Development Server
4. Backend API
________________________________________
Folder Structure

•	components/: Contains all the components like ProgressStatusList.js, AddEditProgressStatus.js, ApplicationList.js, AddEditApplication.js, and Home.js.

•	SharedComponents/: Includes shared UI components like the GoBack.js component.

•	custom.css: Custom CSS file for styling the application.
________________________________________
Contribution

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request with your changes. Be sure to follow the project's coding standards and include tests where applicable.
________________________________________
License

This project is licensed under the MIT License - see the LICENSE file for details.
________________________________________
This README provides an overview of the application, including details on the API endpoints, data table schema, and the functionality of each component in your project. Let me know if you need any further adjustments!

