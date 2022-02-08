import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Alert
} from 'react-native';
import uuid from 'react-native-uuid';


import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const createdTask = {
      id: uuid.v4(),
      title: newTaskTitle,
      done: false,
    }


    setTasks(oldState => [...oldState, createdTask])

  }

  function handleToggleTaskDone(id: string) {
    const updatedTasks = tasks.map(task => ({...task}))
    const taskDone = updatedTasks.find(task => task.id === id)
    if(taskDone) {
      taskDone.done = !taskDone.done
    }


    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: string) {
    const removedTask = tasks.filter(tasks => tasks.id !== id)
    setTasks(removedTask)

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})