const Footer = () => {
  return (
    <footer>
      <menu>
        <button data-o-authenticated data-o-support="1" data-mode="popup">
          Get help!
        </button>

        <button
          data-o-email-list="1"
          data-mode="popup"
          data-email-list-uid={import.meta.env.VITE_OUTSETA_NEWSLETTER_ID}
        >
          Sign up for news!
        </button>
      </menu>
    </footer>
  );
};

export default Footer;
