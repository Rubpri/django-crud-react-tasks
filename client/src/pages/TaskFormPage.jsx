import React, { useEffect } from "react";
import  { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";

function TaskFormPage() {
    
  const {register, handleSubmit, formState: {errors}, setValue } = useForm();

  const navigate = useNavigate();
  const params = useParams();
  // console.log(params)

  const onSubmit = handleSubmit(async data => {
    if (params.id) {
      await updateTask(params.id, data);
      console.log('Actualizando')
    } else {
      await createTask(data);
    }
    navigate("/tasks");
  });
  
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const {data} = await getTask(params.id);
        setValue('title', data.title);
        setValue('description', data.description);
      }
    }
    loadTask();
  }, []);

  return (
      <div>

        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            placeholder="Título" 
            {...register("title", { required: true })}
          />
          {errors.title && <span>Este campo es requerido</span>}

          <textarea 
            rows="3" 
            placeholder="Descripción"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && <span>Este campo es requerido</span>}

          <button>Guardar</button>
        </form>

        {params.id && <button onClick={async () => {
          const accepted = window.confirm('¿Estás seguro?')
          if (accepted) {
            await deleteTask(params.id);
            navigate("/tasks");
          }
        }}>Eliminar</button>}

      </div>
    )
  }
  
  export default TaskFormPage