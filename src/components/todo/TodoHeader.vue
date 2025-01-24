<template>
  <div class="d-flex align-center mb-5">
    <TodoCreateButton class="me-2" @click="$emit('create')"/>
    <TodoClearButton />
  </div>
</template>

<script setup lang="ts">
import TodoCreateButton from "@/components/todo/buttons/TodoCreateButton.vue";
import TodoClearButton from "@/components/todo/buttons/TodoClearButton.vue";
</script>
