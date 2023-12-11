import "./Header.scss";

interface IHeader {
  children: React.ReactNode;
}

const Header: React.FC<IHeader> = ({ children }) => {
  return <header className="header">{children}</header>;
};

export default Header;
