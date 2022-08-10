import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Box, Divider } from '@mui/material'
import ControllerField from 'components/controllerField'
import Typography from 'components/typography'
import { defaultValues, schema } from './schema'
import Input from 'components/input'
import Button from 'components/button'
import styles from './form.module.css'
import { useState } from 'react'
import { useNotify } from 'hooks/useNotify'
import ChangeAvatar from 'components/changeAvatar'
import PhoneInput from 'components/phoneInput'
import { useMutation } from 'react-query'
import UploadFile from 'components/uploadFile'
import UpdateFile from 'components/updateFile'
import ChangePasswordModal from 'components/changePasswordModal'
import { uploadAvater, uploadRut, updateProfile } from 'services/profile'
import { GLOBAL_ERROR } from 'configs'
import { useSession } from 'providers/SessionProvider'

const ProfileForm = ({ user }) => {
  const { formState: { errors }, handleSubmit, control, setError, clearErrors } = useForm({
    defaultValues: user ? { ...user } : { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { setUSerSession } = useSession()

  const [openModal, setOpenModal] = useState(false)

  const notify = useNotify()

  const [avatar, setAvatar] = useState(user?.avatar || { url: '', name: '' })

  const [rut, setRut] = useState(user?.rut || { url: '', name: '' })

  const { isLoading, mutateAsync } = useMutation(updateProfile)

  const { isLoading: updatedIsLoading, mutateAsync: changeAvatar } = useMutation(uploadAvater)

  const { isLoading: uploadRutLoading, mutateAsync: changeRut } = useMutation(uploadRut)

  const onSubmit = async ({
    name,
    lastName,
    company,
    nit,
    phone,
    address,
    companyEmail
  }) => {
    const payload = {
      name,
      lastName,
      company,
      nit,
      phone,
      address,
      companyEmail,
      rut,
      avatar
    }
    try {
      const { data } = await mutateAsync(payload)
      setUSerSession(data)
      notify.success('El usuario se ha modificado exitosamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const onEdit = async (file) => {
    try {
      const payload = new window.FormData()
      payload.append('file', file)
      const { data } = await changeAvatar({ payload, id: user?._id })

      if (!data) return notify.error(GLOBAL_ERROR)
      setUSerSession({ ...user, avatar: data })
      setAvatar(data)
      notify.success('La imagen se ha cambiado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const onDelete = async () => {
    try {
      const payload = { name: user?.avatar?.name || '' }
      const { data } = await changeAvatar({ payload, id: user?._id })
      if (!data) return notify.error(GLOBAL_ERROR)
      setUSerSession({ ...user, avatar: data })
      setAvatar({ url: '', name: '' })
      notify.success('La imagen se ha cambiado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const handleOnUploadRut = async (file) => {
    try {
      const payload = new window.FormData()
      payload.append('file', file)
      const { data } = await changeRut({ payload, id: user?._id })
      if (!data) return notify.error(GLOBAL_ERROR)
      setRut(data)
      notify.success('El rut se se ha guardado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const onDeleteRut = async () => {
    try {
      const payload = { name: user?.rut?.name || '' }
      const { data } = await changeRut({ payload, id: user?._id })
      if (!data) return notify.error(GLOBAL_ERROR)
      setRut({ url: '', name: '' })
      notify.success('El rut se ha eliminado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const handleOpenModal = (bool) => () => setOpenModal(bool)

  return (
    <>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Nuevo Usuario</Typography>
      </section>

      <Box sx={{
        width: '90%',
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        padding: '50px 25px',
        borderRadius: '8px'
      }}
      >

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
          <ChangeAvatar onEdit={onEdit} onDelete={onDelete} src={avatar?.url || ''} label='Cambiar foto' loading={updatedIsLoading} />
        </Box>
        <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.rowFields}>
            <ControllerField
              name='name'
              label='Nombre'
              size='normal'
              control={control}
              element={Input}
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
            />
            <ControllerField
              name='lastName'
              label='Apellido'
              size='normal'
              control={control}
              element={Input}
              error={Boolean(errors?.lastName?.message)}
              helperText={errors?.lastName?.message}
            />
          </div>

          <ControllerField
            name='email'
            label='Correo electronico'
            size='normal'
            control={control}
            element={Input}
            disabled
            error={Boolean(errors?.email?.message)}
            helperText={errors?.email?.message}
          />

          <Divider />
          <Typography>Perfil empresa</Typography>

          <ControllerField
            name='company'
            label='Empresa'
            size='normal'
            control={control}
            element={Input}
            error={Boolean(errors?.company?.message)}
            helperText={errors?.company?.message}
          />

          <ControllerField
            name='nit'
            label='Nit'
            size='normal'
            control={control}
            element={Input}
            error={Boolean(errors?.nit?.message)}
            helperText={errors?.nit?.message}
          />
          <ControllerField
            name='address'
            label='Dirección'
            size='normal'
            control={control}
            element={Input}
            error={Boolean(errors?.address?.message)}
            helperText={errors?.address?.message}
          />
          <ControllerField
            name='companyEmail'
            label='Correo electronico empresa'
            type='email'
            size='normal'
            control={control}
            element={Input}
            error={Boolean(errors?.companyEmail?.message)}
            helperText={errors?.companyEmail?.message}
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
              } else {
                clearErrors('phone')
              }
            }}
          />

          <Divider />
          <Typography>Rut</Typography>

          {
            rut?.name
              ? <UpdateFile file={rut} onDelete={onDeleteRut} loading={uploadRutLoading} />
              : <UploadFile onChange={handleOnUploadRut} loading={uploadRutLoading} />
          }

          <Box sx={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
            <Button disabled={updatedIsLoading || !!Object.keys(errors).length || uploadRutLoading} loading={isLoading} sx={{ minWidth: '200px' }} variant='contained' type='submit'>
              Actualizar
            </Button>
            <Button disabled={updatedIsLoading || uploadRutLoading} sx={{ flex: 1 }} variant='outlined' type='button' onClick={handleOpenModal(true)}>
              Cambiar contraseña
            </Button>
          </Box>
        </Box>
      </Box>
      <ChangePasswordModal open={openModal} onClose={handleOpenModal(false)} />
    </>
  )
}

export default ProfileForm
