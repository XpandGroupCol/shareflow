import { ACTIVITY } from 'configs/queryKeys'
import { useSession } from 'providers/SessionProvider'
import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { getActivity } from 'services/activity'

export const useGetActivity = () => {
  const [page, setPage] = useState(1)

  const { user } = useSession()
  const {
    isLoading,
    isError,
    data,
    isFetching,
    isPreviousData
  } = useQuery([ACTIVITY, page], () => getActivity(page, user?.id), {
    staleTime: 5000,
    keepPreviousData: true
  })

  const handleNextPage = useCallback(() => {
    if (page === data?.pages) return
    setPage(prev => prev + 1)
  }, [page, data])

  const handlePrevPage = useCallback(() => {
    setPage(prev => prev - 1)
  }, [])

  return {
    isError,
    isLoading,
    data,
    page,
    isFetching,
    isPreviousData,
    getMore: handleNextPage,
    noMore: page === data?.pages,
    getPrevius: handlePrevPage
  }
}
