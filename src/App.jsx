import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <h2>Welcome to Outseta React Popup Starter</h2>
        <p>
          This is a minimal starter for Outseta React with Outseta set to use
          the popup embed mode.
        </p>
        <p>
          You can see the relevant code for the header and footer in the
          <code>components</code> folder. And the Outseta configuration in the
          <code>index.html</code> file.
        </p>
      </main>
      <Footer />
    </>
  );
}

export default App;
