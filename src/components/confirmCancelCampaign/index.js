import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material'
import Button from 'components/button'
import Typography from 'components/typography'

const ConfirmCancelCampaign = ({ open, onClose, onSubmit, loading }) => {
  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      onClose={onClose}
      sx={{
        '&.MuiPaper-root': {
          backgroundColor: 'red'
        }
      }}
    >
      <DialogTitle fontWeight='bold'>Cancelar orden</DialogTitle>
      <Divider />
      <DialogContent sx={{ margin: '30px 0' }}>
        <Typography textAlign='center'>Estas seguro que desear cancelar la orden?</Typography>
      </DialogContent>
      <DialogActions>
        <Button type='button' onClick={onClose} variant='outlined' color='secondary'>Cancelar</Button>
        <Button loading={loading} onClick={onSubmit} variant='outlined'>Confimar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmCancelCampaign
