import LoadingPage from 'components/loadingPage'
import SignUpForm from 'components/signUpForm'
import { useValidateInvitation } from 'hooks/useValidateInvitation'
import { Navigate, useParams } from 'react-router-dom'

const SignUpPage = () => {
  const { token } = useParams()

  const { data, isLoading, isError } = useValidateInvitation(token)

  if (isLoading) return <LoadingPage text='Verificando invitación . . .' />

  if (isError) return <Navigate to='/not-found' />

  return (
    <SignUpForm user={data?.data} />
  )
}

export default SignUpPage
