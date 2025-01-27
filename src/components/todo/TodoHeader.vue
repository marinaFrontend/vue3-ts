<template>
  <div class="mb-5">
    <v-row align="center">
      <v-col cols="12" sm="auto">
        <TodoCreateButton @click="$emit('create')"/>
      </v-col>
      <v-col cols="12" sm="auto">
        <TodoClearButton @click="openConfirmDeleteDialog" />
      </v-col>
    </v-row>
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
