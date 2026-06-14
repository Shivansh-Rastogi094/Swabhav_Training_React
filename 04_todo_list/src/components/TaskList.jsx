import React from "react";

const TaskList = ({
  tasks,
  toggleTask,
  deleteTask,
  editRef,
  saveEdit,
  editingId,
  setEditingId,
  editValue,
  setEditValue,
}) => {
  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="task-list">

      {tasks.length === 0 && (
        <div className="empty-state">
          <svg className="empty-illustration" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h3>All caught up!</h3>
          <p>No tasks found. Add a task above to get started !</p>
        </div>
      )}

      {tasks.map((task) => {
        const isEditing = task.id === editingId;
        return (
          <div className={`task-card ${isEditing ? "editing-mode" : ""}`} key={task.id}>

            {/* Left Section */}
            <div className="task-left">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                  disabled={isEditing}
                />
                <span className="custom-checkbox">
                  {task.done && (
                    <svg className="checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
              </label>

              {isEditing ? (
                <input
                  ref={editRef}
                  className="edit-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveEdit();
                    }
                    if (e.key === "Escape") {
                      cancelEdit();
                    }
                  }}
                />
              ) : (
                <div
                  className="task-text-container"
                  onDoubleClick={() => {
                    if (!task.done) {
                      setEditingId(task.id);
                      setEditValue(task.text);
                    }
                  }}
                >
                  <span className={`task-text ${task.done ? "completed-task" : ""}`}>
                    {task.text}
                  </span>
                  {!task.done && (
                    <span className="double-click-hint">Double click to edit</span>
                  )}
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="task-actions">
              {isEditing ? (
                <>
                  <button
                    className="action-btn save-btn"
                    onClick={saveEdit}
                    title="Save changes"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </button>
                  <button
                    className="action-btn cancel-btn"
                    onClick={cancelEdit}
                    title="Cancel edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </>
              ) : (
                <button
                  className="action-btn delete-btn"
                  onClick={() => deleteTask(task.id)}
                  title="Delete task"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              )}
            </div>

          </div>
        );
      })}

    </div>
  );
};

export default TaskList;