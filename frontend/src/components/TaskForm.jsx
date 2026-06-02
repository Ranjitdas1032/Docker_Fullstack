import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addtask } from '../../store/tasksSlice'

function TaskForm() {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    dispatch(addtask({ title, status: 'pending' }))
    setTitle('')
  }

  return (
    <form data-cy="form-display" onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        data-cy="user-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New task title"
        style={{ padding: 8, width: 300, fontSize: 14 }}
      />
      <button type="Add Task" style={{ padding: '8px 16px', marginLeft: 8 }}>
        Add Task
      </button>
    </form>
  )
}

export default TaskForm