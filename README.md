
---


# QueueCare Appointment System

A clinic appointment system built with **Node.js/Express**, **MongoDB**, **React**, and **Playwright** for end-to-end UI automation.

---

## Prerequisites

Ensure the following are installed on your system:

- Node.js v18 or higher  
- npm v9 or higher  
- MongoDB (local installation)  
- MongoDB Compass (optional, for GUI database management)  
- Browsers: Chromium, Firefox, WebKit (installed automatically by Playwright)

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd QueueCare

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
````

---

## Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
MONGO_URI=mongodb://localhost:27017/queuecare
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Description

* `MONGO_URI`: MongoDB connection string
* `JWT_SECRET`: Secret key for JWT authentication
* `PORT`: Backend server port (default: 5000)

---

## Starting the Application

### 1. Start MongoDB

* Ensure MongoDB is running locally
* (Optional) Open MongoDB Compass and connect to:
  `mongodb://localhost:27017`
* Create a database named `queuecare`

---

### 2. Start Backend

```bash
cd backend
node server.js
```

Expected output:

```
MongoDB connected
Server running on port 5000
```

---

### 3. Start Frontend

```bash
cd frontend
npm start
```

Open your browser and visit:
[http://localhost:3000](http://localhost:3000)

---

## Running API Tests

Use Postman, curl, or similar tools to test endpoints:

* **Register**
  `POST /api/auth/register`

* **Login**
  `POST /api/auth/login`

* **Create Appointment**
  `POST /api/appointments`

* **Update Appointment**
  `PUT /api/appointments/:id`

* **Cancel Appointment**
  `DELETE /api/appointments/:id`

* **Mark as Served (Staff only)**
  `PUT /api/appointments/:id/serve`

---

## Running UI Tests

Playwright is configured in:

```
frontend/playwright.config.js
```

### Run Tests

```bash
cd frontend
npx playwright test
```

---

## View Test Report

```bash
npx playwright show-report
```

---

## Screenshots & Reports

* Screenshots are captured for all tests
* Video recording is disabled
* Reports and screenshots are saved in:
  `frontend/playwright-report/`

---

## Default Test Credentials

Create these users manually (via API or MongoDB Compass) before running tests:

### Patient

* Email: `alice@patience.com`
* Password: `password123`
* Role: `patient`

### Staff

* Email: `sarah@staff.com`
* Password: `staff123`
* Role: `staff`

---

## Automated Test Coverage

Playwright tests include:

* User login (valid, invalid, empty inputs)
* Appointment creation
* Appointment listing
* Form validation (empty fields, invalid dates)
* Staff marking appointments as served

---

## Notes

* Ensure MongoDB, backend, and frontend are running before executing tests
* Use MongoDB Compass to verify stored data if needed
* If tests fail due to missing users, create the default test accounts first

---

