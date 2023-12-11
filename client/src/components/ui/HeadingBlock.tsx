import React from "react";
import "./HeadingBlock.scss";

interface IHeading {
  heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  position: "center" | "left" | "right";
  title: string;
  subtitle?: string;
}

const Heading: React.FC<IHeading> = ({
  heading: HeadingComponent,
  title,
  subtitle,
  position,
}) => {
  let headingStyles = "block-header";

  if (position) {
    headingStyles += ` block-header--${position}`;
  }

  return (
    <div className={headingStyles}>
      <HeadingComponent className="block-header__title">
        {title}
      </HeadingComponent>
      {subtitle && <p className="block-header__subtitle"></p>}
    </div>
  );
};

export default Heading;
