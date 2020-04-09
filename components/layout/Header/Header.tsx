import Link from "next/link";
import { Spacer } from "../Spacer";
import styles from "./Header.module.scss";

export const Header: React.FC<{ to?: string }> = ({ to = "/" }) => (
  <header>
    <Link href={to}>
      <p className={styles.name}>//tiagogm</p>
    </Link>
    <Spacer size={48} />
  </header>
);
