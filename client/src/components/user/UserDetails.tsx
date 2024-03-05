import { Stack, TextField, Typography } from "@mui/material"

const UserDetails = () => {
    return (
        <Stack width={1} spacing={2}>
            <Typography variant='h6'>Details</Typography>
            <TextField value='tester@gmail.com' label='E-Mail Address' disabled size="small" />
        </Stack>
    )
}
export default UserDetails