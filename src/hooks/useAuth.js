import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { currentUser } from '../redux/slices'

export const useAuth = () => {
  const auth = useSelector(currentUser)

  return useMemo(() => ({ auth }), [auth])
}
