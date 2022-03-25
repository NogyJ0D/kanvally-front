import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getTeamById } from '../features/team/teamSlice'

const Team = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const team = useSelector(state => state.team)
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTeamById(id))
      .then((res) => {
        if (!res.payload?.members?.some(member => member._id === user.id) || res.error) navigate('/dashboard')
      })
  }, [])

  return (
    <div>{id}</div>
  )
}

export default Team
