import React, {useState} from 'react';
import './App.css';
import {filterTypes, TaskType, Todolist} from './Todolist';

function App() {

    let [tasks, setTask] = useState<TaskType[]>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
    ])

    const removeTask = (taskId: number) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId);
        setTask(filteredTasks)
    }

    const [filter, setFilter] = useState<filterTypes>('all')
          switch (filter) {
              case "active":
                  tasks = tasks.filter(t => !t.isDone)
                  break
              case "completed":
                  tasks = tasks.filter(t => t.isDone)
                  break
              default:
                  break
          }

    const onSetFilter = (value: filterTypes) => {
            setFilter(value)
        }

        return (
            <div className="App">
                <Todolist title="What to learn" tasks={tasks}
                          removeTask={removeTask}
                          onSetFilter={onSetFilter}
                          filter={filter}
                />

            </div>
        );
}

export default App;
