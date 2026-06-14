import React from 'react'

const FilterSection = ({filter, setFilter, totalTasks, completedTasks, remainingTasks}) => {
  return (
    <div className="filter-container">
      <button
        className={filter === "all" ? "active-filter" : ""}
        onClick={() => setFilter("all")}
      >
        All ({totalTasks})
      </button>

      <button
        className={filter === "active" ? "active-filter" : ""}
        onClick={() => setFilter("active")}
      >
        Active ({remainingTasks})
      </button>

      <button
        className={filter === "completed" ? "active-filter" : ""}
        onClick={() => setFilter("completed")}
      >
        Completed ({completedTasks})
      </button>
    </div>
  )
}

export default FilterSection