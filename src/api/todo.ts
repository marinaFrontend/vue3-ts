import type {TodoItemType} from '@/types/todoTypes'

const initList: TodoItemType[] = [
  { id: 1, title: 'Task 1', subtitle: 'This is a subtitle', isDone: false },
  { id: 2, title: 'Task 2', subtitle: null, isDone: false },
  { id: 3, title: 'Task 3', subtitle: 'This is a longer subtitle', isDone: false },
]

export const getList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Get init list');
      resolve(initList);
    }, 1000);
  });
}

export const createItem = (item: TodoItemType) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Item created:', item);
      resolve(item);
    }, 1000);
  });
}

export const deleteItem = (item: TodoItemType) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Item deleted:', item);
      resolve(item);
    }, 1000);
  });
}

export const toggleItem = (item: TodoItemType) => {
  return new Promise((resolve) => {
      console.log('Item toggle:', item);
      resolve(item);
  });
}

export const clearList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Clear list');
      resolve();
    }, 1000);
  });
}
