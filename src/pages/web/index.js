
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import ControllerField from 'components/controllerField'
import Input from 'components/input'
import Button from 'components/button'
import styles from './home.module.css'
import Typography from 'components/typography'
import { invitationSchema, invitationValues } from './schema'
import { Link } from 'react-router-dom'
import { LogoIcon } from 'assets/icons'
import PhoneInput from 'components/phoneInput'
import { useMutate } from 'hooks/useMutate'
import { createInvitation } from 'services/invitation'
import { useNotify } from 'hooks/useNotify'

const WebPage = () => {
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
      notify.success('El registo ha sido exitoso, en unos minutos recibiras un email, donde podras empezar a navegar por nuesta app')
    } catch (e) {
      notify.error('Ups, algo salio mal')
    }
  }
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <LogoIcon fill='#4b494f' />
        <Link to='/auth/sign-in'>
          <Button component='span' variant='outlined' sx={{ borderRadius: '40px' }} size='large'>
            Ingresar
          </Button>
        </Link>
      </header>
      <main className={styles.main}>
        <div>
          <Typography
            component='h1'
            fontWeight='bold'
          >
            Tu campaña de medios digitales, en minutos
          </Typography>
          <Typography>
            Adquiere tus clientes a través de campañas de Display y Video en los medios y plataformas más importantes del país.
          </Typography>
        </div>
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
      </main>
    </div>
  )
}

export default WebPage
