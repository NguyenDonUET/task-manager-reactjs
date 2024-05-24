import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Link, Stack, TextField, Typography } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { z } from "zod"
import { signIn } from "../../api/auth"
import { useAppDispatch } from "../../redux/hooks"
import { setUserInfo } from "../../redux/user/userSlice"
import { SignInFormData } from "../../types"
import { LOCAL_ACCESS_TOKEN_KEY, SIGN_UP_PATH } from "../../utils/constants"
import getUserInfoFromToken from "../../utils/getUserInfoFromToken"

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "demo@gmail.com",
      password: "demo@gmail.com",
    },
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: SignInFormData) => signIn(formData),
    onSuccess: (data) => {
      localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, data?.accessToken)
      const user = getUserInfoFromToken(data?.accessToken)
      if (user) {
        dispatch(setUserInfo(user!))
      }
      toast.success(data.msg)
      navigate("/")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error)
        const errorRes = error.response?.data
        toast.error(errorRes.msg)
      }
    },
  })

  const onSubmit = async (formData: SignInFormData) => {
    mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl'>
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
          {isPending ? "Đang tải" : "Đăng nhập"}
        </Button>

        <Stack direction='row' spacing={1} alignItems={"center"}>
          <Typography>Bạn đã có tài khoản?</Typography>
          <Link component={RouterLink} to={SIGN_UP_PATH}>
            Đăng ký
          </Link>
        </Stack>
      </Stack>
    </form>
  )
}

export default SignInForm
