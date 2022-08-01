import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material'
import Button from 'components/button'
import Typography from 'components/typography'

import PriceCheckIcon from '@mui/icons-material/PriceCheck'

const ExitPaidModal = ({ open, onClose }) => {
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
      <DialogTitle fontWeight='bold'>Pago exitoso</DialogTitle>
      <Divider />
      <DialogContent sx={{ marginBottom: '30px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <PriceCheckIcon sx={{ fontSize: '80px', textAlign: 'center', marginBottom: '10px' }} color='success' />
        </Box>
        <Typography fontSize='18px' textAlign='center'>Felicitaciones, tu <Typography component='strong' fontWeight='bold' fontSize='inherit'>Flow de medios</Typography> ha sido generado y se encuentra en proceso de implementación, un ejecutivo de medios te contactará en el menor tiempo posible.</Typography>
      </DialogContent>
      <DialogActions>
        <Button type='button' onClick={onClose} variant='outlined' color='secondary'>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ExitPaidModal
