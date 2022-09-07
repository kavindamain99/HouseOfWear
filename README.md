## Features

- Full featured shopping cart
- Product reviews and ratings
- Categories
- Product pagination
- Product search feature
- User profile
- User orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- JWT Authentication
- Tested using Cypress

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
CONNECTION_URL = your mongodb uri
JWT_SECRET =

```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```
