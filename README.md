# IntershipProjectNodeJS
Setup Instructions
Prerequisites
Node.js:
Ensure you have Node.js (version 14 or higher) installed. Download it from Node.js Official Website.
MongoDB:
Install MongoDB and ensure it's running locally on MongoDB Compass
Environment Variables:
Create a .env file in the project root and configure the following:
      4.  swagger ui for displaying the API’s on frontend
API Usage Guide
This section documents the available API endpoints, their functionalities, and example usage.
Available Endpoints
1. User Signup
Endpoint: POST /api/signup
Description: Allows users to sign up by providing their username, email, and password.
2. Email Confirmation
      Endpoint: /api/confirm-email/:token
      Method: GET
      Description: Confirms a user's email using the token provided in the confirmation link.

3. User Login
Endpoint: POST /api/login
Description: Allows users to log in by providing their email and password. If valid, the server generates and returns a JWT.
4. User Profile (Requires JWT Authorization)
Endpoint: GET /api/profile
Description: Retrieves the user’s profile information. This endpoint requires a valid JWT to be passed in the Authorization header.

