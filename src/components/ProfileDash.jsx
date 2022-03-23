const ProfileDash = ({ user }) => {
  return (
    <div className='flex flex-col p-4 rounded-lg bg-bali-500'>
      <h2 className='text-3xl font-bold'>Perfil</h2>
      <div className='px-4 text-xl'>
        <p>Usuario: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>{user.firstname ? `Nombre: ${user.firstname}` : <></>}</p>
        <p>{user.lastname ? `Apellido: ${user.lastname}` : <></>}</p>
        {user.role === 0 ? <p>Debes verificar tu email para poder utilizar las funciones de la web.</p> : <></>}
      </div>
    </div>
  )
}

export default ProfileDash
