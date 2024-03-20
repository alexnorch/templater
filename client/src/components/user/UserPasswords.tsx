import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Stack, Typography, Button } from "@mui/material"
import { useChangePasswordMutation } from "../../api/userApi"
import { authValidationRules } from "../../utils/authValidationRules";
import InputPassword from "../ui/InputPassword";

interface IUserPasswords {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
}

const UserPasswords: React.FC = () => {
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const [showPasswords, setShowPasswords] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    })

    const toggleShowPassword = (password: keyof typeof showPasswords) => {
        setShowPasswords((prev) => ({ ...prev, [password]: !prev[password] }))
    }

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });

    const handleChangePassword: SubmitHandler<IUserPasswords> = async (data) => {
        await changePassword(data)
        reset();
    };

    return (
        <Stack
            onSubmit={handleSubmit(handleChangePassword)}
            width={1}
            spacing={2}
            component='form'>
            <Typography variant='h6'>Change Password</Typography>

            <Controller
                name="oldPassword"
                control={control}
                rules={authValidationRules.loginPassword}
                render={({ field, fieldState: { invalid } }) => (
                    <InputPassword
                        {...field}
                        showPassword={showPasswords.oldPassword}
                        toggleShowPassword={() => toggleShowPassword('oldPassword')}
                        type="password"
                        label='Old Password'
                        size="small"
                        error={invalid}
                        helperText={errors?.oldPassword?.message} />

                )}
            />

            <Controller
                name="newPassword"
                control={control}
                rules={authValidationRules.registerPassword}
                render={({ field, fieldState: { invalid } }) => (
                    <InputPassword
                        {...field}
                        showPassword={showPasswords.newPassword}
                        toggleShowPassword={() => toggleShowPassword('newPassword')}
                        type="password"
                        label='New Password'
                        size="small"
                        error={invalid}
                        helperText={errors?.newPassword?.message}
                    />
                )}
            />

            <Controller
                name="confirmPassword"
                control={control}
                rules={authValidationRules.confirmPassword}
                render={({ field, fieldState: { invalid } }) => (
                    <InputPassword
                        {...field}
                        showPassword={showPasswords.confirmPassword}
                        toggleShowPassword={() => toggleShowPassword('confirmPassword')}
                        type="password"
                        label='Confirm New Password'
                        size="small"
                        error={invalid}
                        helperText={errors?.confirmPassword?.message}
                    />
                )}
            />

            <Button
                type="submit"
                disabled={isLoading}
                sx={{ alignSelf: 'flex-end' }}
                variant='contained'>
                Submit
            </Button>
        </Stack>
    )
}
export default UserPasswords