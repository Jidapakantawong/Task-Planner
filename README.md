# Daily Task Planner

เว็บแอปพลิเคชันสำหรับวางแผนและจัดการงานประจำวันภายในองค์กร รองรับการจัดการงานผ่านมุมมองแบบปฏิทิน พร้อมระบบกำหนดสิทธิ์การใช้งานระหว่าง **พนักงาน (Employee)** และ **ผู้ดูแลระบบ (Admin)**

โครงการนี้พัฒนาขึ้นเพื่อใช้เป็นผลงานสำหรับการทดสอบตำแหน่ง **Computer Engineer Intern** ของ **Beconnected Network and Solution Co., Ltd.**

---

# Features

## Employee

- Login เข้าสู่ระบบ
- ดูงานของตนเอง
- เพิ่ม แก้ไข และลบงาน
- เปลี่ยนสถานะงาน (To Do / In Progress / Done)
- แสดงงานในรูปแบบ Calendar
- ดูประวัติการทำงานย้อนหลัง

## Admin

- Login เข้าสู่ระบบ
- ดูงานของพนักงานทั้งหมด
- กรองข้อมูลตามพนักงาน
- แสดงงานในรูปแบบ Calendar
- ดูประวัติการทำงานย้อนหลัง

---

# Tech Stack

## Frontend

- SvelteKit
- Tailwind CSS

## Backend

- SvelteKit Server
- Node.js

## Database

- MySQL

## Authentication

- Cookie Session Authentication

## Deployment

- Ubuntu
- Node.js

---

# Why This Tech Stack?

โปรเจกต์นี้เลือกใช้ **SvelteKit** เนื่องจากสามารถพัฒนา Frontend และ Backend ได้ภายใน Framework เดียว ช่วยลดความซับซ้อนของโครงสร้างโปรเจกต์ และเหมาะกับการพัฒนาภายในระยะเวลาที่จำกัด

สำหรับฝั่ง Backend ใช้ **Node.js** ซึ่งสามารถทำงานร่วมกับ SvelteKit ได้อย่างมีประสิทธิภาพ ส่วนฐานข้อมูลเลือกใช้ **MySQL** เนื่องจากเป็นฐานข้อมูลแบบ Relational Database ที่มีความเสถียร ใช้งานง่าย และเหมาะกับระบบจัดการข้อมูลทั่วไป

---

# Database

## User

| Field | Type |
|------|------|
| id | INT |
| username | VARCHAR(50) |
| password | VARCHAR(255) |
| name | VARCHAR(100) |
| role | ENUM('employee','admin') |

## Task

| Field | Type |
|------|------|
| id | INT |
| title | VARCHAR(255) |
| description | TEXT |
| status | ENUM('Todo','In Progress','Done') |
| start_date | DATE |
| user_id | INT |

---

# Installation

Clone Repository

```bash
git clone https://github.com/yourusername/daily-task-planner.git
```

เข้าสู่โฟลเดอร์โปรเจกต์

```bash
cd daily-task-planner
```

ติดตั้ง Dependencies

```bash
npm install
```

เริ่มต้น Development Server

```bash
npm run dev
```

Build สำหรับ Production

```bash
npm run build
```

Preview Production

```bash
npm run preview
```

---

# Default Accounts

## Admin

```
Username : admin1
Password : password111
```

## Employee

```
Username : emp01
Password : password222
```

---

# Deployment

ระบบถูกติดตั้งบน

- Ubuntu
- Node.js

---

# Completed Features

- Login Authentication
- Role-based Access Control
- Task Management (Create, Update, Delete)
- Calendar View
- Task Status Management
- Responsive User Interface
- MySQL Database Integration

---

# Incomplete Features

- Notification System
- Email Notification
- Task Comment
- Drag & Drop Calendar
- File Attachment

---

# Problems Encountered

- การจัดการ Session หลังจาก Login และ Logout
- การซิงโครไนซ์ Cookie ระหว่าง Client และ Server
- การตั้งค่า Environment สำหรับ Deployment

ปัญหาดังกล่าวได้รับการแก้ไขโดยการปรับปรุงการจัดการ Session, การตั้งค่า Cookie และการกำหนดค่า Environment ให้เหมาะสมกับสภาพแวดล้อมที่ใช้งานจริง

---

# Future Improvements

- Drag & Drop Task
- Notification System
- Task Priority
- Dashboard Analytics
- Team Statistics
- Dark Mode

---

# Project Structure

```text
TASK-PLANNER/
├── src/
│   ├── routes/
│   │   ├── task-admin/
│   │   │   └── +page.svelte
│   │   ├── task-users/
│   │   │   ├── +layout.server.js
│   │   │   ├── +layout.svelte
│   │   │   ├── +page.server.js
│   │   │   ├── +page.svelte
│   │   │   └── layout.css
│   │   ├── +page.server.js
│   │   └── +page.svelte
│   ├── app.d.ts
│   ├── app.html
│   └── hooks.server.js
├── static/
├── .env
├── .gitignore
├── .npmrc
├── jsconfig.json
├── package-lock.json
├── package.json
├── README.md
├── schema.sql
└── vite.config.js
```

---

# Author

**Jidapa Kantawong**

Computer Engineering Student