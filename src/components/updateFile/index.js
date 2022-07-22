import styles from './drop.module.css'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const UpdateFile = ({ file, onDelete }) => {
  return (
    <div className={styles.file}>
      <div className={styles.text}>
        <PictureAsPdfIcon />
        <a href={file?.url} target='blank'>
          {file.name}
        </a>
      </div>
      <div className={styles.buttons}>
        <IconButton onClick={onDelete}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default UpdateFile
