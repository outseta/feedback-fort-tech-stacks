# Outseta React Popup Starter

A modern React application built with Vite, and Outseta set to use the popup embed mode.

## 🚀 Quick Start

0. **Prerequisites**

   - An Outseta account set up with at least one plan and one email list.
   - A Supabase account and project set up.

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure Environment Variables**

   Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file and set the following variables:

   - `VITE_OUTSETA_DOMAIN`: Your Outseta domain
   - `VITE_OUTSETA_NEWSLETTER_ID`: The ID of your Outseta email list
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

3. **Start Development Server**

   ```bash
   npm run dev
   ```

   This will start the development server at `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📚 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## 🏗️ Project Structure

```
project-root/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable React components
│   ├── App.jsx     # Main application component
│   └── main.jsx    # Application entry point
├── index.html      # HTML entry point
└── vite.config.js  # Vite configuration
```

## 🔧 Technologies

- [Outseta](https://outseta.com/) - Authentication, User Management, Billing, etc.
- [Supabase](https://supabase.com/) - Backend as a Service, Database, Authentication
- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [ESLint](https://eslint.org/) - Code linting

## 📚 Documentation

- [Example use of intergrating Outseta with React](https://github.com/outseta/outseta-react-kitchen-sink)
- [Outseta Knowledge Base](https://go.outseta.com/support/kb)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
