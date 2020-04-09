import { IconEmail, IconGithub, IconLinkedin, IconTwitter } from "../../Icons";
import styles from "./ContactLinks.module.scss";

//TODO: make `unstyled` a wrapper component
export const ContactLinks = () => (
  <ul className={`unstyled ${styles.contactlinks}`}>
    <li>
      <IconEmail />
      Email: <a href="mailto:rpm.tiago@gmail.com">rpm.tiago@gmail.com</a>
    </li>
    <li>
      <IconGithub />
      Github: <a href="https://github.com/tiagogm">/tiagogm</a>
    </li>
    <li>
      <IconLinkedin />
      Linkedin: <a href="https://www.linkedin.com/in/tmorais/">/in/tmorais</a>
    </li>
    <li>
      <IconTwitter />
      Twitter: <a href="https://twitter.com/_tiagogm">_tiagogm</a>
    </li>
  </ul>
);
