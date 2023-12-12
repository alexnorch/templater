import { BiMaleFemale } from "react-icons/bi";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

const displayGenderIcon = (sex: string) => {
  switch (sex) {
    case "female":
      return <FaFemale />;
    case "male":
      return <FaMale />;
    case "both":
      return <BiMaleFemale />;
  }
};

const getTemplateLanguage = (lang: string) => {};

export { displayGenderIcon };
