/** @jest-environment jsdom */

import Display from "./todo.js";

describe("Add new task", () => {
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
  });

  test("Adding todo object to the local storage", () => {
    const addTodoOnSpy = jest.spyOn(Display, "addTodo");
    const InnerTodo = document.querySelector(".todo-inner");
    Display.addTodo();
    expect(addTodoOnSpy).toHaveBeenCalledTimes(1);
    const result = JSON.parse(window.localStorage.getItem("todo"));
    expect(result.length).toBe(1);
    expect(result[0].text).toBe("wash clothes");
  });

  test("Adding task to the DOM", () => {
    const addTodoOnSpy = jest.spyOn(Display, "addTodo");
    Display.addTodo();
    expect(addTodoOnSpy).toHaveBeenCalledTimes(1);
    const result = document.querySelector(".to-do-check");
    expect(result).toBeDefined();
  });
});

describe("Delete task item", () => {
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
    window.localStorage.setItem("todo", JSON.stringify([obj1, obj2]));
  });
  test("Remove task from local storage", () => {
    const removeTodoOnSpy = jest.spyOn(Display, "removeTodo");
    Display.removeTodo(1);
    expect(removeTodoOnSpy).toHaveBeenCalledTimes(1);
    let result = JSON.parse(window.localStorage.getItem("todo"));
    expect(result).toHaveLength(1);
  });

  test("Remove two tasks from local storage", () => {
    const removeTodoOnSpy = jest.spyOn(Display, "removeTodo");
    Display.removeTodo(0);
    Display.removeTodo(0);
    expect(removeTodoOnSpy).toHaveBeenCalledTimes(2);
    let result = JSON.parse(window.localStorage.getItem("todo"));
    expect(result).toHaveLength(0);
  });

  test("Remove tasks from the DOM", () => {
    const removeTodoOnSpy = jest.spyOn(Display, "removeTodo");
    Display.removeTodo(0);
    Display.removeTodo(0);
    expect(removeTodoOnSpy).toHaveBeenCalledTimes(2);
    let result = document.querySelector(".to-do-check");
    expect(result).toBeNull();
  });
});
