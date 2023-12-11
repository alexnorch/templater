import { CSSProperties } from "react";

interface ISection {
  children: React.ReactNode;
  styles?: CSSProperties;
}

const Section: React.FC<ISection> = ({ children, styles }) => {
  return <section style={styles}>{children}</section>;
};

export default Section;
