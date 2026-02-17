# KU Investment Club (KIC)

A web application for the KU Investment Club, featuring stock tracking, portfolio management, and educational resources.

## Prerequisites

Before running the application, ensure you have the following installed:

- **Docker & Docker Compose** (Recommended for easiest setup)
- **Go** (v1.22 or later) - for manual backend run
- **Node.js** (v18 or later) & **npm** - for manual frontend run
- **PostgreSQL** - for manual database setup

## 🚀 Quick Start (Docker)

The easiest way to run the entire application (Frontend + Backend + Database) is using Docker Compose.

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the project root**:
    ```bash
    cd /path/to/KU-Investment-Club
    ```
3.  **Start the services**:
    ```bash
    docker-compose up --build
    ```
4.  **Access the application**:
    - **Frontend**: [http://localhost:3000](http://localhost:3000)
    - **Backend API**: [http://localhost:8080](http://localhost:8080)
    - **PgAdmin** (Database GUI): [http://localhost:5050](http://localhost:5050)
        - *Email*: `admin@admin.com`
        - *Password*: `admin123`

## 🛠️ Manual Setup

If you prefer to run services individually or for development:

### 1. Database (PostgreSQL)

Ensure you have a PostgreSQL database running. You can use the docker container for just the DB:

```bash
docker-compose up -d db
```

Or use your local PostgreSQL installation. Make sure to create a database named `kic-db` and update the `.env` variables in `backend/.env` accordingly.

### 2. Backend (Go)

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```
2.  **Install dependencies**:
    ```bash
    go mod download
    ```
3.  **Run the server**:
    ```bash
    go run main.go
    ```
    The server will start on port `8080`.

### 3. Frontend (React + Vite)

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The frontend will start on [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

- `frontend/`: React application with Vite.
- `backend/`: Go (Fiber) API server.
- `docker-compose.yml`: Docker services configuration.
