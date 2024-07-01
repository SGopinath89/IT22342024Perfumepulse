<a name="readme-top"></a>
<div align="center">
  <h1 align="center">PerfumePulse Ecommerce Store</h1>

  <p align="center">
PerfumePulse is a comprehensive platform designed to provide users to buy perfumes with detailed information about various perfumes. This project aims to help users find,buy and review perfumes, discover new fragrances, and manage their perfume collections effectively.
    <br />
    <a href="https://documenter.getpostman.com/view/34113703/2sA3dviXbE#b5908938-a70f-4926-b3f5-831320657a10"><strong>Explore the API docs »</strong></a> 
    <br />
    <br />
  
  </p>
</div>

## Purpose

The purpose of this project is to create an extensive perfume management system that allows users to explore, review, and manage perfumes. By providing a single platform for perfume enthusiasts, the project aims to enhance user experience and engagement in the world of fragrances.

## Features

- **User Management:** Manage user accounts and profiles.
- **Perfume Catalog:**  Browse and search for perfumes.
- **Review System:** Add and manage reviews for perfumes.
- **Wishlist Management:** Create and manage a wishlist of desired perfumes.
- **Collection Management:** Track owned perfumes and manage your collection.
- **Rating System:** Rate perfumes based on personal preference.
- **Comment Management:** Add and manage comments on perfumes.
- **Category Management:** Categorize perfumes for better organization.
- **Search Functionality:** Search for perfumes by name, brand, or category.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technology Stack

### Server Side

- **Node.js:** JavaScript runtime for running the backend server.
- **Express.js:** Web application framework for building the backend API.
- **MongoDB:** NoSQL database for storing perfume-related data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
- **bcryptjs:** Library for hashing passwords.
- **jsonwebtoken:** For secure authentication using JSON Web Tokens.
- **cors:** Middleware for enabling CORS (Cross-Origin Resource Sharing).
- **dotenv:** Module for loading environment variables from a `.env` file.
- **nodemon:** Tool for automatically restarting the server during development.

### Client Side

- **React:** JavaScript library for building user interfaces.
- **Redux:** State management library.
- **@reduxjs/toolkit:** Official, recommended way to write Redux logic.
- **styled-components:** Library for styling React components.
- **material-ui:** React components for faster and easier web development.
- **axios:** Promise-based HTTP client for making requests.
- **react-router:** Declarative routing for React applications.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Step-by-Step Guide to Run PurfumePulse

### Prerequisites

- Download Node.js [here](https://nodejs.org/en/download/)
- For the database, you can use local MongoDB or MongoDB Atlas. See [here](https://www.mongodb.com/)
- For backend testing, use Postman [here](https://www.postman.com/downloads/)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/SGopinath89/IT22342024Perfumepulse.git
    ```

2. Navigate to the Project Directory:

    ```sh
    cd IT22342024Perfumepulse
    ```

3. Open two Command terminals.

4. In the first terminal, navigate to the backend directory and install packages:

    ```sh
    cd backend
    npm install
    ```

5. Create a `.env` file in the backend directory similar to `.env.example` and enter the required variables:

    ```env
    MONGODB_URI="mongodb://localhost:27017/mydb"
    PORT=3000
    JWT_SECRET=mysecretkey
    TOKEN_EXPIRE_TIME=xh
    ```

    **To generate the `JWT_SECRET`, use the following command:**

    ```sh
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```

6. Start the backend server:

    ```sh
    npm run start
    ```

7. Switch to the second terminal. Navigate to the frontend directory and install packages:

    ```sh
    cd frontend
    npm install --force
    ```

    **Note:** `--force` is required to install the packages. Ignore the Vulnerabilities Warning.

8. Create a `.env` file in the frontend directory similar to `.env.example` and enter the required variables:

    ```env
    REACT_APP_BACKEND_URL=http://localhost:port
    ```

    **Note:** Replace `port` with the backend server port number.

9. Start the client:

    ```sh
    npm run start
    ```

10. Switch to the third terminal. Navigate to the admin directory and install packages:

    ```sh
     cd Admin
     npm install
    ```

11. CCreate a .env file in the admin directory similar to .env.example and enter the required variables:

    ```env
    REACT_APP_BACKEND_URL=http://localhost:port
    ```
12. Start the admin client:

    ```sh
    npm run dev
    ```


  

This command will start the server, and you can access the application at `http://localhost:3000`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Conclusion

PerfumePulse is designed to provide a seamless and engaging experience for perfume enthusiasts. By following the steps above, you can set up and run PerfumePulse on your local machine and start exploring and managing your perfume collection.

For more details, check out the  **PurfumePulseDocumentation** [here]().
