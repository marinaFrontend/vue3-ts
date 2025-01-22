import {defineStore} from 'pinia'
import {clearList, createItem, deleteItem, getList, toggleItem} from '@/api/todo'

import type {TodoItemType} from '@/types/todoTypes'

interface IState {
  data: TodoItemType[]
  isReady: boolean
  isFetching: boolean,
  isLoading: boolean,
  error: any
}

export const useTodoStore = defineStore('todoStore', {
  state: (): IState => ({
    data: [],
    isReady: false,
    isFetching: false,
    isLoading: false,
    error: undefined
  }),
  actions: {
    async getTodoList(forse?: boolean) {
      if (forse || !this.isReady) {
        this.isFetching = true;
        this.error = undefined;

        try {
          this.data = await getList();
          this.isReady = true;
        } catch (err: any) {
          this.error = {
            code: err.response?.status || 500,
            message: err.message || 'Api Error'
          }
        } finally {
          this.isFetching = false
        }
      }
    },
    async createTodoItem(item: TodoItemType) {
        this.isLoading = true;
        this.error = undefined;

        try {
          const response = await createItem(item);
          this.data.push(response);

        } catch (err: any) {
          this.error = {
            code: err.response?.status || 500,
            message: err.message || 'Api Error'
          }
        } finally {
          this.isLoading = false
        }
    },
    async deleteTodoItem(item: TodoItemType) {
        this.isLoading = true;
        this.error = undefined;

        try {
          const response = await deleteItem(item);
          const findIndex = this.data.indexOf(response);
          if (findIndex > -1) this.data.splice(findIndex, 1);

        } catch (err: any) {
          this.error = {
            code: err.response?.status || 500,
            message: err.message || 'Api Error'
          }
        } finally {
          this.isLoading = false
        }
    },
    async toggleTodoItem(item: TodoItemType) {
      this.isLoading = true;
      this.error = undefined;

      try {
        const response = await toggleItem(item);
        const findIndex = this.data.indexOf(response);
        if (findIndex > -1) this.data[findIndex].isDone = !this.data[findIndex].isDone

      } catch (err: any) {
        this.error = {
          code: err.response?.status || 500,
          message: err.message || 'Api Error'
        }
      } finally {
        this.isLoading = false
      }
    },
    async clearTodoList() {
      this.isLoading = true;
      this.error = undefined;

      try {
        await clearList();
        this.data = [];

      } catch (err: any) {
        this.error = {
          code: err.response?.status || 500,
          message: err.message || 'Api Error'
        }
      } finally {
        this.isLoading = false
      }
    }
  }
})
