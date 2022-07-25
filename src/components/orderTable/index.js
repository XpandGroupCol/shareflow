import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { getFormatedNumber } from 'utils/normalizeData'

const OrderTable = ({
  data = [], summary = {}, target
}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 800 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell width='20%' sx={{ fontWeight: 'bold' }}>Medio</TableCell>
            <TableCell width='20%' sx={{ fontWeight: 'bold' }}>Objetivo publicitario</TableCell>
            <TableCell width='20%' sx={{ fontWeight: 'bold' }}>Formato</TableCell>
            <TableCell width='8%' align='right' sx={{ fontWeight: 'bold' }}>Share</TableCell>
            <TableCell width='8%' align='right' sx={{ fontWeight: 'bold' }}>C/U</TableCell>
            <TableCell width='8%' align='right' sx={{ fontWeight: 'bold' }}>KPI</TableCell>
            <TableCell width='8%' align='center' sx={{ fontWeight: 'bold' }}>Tipo de compra</TableCell>
            <TableCell width='8%' align='right' sx={{ fontWeight: 'bold' }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ _id, label, objectiveGoal, biddingModel, pricePerUnit, share, publisher, value }) => (
            <TableRow
              key={_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{publisher}</TableCell>
              <TableCell>{target}</TableCell>
              <TableCell>{label}</TableCell>
              <TableCell align='right'>{share}%</TableCell>
              <TableCell align='right'>${getFormatedNumber(pricePerUnit)}</TableCell>
              <TableCell align='right'>{getFormatedNumber(objectiveGoal)}</TableCell>
              <TableCell align='center'>{biddingModel}</TableCell>
              <TableCell align='right'>{getFormatedNumber(value)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={5} />
            <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Valor bruto a invertir:</TableCell>
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>${getFormatedNumber(summary?.grossValue)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} />
            <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Tarifa de servicio:</TableCell>

            <TableCell align='right' sx={{ fontWeight: 'bold' }}>${getFormatedNumber(summary?.serviceFee)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} />
            <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Total:</TableCell>
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>${getFormatedNumber(summary?.grossValue + summary?.serviceFee)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderTable
