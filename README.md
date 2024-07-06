<a name="readme-top"></a>
<div align="center">
  <h1 align="center">PerfumePulse E-commerce Store</h1>

  <p align="center">
    PerfumePulse is a comprehensive platform designed to provide users with detailed information about various perfumes, helping them find, buy, and review perfumes, discover new fragrances, and manage their perfume collections effectively.
    <br />
    <a href="https://documenter.getpostman.com/view/34113703/2sA3dviXbE#b5908938-a70f-4926-b3f5-831320657a10"><strong>Explore the API docs »</strong></a>
    <br />
    <br />
  </p>
</div>

## Table of Contents

- [Purpose](#purpose)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Purpose

The purpose of this project is to create an extensive perfume management system that allows users to explore, review, and manage perfumes. By providing a single platform for perfume enthusiasts, the project aims to enhance user experience and engagement in the world of fragrances.

## Features

- **User Management:** Manage user accounts and profiles.
- **Perfume Catalog:** Browse and search for perfumes.
- **Review System:** Add and manage reviews for perfumes.
- **Wishlist Management:** Create and manage a wishlist of desired perfumes.
- **Collection Management:** Track owned perfumes and manage your collection.
- **Rating System:** Rate perfumes based on personal preference.
- **Comment Management:** Add and manage comments on perfumes.
- **Category Management:** Categorize perfumes for better organization.
- **Search Functionality:** Search for perfumes by name, brand, or category.
- **User Friendly Design:** Users can easily explore new perfume collections and popular perfumes.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technology Stack

### Server Side

- **Node.js:** JavaScript runtime for running the backend server.
- **Express.js:** Web application framework for building the backend API.
- **MongoDB:** NoSQL database for storing perfume-related data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
- **bcryptjs:** Library for hashing passwords.
- **jsonwebtoken:** For secure authentication using JWT.
- **axios:** Promise-based HTTP client for making API requests.
- **body-parser:** Middleware for parsing request bodies.
- **cors:** Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv:** Module for loading environment variables from a .env file.
- **morgan:** HTTP request logger middleware.
- **multer:** Middleware for handling multipart/form-data, used for file uploads.
- **nodemon:** Tool for automatically restarting the node application when file changes are detected.

### Client Side

- **React.js:** JavaScript library for building user interfaces.
- **Redux:** State management library for React applications.
- **Axios:** Promise-based HTTP client for making API requests.
- **react-dom:** Package for working with the DOM.
- **react-router-dom:** Library for routing in React applications.
- **react-toastify:** Library for displaying toast notifications.
- **react-typical:** Library for creating typing animations.
- **sweetalert2:** Library for creating beautiful, responsive, customizable, and accessible (WAI-ARIA )replacement for JavaScript's popup boxes.
- **react-chat-engine-pretty:** Pretty chat engine components for React.

### Admin Panel

- **React.js:** JavaScript library for building user interfaces.
- **Redux:** State management library for React applications.
- **Material-UI:** React components for faster and easier web development.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:

    ```sh
    git clone https://github.com/SGopinath89/IT22342024Perfumepulse.git
    ```

2. Navigate to the project directory:

    ```sh
    cd IT22342024Perfumepulse
    ```

3. Install dependencies for the backend:

    ```sh
    cd Backend
    npm install
    ```

4. Create a `.env` file in the backend directory similar to `.env.example` and enter the required variables:

    ```env
    CONNECTION_STRING="mongodb://localhost:27017/mydb"
    PORT=5000
    secret=mysecretkey
    API_URL = /api/v1
    TOKEN_EXPIRE_TIME=xh
    ```

5. Start the backend server:

    ```sh
    npm start
    ```

6. Open a new terminal. Navigate to the frontend directory and install packages:

    ```sh
    cd ../Frontend/my-app
    npm install --force
    ```

    **Note:** `--force` is required to install the packages. Ignore the Vulnerabilities Warning.


7. Start the client:

    ```sh
    npm start
    ```

8. Open another terminal. Navigate to the admin directory and install packages:

    ```sh
    cd ../Admin
    npm install
    ```


9. Start the admin client:

    ```sh
    npm run dev
    ```

This command will start the server, and you can access the application at `http://localhost:5173`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Once the setup is complete, you can start using the PerfumePulse platform to explore, review, and manage perfumes. You can access the API documentation [here](https://documenter.getpostman.com/view/34113703/2sA3dviXbE#b5908938-a70f-4926-b3f5-831320657a10) for detailed information about the available endpoints.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Project Link: [https://github.com/SGopinath89/IT22342024Perfumepulse.git](https://github.com/SGopinath89/IT22342024Perfumepulse.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
