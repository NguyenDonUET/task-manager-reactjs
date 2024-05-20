import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Link, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { Link as RouterLink } from "react-router-dom"
import { z } from "zod"
import { SignInFormData } from "../../types"

const schema = z.object({
  name: z.string().min(3, "Name at least 3 characters"),
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
      email: "nguyendoncb@gmail.com",
      password: "nguyendoncb@gmail.com",
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    console.log("SUCCESS", data)
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
      <Stack direction='row' spacing={2} alignItems={"center"} sx={{ mt: 2 }}>
        <Button type='submit' size='large' variant='contained' color='primary'>
          Đăng nhập
        </Button>
        <Stack direction='row' spacing={1} alignItems={"center"}>
          <Typography>Bạn đã có tài khoản?</Typography>
          <Link component={RouterLink} to='/sign-up'>
            Đăng ký
          </Link>
        </Stack>
      </Stack>
    </form>
  )
}

export default SignInForm
