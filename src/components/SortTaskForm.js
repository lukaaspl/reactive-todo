import React, { Component } from 'react';

class SortTaskForm extends Component {
    state = {
        sortBy: this.props.defaultSort,
    }

    handleChangeSelect = e => {
        this.setState({
            sortBy: e.target.value
        });

        this.props.sortTask(e.target.value);
    }

    render() {
        return (
            <div className="sort-task-form" >
                <label htmlFor="sort-task-form">Sort tasks by:</label>
                <select
                    name="sort-task-form"
                    id="sort-task-form"
                    onChange={this.handleChangeSelect}
                    value={this.state.sortBy}
                >
                    <option value="priority">Priority</option>
                    <option value="createDate">Create date</option>
                    <option value="alphabetical">Alphabetical</option>
                </select>
            </div>
        )
    }
}

export default SortTaskForm;