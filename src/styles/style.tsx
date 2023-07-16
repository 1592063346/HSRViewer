import { CSSProperties } from "react";

export const layoutStyle: CSSProperties = {
  backgroundColor: "rgba(0, 0, 0, 0)",
};

export const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  color: "white",
  height: "60px",
};

export const footerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  width: "100%",
  color: "white",
  height: "100px",
};

export const contentStyle: CSSProperties = {
  minHeight: "calc(100vh - 160px)",
};

export const buttonStyle: CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  height: 40,
};