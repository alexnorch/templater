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

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};

export { displayGenderIcon };
