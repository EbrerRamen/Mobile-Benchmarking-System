# Mobile Benchmarking System ([Live Demo](https://mobile-benchmarking-frontend.onrender.com))

## Overview
Mobile Benchmarking System is a full‑stack web application for discovering, comparing, and tracking smartphones by performance and value. It aggregates device specs and community ratings, highlights trending phones, and helps users find the best value for money.

## Test Login Credentials
Email: tester1@gmail.com
Password: Password123

## 📸 Screenshots
![Home Screen](https://imgur.com/Ub07rXS.png)
![Phone](https://imgur.com/8answnE.png)
![Phone Details](https://imgur.com/CC0D7rm.png)
![Search Phone](https://imgur.com/4ZAY7gr.png)
![Benchmarking](https://imgur.com/792vvbl.png)
![Comparison](https://imgur.com/xs14BZM.png)
![Winner](https://imgur.com/ek6w2Tb.png)

## Key Features
- Trending phones and value‑for‑money recommendations
- Detailed phone pages with specs, averages, and user ratings
- News management (add, edit, delete) for admins
- Wishlist and notifications for signed‑in users
- Benchmark view and phone finder form

## Tech Stack
- Frontend: React (Router, Axios), Firebase Auth
- Backend: Node/Express (REST API)
- Deployment: Render (frontend and backend)

## Deployment
- Frontend and backend are deployed on Render.
- The frontend uses a configured Axios instance with a base URL, so it works both locally and in production without hardcoded `localhost` paths.

## Configuration
- Frontend config: `frontend/src/config.js`
  - Uses `REACT_APP_API_URL` if provided, otherwise falls back to local dev URL.
- Axios instance: `frontend/src/api/axios.js`
  - Centralizes API base URL and headers.

## Local Development
1. Backend: start the API server (ensure it returns a health message at the root route).
2. Frontend: `cd frontend && npm start`
3. Ensure `REACT_APP_API_URL` is set when pointing the frontend to a non‑default backend.

## Project Report (UI Preview)
To see how the website looks (screens, flows, and details), please view the project report in the repository: `11_CSE471_01_Project_Spring25.docx.pdf`.

---
For any issues, please open an issue or reach out to the maintainers.