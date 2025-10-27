# 🚀 Lead Management System (LMS)

### 🌐 [Live Demo](https://lead-management-system-fawn.vercel.app/)
A centralized web application to manage, track, and organize leads collected from multiple sources — including **Meta Ads (Facebook/Instagram)** and **Google Ads** — in one unified dashboard.

---

## 📖 Overview

The **Lead Management System (LMS)** automates lead collection and provides a single platform to view, manage, and respond to leads efficiently.  
It integrates **social ad platforms** and **custom lead forms**, enabling businesses to streamline the entire lead pipeline — from generation to conversion.  

It also includes **authentication (NextAuth)**, **email notifications (Nodemailer)**, and **MongoDB integration** for storing and managing data securely.

---

## 🧩 Key Features

✅ **User Authentication**  
- Secure login via **Email/Password**, **Google**, and **GitHub** using NextAuth.  
- Protected routes & sessions for authenticated users only.

✅ **Lead Management Dashboard**  
- View and manage all leads in one place.  
- Leads fetched dynamically from **Meta Ads**, **Google Ads**, and **manual forms (dummy data)**.  
- CRUD operations: Add, Edit, Delete, Update lead status.

✅ **Email Notifications (Nodemailer)**  
- Sends confirmation and follow-up emails to clients automatically.  

✅ **Real-time Updates**  
- Automatically refreshes data when a new lead is added.  

✅ **MongoDB Integration**  
- Stores all lead and user data in a secure database.  

✅ **Responsive Design**  
- Fully optimized for both desktop and mobile using Tailwind CSS.

✅ **Deployment on Vercel**  
- CI/CD ready — automatically deployed from GitHub.

---

## 🛠️ Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | Next.js 14, React, Tailwind CSS |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB (Mongoose ORM) |
| **Authentication** | NextAuth (Google & GitHub OAuth, Email/Password) |
| **Email Service** | Nodemailer |
| **Hosting** | Vercel |
| **Version Control** | Git & GitHub |

---

## 📂 Project Structure

