# Starfish sso-app
The Starfish SSO Configuration Checker is a web-based application that allows users to validate and test their Single Sign-On (SSO) configurations. It's designed with simplicity and user-friendliness in mind, featuring an intuitive interface for inputting necessary SSO credentials and details.

* The application sports a clean and straightforward user interface, with a focus on ease of use.
* It includes input fields for Public API endpoint, Console redirect URL, Public API token, User email, and User name.
* There's a 'Generate Login Link' button to initiate the SSO configuration test.

Live Demo: https://sso-app.starfish.ws

## How to Use the Starfish SSO Application

Follow these steps to set up and run the Starfish SSO Application on your local machine:

### 1. Fork the Repository (Optional)
Forking the repository allows you to have your own copy of the project on GitHub. This is optional but recommended if you plan to make custom changes.

### 2. Clone the Repository
Clone the repository to your local machine. Open your terminal (Command Prompt or Git Bash), and run the following command:

```bash
git clone https://github.com/starfish-ws/sso-app.git
```
This command downloads the repository's files to your computer.

### 3. Install Dependencies
   Navigate to the `client` directory within the cloned repository, and install the necessary dependencies:

```bash
cd sso-app/client  # Navigate to the client directory
npm install        # Install dependencies
```

This step ensures that all the required JavaScript packages for the client-side application are correctly installed.

### 4. Run the Application
```bash
npm run dev
```

### 5. Access the Application
   Once the application is running, open your web browser and visit: http://localhost:3333/

### Enjoy the Application!
You're all set! The Starfish SSO Application should now be running on your local machine. Test the SSO configuration, validate your settings, and explore the application's features.

### Additional Notes:
* Ensure you have `git` and `npm` installed on your machine before starting.
* If you encounter any issues during the setup, check the package.json for any specific project setup commands or refer to the project's documentation.

