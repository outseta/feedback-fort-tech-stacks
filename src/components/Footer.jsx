import clsx from "clsx";

const NEWSLETTER_ID = import.meta.env.VITE_OUTSETA_NEWSLETTER_ID;

const Footer = ({ className }) => {
  return (
    <div className={clsx("text-sm text-center space-y-4", className)}>
      <a href="https://queen.raae.codes" className="link link-hover block">
        Made with ❤️ by Queen Raae
      </a>

      <nav className="space-x-4">
        <a
          href="https://outseta.com/?via=queenraae&utm_source=starter&utm_medium=app&utm_campaign=feedback+fort+react+supabase"
          className="link link-hover"
        >
          <span className="font-bold">Outseta:</span> Auth, Newsletter, Chat and
          more
        </a>
        <a
          href="https://supabase.com/?via=queenraae&utm_source=starter&utm_medium=app&utm_campaign=feedback+fort+react+supabase"
          className="link link-hover"
        >
          <span className="font-bold">Supabase:</span> Database
        </a>
        <a
          href="https://netlify.com/?via=queenraae&utm_source=starter&utm_medium=app&utm_campaign=feedback+fort+react+supabase"
          className="link link-hover"
        >
          <span className="font-bold">Netlify:</span> Hosting
        </a>
        <a
          href="https://daisyui.com/?via=queenraae&utm_source=starter&utm_medium=app&utm_campaign=feedback+fort+react+supabase"
          className="link link-hover"
        >
          <span className="font-bold">DaisyUI:</span> Tailwind CSS Components
        </a>
      </nav>
      <span
        className="link link-hover block"
        data-o-email-list="1"
        data-mode="popup"
        data-email-list-uid={NEWSLETTER_UID}
      >
        Subscribe to the Feedback Fort Newsletter
      </span>
    </div>
  );
};

export default Footer;
