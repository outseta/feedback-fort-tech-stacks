import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeedbackList from "./components/FeedbackList";
import AddFeedbackForm from "./components/AddFeedbackForm";
import LightbulbIcon from "./assets/lighbulb.svg?react";
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
        <section className="bg-primary-content py-12 md:py-24 px-4 space-y-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <LightbulbIcon className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Submit Your Feedback</h2>
            <p className="text-lg text-base-content/80 text-balance">
              Have a suggestion or idea that would make our product better? Let
              us know, and the community will help us prioritize it.
            </p>
            <button
              className="btn btn-link font-normal"
              data-o-anonymous
              data-o-auth="1"
              data-mode="popup"
              data-widget-mode="login"
            >
              Please log in to submit a feature request.
            </button>
          </div>
          <AddFeedbackForm className="max-w-3xl mx-auto" />
        </section>
      </main>
      <Footer className="bg-base-300 text-base-content p-10" />
    </>
  );
}

export default App;
