import { Link } from 'react-router-dom'

import Button from 'components/button'

import Typography from 'components/typography'

import { LogoIcon } from 'assets/icons'
import styles from './home.module.css'
import WelcomeForm from 'components/welcomeForm'

const WebPage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <LogoIcon fill='#4b494f' />
        <Link to='/auth/sign-in'>
          <Button component='span' variant='outlined' sx={{ borderRadius: '40px' }}>
            Ingresar
          </Button>
        </Link>
      </header>
      <main className={styles.main}>
        <div>
          <Typography
            component='h1'
            fontWeight='bold'
          >
            Tu campaña de medios digitales, en minutos
          </Typography>
          <Typography>
            Adquiere tus clientes a través de campañas de Display y Video en los medios y plataformas más importantes del país.
          </Typography>
        </div>
        <WelcomeForm />
      </main>
    </div>
  )
}

export default WebPage
