import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getById } from '../features/project/projectSlice'

const Project = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const project = useSelector(state => state.project)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getById(id))
      .then(() => {
        console.log(project)
        if (!project.exists || !project.members.some(el => el._id === user.id)) return navigate('/dashboard')
      })
  }, [])

  return (
    <div className='flex flex-col gap-4 p-4 rounded-lg bg-bali-500'>
      <h2 className='text-3xl font-bold text-bali-900'>{project.name}</h2>
    </div>
  )
}

export default Project
