#  CRM Application

A **full-stack Customer Relationship Management (CRM) system** built with:

- **Frontend** → Next.js (React + Tailwind CSS)  
- **Backend** → Node.js + Express.js  
- **Database** → MongoDB (Mongoose ORM)  
- **Authentication** → JWT-based login with roles (`rep`, `manager`, `admin`)  

This project implements lead and opportunity management with dashboards for easy analysis.

---

##  Features

###  Authentication & Roles
- Register/Login with JWT-based authentication.
- Roles supported:
  - **Sales Rep** → Manage only their leads/opportunities.
  - **Manager** → See all team leads/opportunities.
  - **Admin** → Reserved for future scope.

### Leads Management
- Create, Read, Update, Delete (CRUD) leads.
- Fields: `name`, `email`, `mobile`, `value`, `status`.
- Status: `New | Contacted | Qualified`.
- Convert Lead → Opportunity.

###  Opportunities Management
- Auto-created from converted leads.
- Fields: `title`, `value`, `stage`, `leadId`, `ownerId`.
- Stages: `Discovery | Proposal | Won | Lost`.
- CRUD operations supported.

###  Dashboard (Manager View)
- Leads by Status → Pie chart.
- Opportunities by Stage → Bar chart.
- Quick overview of pipeline.

---

##  Project Structure

### Backend (`crm-backend`)
crm-backend/
│── src/
│ ├── controllers/ # Route handlers (auth, leads, opps, dashboard)
│ ├── models/ # Mongoose models (User, Lead, Opportunity)
│ ├── routes/ # API routes
│ ├── middleware/ # Auth, error handling
│ ├── config/ # DB connection
│ └── server.js # Entry point
│
├── package.json
└── .env


### Frontend (`crm-frontend`)
crm-frontend/
│── app/ # Next.js App Router
│ ├── login/ # Login page
│ ├── signup/ # Signup page
│ ├── leads/ # Leads page
│ ├── opportunities/ # Opportunities page
│ ├── dashboard/ # Charts and stats
│ └── page.js # Homepage
│
│── context/ # AuthContext (JWT storage & state)
│── lib/api.js # API helper (fetch wrapper)
│── styles/ # Tailwind setup
│
├── package.json
└── .env.local
------
## ⚙️ Installation & Setup

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas cluster (or local MongoDB)
- Vercel (Frontend deploy), Railway/Render (Backend deploy)

### 1️⃣ Backend Setup
```bash
# Clone repo
git clone https://github.com/your-org/crm-backend.git
cd crm-backend

# Install dependencies
npm install

# Create .env file
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/crm_Db
JWT_SECRET=yourSuperSecretKey
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Run backend
node server.js
-----
2️⃣ Frontend Setup
# Clone repo
git clone https://github.com/your-org/crm-frontend.git
cd crm-frontend

# Install dependencies
npm install

# Create .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000

# Run frontend
npm run dev
------

📡 API Endpoints
**Authentication**
--------------

POST /api/auth/signup → Register user

POST /api/auth/login → Login user

**Leads**
------

GET /api/leads → Get leads

POST /api/leads → Create lead

PUT /api/leads/:id → Update lead

DELETE /api/leads/:id → Delete lead

POST /api/leads/:id/convert → Convert lead to opportunity

**Opportunities**
----------------

GET /api/opportunities → Get opportunities

POST /api/opportunities → Create opportunity

PUT /api/opportunities/:id → Update opportunity

DELETE /api/opportunities/:id → Delete opportunity

**Dashboard**
------------

GET /api/dashboard/stats → Get summary (Leads by status, Opps by stage)

**Future Enhancements**
----------------------

Admin role & advanced access controls.

<img width="618" height="566" alt="Screenshot 2025-09-10 130700" src="https://github.com/user-attachments/assets/a442ad87-768c-4b96-8b3c-9ccfaf2a65d0" />
<img width="620" height="695" alt="Screenshot 2025-09-10 130649" src="https://github.com/user-attachments/assets/688a55cf-e6df-40f8-8a0d-9fc774fe5ed8" />
<img width="1777" height="635" alt="Screenshot 2025-09-10 130543" src="https://github.com/user-attachments/assets/393c3c48-d516-498b-9eda-8bbeec962eab" />
<img width="1899" height="794" alt="Screenshot 2025-09-10 111127" src="https://github.com/user-attachments/assets/317364b0-3ed9-4291-9c23-62a6b5b4246b" />
<img width="1908" height="788" alt="Screenshot 2025-09-10 111052" src="https://github.com/user-attachments/assets/295296f5-4b17-4044-ad1d-c6ff4b3d2938" />
<img width="1874" height="866" alt="Screenshot 2025-09-10 110902" src="https://github.com/user-attachments/assets/b480d92c-1e44-4448-9507-82549403748f" />
<img width="1871" height="856" alt="Screenshot 2025-09-10 110845" src="https://github.com/user-attachments/assets/78cf67d3-043b-4bc4-a763-1845b48f0a43" />
<img width="1912" height="740" alt="Screenshot 2025-09-10 110721" src="https://github.com/user-attachments/assets/e0bc90e0-2e3c-42b5-8356-6fa2f62c2d32" />

