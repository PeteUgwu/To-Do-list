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
