import Link from "next/link";
import cx from "classnames";
import styles from "./LinkRainbow.module.scss";

interface ILinkRainbowProps {
  to: string;
  intent?: "menu"; //add more later
  variation?: "a" | "b";
  className?: string;
}

export const LinkRainbow: React.FC<ILinkRainbowProps> = ({ className, to, intent, variation, children }) => {
  const cls = cx(className, styles.linkrainbow, {
    [styles[`anim-variation--${variation}`]]: !!variation,
    [styles[`linkrainbow--${intent}`]]: !!intent,
  });
  const external = to.includes("http");

  return (
    <Link href={to} prefetch={!external}>
      <a className={cls} target={external ? "_blank" : ""} rel={external ? "noopener" : ""}>
        {children}
      </a>
    </Link>
  );
};
