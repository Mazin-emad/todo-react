import React, { useState } from 'react'
import FeatherIcons from "feather-icons-react"



const TodosForm = ({ addNewTodo, filterTodos, mode, activeTodo}) => {

  const [ title, setTitle] = useState("")

  const [editRerender, setEditRender] = useState(false)

  if (mode === 'edit' && !editRerender) {
    setTitle(activeTodo.title)
    setEditRender(true)
  }

  const handelInputChange = (e) =>{
    setTitle(e.target.value)
  }

  const handelAddNewTodo = () => {
    setEditRender(false)
    if(!title.trim()){
      return
    }
    addNewTodo(title)
    
    setTitle("")
  }

  return (
    <div className='todos-form'>

      <div className={`todos-form_icon ${mode === "filter" ? "active" : ""}`} onClick={filterTodos}>
        <FeatherIcons icon='circle'/>
      </div>

      <div className='todos-form_form'>
        <input type='text' placeholder='اضف مهمة جديدة ...' onChange={handelInputChange} value={title}/>
      </div>

      <div className='todos-form_submit'>
        <button className='btn' disabled={!title.trim()} onClick={handelAddNewTodo} >
          {
          mode === 'edit' ? 
          "تعديل..."
          :
          "اضافة"
        }
          </button>
      </div>

    </div>
  )

}

export default TodosForm