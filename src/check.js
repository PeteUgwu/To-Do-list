export const check = (todo, id) => {
  const findTodo = todo.find((item) => id === item.index);
  findTodo.completed = !findTodo.completed;
  localStorage.setItem('todo', JSON.stringify(todo));
};

export const clearCompleted = (todo) => {
  const filterTodo = todo.filter((item) => {
    if (item.completed !== true) {
      return item;
    }
    return false;
  });
  filterTodo.forEach((elem, i) => {
    elem.index = i;
  });
  return filterTodo;
};
