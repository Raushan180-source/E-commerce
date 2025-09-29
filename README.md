# E-Commerce MERN Stack Application

A full-featured e-commerce website built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, product management, shopping cart, order processing, and payment integration.

## Features

### User Features
- User registration and authentication
- User profile management
- Product browsing with search and pagination
- Product reviews and ratings
- Shopping cart functionality
- Checkout process with shipping and payment
- Order history and tracking
- Responsive design for all devices

### Admin Features
- Product management (CRUD operations)
- User management
- Order management
- Dashboard with analytics

### Technical Features
- JWT-based authentication
- Redux state management
- RESTful API design
- MongoDB database with Mongoose ODM
- Responsive UI with Tailwind CSS and shadcn/ui
- Image upload functionality
- Payment integration ready (PayPal/Stripe)
- Error handling and validation

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Lucide React** - Icon library

## Project Structure

```
ecommerce-mern/
├── backend/
│   ├── controllers/         # Route controllers
│   ├── data/               # Sample data
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── uploads/            # File uploads
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
│   ├── seeder.js          # Database seeder
│   └── server.js          # Entry point
└── frontend/
    └── ecommerce-frontend/
        ├── public/         # Static files
        ├── src/
        │   ├── components/ # Reusable components
        │   ├── screens/    # Page components
        │   ├── slices/     # Redux slices
        │   ├── App.jsx     # Main app component
        │   └── store.js    # Redux store
        ├── index.html      # HTML template
        └── package.json    # Frontend dependencies
```

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
   PAYPAL_CLIENT_ID=your_paypal_client_id_here
   ```

4. Start MongoDB service (if running locally)

5. Seed the database with sample data:
   ```bash
   npm run data:import
   ```

6. Start the backend server:
   ```bash
   npm run server
   ```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/ecommerce-frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

The frontend application will run on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `POST /api/products/:id/reviews` - Create product review (protected)

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/pay` - Update order to paid (protected)
- `GET /api/orders/myorders` - Get user orders (protected)
- `GET /api/orders` - Get all orders (admin only)

## Sample Data

The application includes a seeder script that populates the database with:
- 3 sample users (including 1 admin)
- 20 sample products across different categories
- Sample reviews and ratings

### Default Users
- **Admin**: admin@example.com / 123456
- **User 1**: john@example.com / 123456
- **User 2**: jane@example.com / 123456

## Database Commands

```bash
# Import sample data
npm run data:import

# Destroy all data
npm run data:destroy
```

## Development Scripts

### Backend
```bash
npm start          # Start production server
npm run server     # Start development server with nodemon
npm run data:import # Import sample data
npm run data:destroy # Clear all data
```

### Frontend
```bash
pnpm run dev       # Start development server
pnpm run build     # Build for production
pnpm run preview   # Preview production build
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

## Deployment

### Backend Deployment
1. Set environment variables for production
2. Build and deploy to platforms like Heroku, Railway, or DigitalOcean
3. Ensure MongoDB connection string is configured for production

### Frontend Deployment
1. Build the React application:
   ```bash
   pnpm run build
   ```
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or AWS S3

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@example.com or create an issue in the repository.

## Acknowledgments

- Built with MERN stack
- UI components from shadcn/ui
- Icons from Lucide React
- Sample images from Unsplash
- Created by Manus AI

---

**Note**: This is a demonstration e-commerce application. For production use, ensure proper security measures, payment gateway integration, and thorough testing.
