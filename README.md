Here's a README document for your Express.js application that handles user avatar uploads and other related functionalities. Feel free to customize any part to better fit your project!

---

# Avatar Upload Application

This is a simple Express.js application that allows users to upload their avatar and cover images, as well as manage user information such as full name, email, and phone number. The uploaded images are stored in Cloudinary.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features

- User avatar and cover image upload
- View all uploaded user data
- Update user information
- Delete user entries
- Persistent storage with MongoDB

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for Node.js
- **Mongoose**: MongoDB object modeling tool
- **Multer**: Middleware for handling `multipart/form-data`, primarily used for file uploads
- **Cloudinary**: Cloud service for media storage and management
- **EJS**: Templating engine for rendering HTML views

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Make sure you have MongoDB installed and running. Then create a new database named `avatarUpload`.

4. Set up Cloudinary in your project by adding your API credentials in a separate `utils/cloudinary.js` file:

   ```javascript
   import cloudinary from "cloudinary";

   cloudinary.config({
     cloud_name: "your-cloud-name",
     api_key: "your-api-key",
     api_secret: "your-api-secret",
   });

   export const uploadOnCloudinary = async (filePath) => {
     return await cloudinary.v2.uploader.upload(filePath);
   };
   ```

## Usage

1. Start the application:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:5000`.

3. You can now upload images, view all user data, update user information, and delete user entries.

## Routes

- `GET /`: Render the home page.
- `POST /upload`: Handle file uploads and save user information to the database.
- `GET /all`: Display all users' data.
- `GET /delete/:userId`: Delete a user entry by ID.
- `GET /update/:userId`: Render the update page for a specific user.
- `POST /update/:userId`: Update user information based on the provided ID.

## Database Schema

The application uses a MongoDB collection with the following schema for user data:

```javascript
const userSchema = new Schema({
  avatar: String,
  coverImage: String,
  fullName: String,
  email: String,
  phone: String,
});
```

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
