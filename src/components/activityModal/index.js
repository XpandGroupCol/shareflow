import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider } from '@mui/material'

import Button from 'components/button'
import Item from 'components/activityModal/Item'
import { ACTIVITY_KEYS, ACTIVITY_VALUES } from 'configs/activityKeys'
import Typography from 'components/typography'
import styles from './activityModal.module.css'

const isObject = (value) => value && typeof value === 'object'

const getProp = (p) => ACTIVITY_KEYS[p] || p

const ActivityModal = ({ open, onClose, data = {} }) => {
  const { publishers = {}, ...restofData } = data || {}

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={onClose}
    >
      <DialogTitle fontWeight='bold' textAlign='center'>Detalle de actividad</DialogTitle>
      <Divider />
      <DialogContent>
        {Object.entries(restofData).map(([prop, value]) => {
          return (
            <div key={prop} className={isObject(value) ? '' : styles.item}>
              <Typography fontSize='16px' fontWeight='bold'>{getProp(prop)}:</Typography>
              {isObject(value)
                ? Object.entries(value).map(([p, v]) => {
                  return (
                    <Item key={p} name={getProp(p)} value={ACTIVITY_VALUES(p, v)} />
                  )
                })
                : <Typography fontSize='16px'>{ACTIVITY_VALUES(prop, value)}</Typography>}
            </div>
          )
        })}
        {Object.values(publishers).length
          ? (
            <>
              <Divider sx={{ margin: '20px 0' }} />
              <Typography fontSize='18px' fontWeight='bold' sx={{ marginBottom: '10px' }}>Publishers</Typography>
            </>)
          : null}
        {Object.entries(publishers).map(([prop, value]) => {
          return (
            <div key={prop}>
              <Typography fontSize='16px' fontWeight='bold'>{getProp(prop)}:</Typography>
              {Object.entries(value).map(([p, v]) => {
                return (
                  <Item key={p} name={getProp(p)} value={ACTIVITY_VALUES(p, v)} />
                )
              })}
            </div>
          )
        })}
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant='outlined' onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ActivityModal
