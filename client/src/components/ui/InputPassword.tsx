import React from 'react';
import { TextFieldProps, TextField, IconButton, InputAdornment, TextFieldVariants } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type ExtendedTextFieldProps<
    Variant extends TextFieldVariants = TextFieldVariants>
    = TextFieldProps<Variant>

interface InputPasswordProps extends ExtendedTextFieldProps<"filled"> {
    showPassword: boolean;
    toggleShowPassword: () => void;
}

const InputPassword: React.FC<InputPasswordProps> = ({ showPassword, toggleShowPassword, ...otherProps }) => {
    return (
        <TextField
            {...otherProps}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <IconButton onClick={toggleShowPassword} edge="end">
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
            }}
        />
    )
}
export default InputPassword;