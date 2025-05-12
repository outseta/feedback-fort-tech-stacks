# Feedback Fort - Outseta + React + Supabase Demo App

An Outseta starter you can use as a starting point for your own feedback collection system or use it as a starting point for your own project.

## 🚀 Quick Start

### 0. Prerequisites

- An Outseta account set up with at least one plan and one email list.
- A Supabase account and project set up.

We'll be referencing the Outseta and Supabase admin panels throughout the guide. The first navigational steps can be found in the side bar of each system, ie. Settings, Email (Outseta), and Project Settings, SQL Editor etc. (Supabase).

![Screenshot of the Outseta admin panel](assets/outseta-overview.png)
![Screenshot of the Supabase admin panel](assets/supabase-overview.png)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Edit the `.env.local` file and set the following variables for the app to work:

- `VITE_OUTSETA_DOMAIN`: Your Outseta domain
  - Found in the Outseta admin panel, under _Settings > General > Outseta URL_
  - Example: `your-subdomain.outseta.com`
- `VITE_OUTSETA_NEWSLETTER_ID` (optional): The ID of your email list in Outseta
  - Found in the Outseta admin panel, under _Email > Lists > Your Email List_
  - Example: `vW5xMA94`
- `VITE_SUPABASE_URL`: Your Supabase project URL
  - Found in the Supabase admin panel, under _Project Settings > Data API > Project URL_
  - Example: `https://mnqvarboecgoctpweef.supabase.co`
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
  - Found in the Supabase admin panel, under _Project Settings > Data API > Project API Keys_
  - Example: `eyJhbGciOiJIUzI1leisInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ucXZhmdJvaWNnb2N0cGxkbWdeIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NjA2NjcsImV4cCI6MjA2MDAzNjY2N30.SdaUoxwEGrtMqSm104XbH8pUYclqkwK8zmFfzteWLWo`

And the following secrets in the Supabse admin panel under _Edge Functions > Secrets_ for the Supabase functions to work when deployed:

- `OUTSETA_DOMAIN`: Your Outseta domain (same as `VITE_OUTSETA_DOMAIN`)
- `SUPA_JWT_SECRET`: Your Supabase JWT secret
  - Found in the Supabase admin panel, under _Project Settings > Data API > JWT Settings_
  - Example: `vEmZcsaCEGGravJet2y4lQ+1i4G6w5MBn1MTujoiwBjtLj3zKRIkyZkDOiEUD9ysaFTm0quF4Rr39YjwIcTTrg==`

### 3. Configure Supabase

You have two options:

a. Use the Supabase admin panel to configure the project
b. Use the Supabase CLI to configure the project

#### 3a. **Use the Supabase admin panel to configure the project**

##### Create Supabase Tables and Seed Data

Within the Supabase admin panel, navigate to _SQL Editor_:

1. Copy and paste the contents of each file in the `supabase/migrations` folder into the SQL Editor.
   - Click the _Run_ button before pasting the contents of the next file.
2. Copy and paste the contents of the `supabase/seed.sql` file into the SQL Editor.
   - Click the _Run_ button.

##### Deploy Supabase Function

Within the Supabase admin panel, navigate to _Edge Functions > Functions > Deploy a new function > Via Editor_, then:

1. Copy and paste the contents of the `supabase/functions/exchange/index.ts` file into the editor.
2. Give the function the name `exchange`.
3. Click the _Deploy_ button.
4. Disable `Enforce JWT Verification` for the function.

#### 3b. Use the Supabase CLI to configure the Supabase project

##### Create Supabase Tables and Seed Data

With the Supabase CLI run the following command to create the tables and seed data (will delete all existing data and tables in the connected Supabase CLI project):

```bash
supabase db reset
```

##### Deploy Supabase Function

With the Supabase CLI run the following command to deploy the function:

```bash
supabase functions deploy exchange --no-verify-jwt
```

#### 4. Start Development Server

```bash
npm run dev
```

Visit the app at `http://localhost:5173`

### 5. Deploy to Production

For the app to work in production, you need to deploy the app to Netlify or similar.

The folder to deploy is the `dist` folder and the build command is:

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
