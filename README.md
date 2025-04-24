# Casual Web Game Platform Backend

## Overview

The **Casual Web Game Platform** is a backend service designed to power a multiplayer web-based gaming application. The platform enables user authentication, game session tracking, leaderboards, and social features such as friend connections. This backend project is built with a robust, scalable RESTful API to handle user and game data securely and efficiently.

---

## Purpose

The purpose of this project is to create a backend system that supports:

- User registration and login with secure authentication.
- Game retrieval and management.
- Real-time leaderboard tracking.
- Storing and retrieving user game sessions and statistics.
- Friend connections (bi-directional).
- A secure, maintainable, and scalable system.

---

## Goals

- Enable user registration and login with JWT-based authentication.
- Allow game retrieval by slug.
- Track and update leaderboards in real time.
- Store and retrieve user game sessions and statistics.
- Implement bi-directional friend connections.
- Ensure security, maintainability, and scalability.

---

## Features

- **User Authentication**: Register and log in users with JWT-based authentication.
- **Game Management**: Retrieve all games or a specific game via its slug.
- **Leaderboard System**: View top 10 scores for each game.
- **Game Session Storage**: Store stats, duration, score, and completion data.
- **Social Connections**: Allow users to add friends bi-directionally.
- **User Profile**: Users can view and update their profile data and game statistics.

---

## Target Users

- **Casual and Competitive Game Players**
- **Admin Users**: For monitoring and managing platform data.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt for hashing passwords
- **Validation**: Zod for schema validation
- **Testing**: Jest (with optional Supertest for integration tests)
- **Documentation**: Swagger (OpenAPI 3)
- **Deployment**: Render

---

## API Base URL

This API has been **deployed on Render** and is accessible at:

## **Base URL:** [`https://casual-web-game-platform.onrender.com`](https://casual-web-game-platform.onrender.com)

## API Endpoints

### Auth

| Method | Route          | Description           | Auth |
| ------ | -------------- | --------------------- | ---- |
| POST   | /auth/register | Register a new user   | ❌   |
| POST   | /auth/login    | Log in and return JWT | ❌   |

### Games

| Method | Route        | Description        | Auth |
| ------ | ------------ | ------------------ | ---- |
| GET    | /games       | Fetch all games    | ❌   |
| GET    | /games/:slug | Fetch game by slug | ❌   |

### Leaderboard

| Method | Route                | Description        | Auth |
| ------ | -------------------- | ------------------ | ---- |
| GET    | /leaderboard/:gameId | Get top 10 scores  | ❌   |
| POST   | /leaderboard         | Submit a new score | ✅   |

### Sessions

| Method | Route     | Description       | Auth |
| ------ | --------- | ----------------- | ---- |
| POST   | /sessions | Save game session | ✅   |

### Users

| Method | Route                  | Description                  | Auth       |
| ------ | ---------------------- | ---------------------------- | ---------- |
| GET    | /users                 | Fetch all users (admin only) | ✅ (Admin) |
| GET    | /users/:userId         | Get user by ID               | ✅         |
| PATCH  | /users/:userId         | Update user info             | ✅         |
| DELETE | /users/:userId         | Delete user                  | ✅         |
| PATCH  | /users/:userId/stats   | Update user stats            | ✅         |
| POST   | /users/:userId/friends | Add friend                   | ✅         |

---

## How to Start the Server Locally

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Adanna-Nnajiofor/Casual-web-game-platform
   cd src
   ```
