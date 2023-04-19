import { check } from './check.js';

let isEdit = false;
let editId = null;

export default class Display {
  static getTodo = () => {
    let Todo;
    if (localStorage.getItem('todo') == null) {
      Todo = [];
    } else {
      Todo = JSON.parse(localStorage.getItem('todo'));
    }
    return Todo;
  };

  static addRemoveEvent = () => {
    const trash = document.querySelectorAll('.trash');
    trash.forEach((task, i) => {
      task.addEventListener('click', (ev) => {
        ev.preventDefault();
        this.removeTodo(i);
      });
    });
  };

  static checkEvent = () => {
    const toDos = Display.getTodo();
    const todoCheck = document.querySelectorAll('.to-do-check');
    todoCheck.forEach((task, i) => {
      const findTodo = toDos.find((item) => i === item.index);
      task.addEventListener('change', (ev) => {
        ev.preventDefault();
        if (!findTodo.completed) {
          ev.target.parentElement.style.textDecoration = 'line-through';
        } else {
          ev.target.parentElement.style.textDecoration = 'none';
        }
        check(toDos, i);
      });
    });
  };

  static removeTodo = (id) => {
    const toDos = Display.getTodo();
    toDos.splice(id, 1);
    toDos.forEach((item) => {
      if (item.index > id) {
        item.index -= 1;
      }
    });
    localStorage.setItem('todo', JSON.stringify(toDos));
    this.loadTodo(toDos);
  };

  static loadTodo = (item) => {
    const InnerTodo = document.querySelector('.todo-inner');
    let display = ' ';
    item.forEach((elem, i) => {
      const completed = elem.completed ? 'completed' : '';
      display += `
      <div class="todo-check flex">
      <div class="flex-2 checkbox ${completed}">
        <input
          type="checkbox" id="${i}" 
         class ="to-do-check"
          name="To-Do"
          value="Add" maxlength="10"/>
        <label for="todo">${elem.text}</label><br />
      </div>
      <div class= "check-icons flex-2">
      <div class="trash">
      <i class="fa-solid fa-trash" id="${i}"></i>
      </div>
      <i class="edit-btn vertical-menu fa-solid fa-ellipsis-vertical" id="${i}"></i>
      </div>
    </div>
    <hr />`;
    });
    InnerTodo.innerHTML = display;
    this.addRemoveEvent();
    this.editEvent();
    this.checkEvent();
  };

  static addTodo = () => {
    const text = document.querySelector('.type-task').value;
    if (text !== '') {
      const toDos = Display.getTodo();
      const newInput = { text, completed: false, index: toDos.length };
      const editInput = { text, completed: false, index: editId };

      if (isEdit) {
        const singleTodo = toDos.find((item, index) => index === editId);
        Object.assign(singleTodo, editInput);
        localStorage.setItem('todo', JSON.stringify(toDos));
        this.loadTodo(toDos);
        isEdit = false;
        editId = null;
        document.querySelector('.type-task').value = '';
        return;
      }
      toDos.push(newInput);
      localStorage.setItem('todo', JSON.stringify(toDos));
      this.loadTodo(toDos);
      document.querySelector('.type-task').value = '';
    }
  };

  static editTodo = (id) => {
    const toDos = Display.getTodo();
    const findTodo = toDos.find((item, index) => index === id);
    document.querySelector('.type-task').value = findTodo.text;
    isEdit = true;
    editId = id;
  };

  static editEvent = () => {
    const editButton = document.querySelectorAll('.edit-btn');
    editButton.forEach((task, i) => {
      task.addEventListener('click', (ev) => {
        ev.preventDefault();
        this.editTodo(i);
      });
    });
  };
}
