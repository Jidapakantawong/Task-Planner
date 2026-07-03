-- 1. สร้าง Database (ถ้ายังไม่มี)
CREATE DATABASE IF NOT EXISTS task_management_db;
USE task_management_db;

-- 2. ตารางผู้ใช้งาน (Users)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- เก็บแบบ Hashed
    name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'employee') DEFAULT 'employee',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. ตารางงาน (Tasks)
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    assigned_to INT,
    status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
);

-- 4. เพิ่มข้อมูลตัวอย่าง (Seed Data)
INSERT INTO users (username, password, name, role) VALUES 
('admin1', 'password111', 'หัวหน้างาน Admin', 'admin'),
('emp01', 'password222', 'สมชาย', 'employee'),
('emp02', 'password333', 'สมศรี', 'employee');

INSERT INTO tasks (title, description, assigned_to, status) VALUES 
('ติดตั้งระบบ Solar Cell', 'ดำเนินการติดตั้งที่โซน A', 2, 'pending'),
('ทำเอกสารรายงาน', 'รวบรวมข้อมูลรายเดือน', 3, 'in-progress');


ALTER TABLE tasks ADD COLUMN due_date DATE;
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'user';