# Purrfect Pix Frontend (work on progress)

Welcome to the Purrfect Pix Frontend repository! This project provides a frontend interface for managing and displaying cat cards, containing info fetched from [TheCatAPI](https://thecatapi.com/). The backend API, which serves as the data source for this frontend, can be found [here](https://github.com/NGFuture/2024_purrfect_pix_be).

## Project Overview

This frontend allows you to download, save, modify, and filter cats' information. It communicates with the backend to fetch and manipulate cat data.

## Getting Started

To run this frontend project, ensure that the backend server is running locally or on a remote server accessible to your frontend. Follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/NGFuture/2024_purrfect_pix_fe.git
    cd 2024_purrfect_pix_fe
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env.local` file in the root of your frontend directory. Add the following line to connect to your backend API:

    ```
    NEXT_PUBLIC_API_URL="http://localhost:8000"
    ```

    Replace `"http://localhost:8000"` with the actual URL of your backend API if it's hosted elsewhere.

4. **Start the Development Server**

    ```bash
    npm run dev
    ```

    This command starts the development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.


## Planned Improvements

- **UI/UX Update:** Enhance the user interface and experience.
- **Cat Cards Update:** Add options to update names and descriptions of cat cards.