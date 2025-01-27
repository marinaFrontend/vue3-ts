<template>
  <v-list-item :value="data">
    <template #default>
      <v-card flat color="grey-darken-3">
        <figure v-if="data.file" class="d-flex align-center" :style="{width: '100%', height: '100px'}">
          <img src="#" width="100%" height="100%"  alt="" class="todo-image" style="object-fit: cover;" />
        </figure>

        <v-card-title>
          <span :class="{'text-decoration-line-through text-grey': data.isDone}">{{ data.title }}</span>
        </v-card-title>

        <v-card-subtitle>
          <span :class="{'text-decoration-line-through': data.isDone}">{{ data.subtitle }}</span>
        </v-card-subtitle>

        <v-card-actions></v-card-actions>
      </v-card>
    </template>
    <template #prepend>
      <v-checkbox-btn v-model="doneModel" :disabled="store.isLoading" @click="toggleItem(data)" />
    </template>
    <template #append>
      <TodoDeleteButton @click="$emit('delete')" />
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import { useTodoStore } from '@/stores/todo'
import type {TodoItemType} from '@/types/todoTypes';
import TodoDeleteButton from "./buttons/TodoDeleteButton.vue";

const store = useTodoStore();

const props = defineProps<{
  data: TodoItemType
}>()

const doneModel = ref<boolean>(false);

async function toggleItem(item: TodoItemType) {
  await store.toggleTodoItem(item);
  doneModel.value = item.isDone;
}

const previewFile = (file) => {
  const preview = document.querySelector('.todo-image');
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      preview.src = reader.result;
    },
    false,
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

onMounted(() => {
  if (props.data) {
    doneModel.value = props.data.isDone;
    previewFile(props.data.file);
  }
})
</script>
