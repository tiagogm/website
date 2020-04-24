import Link from "next/link";
import { Spacer } from "../Spacer";
import styles from "./Header.module.scss";

export const Header: React.FC<{ to?: string }> = ({ to = "/" }) => (
  <header>
    <Link href={to}>
      <a className={styles.name}>//tiagogm</a>
    </Link>
    <Spacer size={48} />
  </header>
);
