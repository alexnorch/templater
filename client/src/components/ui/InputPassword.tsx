import { forwardRef } from "react";
import { TextFieldProps, TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


type InputPasswordProps = TextFieldProps & {
    showPassword: boolean;
    toggleShowPassword: () => void;
};

const InputPassword: React.FC<InputPasswordProps> = forwardRef((props, ref) => {
    const { showPassword, toggleShowPassword, ...otherProps } = props;

    return (
        <TextField
            ref={ref}
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
})

export default InputPassword;