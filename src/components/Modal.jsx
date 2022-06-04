const Modal = ({ setOpenModal, title, color, children }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-screen overflow-hidden'>
      <button onClick={() => setOpenModal(false)} className='absolute w-full h-full bg-black/50' />
      <div className={`fixed w-1/2 flex-col items-center border-white border-2 gap-4 px-8 py-4 transform -translate-x-1/2 rounded-md overflow-y-auto left-1/2 top-4 bottom-4 ${color ? 'bg-' + color : 'bg-bali-200'}`}>
        <h3 className='text-2xl font-semibold text-center'>{title}</h3>
        {children}
      </div>
    </div>
  )
}

export default Modal
