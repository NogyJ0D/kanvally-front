import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Layout = () => {
  const user = useSelector(state => state.user)

  return (
    <div className='flex flex-col min-h-screen gap-2'>
      <header className='text-white bg-ebony-clay-500'>
        <nav className='flex flex-col justify-between px-8 text-2xl font-semibold sm:flex-row'>
          <NavLink className='h-full p-2 hover:bg-ebony-clay-300' to='/'>Kanvally</NavLink>
          {
            user.logged
              ? <NavLink className='h-full p-2 hover:bg-ebony-clay-300' to='/dashboard'>Mi dashboard</NavLink>
              : <NavLink className='h-full p-2 hover:bg-ebony-clay-300' to='/login'>Iniciar sesión</NavLink>
          }
        </nav>
      </header>

      <main className='flex-1 px-8'>
        <Outlet />
      </main>

      {/* <footer className='flex justify-center p-1 font-semibold bg-black'>
        <h2>Kanvally</h2>
      </footer> */}
    </div>
  )
}

export default Layout
