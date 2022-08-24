
import Button from 'components/button'
import UpdateCompanyProfileModal from 'components/updateCompanyProfileModal'
import ConfirmCancelCampaign from 'components/confirmCancelCampaign'
import useWompi from 'hooks/useWompi'

import { useState } from 'react'
import { getCampaignById, requestImplementation, updateCampaign } from 'services/campaigns'
import ExitPaidModal from 'components/exitPaidModal'
import { Link } from 'react-router-dom'
import { useNotify } from 'hooks/useNotify'
import { useMutation } from 'react-query'
import PaymentIcon from '@mui/icons-material/Payment'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import styles from './orderPaidButtons.module.css'
import { getUserInitValues } from 'utils/normalizeData'
import { GLOBAL_ERROR } from 'configs'

const OrderPaidButtons = ({ campaign = {}, setCampaignState }) => {
  const { wompi, disabled } = useWompi()

  const notify = useNotify()
  const { user } = campaign
  const { isLoading, mutateAsync } = useMutation(updateCampaign)
  const { isLoading: loading, mutateAsync: requestImplementationAsync } = useMutation(requestImplementation)

  const [leavePage, setShowLeavePage] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [cancelModal, setCancelModal] = useState(false)
  const [exitPaid, setExitPaid] = useState(false)

  const hanldeCloseSetExitPaid = () => setExitPaid(false)
  const handleCLoseModal = () => setCancelModal(false)
  const handleOpenModal = () => setCancelModal(true)

  const handleClose = () =>
    setShowProfileModal(false)

  const handlePay = () => {
    const {
      address,
      company,
      companyEmail,
      nit,
      phone,
      checkRut,
      rut
    } = user

    if (address && company && companyEmail && nit && phone && rut && !checkRut) {
      return notify.info('Nuestro eqipo se encuentra validando la información de su empresa, esto puede tarde un par de horas.')
    }

    if (!address || !company || !companyEmail || !nit || !phone || !rut?.url || !checkRut) {
      return setShowProfileModal(true)
    }

    const checkout = wompi({
      amountInCents: `${campaign.amount}00`,
      email: user?.email,
      fullName: `${user?.name} ${user?.lastName}`,
      phoneNumber: phone,
      legalId: nit,
      phoneNumberPrefix: '+57',
      redirectUrl: `${process.env.REACT_APP_FRONT_URL}/campaigns/${campaign?._id}/order`,
      reference: `${campaign?._id}-${Date.now().toString()}`
    })

    checkout.open(async function ({ transaction }) {
      if (transaction.status === 'VOIDED') {
        return notify.info('Su pago esta en proceso, te notificaremos cuando se haya procesado correctamente')
      }

      if (transaction.status === 'ERROR' || transaction.status === 'DECLINED') {
        return notify.info('Tuvimos problemas al procesar el pago, por favor intenta nuevamente.')
      }

      if (transaction.status === 'APPROVED') {
        getCampaignById(campaign?._id).then(({ data }) => {
          setCampaignState(data)
          setExitPaid(true)
        }).catch(() => {
          return notify.info('Tuvimos problemas al procesar el pago, por favor intenta nuevamente.')
        })
      }
    })
  }

  const handleImplementation = () => {
    requestImplementationAsync(campaign?._id).then(({ data }) => {
      setCampaignState(data?.campaign)
    }).catch(() => {
      return notify.info(GLOBAL_ERROR)
    })
  }

  const handleCancelOrder = (status) => () => {
    mutateAsync({ id: campaign?._id, payload: { status } }).then(({ data }) => {
      if (data) {
        setCampaignState(data)
        handleCLoseModal()
        notify.success('Su orden ha sido cancelada correctamente')
      }
    })
  }
  return (
    <div className={styles.action}>
      <Link to='/campaigns'>
        <Button component='span' variant='outlined' color='primary'>
          <ArrowBackIcon sx={{ marginRight: '10px' }} />
          Salir
        </Button>
      </Link>
      <Button disabled={leavePage} onClick={handleOpenModal} variant='contained' color='secondary'>
        Cancelar orden
      </Button>
      {user?.hasCredit
        ? (
          <Button onClick={handleImplementation} disabled={disabled || leavePage} variant='contained' loading={loading}>
            Enviar a implementación
          </Button>)
        : (
          <Button onClick={handlePay} disabled={disabled || leavePage} variant='contained'>
            <PaymentIcon sx={{ marginRight: '10px' }} />
            Pago con wompi
          </Button>)}
      <UpdateCompanyProfileModal
        showButton={() => setShowLeavePage(true)}
        open={showProfileModal} onClose={handleClose}
        initValues={getUserInitValues(user)}
      />
      <ConfirmCancelCampaign open={cancelModal} onClose={handleCLoseModal} onSubmit={handleCancelOrder('cancel')} loading={isLoading} />
      <ExitPaidModal open={exitPaid} onClose={hanldeCloseSetExitPaid} />
    </div>
  )
}

export default OrderPaidButtons
