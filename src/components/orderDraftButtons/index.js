import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import Button from 'components/button'
import Typography from 'components/typography'
import { useNotify } from 'hooks/useNotify'

import { useState } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { updateCampaign } from 'services/campaigns'
import styles from './orderDraftButtons.module.css'
const OrderDraftButtons = ({ campaign, setCampaignState }) => {
  const notify = useNotify()
  const [termsAndConditions, setTermAndConditions] = useState(false)

  const { mutateAsync, isLoading } = useMutation(updateCampaign)

  const handleSetTermAndConditions = ({ target }) => setTermAndConditions(target.checked)

  const handleUpdateStatus = () => {
    mutateAsync({ id: campaign?._id, payload: { status: 'pending' } }).then(({ data }) => {
      if (data) {
        setCampaignState(data)
        notify.success('Su orden ha sido creada correctamente')
      }
    })
  }

  return (
    <div className={styles.button}>
      <FormGroup sx={{ alignSelf: 'flex-start' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAndConditions}
              onChange={handleSetTermAndConditions}
              inputProps={{ 'aria-label': 'controlled' }}
            />
}
          label={
            <Typography>Aceptar términos y condiciones,
              <a href='https://www.google.com/' target='blank'> leer mas.</a>
            </Typography>
}
        />

      </FormGroup>
      <div className={styles.action}>
        {campaign.status === 'cancel' && (
          <Link to='/campaigns'>
            <Button variant='outlined' color='primary'>
              Salir
            </Button>
          </Link>)}
        <Button
          disabled={!termsAndConditions}
          loading={isLoading}
          variant='contained'
          onClick={handleUpdateStatus}
        >
          Generar orden de compra
        </Button>
      </div>
    </div>
  )
}

export default OrderDraftButtons
