import './style.css';
import Display from './todo';
import { clearCompleted } from './check';

const enterBtn = document.querySelector('.enter-btn');
const clearCheck = document.querySelector('.clear');

clearCheck.addEventListener('click', () => {
  const task = Display.getTodo();
  const todo = clearCompleted(task);
  localStorage.setItem('todo', JSON.stringify(todo));
  Display.loadTodo(todo);
});

window.addEventListener('DOMContentLoaded', () => {
  const task = Display.getTodo();
  Display.loadTodo(task);
});

enterBtn.addEventListener('click', () => {
  Display.addTodo();
});
