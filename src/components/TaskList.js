import React, { Component } from 'react';
import Task from './Task';
import AddTaskForm from './AddTaskForm';
import Moment from './Moment';
import SortTaskForm from './SortTaskForm';

const moment = new Moment();

class TaskList extends Component {
    state = {
        tasks: [],
        sortBy: 'priority',
    }

    updateTasks = tasks => this.setState({ tasks });

    handleSwitchTaskState = id => {
        const updatedTasks = this.state.tasks.map(task => {
            if (id === task.id) {
                task.checked = !task.checked;
                task.priority = false;

                if (task.checked)
                    task.finishedOn = new Date().toLocaleString().slice(0, -3);
                else
                    task.finishedOn = null;
            }

            return task;
        });

        this.updateTasks(updatedTasks);
    }

    handleDeleteTask = id => {
        const updatedTasks = this.state.tasks.filter(task => {
            if (id === task.id)
                return false;

            return true;
        });

        this.updateTasks(updatedTasks);
    }

    handleAddTask = (content, finishDate, priority) => {
        const id = this.state.tasks.length > 0 ? this.state.tasks.slice(-1)[0].id + 1 : 0;
        const createDate = moment.getDateTimeLocal();

        this.setState(prevState => ({
            tasks: prevState.tasks.concat({
                id,
                content,
                createDate,
                finishDate,
                priority,
                checked: false,
            })
        }));
    }

    handleSortTask = (sortBy) => {
        this.setState({ sortBy });
    }

    render() {
        const noTaskNote = note => {
            return (
                <div className="no-task-note">
                    <i className="fas fa-bell"></i>
                    {note}
                </div>
            );
        };

        const sortTaskFunction = (...arrays) => {
            arrays.forEach(array => {
                array.sort((task1, task2) => {
                    switch (this.state.sortBy) {
                        case 'alphabetical':
                            task1 = task1.content.toLowerCase();
                            task2 = task2.content.toLowerCase();
                            return task1 < task2 ? -1 : 1;

                        case 'createDate':
                            task1 = new Date(moment.convertLocalDateToISO(task1.createDate)).getTime();
                            task2 = new Date(moment.convertLocalDateToISO(task2.createDate)).getTime();
                            return task1 < task2 ? -1 : 1;

                        default:
                            task1 = task1.priority;
                            task2 = task2.priority;

                            if (task1) return -1;
                            else if (task2) return 1;
                            return 0;
                    }
                });
            });
        };

        let tasksDone = [];
        let tasksToDo = this.state.tasks.filter(task => {
            if (!task.checked)
                return true;

            tasksDone.push(task);
            return false;
        });

        sortTaskFunction(tasksToDo, tasksDone);

        tasksDone = tasksDone.map(task => <Task key={task.id} task={task} switchState={this.handleSwitchTaskState} deleteTask={this.handleDeleteTask} />);

        tasksToDo = tasksToDo.map(task => <Task key={task.id} task={task} switchState={this.handleSwitchTaskState} deleteTask={this.handleDeleteTask} />);

        return (
            <React.Fragment>
                <SortTaskForm
                    defaultSort={this.state.sortBy}
                    sortTask={this.handleSortTask}
                />

                <h2>Tasks to do ({tasksToDo.length}):</h2>
                <div className="task-list">
                    {tasksToDo.length > 0 ? tasksToDo : (tasksDone.length === 0 ? noTaskNote('Add your first task!') : noTaskNote('You have nothing to do!'))}
                </div>

                <h2>Tasks done ({tasksDone.length}):</h2>
                <div className="task-list">
                    {tasksDone.length > 0 ? tasksDone.slice(0, 5) : noTaskNote('No task is done yet.')}
                </div>

                <AddTaskForm addTask={this.handleAddTask} />
            </React.Fragment>
        );
    }
}

export default TaskList;