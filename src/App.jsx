import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeedbackList from "./components/FeedbackList";
import AddFeedbackForm from "./components/AddFeedbackForm";

import TowerIcon from "./assets/icons8-tower.svg?react";
import LightbulbIcon from "./assets/lightbulb.svg?react";
import ArrowDownIcon from "./assets/arrow-down.svg?react";

function App() {
  return (
    <>
      <header className="bg-base-200">
        <Navbar className="max-w-7xl mx-auto" />
      </header>
      <main>
        <section className="py-16 md:py-24 px-4 bg-base-100 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <TowerIcon className="w-12 h-12 mx-auto text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Help shape what's coming next
            </h1>
            <p className="text-lg text-base-content/80 text-balance">
              Your feedback directly influences our decisions.
            </p>
            <p className="text-sm text-base-content/50 text-balance">
              This is an Outseta starter you can use as a starting point for
              your own feedback collection system or use it as a starting point
              for your own project.
            </p>
            <menu className="space-x-2">
              <a
                href="https://github.com/outseta/outseta-supabase-react-feedback-fort"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline"
              >
                Code on GitHub
              </a>
              <a
                href="https://go.outseta.com/support/kb/categories/d1QpjYWE/developer-docs"
                target="_blank"
                disabled
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline"
              >
                Tutorial coming soon
              </a>
            </menu>
          </div>

          <div className="">
            <ArrowDownIcon className="w-6 h-6 mx-auto text-primary" />
          </div>

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
              Please log in to submit feedback.
            </button>
          </div>
          <AddFeedbackForm className="max-w-3xl mx-auto" />
        </section>
      </main>
      <footer className="px-4 py-10 bg-neutral text-neutral-content">
        <Footer className="max-w-7xl mx-auto" />
      </footer>
    </>
  );
}

export default App;
