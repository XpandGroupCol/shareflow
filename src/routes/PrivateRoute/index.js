import { Navigate } from 'react-router-dom'
import { useSession } from 'providers/SessionProvider'
import Layout from 'layout'
import LoadingPage from 'components/loadingPage'

const PrivateRoute = ({ children }) => {
  const { user, loadingPage: loading } = useSession()

  if (user === undefined || loading) return <LoadingPage />

  if (user === null) return <Navigate to='/auth/sign-in' />

  return (
    <Layout>
      {children}
    </Layout>
  )
}

export default PrivateRoute
