import { Stack, Typography } from "@mui/material"
import UserPasswords from "../../components/user/UserPasswords"
import UserDetails from "../../components/user/UserDetails"

const ProfileSettings = () => {
    return (
        <Stack >
            <Typography variant="h5">My profile</Typography>

            <Stack mt={{ sm: 2 }} gap={4} flexDirection={{ sm: 'row' }}>
                <UserDetails />
                <UserPasswords />
            </Stack>

        </Stack >
    )
}
export default ProfileSettings