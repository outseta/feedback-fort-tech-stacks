import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FeedbackList from "./components/FeedbackList";

function App() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-5xl py-10 px-6 space-y-4">
        <h2 className="text-2xl font-bold">Welcome to Feeback Fort</h2>
        <p>A modern feedback collection and management system.</p>
        <FeedbackList />
      </main>
      <Footer />
    </>
  );
}

export default App;
