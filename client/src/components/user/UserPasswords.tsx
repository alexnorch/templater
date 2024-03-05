import { Stack, Typography, Button, TextField } from "@mui/material"

const UserPasswords = () => {
    return (
        <Stack width={1} spacing={2} component='form'>
            <Typography variant='h6'>Change Password</Typography>
            <TextField type="password" label='Old Password' size="small" />
            <TextField type="password" label='New Password' size="small" />
            <TextField type="password" label='Confirm Password' size="small" />
            <Button sx={{ alignSelf: 'flex-end' }} variant='contained'>Submit</Button>
        </Stack>
    )
}
export default UserPasswords