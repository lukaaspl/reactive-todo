import React from 'react';

const Task = props => {
    const { id, content, createDate, finishDate, priority, checked, finishedOn } = props.task;

    let taskClass = priority ? 'priority' : '';

    if (checked)
        taskClass = 'done';

    return (
        <div className={`task ${taskClass}`}>
            <div className="date">
                <div>Created <span>{createDate}</span></div>
                {finishDate && <div>Finish to <span>{finishDate}</span></div>}
                {checked && <div>Finished<span>{finishedOn}</span></div>}
            </div>

            <div className="content">
                {priority && <div className="priority-sign">
                    <i className="fas fa-exclamation-circle"></i>
                </div>}

                {content}
            </div>

            <nav className="task-nav">
                {!checked ?
                    <button className="done-btn" onClick={() => props.switchState(id)}>
                        <i className="fas fa-check-circle"></i>Done
                    </button> :
                    <button className="uncheck-btn" onClick={() => props.switchState(id)}>
                        <i className="fas fa-undo"></i>Uncheck
                    </button>}

                <button className="delete-btn" onClick={() => props.deleteTask(id)}>
                    <i className="fas fa-trash-alt"></i>Delete
                </button>
            </nav>
        </div>
    );
}

export default Task;