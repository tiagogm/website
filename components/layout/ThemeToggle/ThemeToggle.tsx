"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./ThemeToggle.module.scss";

export const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  const getLabel = () => {
    if (theme === "system") {
      return `Theme: System (${resolvedTheme})`;
    }
    return `Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`;
  };

  const getIcon = () => {
    if (resolvedTheme === "dark") {
      return "☀️";
    }
    return "🌙";
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label={getLabel()}
      title={getLabel()}
    >
      <span className={styles.themeToggle__icon} aria-hidden="true">
        {getIcon()}
      </span>
      <span className={styles.themeToggle__text}>{theme === "system" ? "Auto" : theme === "light" ? "Light" : "Dark"}</span>
    </button>
  );
};

