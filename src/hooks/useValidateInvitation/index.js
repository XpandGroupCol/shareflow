import { INVITATION } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getValidateInvitation } from 'services/auth'

export const useValidateInvitation = (token) => {
  const { isError, isLoading, data } = useQuery([INVITATION, token],
    () => getValidateInvitation(token), {
      cacheTime: 0
    })

  return {
    isError,
    isLoading,
    data
  }
}
