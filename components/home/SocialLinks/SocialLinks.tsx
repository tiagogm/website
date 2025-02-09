import { IconGithub, IconLinkedin, IconBsky } from "@/app/contacts/Icons";
import styles from "./SocialLinks.module.scss";

export const SocialLinks = () => (
  <div className={styles.sociallinks}>
    <a className="github" target="_blank" href="https://github.com/TGMorais">
      <IconGithub />
    </a>
    <a className="linkedin" target="_blank" href="https://www.linkedin.com/in/tmorais">
      <IconLinkedin />
    </a>
    <a className="bluesky" target="_blank" href="https://@tgmorais.bsky.social">
      <IconBsky />
    </a>
  </div>
);
