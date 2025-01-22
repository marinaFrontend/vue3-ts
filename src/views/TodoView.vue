<template>
  <div class="todo-container">
    <TodoHeader />
    <TodoList />
  </div>
</template>

<script setup lang="ts">
import TodoHeader from "@/components/todo/TodoHeader.vue";
import TodoList from '@/components/todo/TodoList.vue'
</script>
