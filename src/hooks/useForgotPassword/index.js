import { useCallback } from 'react'
import { useMutation } from 'react-query'
import { forgotPassword } from 'services/auth'
import { useNotify } from 'hooks/useNotify'
import { useNavigate } from 'react-router-dom'
import { GLOBAL_ERROR } from 'configs'

export const useForgotPassword = () => {
  const { mutateAsync, isLoading } = useMutation(forgotPassword)
  const navigation = useNavigate()
  const notify = useNotify()

  const sendEmail = useCallback(async (payload) => {
    try {
      await mutateAsync(payload)
      notify.success('Si haces parte de shareflow, recibiras un correo para restablecer tu contraseña')
      navigation('/auth/sign-in')
    } catch ({ response }) {
      if (response?.data?.statusCode < 500) {
        return notify.success('Si haces parte de shareflow, recibiras un correo para restablecer tu contraseña')
      }
      notify.error(response?.data?.message || GLOBAL_ERROR)
    }
  }, [mutateAsync, notify, navigation])

  return {
    sendEmail,
    isLoading
  }
}
