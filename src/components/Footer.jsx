const NEWSLETTER_ID = import.meta.env.VITE_OUTSETA_NEWSLETTER_ID;

const Footer = ({ className }) => {
  return (
    <footer className={`footer sm:footer-horizontal ${className}`}>
      <nav className="mx-auto max-w-5xl flex gab-2">
        <button
          className="btn"
          data-o-authenticated
          data-o-email-list="1"
          data-mode="popup"
          data-email-list-uid={NEWSLETTER_ID}
        >
          Sign up for news!
        </button>
        <button
          className="btn btn-secondary"
          data-o-anonymous
          data-o-email-list="1"
          data-mode="popup"
          data-email-list-uid={NEWSLETTER_ID}
        >
          Sign up for news!
        </button>
      </nav>
    </footer>
  );
};

export default Footer;
