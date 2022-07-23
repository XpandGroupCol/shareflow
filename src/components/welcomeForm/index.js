
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import ControllerField from 'components/controllerField'
import Input from 'components/input'
import Button from 'components/button'
import styles from './welcomeForm.module.css'
import Typography from 'components/typography'
import { invitationSchema, invitationValues } from './schema'
import PhoneInput from 'components/phoneInput'
import { useMutate } from 'hooks/useMutate'
import { createInvitation } from 'services/invitation'
import { useNotify } from 'hooks/useNotify'
import { GLOBAL_ERROR } from 'configs'

const WelcomeForm = () => {
  const { formState: { errors }, handleSubmit, control, reset, setError } = useForm({
    defaultValues: { ...invitationValues },
    resolver: yupResolver(invitationSchema)
  })

  const { mutateAsync, isLoading } = useMutate(createInvitation)
  const notify = useNotify()

  const onSubmit = async (Values) => {
    try {
      await mutateAsync(Values)
      reset()
      notify.success('El registo ha sido exitoso. Gracias por confiar ser parte de Shareflow')
    } catch ({ response }) {
      console.log()
      notify.error(response?.data?.message || GLOBAL_ERROR)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Typography component='h2' color='primary' fontWeight='bold'>¡Únete a la lista de espera!</Typography>
      <div className={styles.fields}>
        <ControllerField
          name='name'
          label='Nombre'
          control={control}
          size='normal'
          element={Input}
          error={Boolean(errors?.name?.message)}
          helperText={errors?.name?.message}
        />
        <ControllerField
          name='lastName'
          label='Apellido'
          control={control}
          size='normal'
          element={Input}
          error={Boolean(errors?.lastName?.message)}
          helperText={errors?.lastName?.message}
        />
        <ControllerField
          name='email'
          label='Correo electronico'
          control={control}
          element={Input}
          size='normal'
          error={Boolean(errors?.email?.message)}
          helperText={errors?.email?.message}
        />
        <ControllerField
          name='phone'
          label='Whatsapp'
          size='normal'
          control={control}
          element={PhoneInput}
          error={Boolean(errors?.phone?.message)}
          helperText={errors?.phone?.message}
          onBlur={(error) => {
            if (error) {
              setError('phone', { type: 'custom', message: 'El numero de telefono no es valido' })
            }
          }}
        />
        <Button size='large' type='submit' variant='contained' loading={isLoading}>
          Registrarse
        </Button>
      </div>
    </form>

  )
}

export default WelcomeForm
