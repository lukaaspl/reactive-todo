import React, { Component } from 'react';
import './styles/App.css';
import TaskList from './components/TaskList';

class App extends Component {
  state = {}

  render() {
    return (
      <div className="container">
        <header>
          <h1>Reactive TODO List</h1>
        </header>

        <TaskList />
      </div>
    );
  }
}

export default App;