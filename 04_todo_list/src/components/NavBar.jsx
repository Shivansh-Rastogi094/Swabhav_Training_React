import React from 'react'

const NavBar = ({tasks, setTasks, inputValue, setInputValue, inputRef}) => {

  const handleAddTask = () => {    
    if (inputValue.trim() === "")
      return;
    
    const newTask = {
      id: Date.now(),
      text: inputValue,
      done: false
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
    inputRef.current?.focus();
  }

  return (
    <div className='header'>
      <div className='header-content'>
        <h3 className="header-title-text">Task Workspace</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="date-badge">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
          <div className="user-badge">
            <div className="user-avatar">SR</div>
            <span className="user-name">Shivansh Rastogi</span>
          </div>
        </div>
      </div>
      
      <div className="intro">
        <h5>Hello, Shivansh</h5>
        <h2>Manage Your Day</h2>
        
        <div className="input-box">
          <div className="input-wrapper">
            <input 
              type="text" 
              id='input-target'
              ref={inputRef} 
              placeholder='Add a new task...' 
              value={inputValue} 
              onChange={(e) => { setInputValue(e.target.value) }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTask();
                }
              }}
            />
            <span className="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </span>
          </div>
          <button id='input-btn' onClick={handleAddTask}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Task
          </button>
        </div>
      </div>
    </div>
  )
}

export default NavBar