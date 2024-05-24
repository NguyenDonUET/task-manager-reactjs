import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Link, Stack, TextField, Typography } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { z } from "zod"
import { signUp } from "../../hooks/useSignUp"
import { SignUpFormData } from "../../types"
import { SIGN_IN_PATH } from "../../utils/constants"

const schema = z.object({
  username: z.string().min(3, "Name at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

const SignupForm = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "Don",
      email: "nguyendoncb@gmail.com",
      password: "nguyendoncb@gmail.com",
    },
  })
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (formData: SignUpFormData) => signUp(formData),
    onSuccess: (data) => {
      toast.success(data.msg)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error)
        const errorRes = error.response?.data
        toast.error(errorRes.msg)
      }
    },
  })
  const onSubmit = async (formData: SignUpFormData) => {
    mutate(formData)
  }
  if (isSuccess) {
    navigate(SIGN_IN_PATH)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl'>
      <TextField
        fullWidth
        label='Name'
        margin='normal'
        {...register("username")}
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <TextField
        fullWidth
        label='Email'
        type='email'
        margin='normal'
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        fullWidth
        label='Password'
        type='password'
        margin='normal'
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Stack
        direction='column'
        spacing={2}
        alignItems={"center"}
        sx={{ mt: 2 }}
      >
        <Button
          disabled={isPending}
          type='submit'
          size='large'
          variant='contained'
          color='primary'
        >
          {isPending ? "Đang tải" : "Đăng ký"}
        </Button>

        <Stack direction='row' spacing={1} alignItems={"center"}>
          <Typography>Bạn đã có tài khoản?</Typography>
          <Link component={RouterLink} to={SIGN_IN_PATH}>
            Đăng nhập
          </Link>
        </Stack>
      </Stack>
    </form>
  )
}

export default SignupForm
