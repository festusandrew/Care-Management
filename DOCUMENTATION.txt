CARE MANAGEMENT DASHBOARD - PROJECT DOCUMENTATION

Introduction
The Care Management Dashboard is a modern, single-page application built to help support workers, nurses, care managers, and administrators track service users, manage workforce shifts, oversee medical administration records, log incidents, and track regulatory compliance. The system is designed to streamline day-to-day operations and improve overall safety, coordination, and quality of care.


Core Components and Features

1. Core Dashboard Overview
Displays an immediate overview of daily metrics including total care hours delivered and weekly mood trends of service users. Contains an Alerts and Notifications center to flag critical details such as missed medications, overdue care plans, unresolved incidents, and compliance updates.

2. Service Users Directory
Displays profiles of service users in grid or list view. Supports status tracking, age/ID displays, risk level indicators (High, Medium, Low), location filtering, active conditions lists, current moods, and reviews schedule.

3. Care Plans and Daily Logs
Maintains individual care plans and logs daily activities, updates, and progress reports.

4. Medications and Shift Scheduling
Automates Medication Administration Records (MAR) tracking, scheduling support shifts, managing leave requests, and recruiting staff.

5. Operations and Compliance
Monitors incident reports, financial metrics, and dashboard analytics. The Compliance page tracks active requirements, audits history, risk assessment, and gap analyses.


Technical Stack

- Frontend Framework: Built using React, TypeScript, and Vite for fast development and rendering.
- Style Architecture: Styled with Tailwind CSS for layout, spacing, and grids.
- State and Context Layers: Navigation Context handles page transitions, sidebar drawer states, and collapsible desktop modes.
- Data Layer: Serves mock data on runtime from an in-memory database store (mockStore.ts) and routes calls through a backend-ready API client service layer (api.ts).


Getting Started and Running Locally

Prerequisites:
Ensure Node.js is installed on your computer.

Steps:
1. Open your terminal in the project root directory.
2. Install the project dependencies by running:
   npm install
3. Start the local development server:
   npm run dev
4. Open your browser and navigate to http://localhost:5173 to access the dashboard.
