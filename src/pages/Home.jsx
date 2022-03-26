const Home = () => {
  document.title = 'Kanvally'

  return (
    <div className='flex flex-col items-center gap-16 text-bali-900'>

      <div className='text-center'>
        <h1 className='font-black text-8xl'>KANVALLY</h1>
        <p className='text-xl'>La solución para tus proyectos de software.</p>
      </div>

      <div className='grid grid-cols-3 text-center text-black select-none gap-x-4'>
        <h3 className='p-2 text-2xl font-bold bg-red-600 border-4 border-red-600'>Por hacer</h3>
        <h3 className='p-2 text-2xl font-bold bg-yellow-500 border-4 border-yellow-500'>Haciendo</h3>
        <h3 className='p-2 text-2xl font-bold bg-green-600 border-4 border-green-600'>Hecho</h3>

        <p className='h-24 p-2 my-auto text-lg font-semibold border-b-4 border-red-600 bg-white/50 border-x-4'>Iniciar un proyecto</p>
        <p className='h-24 p-2 my-auto text-lg font-semibold border-b-4 border-yellow-500 bg-white/50 border-x-4'>Completar las tareas</p>
        <p className='h-24 p-2 my-auto text-lg font-semibold border-b-4 border-green-600 bg-white/50 border-x-4'>Triunfar</p>
      </div>

      <div className='p-4 text-2xl border-4 border-black rounded-lg'>
        <h3>Historias de éxito:</h3>
        <p>Todavía ninguna...</p>
      </div>

    </div>
  )
}

export default Home
