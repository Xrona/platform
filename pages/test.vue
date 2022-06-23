<template>
  <div>
    {{ text }}
    <button @click="text = 'hello world'">test</button>
    <cropper
      class="cropper"
      src="https://images.unsplash.com/photo-1648737967267-f896a3cea436?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      :stencil-props="{
        aspectRatio: 10 / 12,
      }"
      @change="change"
    />
    <img :src="text" alt="" />
  </div>
</template>

<script>
import 'vue-advanced-cropper/dist/style.css'
export default {
  name: 'TestPage',

  layout: 'lay',

  data() {
    return {
      text: '',
    }
  },

  methods: {
    change({ coordinates, image, visibleArea, canvas }) {
      this.text = canvas.toDataURL()
    },
  },
}
</script>
