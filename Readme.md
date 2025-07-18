# 🛠️ CastHandasa Server

This is the backend API server for the CastHandasa application — a platform for managing theater competitions, tournaments, and rewards. The backend is built using **Node.js**, **Express**, and **TypeScript**, and connects to an **Azure SQL Database** using **mssql**.

### 🌐 Live API Endpoint

[https://casthandasaserver-production.up.railway.app](https://casthandasaserver-production.up.railway.app)

---

## 📁 Project Structure:

    ```bash
    castHandasaServer/
    │
    ├── src/
    │   ├── controllers/        # Contains all route handler logic
    │   ├── routes/             # API route definitions
    │   ├── db/                 # Database connection logic
    │   ├── index.ts            # Entry point of the app
    │   └── config.ts           # Configuration and setup files
    ├── .env                    # Environment variables file (not committed)
    ├── tsconfig.json           # TypeScript compiler options
    ├── Dockerfile              # Docker image definition
    └── package.json            # Project metadata and dependencies
    ```

---

## 🚀 Features

- 🧾 RESTful API endpoints
- 🛡️ CORS enabled
- ⚙️ Azure SQL integration
- 🐳 Docker support
- 🏗️ MVC-style folder organization

---

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MSSQL (Azure SQL Database)**
- **dotenv** for environment config
- **cors**, **helmet**, and other middlewares

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_SERVER=your_azure_server.database.windows.net
DB_DATABASE=your_db_name
PORT=5050
```

---

## ⚒️ Sample Endpoints

    ```bash
    GET    /tournaments          # List all tournaments
    POST   /tournaments          # Create a new tournament
    GET    /rewards              # Get all rewards
    POST   /rewards              # Add a new reward
    ```

---

## 🐳 Docker Usage:

    ```bash
    docker build -t casthandasa-server .

    docker run -p 5050:5050 casthandasa-server
    ```

---

## 🔍 Future Improvements

- Add Swagger documentation

- Unit tests with Jest

- Logging with Winston or Morgan

- Authentication & authorization (JWT)

---

## 🧑‍💻 Author

Developed and maintained by [George Geham](https://github.com/georgegeham)  
Feel free to connect or contribute!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

You are free to use, modify, and distribute this software with attribution. See the [LICENSE](LICENSE) file for full details.
