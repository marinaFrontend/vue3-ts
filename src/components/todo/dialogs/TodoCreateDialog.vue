<template>
  <v-dialog
    v-model="isVisible"
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
          <v-file-input
            v-model="form.file"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            label="Изображение"
            @update:modelValue="uploadFile"
          >
          </v-file-input>
          <figure class="mt-2 pa-1 border d-flex align-center justify-center" :style="{height: '100px'}">
            <img v-if="previewFile" :src="previewFile" alt="preview" width="auto" height="100%" />
            <span v-else class="text-grey">Image preview</span>
          </figure>
        </v-form>
      </template>
      <template #actions>
        <v-btn
          type="submit"
          :disabled="store.isFetching || store.isLoading"
          text="Создать"
          @click.prevent.stop="onSave"
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
import {reactive, ref, computed} from "vue";
import { useTodoStore } from '@/stores/todo'

const store = useTodoStore();

const isVisible = defineModel<boolean>({ required: true });

const formComponent = ref<null>(null);

const form = reactive({
  title: '',
  subtitle: '',
  file: null,
});

const previewFile: string = computed(() => {
  if (form.file) {
    return URL.createObjectURL(form.file)
  }
  return '';
});

const uploadFile = (file) => {
  form.file = file;
}

const resetForm = () => {
  form.title = '';
  form.subtitle = '';
  form.file = null;
};

const onSave = async () => {
  await formComponent.value.validate().then(async (res) => {
    if (res.valid) {
      await store.createTodoItem(Object.assign({}, form, {
        id: Math.random(),
        isDone: false,
      }));
      onClose();
    }
  });
}

const onClose = () => {
  isVisible.value = false;
  resetForm();
};
</script>
