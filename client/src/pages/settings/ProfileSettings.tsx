import { Stack, Typography } from "@mui/material"
import { UserDetails, UserPasswords } from "../../components/user"


const ProfileSettings: React.FC = () => {
    return (
        <Stack >
            <Typography variant="h5">My Profile</Typography>

            <Stack alignItems='center'>
                <Stack mt={{ sm: 2 }} gap={4} maxWidth={600} width='100%'>
                    <UserDetails />
                    <UserPasswords />
                </Stack>
            </Stack>

        </Stack >
    )
}
export default ProfileSettings