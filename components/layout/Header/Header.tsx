import Link from "next/link";
import { Spacer } from "@/components/layout/Spacer";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import styles from "./Header.module.scss";

export const Header: React.FC<{ to?: string }> = ({ to = "/" }) => (
  <header className={styles.header}>
    <Link href={to} className={styles.name}>
      //tiagogm
    </Link>
    <ThemeToggle />
    <Spacer size={48} />
  </header>
);
