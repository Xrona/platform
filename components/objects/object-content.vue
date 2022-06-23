<template>
  <div class="object-content">
    <h2>{{ name }}</h2>
    <data-address :address="address" />
    <photo-gallery
      :images-count="imagesCount"
      :images="[
        {
          url: 'https://images.unsplash.com/photo-1580140536950-d6897b5d6e2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        },
        {
          url: 'https://images.unsplash.com/photo-1607025812794-294611ef7266?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          url: 'https://images.unsplash.com/photo-1637225999434-8348569eecb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          url: 'https://images.unsplash.com/photo-1629984030057-ccb28b666120?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1114&q=80',
        },
        {
          url: 'https://images.unsplash.com/photo-1615195307277-1a00acb1186f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        },
        {
          url: 'https://images.unsplash.com/photo-1560462895-4778dfc3b71b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
        },
        {
          url: 'https://images.unsplash.com/photo-1648104266879-a7618e664c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
      ]"
    />
    <data-options :options="options" />
  </div>
</template>

<script>
import DataAddress from '@/components/common/data-address'
import PhotoGallery from '@/components/common/photo-gallery'
import DataOptions from '@/components/common/data-options'

export default {
  name: 'ObjectContent',

  components: {
    DataOptions,
    PhotoGallery,

    DataAddress,
  },

  props: {
    options: {
      type: Object,
      default: Object,
    },
  },

  data() {
    return {
      imagesCount: [2, 3, 3, 4],
    }
  },

  computed: {
    name() {
      return this.options?.name ?? ''
    },
    address() {
      return this.options?.address ?? ''
    },
    files() {
      return this.options?.files ?? []
    },
  },
}
</script>
