import Link from "next/link";
import { Spacer } from "@/components/layout/Spacer";
import styles from "./Header.module.scss";

export const Header: React.FC<{ to?: string }> = ({ to = "/" }) => (
  <header>
    <Link href={to} className={styles.name}>
      //tiagogm
    </Link>
    <Spacer size={48} />
  </header>
);
