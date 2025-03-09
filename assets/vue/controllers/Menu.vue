<template>
  <div class="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md">
    <img :src="image" :alt="name" class="w-12 h-12 object-contain"/>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  image: String
});
</script>