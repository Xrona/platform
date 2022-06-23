<template>
  <div class="file-input-area">
    <slot />
    <input type="file" style="display: none" />
  </div>
</template>

<script>
export default {
  name: 'FileInputArea',
}
</script>
