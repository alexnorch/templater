import { useState } from "react";
import { Typography, Menu, MenuItem, Stack } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { logOut, selectCurrentUser } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../api/authApi";


const UserNavbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutMutation();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await logoutUser(null).unwrap();
    localStorage.removeItem("accessToken");
    handleClose()
    dispatch(logOut());
  }

  const navigateTo = (page: string) => {
    navigate(page)
    handleClose()
  }

  return (
    <>
      <Stack display={{ xs: 'none', sm: 'flex' }} sx={{ cursor: 'pointer' }}
        flexDirection='row'
        gap={1}
        alignItems='center'
        justifyContent='center'
        onClick={handleOpen}>
        <KeyboardArrowDownIcon />
        <Stack>
          <Typography>Welcome</Typography>
          <Typography color="#ddddddb3" fontSize={12}>{currentUser?.email}</Typography>
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigateTo('/settings/profile')}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}
export default UserNavbar