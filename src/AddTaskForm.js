import React, { Component } from 'react';
import Moment from './Moment';

const moment = new Moment();
const dateNowISO = moment.getDateISO();
const timeNowISO = moment.getTimeISO();

class AddTaskForm extends Component {
    defaultState = {
        taskContent: '',
        taskFinishDate: '',
        taskFinishTime: '',
        taskPriority: false,
        errors: [],
        formShown: true,
    }

    state = this.defaultState;

    handleChange = e => {
        let value = e.target.value;

        if (e.target.type === 'checkbox')
            value = e.target.checked;

        this.setState({
            [e.target.name]: value
        });
    }

    handleValidate(e, taskContent, taskFinishDate, taskFinishTime, taskPriority) {
        e.preventDefault();

        if (taskContent.length < 1) {
            this.setState({
                errors: this.state.errors.concat('taskContent'),
            });

            return false;
        }

        let taskFinishDateTimeLocal = '';

        if (taskFinishDate || taskFinishTime) {
            taskFinishDate = taskFinishDate ? taskFinishDate : dateNowISO;
            taskFinishTime = taskFinishTime ? taskFinishTime : timeNowISO;

            const enteredDateTimeUnix = new Date(`${taskFinishDate}, ${taskFinishTime}`).getTime();
            const dateTimeNowUnix = new Date(`${dateNowISO}, ${timeNowISO}`).getTime();

            if (enteredDateTimeUnix < dateTimeNowUnix) {
                this.setState({
                    errors: this.state.errors.concat('taskFinishTime'),
                });

                return false;
            }

            taskFinishDateTimeLocal = new Date(`${taskFinishDate}, ${taskFinishTime}`)
                .toLocaleString()
                .slice(0, -3);
        }

        this.props.addTask(taskContent, taskFinishDateTimeLocal, taskPriority);
        this.setState(this.defaultState);
    }

    handleFormResize = () => {
        this.setState({
            formShown: !this.state.formShown,
        })
    }

    render() {
        const { taskContent, taskFinishDate, taskFinishTime, taskPriority, errors } = this.state;

        return (
            <div className={`add-task-form ${!this.state.formShown ? 'minimized' : ''}`}>
                <form onSubmit={e => this.handleValidate(
                    e,
                    taskContent,
                    taskFinishDate,
                    taskFinishTime,
                    taskPriority)
                }>
                    <input
                        name="taskContent"
                        type="text"
                        placeholder="enter your task..."
                        value={taskContent}
                        onChange={this.handleChange}
                        className={errors.indexOf('taskContent') > -1 ? 'input-error' : ''}
                        autoComplete="off"
                    />

                    <div className="options">
                        <div className="datetime">
                            <span>Finish to:</span>
                            <input
                                name="taskFinishDate"
                                type="date"
                                value={taskFinishDate}
                                min={dateNowISO}
                                max="2999"
                                onChange={this.handleChange}
                            />

                            <input
                                name="taskFinishTime"
                                type="time"
                                value={taskFinishTime}
                                onChange={this.handleChange}
                                className={errors.indexOf('taskFinishTime') > -1 ? 'input-error' : ''}
                            />
                        </div>

                        <div className="priority-checkbox">
                            <input type="checkbox"
                                id="taskPriority"
                                name="taskPriority"
                                checked={taskPriority}
                                onChange={this.handleChange}
                            />
                            <span>
                                <label htmlFor="taskPriority">Priority</label>
                            </span>
                        </div>

                        <button type="submit">Add</button>
                    </div>
                </form>
                <button
                    className="form-resize"
                    onClick={this.handleFormResize}
                >{
                        this.state.formShown ?
                            <i className="fas fa-arrow-circle-down"></i> :
                            <i className="fas fa-arrow-circle-up"></i>}
                </button>
            </div>
        );
    }
}

export default AddTaskForm;