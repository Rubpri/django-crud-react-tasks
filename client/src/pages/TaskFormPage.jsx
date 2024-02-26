import React, { useEffect, useState } from "react";
import  { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getAllTasks } from "../api/tasks.api";

function TaskFormPage() {
    
  const {register, handleSubmit, formState: {errors}, setValue } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const [tasksCount, setTasksCount] = useState(0)


  const onSubmit = handleSubmit(async data => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success('Tarea actualizada');  
    } else {
      await createTask(data);
      toast.success('Tarea creada');
    }
    navigate("/");
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


  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      setTasksCount(res.data.length);
    }
    loadTasks();
  }, [])

  return (
      <div className="max-w-xl mx-auto">

        <form onSubmit={onSubmit}>
        
          <input
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3" 
            type="text" 
            placeholder="Título" 
            {...register("title", { required: true })}
          />
          {errors.title && <span>Este campo es requerido</span>}

          <textarea
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3" 
            rows="3" 
            placeholder="Descripción"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && <span>Este campo es requerido</span>}

          <p>Tienes {tasksCount} tareas de 20 disponibles.</p>

          <button
            className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
            Guardar
          </button>
        </form>

        {params.id && 
          <div className="flex justify-end">
          <button 
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
            const accepted = window.confirm('¿Estás seguro?')
            if (accepted) {
              await deleteTask(params.id);
              toast.success('Tarea eliminada');
              navigate("/tasks");
            }
            }}
          >
            Eliminar
          </button>
        </div>
        }
        
      </div>
    )
  }
  
  export default TaskFormPage