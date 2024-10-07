import  {useContext}  from 'react'
import TodosLength from '../../Context/myContext'

const Header = () => {

  const tl = useContext(TodosLength);
  console.log(tl)
  return (
    <header>
      <h1> قائمة المهام ({tl.leng.len}) </h1>
    </header>
  )
}

export default Header