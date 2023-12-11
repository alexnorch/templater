import HeadingBlock from "../ui/HeadingBlock";
import TemplateCreate from "./TemplateCreate";
import TemplatesList from "./TemplatesList";

import "./Templates.scss";

const Templates = () => {
  return (
    <section className="templates">
      <div className="container">
        <div className="templates__header">
          <HeadingBlock title="My categories" heading="h2" position="left" />
          <TemplateCreate />
        </div>
        <TemplatesList />
      </div>
    </section>
  );
};

export default Templates;
