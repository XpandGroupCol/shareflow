import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const orderMedia = ({
  data = []
}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell width='40%'>Medio</TableCell>
            <TableCell width='40%'>Objetivo publicitario</TableCell>
            <TableCell width='20%' align='right'>Recurso</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ _id, label, publisher, imageUrl }) => (
            <TableRow
              key={_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{publisher}</TableCell>
              <TableCell>{label}</TableCell>
              <TableCell align='right'>
                <a href={imageUrl} target='blank'>
                  Ver recurso
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default orderMedia
