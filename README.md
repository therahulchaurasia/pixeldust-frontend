# Shift Management Frontend

## 🚀 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4 (using CSS Variables for theming)
* **State Management:** React Query (TanStack Query) + React Context

## 📋 Prerequisites

**Important:** This project requires a modern Node.js version to support Next.js features.

* **Node.js:** v18.17.0 or later (v20+ recommended)
* **Package Manager:** npm

> **Note:** If you are running the Hapi.js backend provided with this assessment, remember that it requires **Node v14**. You must run the frontend and backend in separate terminals with different Node versions (e.g., using `nvm`).

## 🛠️ Installation

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Backend URL (Optional):
    By default, the service expects the backend to run on `http://localhost:8080`.
    If you need to change this, check `services/shifts.ts`.

## 🏃‍♂️ How to Run

1.  **Start the Backend (Terminal 1):**
    Ensure your Hapi.js API server is running on port 8080 (Requires Node v14).

2.  **Start the Frontend (Terminal 2):**
    Ensure you are using Node v18+:
    ```bash
    nvm use 20  # If using nvm
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📂 Project Structure

```text
frontend/
├── app/
│   ├── globals.css          # Tailwind v4 theme variables & global styles
│   ├── layout.tsx           # Root layout & React Query Provider
│   └── page.tsx             # Main Page (Server Component)
├── components/
│   ├── CityFilter.tsx       # Horizontal scrollable city filter
│   ├── InteractionContext.tsx # Holds the interacting shift ID state
│   ├── PageContainer.tsx    # Responsive "Mobile-First" card layout
│   ├── ShiftCard.tsx        # Individual shift item
│   ├── ShiftList.tsx        # Main Logic Container
│   └── ShiftTabs.tsx        # URL-based navigation tabs
├── services/
│   └── shifts.ts            # API calls (GET, BOOK, CANCEL)
└── utils/
    └── shiftUtils.ts        # Date grouping, Overlap logic, Time formatting