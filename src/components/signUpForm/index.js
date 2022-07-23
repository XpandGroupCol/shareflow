import { yupResolver } from '@hookform/resolvers/yup'

import Button from 'components/button'
import ControllerField from 'components/controllerField'
import PasswordInput from 'components/passwordInput'

import { GLOBAL_ERROR } from 'configs'
import { useNotify } from 'hooks/useNotify'
import AuthLayout from 'layout/authLayout'
import { useSession } from 'providers/SessionProvider'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { signUp } from 'services/auth'
import { schema, defaultValues } from './schema'

const SignUpForm = ({ user }) => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const notify = useNotify()

  const { isLoading, mutateAsync } = useMutation(signUp)

  const { setUser } = useSession()

  const onSubmit = ({ password }) => {
    const { name, lastName, phone, email } = user
    mutateAsync({ name, lastName, password, phone, email }).then(({ data }) => {
      if (!data) return notify.error(GLOBAL_ERROR)
      setUser(data)
    }).catch((e) => {
      console.log(e)
      notify.error(GLOBAL_ERROR)
    })
  }

  return (
    <AuthLayout text='Por favor crea tu contraseña' title={`Hola ${user.name}, Bienvenida.`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='auth-fields'>
          <ControllerField
            name='password'
            label='Contraseña'
            size='normal'
            control={control}
            element={PasswordInput}
            error={Boolean(errors?.password?.message)}
            helperText={errors?.password?.message}
          />
          <ControllerField
            name='passwordConfirmation'
            label='Confirmar contraseña'
            size='normal'
            control={control}
            element={PasswordInput}
            error={Boolean(errors?.passwordConfirmation?.message)}
            helperText={errors?.passwordConfirmation?.message}
          />
        </div>

        <Button
          fullWidth
          variant='contained'
          loading={isLoading}
          type='submit'
          sx={{ marginTop: '20px' }}
        >
          Crear contraseña
        </Button>
      </form>

    </AuthLayout>
  )
}

export default SignUpForm
