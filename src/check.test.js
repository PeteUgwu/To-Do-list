/** @jest-environment jsdom */

import Display from './todo';
import { check, clearCompleted } from './check';

describe('Edit task', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    localStorage.setItem.mockClear();
    document.body.innerHTML = `
  
      <div class="todo-inner"></div>
      <div class="todo-edit flex">
                <input
                  type="text"
                  class="no-outline type-task"
                  placeholder="Add to your list..."
                  value="wash clothes" 
                />
                <i class="enter-btn fa-solid fa-right-from-bracket"></i>
              </div>
  `;
    const obj1 = {
      text: "wash jay's clothes",
      completed: false,
      index: 1,
    };
    const obj2 = {
      text: "wash Val's clothes",
      completed: false,
      index: 2,
    };
    window.localStorage.setItem('todo', JSON.stringify([obj1, obj2]));
  });

  test('Edit todo object in local storage', () => {
    const editTodoOnSpy = jest.spyOn(Display, 'editTodo');
    Display.editTodo(0);
    expect(editTodoOnSpy).toHaveBeenCalledTimes(1);
    const result = JSON.parse(window.localStorage.getItem('todo'));
    expect(result.length).toBe(2);
    expect(result[0].text).toBe('wash jay\'s clothes');
  });
});

describe('completed status', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    localStorage.setItem.mockClear();
    document.body.innerHTML = `
      
          <div class="todo-inner"></div>
          <div class="todo-edit flex">
                    <input
                      type="text"
                      class="no-outline type-task"
                      placeholder="Add to your list..."
                      value="wash clothes" 
                    />
                    <i class="enter-btn fa-solid fa-right-from-bracket"></i>
                  </div>
      `;
    const obj1 = {
      text: "wash jay's clothes",
      completed: false,
      index: 1,
    };
    const obj2 = {
      text: "wash Val's clothes",
      completed: false,
      index: 2,
    };
    window.localStorage.setItem('todo', JSON.stringify([obj1, obj2]));
  });
  test('toggle completed', () => {
    const toDos = JSON.parse(window.localStorage.getItem('todo'));
    check(toDos, 1);
    const result = JSON.parse(window.localStorage.getItem('todo'));
    expect(result[0].completed).toBeTruthy();
  });
  test('toggle two completed tasks', () => {
    const toDos = JSON.parse(window.localStorage.getItem('todo'));
    check(toDos, 2);
    const result = JSON.parse(window.localStorage.getItem('todo'));
    expect(result[0].completed).toBeFalsy();
    expect(result[1].completed).toBeTruthy();
  });
});

describe('Clear completed', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    localStorage.setItem.mockClear();
    document.body.innerHTML = `
        
            <div class="todo-inner"></div>
            <div class="todo-edit flex">
                      <input
                        type="text"
                        class="no-outline type-task"
                        placeholder="Add to your list..."
                        value="wash clothes" 
                      />
                      <i class="enter-btn fa-solid fa-right-from-bracket"></i>
                    </div>
        `;
    const obj1 = {
      text: "wash jay's clothes",
      completed: true,
      index: 1,
    };
    const obj2 = {
      text: "wash Val's clothes",
      completed: true,
      index: 2,
    };
    window.localStorage.setItem('todo', JSON.stringify([obj1, obj2]));
  });
  test('Clear all completed tasks from local storage', () => {
    const toDos = JSON.parse(window.localStorage.getItem('todo'));
    const todo = clearCompleted(toDos);
    window.localStorage.setItem('todo', JSON.stringify(todo));
    const result = JSON.parse(window.localStorage.getItem('todo'));
    expect(result.length).toBe(0);
  });
  test('Clear all completed tasks from the DOM', () => {
    const toDos = JSON.parse(window.localStorage.getItem('todo'));
    const todo = clearCompleted(toDos);
    window.localStorage.setItem('todo', JSON.stringify(todo));
    // eslint-disable-next-line no-unused-vars
    const result = JSON.parse(window.localStorage.getItem('todo'));
    Display.loadTodo(todo);
    const InnerTodo = document.querySelector('.todo-inner');
    expect(InnerTodo.textContent).toBe(' ');
  });
});