import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const user = useSelector(state => state.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user.loading && !user.logged) {
      return <Navigate to='/' replace />
    } else {
      return setLoading(false)
    }
  }, [user.loading])
  return (
    <>
      {
        loading
          ? <h1 className='text-4xl font-black'>Cargando...</h1>
          : <Outlet />
      }
    </>
  )
}

export default ProtectedRoute
