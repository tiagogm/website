import { IconGithub, IconLinkedin, IconTwitter } from "@/components/Icons";
import styles from "./SocialLinks.module.scss";

export const SocialLinks = () => (
  <div className={styles.sociallinks}>
    <a className="github" target="_blank" href="https://github.com/TGMorais">
      <IconGithub />
    </a>
    <a className="linkedin" target="_blank" href="https://www.linkedin.com/in/tmorais">
      <IconLinkedin />
    </a>
    <a className="twitter" target="_blank" href="https://twitter.com/_TGMorais">
      <IconTwitter />
    </a>
  </div>
);
