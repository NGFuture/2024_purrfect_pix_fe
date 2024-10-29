<p align="center">
  <img src="./public/banner.jpg" alt="Banner" />
</p>

# Purrfect Pix Frontend

Welcome to the Purrfect Pix Frontend repository! This project provides a frontend interface for managing and displaying cat cards, containing info fetched from [TheCatAPI](https://thecatapi.com/). The backend API, which serves as the data source for this frontend, can be found [here](https://github.com/NGFuture/2024_purrfect_pix_be).

## Project Overview

This frontend allows you to download, save, modify, and filter cats' information. It communicates with the backend to fetch and manipulate cat data.

## Getting Started (without docker)

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
a
    Create a `.env` file in the root of your frontend directory. Add the following line to connect to your backend API:

    ```
    NEXT_PUBLIC_API_URL="http://localhost:8000"
    ```

    Replace `"http://localhost:8000"` with the actual URL of your backend API if it's hosted elsewhere.

4. **Start the Development Server**

    ```bash
    npm run dev
    ```

    This command starts the development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.


## Getting Started (with docker)

To run the frontend with Docker, follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/NGFuture/2024_purrfect_pix_fe.git
    cd 2024_purrfect_pix_fe
    ```

2. **Set Up Environment Variables**

    Create a `.env` file in the root directory of the project, and add the following line to specify the backend API URL:

    ```
    NEXT_PUBLIC_API_URL="http://backend:8000"
    ```

    The value `"http://backend:8000"` matches the backend container name if both frontend and backend are running in Docker.

3. **Build and Run the Docker Container**

    Use the following commands to build and start the Docker container:

    ```bash
    docker build -t purrfect-pix-frontend .
    docker run -p 3000:3000 --name purrfect-pix-frontend --env-file .env purrfect-pix-frontend
    ```

    This builds the Docker image and runs it, mapping port 3000 on your machine to the container. 

4. **Access the Application**

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

5. **Stopping and Removing the Container**

    To stop the running container, use:

    ```bash
    docker stop purrfect-pix-frontend
    ```

    To remove the container:

    ```bash
    docker rm purrfect-pix-frontend
    ```

## Notes

- Ensure the backend is accessible from the frontend container, either by running both in a Docker network or by adjusting the `NEXT_PUBLIC_API_URL` in `.env`.
- If you encounter issues, consult the Docker logs using:

    ```bash
    docker logs purrfect-pix-frontend
    ```

Enjoy working with Purrfect Pix!
