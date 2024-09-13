# Image Rotation Project

## Overview

This project is a full-stack application that allows users to upload images, rotate them, and view both the original and rotated images. It consists of a backend server to handle file uploads and image processing, and a frontend application for user interaction.

## Project Structure

- `backend/`: Contains the backend server that handles image uploads and processing.
- `frontend/`: Contains the frontend application built with React and Tailwind CSS.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Backend Setup

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Start the backend server:

    ```bash
    node index.js
    ```

    The server will start on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Start the frontend application:

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## Usage

1. Open the frontend application in your browser.
2. Use the file upload form to upload an image.
3. The application will display the original and rotated images side by side.

## File Structure

### Backend

- `index.js`: Main server file that handles file uploads and image rotation.
- `.gitignore`: Specifies files and directories to be ignored by Git (e.g., `node_modules`, `uploads`).

### Frontend

- `src/`: Contains the source code for the React application.
- `public/`: Contains static assets such as images and the HTML file.
- `tailwind.config.js`: Configuration for Tailwind CSS.
- `vite.config.js`: Configuration for Vite (build tool).

## Contact

For any questions or inquiries, please contact [ashishkushwah179@gmail.com](mailto:ashishkushwah179@gmail.com).
