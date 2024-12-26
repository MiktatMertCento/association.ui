# DernekX - Association Management System

DernekX is a web application that digitalizes and modernizes association management processes. It is a modern management panel developed using React and Firebase technologies.

## 🚀 Features

- 🔐 Secure Authentication System
- 👥 Role-Based Authorization (SA, Admin, Editor, Guest)
- 📊 Modern and Responsive Interface
- 🔄 Real-time Data Synchronization
- 📱 Mobile-Friendly Design
- 🌐 Firebase Integration

## 🛠️ Technologies Used

- React.js
- Firebase (Authentication, Firestore, Storage)
- Redux
- Material-UI
- Axios
- JWT Authentication

## 📋 Requirements

- Node.js (v14 or higher)
- npm or yarn
- Firebase Account

## 🔧 Installation

1. Clone the project:
```bash
git clone [repo-url]
cd dernekx
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   - Copy `.env.example` file to `.env`
   - Add your Firebase configuration details to the `.env` file

4. Start the application:
```bash
npm start
# or
yarn start
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── auth/         # Authentication components
│   ├── components/   # General components
│   ├── contexts/     # React contexts
│   ├── hooks/        # Custom React hooks
│   ├── redux/        # Redux store and reducers
│   ├── services/     # API services
│   ├── styles/       # Style files
│   └── views/        # Page components
├── config.js         # Firebase configuration
├── fake-db/         # Test data
└── utils.js         # Helper functions
```

## 👥 User Roles

- **SA (Super Admin)**: Full access user
- **Admin**: Administrative privileges
- **Editor**: Limited editing privileges
- **Guest**: View-only privileges

## 🔒 Security

- JWT-based authentication
- Role-based access control
- Environment variables for sensitive information
- Firebase security rules

## 🤝 Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the [MIT](LICENSE) License.