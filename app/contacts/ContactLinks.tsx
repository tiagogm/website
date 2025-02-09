import { IconBsky, IconEmail, IconGithub, IconLinkedin } from "@/app/contacts/Icons";
import styles from "./ContactLinks.module.scss";

//TODO: make `unstyled` a wrapper component
export const ContactLinks = () => (
  <ul className={`unstyled ${styles.contactlinks}`}>
    <li>
      <IconEmail />
      <span>
        Email:
        <a href="mailto:rpm.tiago@gmail.com" aria-label="email link" rel="noopener">
          <span> rpm.tiago@gmail.com</span>
        </a>
      </span>
    </li>
    <li>
      <IconGithub />
      <span>
        Github:
        <a href="https://github.com/tiagogm" aria-label="github profile" rel="noopener">
          <span> /tiagogm</span>
        </a>
      </span>
    </li>
    <li>
      <IconLinkedin />
      <span>
        Linkedin:
        <a href="https://www.linkedin.com/in/tmorais/" aria-label="linkedin profile" rel="noopener">
          <span> /in/tmorais</span>
        </a>
      </span>
    </li>
    <li>
      <IconBsky />
      <span>
        Twitter:
        <a href="https://@tgmorais.bsky.social" aria-label="bluesky profile">
          <span> @tgmorais.bsky.social</span>
        </a>
      </span>
    </li>
  </ul>
);
