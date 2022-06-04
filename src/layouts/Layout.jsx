import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Layout = () => {
  const user = useSelector(state => state.user)

  return (
    <div className='flex flex-col gap-2 pb-4'>

      <header className='text-white bg-ebony-clay-500'>
        <nav className='flex flex-col justify-between px-8 text-2xl font-semibold sm:flex-row'>
          <NavLink className='h-full p-2 hover:bg-ebony-clay-300' to='/'>Kanvally</NavLink>
          <div className='flex items-center gap-2'>
            <NavLink className='h-full p-2 hover:bg-ebony-clay-300' to={-1} replace>Volver</NavLink>
            {
            user.logged
              ? <NavLink className='h-full p-2 hover:bg-ebony-clay-300' to='/dashboard'>Mi dashboard</NavLink>
              : <NavLink className='h-full p-2 hover:bg-ebony-clay-300' to='/login'>Iniciar sesión</NavLink>
          }
          </div>
        </nav>
      </header>

      <main className='px-8'>
        <Outlet />
      </main>

      {/* <footer className='flex justify-center p-1 font-semibold bg-black'>
        <h2>Kanvally</h2>
      </footer> */}
    </div>
  )
}

export default Layout
