import {  useState } from "react"
import Todos from "../components/todos/Todos"
import TodosForm from "../components/todos/TodosForm"
import TodosLength from "../Context/myContext"

// const initialData = [
//   { id: 1, title: "مازن عماد", done: false},
//   { id: 2, title: "مازن عماد", done: true},
//   { id: 3, title: "مازن عماد", done: false},
//   { id: 4, title: "مازن عماد", done: false}
// ]

const initialData = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [] 

const TodoList = () => {

  const [ todos, setTodos] = useState(initialData);

    // modes add, filter, edit
  const [ mode, setMode] = useState("add");

  const [activeTodo, setActiveTodo] = useState(null);

  // const [ tdlen, setTdlen] = useState(0);

  const setToLocale = () => {
    localStorage.setItem( 'todos',JSON.stringify(todos))
  }

  const toggleTodo = (id) => {

    const newData = todos.map( td =>{
        if (td.id === id) {
          td.done = !td.done;
        }
        return td
      })

      setTodos(newData)

    // setTodos((data) => {
    //   const newData = data.map( td =>{
    //     if (td.id === id) {
    //       // td.done = !td.done;
    //       return {...td, done: !td.done}
    //     }
    //     return td
    //   })
    //   return newData;
    // })

  }

  const deleteTodos = id => {
    setTodos((data)=>{
      const newData = data.filter(td => td.id !== id)
      return newData
    })
  }

  const addNewTodo = (title) => {
    if (mode !== 'edit') {
      const newTodo = {
        id: new Date().getTime(),
        title,
        done: false
      }

      setTodos(data=>{
        return [
          newTodo,
          ...data
        ]
      })
    } else if (mode === 'edit') {
      const newTodo = todos.map( t => {
        if (t.id === activeTodo.id) {
          t.title = title
        }
        return t
      } )
      setTodos(newTodo)
      setMode('add')
    }
  }

  const filterTodos = () => {
    if (mode === 'edit') {
      return
    }
    if (mode === "filter") {
      setMode("add")
    }else setMode("filter")
  }

  const editTodos = (todo)=>{
    setMode("edit")
    setActiveTodo(todo)
  }

  let currentTodos = [...todos]

  if(mode === "filter"){
    currentTodos = todos.filter( td => td = !td.done)
  }

  if (mode === "edit" && activeTodo) {
    currentTodos = [activeTodo]
  }

  setToLocale()

  return (
  <TodosLength.Provider value={{len:`${currentTodos.length}`}}>
    <main>
      <div className="container">
        <div className="todos">
          <TodosForm
            addNewTodo={addNewTodo}
            filterTodos={filterTodos}
            mode={mode}
            activeTodo={activeTodo}
          />
          <Todos
            todos={currentTodos} 
            mode={mode}
            tgt={toggleTodo} 
            del = {deleteTodos} 
            editTodos={editTodos}
          />
        </div>
      </div>
    </main>
    </TodosLength.Provider>
  )
}

export default TodoList