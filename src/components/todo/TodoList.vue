<template>
  <div>
    <v-skeleton-loader v-if="store.isFetching" :type="`sentences@${store.data.length || '3'}`" />
    <template v-else>
      <v-list v-if="store.isReady && store.data.length">
        <TodoItem v-for="item in store.data" :key="item.id" :data="item" @delete="openConfirmDeleteDialog(item)" />
      </v-list>
      <p v-else>{{ noDataMsg }}</p>
    </template>
    <TodoConfirmDialog
      v-model="confirmDeleteDialogVisible"
      title="Удалить задачу?"
      button="Да, удалить"
      @confirm="onDeleteItem"
    />
  </div>
</template>

<script setup lang="ts">
import TodoItem from '@/components/todo/TodoItem.vue'
import TodoConfirmDialog from '@/components/todo/dialogs/TodoConfirmDialog.vue'

import { ref, onMounted } from 'vue';
import { useTodoStore } from '@/stores/todo'
import {TodoItemType} from "@/types/todoTypes";

const store = useTodoStore();

const confirmDeleteDialogVisible = ref<boolean>(false);
const noDataMsg = ref('Нет ни одного элемента');
const seletedItem = ref<TodoItemType>({});

async function getTodoList() {
  await store.getTodoList()
}

const openConfirmDeleteDialog = (item) => {
  confirmDeleteDialogVisible.value = true;
  seletedItem.value = item;
}

async function onDeleteItem() {
  await store.deleteTodoItem(seletedItem.value);
  confirmDeleteDialogVisible.value = false;
}

onMounted(() => {
  getTodoList();
});
</script>
