import { useNotify } from 'hooks/useNotify'
import { useCallback, useLayoutEffect, useState } from 'react'
import { WOMPI_KEY } from 'configs'

const config = ({ amountInCents, email, fullName, phoneNumber, legalId, phoneNumberPrefix, redirectUrl, reference }) => ({
  currency: 'COP',
  amountInCents,
  reference,
  publicKey: WOMPI_KEY,
  redirectUrl,
  customerData: {
    email,
    fullName,
    phoneNumber,
    legalId,
    legalIdType: 'NIT',
    phoneNumberPrefix
  }
})

const useWompi = () => {
  const [disabled, setDisabled] = useState(false)
  const notify = useNotify()

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || typeof window?.WidgetCheckout === 'undefined') {
      setDisabled(true)
    }
  }, [])

  const wompi = useCallback((params) => {
    const checkout = new window.WidgetCheckout({ ...config(params) })
    if (!checkout) return notify({ message: 'Estamos presentando un inconveniento por favor intente mas tarde.', type: 'error' })

    return checkout
  }, [notify])

  return {
    disabled,
    wompi
  }
}

export default useWompi
