import { yupResolver } from '@hookform/resolvers/yup'
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material'
import Button from 'components/button'
import ControllerField from 'components/controllerField'
import Input from 'components/input'
import Typography from 'components/typography'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './changePasswordModal.module.css'

import { schema } from './schema'
import { useMutation } from 'react-query'
import { updateCompany, uploadRut } from 'services/profile'
import PhoneInput from 'components/phoneInput'
import UpdateFile from 'components/updateFile'
import UploadFile from 'components/uploadFile'
import { useNotify } from 'hooks/useNotify'
import { GLOBAL_ERROR } from 'configs'

const UpdateCompanyProfileModal = ({ open, onClose, initValues, showButton }) => {
  const { formState: { errors }, handleSubmit, control, reset, setError, clearErrors } = useForm({
    defaultValues: { ...initValues },
    resolver: yupResolver(schema)
  })

  const notify = useNotify()

  const [rut, setRut] = useState(initValues?.rut || { url: '', name: '' })
  const { isLoading: uploadRutLoading, mutateAsync: changeRut } = useMutation(uploadRut)

  const { isLoading, mutateAsync } = useMutation(updateCompany)

  useEffect(() => {
    if (!open) reset(initValues)
  }, [open, initValues, reset])

  console.log({ errors })

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
      rut
    }
    try {
      if (!rut?.url) return notify.info('Por favor debes adjuntar el rut en formato pdf')
      await mutateAsync({ id: initValues?._id, payload })
      notify.info('Nuestro equipo estara validando la infomación enviada, durante las proximas 24 horas te estará llegando un correo de confirmación para que puedas realizar el pago ')
      onClose()
      showButton()
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const handleOnUploadRut = async (file) => {
    try {
      const payload = new window.FormData()
      payload.append('file', file)
      const { data } = await changeRut({ payload, id: initValues?._id })
      if (!data) return notify.error(GLOBAL_ERROR)
      setRut(data)
      notify.success('El rut se se ha guardado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const onDeleteRut = async () => {
    try {
      const payload = { name: initValues?.rut?.name || '' }
      const { data } = await changeRut({ payload, id: initValues?._id })
      if (!data) return notify.error(GLOBAL_ERROR)
      setRut({ url: '', name: '' })
      notify.success('El rut se ha eliminado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={onClose}
      sx={{
        '&.MuiPaper-root': {
          backgroundColor: 'red'
        }
      }}
    >
      <DialogTitle fontWeight='bold'>Perfil de empresa</DialogTitle>
      <Divider />
      <DialogContent sx={{ marginBottom: '30px' }}>
        <Typography fontSize='18px' textAlign='center'>Es necesario que completes el siguiente formulario para poder continuar con la orden.</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.changePasswordForm}>
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

        </form>
      </DialogContent>
      <DialogActions>
        <Button type='button' onClick={onClose} disabled={uploadRutLoading} variant='outlined' color='secondary'>Cancelar</Button>
        <Button type='button' onClick={handleSubmit(onSubmit)} loading={isLoading} disabled={uploadRutLoading} variant='outlined'>Actualizar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateCompanyProfileModal
