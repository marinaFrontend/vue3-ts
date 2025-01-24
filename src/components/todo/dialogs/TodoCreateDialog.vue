<template>
  <v-dialog
    v-model="modelValue"
    width="500"
    @update:modelValue="resetForm"
  >
    <v-card
      prepend-icon="mdi-creation"
      title="Создать новую задачу"
    >
      <template #text>
        <v-form ref="formComponent" :disabled="store.isFetching || store.isLoading">
          <v-text-field
            v-model="form.title"
            :rules="[v => !!v || 'Поле обязательно для заполнения']"
            label="Заголовок"
          ></v-text-field>
          <v-text-field
            v-model="form.subtitle"
            label="Текст задачи"
          ></v-text-field>
        </v-form>
      </template>
      <template #actions>
        <v-btn
          type="submit"
          :disabled="store.isFetching || store.isLoading"
          text="Создать"
          @click.prevent="onSave"
        ></v-btn>
        <v-btn
          :disabled="store.isFetching || store.isLoading"
          text="Отмена"
          @click="onClose"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { useTodoStore } from '@/stores/todo'

const store = useTodoStore();

const modelValue = defineModel<boolean>({ required: true });

const formComponent = ref<null>(null)
const form = ref({
  title: '',
  subtitle: '',
})

const onClose = () => {
  modelValue.value = false;
  resetForm();
};

const resetForm = () => {
  form.value = {title: '', subtitle: ''}
};

const onSave = async () => {
  await formComponent.value.validate().then(async (res) => {
    if (res.valid) {
      await store.createTodoItem(Object.assign({}, form.value, {
        id: Math.random(),
        isDone: false,
      }));
      onClose();
    }
  });
}
</script>
