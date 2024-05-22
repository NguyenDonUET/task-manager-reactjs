import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Link, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { Link as RouterLink } from "react-router-dom"
import { z } from "zod"
import { SignUpFormData } from "../../types"

const schema = z.object({
  name: z.string().min(3, "Name at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Don",
      email: "nguyendoncb@gmail.com",
      password: "nguyendoncb@gmail.com",
    },
  })

  const onSubmit = async (data: SignUpFormData) => {
    console.log("SUCCESS", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl'>
      <TextField
        fullWidth
        label='Name'
        margin='normal'
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
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
        <Button type='submit' size='large' variant='contained' color='primary'>
          Tạo tài khoản
        </Button>
        <Stack direction='row' spacing={1} alignItems={"center"}>
          <Typography>Bạn đã có tài khoản?</Typography>
          <Link component={RouterLink} to='/sign-in'>
            Đăng nhập
          </Link>
        </Stack>
      </Stack>
    </form>
  )
}

export default SignupForm
