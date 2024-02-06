import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

import { selectCurrentToken } from "../components/auth/authSlice";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = useSelector(selectCurrentToken);

    if (!accessToken) return <Navigate replace to="/login" />;

    const decodedToken: { [key: string]: any } = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (currentTime >= decodedToken.exp) {
      return <Navigate replace to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
