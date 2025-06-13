# ☕ CafeteriaESPEVG API

Backend API for managing cafeteria orders (`comandes`), items, menus, and product data using **FastAPI**, **PostgreSQL**, and **SQLAlchemy**.

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── crud/             # Database interaction logic
│   ├── models/           # SQLAlchemy models
│   ├── routes/           # FastAPI route definitions
│   ├── schemas/          # Pydantic schemas and data validation
│   ├── config.py         # Optional configuration
│   ├── database.py       # DB connection setup
│   └── main.py           # Application entry point
├── requirements.txt      # Python dependencies
├── README.md             # This file
└── .gitignore
```

---

## 🚀 Getting Started

### ✅ Prerequisites

* Python 3.10 or higher
* PostgreSQL database
* `virtualenv` (recommended)

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/CafeteriaESPEVG.git
cd CafeteriaESPEVG/backend
```

---

### 2. Set up a virtual environment

```bash
python -m venv venv
source venv/bin/activate       # On Windows: venv\Scripts\activate
```

---

### 3. Install the requirements

```bash
pip install -r requirements.txt
```

If `requirements.txt` is missing, install manually:

```bash
pip install fastapi uvicorn[standard] sqlalchemy databases psycopg2-binary pydantic python-dotenv
```

---

### 4. Configure environment (optional)

If you're using environment variables, create a `.env` file in `app/` or root directory with:

```env
DATABASE_URL=postgresql://user:password@localhost/dbname
```

Ensure `database.py` uses this variable with something like:

```python
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
```

---

### 5. Start the API server

```bash
uvicorn app.main:app --reload
```

This will start the server at:

```
http://127.0.0.1:8000
```

---

## 📬 API Docs

Interactive documentation is automatically available at:

* Swagger: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* ReDoc: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## 🧪 Testing the API

You can use `curl`, Postman, or the Swagger UI to test endpoints.

Example `curl`:

```bash
curl -X GET http://localhost:8000/items/ -H "accept: application/json"
```

---

Here are the corresponding `curl` commands to test the API endpoints shown in your logs. You can include these examples in your `README.md` to guide users on how to interact with the API.

---

### 📦 **Get All Item-Productes**

**Endpoint:**

```http
GET /item_productes/
```

**Curl:**

```bash
curl -X GET "http://localhost:8000/item_productes/" -H "accept: application/json"
```

---

### 🛒 **Get All Items**

**Endpoint:**

```http
GET /items/
```

**Curl:**

```bash
curl -X GET "http://localhost:8000/items/" -H "accept: application/json"
```

---

### 📋 **Get All Comandes**

**Endpoint:**

```http
GET /comandes/
```

**Curl:**

```bash
curl -X GET "http://localhost:8000/comandes/" -H "accept: application/json"
```

---
