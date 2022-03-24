const Modal = ({ setOpenModal, title, children }) => {
  return (
    <div className='absolute top-0 left-0 w-screen min-h-screen'>
      <button onClick={() => setOpenModal(false)} className='absolute w-full h-full bg-black/50' />
      <div className='fixed flex flex-col gap-4 px-8 py-4 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-max left-1/2 top-1/2 bg-bali-200'>
        <h3 className='text-2xl font-semibold text-center'>{title}</h3>
        {children}
      </div>
    </div>
  )
}

export default Modal
