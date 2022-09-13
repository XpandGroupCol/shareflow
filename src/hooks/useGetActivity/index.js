import { ACTIVITY } from 'configs/queryKeys'
import { useSession } from 'providers/SessionProvider'
import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { getActivity } from 'services/activity'

export const useGetActivity = () => {
  const [page, setPage] = useState(1)

  const { user } = useSession()
  console.log(user?.id)
  const {
    isLoading,
    isError,
    data,
    isFetching,
    isPreviousData
  } = useQuery([ACTIVITY, page], () => getActivity(page, user?.id), {
    cacheTime: 2000,
    keepPreviousData: true
  })

  const handleSetPage = useCallback(() => {
    if (page === data?.data?.page) return
    setPage(prev => prev + 1)
  }, [page, data])

  return {
    isError,
    isLoading,
    data,
    page,
    isFetching,
    isPreviousData,
    setPage: handleSetPage
  }
}
