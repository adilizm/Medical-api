## API Routes

### List all doctors
**GET** `/api/doctors`

### Check a doctor's availability
**GET** `/api/doctors/{doctorId}/availability?date=YYYY-MM-DD`
- Returns available time slots for the given doctor and date.

### Book an appointment
**POST** `/api/appointments`
**Body:**
```json
{
	"doctor_id": 1,
	"patient_name": "John Doe",
	"appointment_time": "2026-02-18 09:00:00"
}
```
---
## Medical Appointment API - Setup Guide

### 1. Clone the repository

```bash
git clone <repo-url>
cd Medical-Appointment-API/Medical-api
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Configure environment

Rename the example environment file and update your database credentials as needed:

```bash
cp .env.example .env
# or (on Linux/macOS): mv .env.example .env
```
Edit `.env` and set your database connection info (DB_DATABASE, DB_USERNAME, DB_PASSWORD).

### 4. Create the database

Create a MySQL database named `medical_apointment_api` (or your preferred name, but match it in `.env`).

### 5. Run database migrations

```bash
php artisan migrate
```

### 6. Seed the database

```bash
php artisan db:seed
```
30 doctor will be created 
### 7. Start the backend server

```bash
php artisan serve
# or specify a port: php artisan serve --port=8000
```

### 8. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on http://localhost:5173 (default Vite port).

---

**Tips:**
- Make sure DB server is running and accessible.
- If you change the database name or credentials, update `.env` accordingly.
- For Windows, use `copy` instead of `cp` if needed.
- For API testing, use Postman or curl (see API docs or code for endpoints).

---
**Enjoy building your Medical Appointment system!**
