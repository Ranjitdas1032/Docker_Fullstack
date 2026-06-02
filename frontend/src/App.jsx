import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchtasks } from '../store/tasksSlice'
import TaskForm from '../src/components/TaskForm'
import TaskList from '../src/components/TaskList'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchtasks())
  }, [dispatch])

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <h1 data-cy="header">TaskFlow</h1>
      <p data-cy="sub-header" style={{ color: '#666', fontSize: 14 }}>Django + Redux + Redis + Docker</p>
      <TaskForm />
      <TaskList />
    </div>
  )
}

export default App