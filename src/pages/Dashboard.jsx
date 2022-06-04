import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProjectsDash from '../components/ProjectsDash'
import ProfileDash from '../components/ProfileDash'
import { logout } from '../features//userSlice'

const Dashboard = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    document.title = 'Kanvally - Dashboard'
  }, [])

  const onLogout = () => {
    dispatch(logout())
      .then(res => {
        return navigate('/')
      })
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 p-2 text-white rounded-lg bg-bali-500'>
        <button
          className='px-2 py-1 font-bold border border-white rounded-lg bg-crimson-500 hover:bg-crimson-400'
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
        <button
          className='px-2 py-1 font-bold border border-white rounded-lg bg-crimson-500 hover:bg-crimson-400'
          onClick={() => setVisible(0)}
        >
          Mis proyectos
        </button>
        <button
          className='px-2 py-1 font-bold border border-white rounded-lg bg-crimson-500 hover:bg-crimson-400'
          onClick={() => setVisible(1)}
        >
          Mi perfil
        </button>
      </div>

      <div>
        {visible ? <ProfileDash user={user} /> : <ProjectsDash user={user} />}
      </div>
    </div>
  )
}

export default Dashboard
