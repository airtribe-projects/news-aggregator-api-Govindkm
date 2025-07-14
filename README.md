# News Aggregator API

A RESTful API for user registration, preference management, and personalized news aggregation using NewsAPI.

## Features

- User registration and authentication
- JWT-based authentication
- User preference management
- Personalized news fetching based on user preferences
- Password validation and encryption

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- NewsAPI key (get from [NewsAPI](https://newsapi.org/))

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   EXPRESS_API_PORT=3000
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRY=1h
   NEWSAPI_URL=https://newsapi.org/v2/
   NEWSAPI_KEY=your-newsapi-key-here
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Authentication

All endpoints except registration and login require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## User Registration & Authentication

### 1. Register User

**POST** `/users/signup`

Register a new user with preferences.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "preferences": ["movies", "comics", "sports"]
}
```

**Response (200):**
```json
{
  "_id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": ["movies", "comics", "sports"]
}
```

**Password Requirements:**
- Minimum 8 characters
- At least 1 lowercase letter
- At least 1 uppercase letter
- At least 1 number

**Available Preferences:**
- `movies`
- `comics`
- `music`
- `sports`
- `news`
- `games`

### 2. Login User

**POST** `/users/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "message": "User logged in successfully",
  "user": {
    "_id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": ["movies", "comics", "sports"]
  },
  "token": "jwt-token-here"
}
```

---

## User Preferences Management

### 3. Get User Preferences

**GET** `/users/preferences`

Retrieve current user's preferences.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "preferences": ["movies", "comics", "sports"]
}
```

### 4. Update User Preferences

**PUT** `/users/preferences`

Update user's preferences.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "preferences": ["movies", "music", "games"]
}
```

**Response (200):**
```json
{
  "_id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": ["movies", "music", "games"]
}
```

### 5. Add User Preferences

**POST** `/users/preferences`

Add new preferences to existing ones.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "preferences": ["news"]
}
```

### 6. Delete User Preferences

**DELETE** `/users/preferences`

Delete all user preferences.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "message": "Preferences deleted successfully"
}
```

---

## News Endpoints

### 7. Get Personalized News

**GET** `/news`

Fetch news articles based on user preferences.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1, minimum: 1)
- `limit` (optional): Number of articles per page (default: 20, maximum: 100)

**Example:**
```
GET /news?page=1&limit=10
```

**Response (200):**
```json
{
  "news": [
    {
      "source": {
        "id": "source-id",
        "name": "Source Name"
      },
      "author": "Author Name",
      "title": "Article Title",
      "description": "Article description...",
      "url": "https://example.com/article",
      "urlToImage": "https://example.com/image.jpg",
      "publishedAt": "2023-01-01T00:00:00Z",
      "content": "Article content..."
    }
  ]
}
```

### Alternative News Endpoint

**GET** `/users/news`

Alternative endpoint for fetching news (same functionality as `/news`).

---

## Error Responses

### Common Error Codes

**400 Bad Request:**
```json
{
  "message": "Name, email and password are required"
}
```

**401 Unauthorized:**
```json
{
  "message": "Access denied, no token provided"
}
```

**404 Not Found:**
```json
{
  "message": "User not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Internal Server Error"
}
```

### Specific Error Cases

**Invalid Password:**
```json
{
  "message": "Invalid password"
}
```

**No News Found:**
```json
{
  "message": "No news articles found for the user preferences"
}
```

**Invalid Pagination:**
```json
{
  "message": "Limit cannot be more than 100"
}
```

---

## Usage Examples

### Complete User Flow

1. **Register a new user:**
   ```bash
   curl -X POST http://localhost:3000/users/signup \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Jane Doe",
       "email": "jane@example.com",
       "password": "SecurePass123!",
       "preferences": ["movies", "sports"]
     }'
   ```

2. **Login to get token:**
   ```bash
   curl -X POST http://localhost:3000/users/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "jane@example.com",
       "password": "SecurePass123!"
     }'
   ```

3. **Get personalized news:**
   ```bash
   curl -X GET http://localhost:3000/news \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

4. **Update preferences:**
   ```bash
   curl -X PUT http://localhost:3000/users/preferences \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "preferences": ["movies", "comics", "games"]
     }'
   ```

---

## Testing

Run the test suite:
```bash
npm test
```

The test suite includes:
- User registration and login tests
- Authentication middleware tests
- Preference management tests
- News fetching tests

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EXPRESS_API_PORT` | Port for the Express server | No (default: 3000) |
| `MONGODB_URL` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRY` | JWT token expiration time | No (default: 1h) |
| `NEWSAPI_URL` | NewsAPI base URL | No (default: https://newsapi.org/v2/) |
| `NEWSAPI_KEY` | NewsAPI authentication key | Yes |

---

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT implementation
- **bcrypt**: Password hashing
- **axios**: HTTP client for NewsAPI
- **validator**: Data validation
- **dotenv**: Environment variable management

---

## License

This project is licensed under the MIT License.
