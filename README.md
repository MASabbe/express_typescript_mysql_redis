# RESTful API ExpressJs MySql Redis

## Project Overview

This project is a RESTful API built using TypeScript, Express.js, MySQL, and Redis.

## Features

*   **TypeScript**: A superset of JavaScript that compiles to plain JavaScript.
*   **Express.js**: A popular Node.js web framework for building web applications.
*   **MySQL**: A relational database management system for storing and retrieving data.
*   **Redis**: An in-memory data store for caching and improving performance.

## Getting Started

### Prerequisites

*   Node.js (>= 14.17.0)
*   MySQL (>= 8.0.21)
*   Redis (>= 6.2.3)

### Installation

1.  Clone the repository: `git clone https://github.com/MASABBE/rest_expressJs_mysql_redis.git`
2.  Install dependencies: `npm install`
3.  Create a MySQL database and update the `config/database.js` file with your database credentials.
4.  Start the Redis server: `redis-server`
5.  Start the application: `npm start`

## API Endpoints

*   **GET /v1/users**: Retrieve a list of users
*   **GET /v1/users/:id**: Retrieve a user by ID
*   **POST /v1/users**: Create a new user
*   **PUT /v1/users/:id**: Update a user
*   **DELETE /v1/users/:id**: Delete a user

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please submit a pull request with your changes.

## Acknowledgments

*   [MASAbbe](https://github.com/MASABBE) - Project maintainer