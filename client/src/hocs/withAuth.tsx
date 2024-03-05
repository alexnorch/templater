import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectCurrentToken } from "../store/slices/authSlice";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = useSelector(selectCurrentToken);

    if (!accessToken) return <Navigate replace to="/login" />;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
