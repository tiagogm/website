import cx from "classnames";
import styles from "./Spacer.module.scss";

export type Scale = 0 | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 128;

interface ISpacerProps {
  size: Scale;
}

export const Spacer: React.FC<ISpacerProps> = ({ size }) => {
  const className = cx({ [styles[`spacer--${size}`]]: !!size });
  return <div className={className}></div>;
};
