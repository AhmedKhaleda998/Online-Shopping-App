# Online Shopping App - Node.js Application

Welcome to the Online Shopping App README! This Node.js application is an online shopping platform that allows users to browse, add, update, delete, and view products. Additionally, users can register and log in using sessions for a personalized experience. They can add products to their cart, place orders, and make payments using credit cards through the Stripe third-party service. Each order is associated with an invoice PDF file and stored for each user. The application uses validation and authentication with Express Validator and supports MongoDB as the database, utilizing Mongoose and EJS to render HTML from the server-side.

<br>

## Getting Started
Prerequisites
To run this application locally, you'll need the following installed on your system:

* Node.js
* npm (Node Package Manager, included with Node.js)
* MongoDB (Make sure MongoDB is installed and running)

<br>

## Installation
1. Clone the repository to your local machine: git clone https://github.com/your_username/online-shopping-app.git
2. Change into the project directory: cd online-shopping-app
3. Install the required npm packages: npm install
4. Set up environment variables: MONGODB_URI=your_mongodb_connection_string_here STRIPE_SECRET_KEY=your_stripe_secret_key_here SESSION_SECRET=your_session_secret_here      Make sure to replace the placeholders with your actual MongoDB URI, Stripe Secret Key, and a secret key for the session.
5. Run the application: npm start
The application will be accessible at http://localhost:5200.

<br>

## Usage
Once the application is running, you can access it through your web browser at http://localhost:5200. Here are the main features:

* Register: Users can create a new account to access the shopping platform.
* Login: Existing users can log in to their accounts using their credentials.
* Browse Products: Users can view the available products and their details.
* Add to Cart: Users can add products to their cart for later purchase.
* Update/Delete Products: Admins can update or delete existing products from the system.
* Place Order: Users can place orders for the products in their cart.
* Payment: Users can pay for their orders using credit cards through the Stripe service.
* Invoice: Each order will generate an invoice PDF file for download.
* Order History: Users can view their past orders and order details.

<br>

## Features
* User Registration and Authentication
* Session-based User Login
* Product Management (CRUD)
* Shopping Cart Functionality
* Order Placement and Payment Integration with Stripe
* Invoice Generation for Orders
* Order History and Tracking

<br>

## Dependencies
This application relies on the following main dependencies (refer to package.json for the full list):

* <b>Express.js:</b> Web application framework
* <b>Mongoose:</b> MongoDB object modeling tool
* <b>EJS:</b> Templating engine for rendering views
* <b>Express Session:</b> Session management for Express
* <b>Express Validator:</b> Middleware for request validation
* <b>Stripe:</b> Integration for handling payments with Stripe
* <b>Multer:</b> Middleware for handling file uploads
* <b>PDFKit:</b> Generation of PDF invoices
* <b>Bcrypt:</b> Password hashing for user authentication

<br>


### Thank you for using the Online Shopping App! If you have any questions or need further assistance, please don't hesitate to contact us. Happy shopping! 🛍️
