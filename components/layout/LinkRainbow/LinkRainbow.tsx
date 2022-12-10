import Link from "next/link";
import cx from "classnames";
import styles from "./LinkRainbow.module.scss";

interface ILinkRainbowProps {
  to: string;
  intent?: "menu"; //add more later
  variation?: "a" | "b";
  className?: string;
}

export const LinkRainbow: React.FC<React.PropsWithChildren<ILinkRainbowProps>> = ({ className, to, intent, variation, children }) => {
  const cls = cx(className, styles.linkrainbow, {
    [styles[`anim-variation--${variation}`]]: !!variation,
    [styles[`linkrainbow--${intent}`]]: !!intent,
  });

  //absolute or external link
  if (to.includes("http")) {
    return (
      <a className={cls} target="_blank" rel="noopener" href={to}>
        {children}
      </a>
    );
  }

  return (
    <Link href={to} className={cls}>
      {children}
    </Link>
  );
};
