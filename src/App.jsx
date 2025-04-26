import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FeedbackList from "./components/FeedbackList";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="py-16">
          <FeedbackList className="max-w-5xl mx-auto" />
        </section>
        <section className="bg-base-200 py-24">
          <FeedbackForm className="max-w-3xl mx-auto" />
        </section>
      </main>
      <Footer className="bg-base-300 text-base-content p-10" />
    </>
  );
}

export default App;
