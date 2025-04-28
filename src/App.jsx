import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeedbackList from "./components/FeedbackList";
import AddFeedbackForm from "./components/AddFeedbackForm";

function App() {
  return (
    <>
      <header className="bg-base-200 shadow-sm">
        <Navbar className="max-w-5xl mx-auto" />
      </header>
      <main>
        <section className="py-16 px-4">
          <FeedbackList className="max-w-5xl mx-auto" />
        </section>
        <section className="bg-base-200 sm:py-12 py-16 px-4">
          <AddFeedbackForm className="max-w-3xl mx-auto" />
        </section>
      </main>
      <Footer className="bg-base-300 text-base-content p-10" />
    </>
  );
}

export default App;
