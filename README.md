# MetroLink - Smart Metro Ticket System

A comprehensive metro ticket booking system built with **ReactJS**, **Java Spring Boot**, and **Oracle Database**.

## 🚀 Features

### Frontend (ReactJS)
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **User Authentication**: Sign up, sign in, and profile management
- **Ticket Booking**: Easy route selection and fare calculation
- **Real-time Updates**: Live train schedules and platform information
- **Digital Wallet**: Secure payment and wallet recharge system
- **Route Map**: Interactive metro network visualization
- **Ticket Management**: View, track, and cancel tickets
- **Admin Dashboard**: Comprehensive system management

### Backend (Java Spring Boot)
- **RESTful APIs**: Clean and well-documented API endpoints
- **Security**: JWT-based authentication and authorization
- **Database Integration**: Oracle database with optimized queries
- **Transaction Management**: Secure payment processing
- **QR Code Generation**: Digital ticket validation
- **Admin Features**: User and system management
- **Audit Logging**: Complete activity tracking

### Database (Oracle)
- **Optimized Schema**: Efficient table design with proper indexing
- **Stored Procedures**: Complex business logic implementation
- **Data Integrity**: Foreign key constraints and validation
- **Performance**: Optimized queries and connection pooling
- **Scalability**: Designed for high-volume transactions

## 🏗️ System Architecture

```
Frontend (React)     Backend (Spring Boot)     Database (Oracle)
     │                        │                        │
     ├── Components           ├── Controllers          ├── Tables
     ├── Pages               ├── Services             ├── Procedures
     ├── Context             ├── Repositories         ├── Functions
     └── Utils               └── Models               └── Triggers
```

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Java** (JDK 17 or higher)
- **Oracle Database** (12c or higher)
- **Maven** (3.6 or higher)

## 🛠️ Installation & Setup

### 1. Database Setup

```sql
-- Connect to Oracle as SYSDBA
sqlplus sys/password@localhost:1521/XE as sysdba

-- Create user and grant privileges
CREATE USER metrolink IDENTIFIED BY password;
GRANT CONNECT, RESOURCE, DBA TO metrolink;

-- Connect as metrolink user
CONNECT metrolink/password@localhost:1521/XE

-- Run the schema script
@backend/database/schema.sql
```

### 2. Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

```bash
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📊 Database Schema

### Core Tables
- **users**: User account information
- **stations**: Metro station details
- **metro_lines**: Metro line information
- **tickets**: Ticket booking records
- **transactions**: Payment transactions
- **fare_rules**: Pricing configuration

### Key Features
- **Referential Integrity**: Foreign key constraints
- **Data Validation**: Check constraints and triggers
- **Performance Optimization**: Strategic indexing
- **Audit Trail**: Complete transaction logging

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/users/{userId}` - Get user profile

### Ticket Management
- `POST /api/tickets/book` - Book a new ticket
- `GET /api/tickets/user/{userId}` - Get user tickets
- `POST /api/tickets/{ticketId}/cancel` - Cancel ticket
- `GET /api/tickets/calculate-fare` - Calculate fare

### Station & Route
- `GET /api/stations` - Get all stations
- `GET /api/stations/line/{lineId}` - Get stations by line
- `GET /api/routes/calculate` - Calculate route

## 🎨 Frontend Components

### Pages
- **Home**: Landing page with features
- **BookTicket**: Ticket booking interface
- **MyTickets**: User ticket management
- **RouteMap**: Interactive metro map
- **Profile**: User profile management
- **Admin**: Administrative dashboard

### Components
- **Header**: Navigation and user menu
- **AuthModal**: Authentication forms
- **Footer**: Site information
- **TicketCard**: Ticket display component

## 🔐 Security Features

- **Password Encryption**: BCrypt hashing
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation
- **SQL Injection Prevention**: Parameterized queries
- **CORS Configuration**: Cross-origin security
- **Role-based Access**: Admin and user roles

## 💳 Payment Integration

- **Digital Wallet**: Prepaid balance system
- **Multiple Payment Methods**: Cards, UPI, wallets
- **Transaction Security**: Encrypted payment data
- **Refund Management**: Automated refund processing
- **Payment History**: Complete transaction logs

## 📱 Mobile Responsiveness

- **Responsive Design**: Works on all devices
- **Touch-friendly**: Optimized for mobile interaction
- **Progressive Web App**: PWA capabilities
- **Offline Support**: Basic offline functionality

## 🚀 Deployment

### Production Build

```bash
# Frontend
npm run build

# Backend
mvn clean package -Pprod
```

### Docker Deployment

```dockerfile
# Frontend Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# Backend Dockerfile
FROM openjdk:17-jdk-slim
COPY target/metro-ticket-system-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 📈 Performance Optimization

- **Database Indexing**: Optimized query performance
- **Connection Pooling**: Efficient database connections
- **Caching**: Redis integration for session management
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Compressed assets
- **CDN Integration**: Fast content delivery

## 🧪 Testing

```bash
# Frontend Tests
npm test

# Backend Tests
mvn test

# Integration Tests
mvn verify
```

## 📚 Documentation

- **API Documentation**: Swagger/OpenAPI
- **Database Schema**: ERD diagrams
- **User Manual**: Step-by-step guides
- **Developer Guide**: Technical documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Developer**: React.js, UI/UX Design
- **Backend Developer**: Java Spring Boot, API Development
- **Database Administrator**: Oracle Database, Performance Tuning
- **DevOps Engineer**: Deployment, CI/CD Pipeline

## 📞 Support

For support and queries:
- **Email**: support@metrolink.com
- **Phone**: +91 1800-123-4567
- **Documentation**: [docs.metrolink.com](https://docs.metrolink.com)

---

**MetroLink** - Revolutionizing urban transportation with smart technology! 🚇✨