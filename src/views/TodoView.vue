<template>
  <div class="todo-container">
    <TodoHeader @create="openCreateDialog" />
    <TodoList />
    <TodoCreateDialog v-model="createDialogVisible"/>
  </div>
</template>

<script setup lang="ts">
import TodoHeader from "@/components/todo/TodoHeader.vue";
import TodoList from '@/components/todo/TodoList.vue';
import TodoCreateDialog from "@/components/todo/dialogs/TodoCreateDialog.vue";

import {ref} from "vue";

const createDialogVisible = ref<boolean>(false);

const openCreateDialog = () => {
  createDialogVisible.value = true;
}
</script>
