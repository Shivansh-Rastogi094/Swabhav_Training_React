import { useRef, useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import NavBar from './components/NavBar'
import TaskList from './components/TaskList'
import StatsSection from './components/StatsSection'
import FilterSection from './components/FilterSection'

function App() {

  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const inputRef =useRef(null);
  const editRef = useRef(null);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
  (task) => task.done).length;
  const remainingTasks = totalTasks-completedTasks

  let visibleTasks = tasks;
  if(filter==="active"){
    visibleTasks= tasks.filter((task)=>!task.done);
  }
  if(filter==="completed"){
    visibleTasks= tasks.filter((task)=>task.done);
  }

  const toggleTask = (id) => {
        const updatedTasks = tasks.map((task)=>{
            if(task.id===id){
                return {...task,done:!task.done}

            }
            return task;
        })
        setTasks(updatedTasks);
    }
    const deleteTask=(id)=>{
      const updatedTasks = tasks.filter((task)=>{
        return task.id!==id;
      })
      setTasks(updatedTasks);
    }

    const saveEdit = () => {

    
    const updatedTasks = tasks.map((task) => {

        if(task.id === editingId){

            return {
                ...task,
                text: editValue
            };
        }

        return task;
    });

    setTasks(updatedTasks);

    setEditingId(null);

    setEditValue("");
};

    useEffect(() => {

    if(editingId !== null){

        editRef.current?.focus();
    }

}, [editingId]);

  return (
    <div className="app-container">

    <NavBar 
    tasks={tasks} setTasks={setTasks} 
    inputValue={inputValue} setInputValue={setInputValue} inputRef={inputRef}/>

    <StatsSection 
    totalTasks={totalTasks}
    completedTasks={completedTasks} 
    remainingTasks={remainingTasks}/>
    
    <FilterSection filter={filter} 
    setFilter={setFilter}
    totalTasks={totalTasks}
    completedTasks={completedTasks} 
    remainingTasks={remainingTasks}/>

    <TaskList tasks={visibleTasks} setTasks={setTasks} 
    toggleTask={toggleTask} deleteTask={deleteTask}
    editRef={editRef}
    editingId={editingId}
    setEditingId={setEditingId}
    editValue={editValue}
    setEditValue={setEditValue}
    saveEdit={saveEdit}/>


    </div>
  )
}
export default App
