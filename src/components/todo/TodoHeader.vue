<template>
  <div class="d-flex align-center mb-5">
    <TodoCreateButton class="me-2" @click="$emit('create')"/>
    <TodoClearButton @click="openConfirmDeleteDialog" />
    <TodoConfirmDialog
      v-model="confirmDeleteDialogVisible"
      title="Удалить все задачи?"
      button="Да, удалить"
      @confirm="onClearList"
    />
  </div>
</template>

<script setup lang="ts">
import TodoCreateButton from "@/components/todo/buttons/TodoCreateButton.vue";
import TodoClearButton from "@/components/todo/buttons/TodoClearButton.vue";
import TodoConfirmDialog from '@/components/todo/dialogs/TodoConfirmDialog.vue';

import { useTodoStore } from '@/stores/todo'
import {ref} from "vue";

const store = useTodoStore();

const confirmDeleteDialogVisible = ref<boolean>(false);

const openConfirmDeleteDialog = () => {
  confirmDeleteDialogVisible.value = true;
}

async function onClearList() {
  await store.clearTodoList();
  confirmDeleteDialogVisible.value = false;
}
</script>
