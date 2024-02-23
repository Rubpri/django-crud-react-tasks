import React from 'react'
import { useNavigate } from "react-router-dom"

function TaskCard({ task }) {
  
  const navigate = useNavigate();

  return (
    <div 
      style={{background: "#101010"}}
      onClick={() => {
        navigate('/tasks/' + task.id)
      }}
    >
          <h1>{task.title}</h1>
          <p>{task.description}</p>
    </div>
  )
}

export default TaskCard
