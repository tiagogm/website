import { IconEmail, IconGithub, IconLinkedin, IconTwitter } from "../../Icons";
import styles from "./ContactLinks.module.scss";

//TODO: make `unstyled` a wrapper component
export const ContactLinks = () => (
  <ul className={`unstyled ${styles.contactlinks}`}>
    <li>
      <IconEmail />
      <span>
        Email:
        <a href="mailto:rpm.tiago@gmail.com" aria-label="email link" rel="noopener">
          rpm.tiago@gmail.com
        </a>
      </span>
    </li>
    <li>
      <IconGithub />
      <span>
        Github:
        <a href="https://github.com/tiagogm" aria-label="github profile" rel="noopener">
          /tiagogm
        </a>
      </span>
    </li>
    <li>
      <IconLinkedin />
      <span>
        Linkedin:
        <a href="https://www.linkedin.com/in/tmorais/" aria-label="linkedin profile" rel="noopener">
          /in/tmorais
        </a>
      </span>
    </li>
    <li>
      <IconTwitter />
      <span>
        Twitter:
        <a href="https://twitter.com/_tiagogm" aria-label="twitter profile">
          _tiagogm
        </a>
      </span>
    </li>
  </ul>
);
