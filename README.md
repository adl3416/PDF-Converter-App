# PDF Converter App

## Overview

The PDF Converter App is a web application that allows users to convert various document formats (such as Word, Excel, etc.) to PDF, edit PDF files, and change the background of images. The application is built using React, TypeScript, Vite, and Tailwind CSS, with an Express backend for handling file uploads and conversions.

## Features

- Upload files for conversion to PDF.
- Edit PDF files with various functionalities.
- Change the background of images.
- Convert documents from Word, Excel, and other formats to PDF.

## Project Structure

```
pdf-converter-app
├── client                # Frontend application
│   ├── src
│   │   ├── components    # Reusable components
│   │   ├── pages         # Application pages
│   │   ├── hooks         # Custom hooks
│   │   ├── utils         # Utility functions
│   │   ├── types         # TypeScript types
│   │   ├── App.tsx       # Main application component
│   │   └── main.tsx      # Entry point for React application
│   ├── public            # Public assets
│   ├── package.json      # Client dependencies
│   ├── vite.config.ts    # Vite configuration
│   ├── tsconfig.json     # TypeScript configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── components.json    # Component metadata
├── server                # Backend application
│   ├── src
│   │   ├── controllers   # Controllers for handling requests
│   │   ├── middleware     # Middleware functions
│   │   ├── routes        # API routes
│   │   ├── utils         # Server-side utility functions
│   │   ├── types         # TypeScript types
│   │   └── app.ts        # Main entry point for Express application
│   ├── package.json      # Server dependencies
│   └── tsconfig.json     # TypeScript configuration
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd pdf-converter-app
   ```

2. Install dependencies for the client:

   ```
   cd client
   npm install
   ```

3. Install dependencies for the server:

   ```
   cd ../server
   npm install
   ```

### Running the Application

1. Start the server:

   ```
   cd server
   npm start
   ```

2. Start the client:

   ```
   cd ../client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Use the "Word to PDF" feature to upload Word documents for conversion.
- Access the "PDF Editor" to edit your PDF files.
- Change image backgrounds using the provided functionality.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.