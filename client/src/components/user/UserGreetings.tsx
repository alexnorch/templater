import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/slices/authSlice"
import { Stack, Typography } from "@mui/material";

const UserGreetings: React.FC = () => {
    const currentUser = useSelector(selectCurrentUser);

    return (
        <Stack>
            <Typography>Welcome</Typography>
            <Typography fontSize={12}>{currentUser?.email}</Typography>
        </Stack>
    )
}
export default UserGreetings