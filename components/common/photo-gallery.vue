<template>
  <div class="photo-gallery">
    <img :src="currentImage" alt="Image" class="photo-gallery__image" />
    <template v-if="images.length > 0">
      <vue-slick-carousel
        ref="photoGalleryMain"
        class="photo-gallery__slick"
        :arrows="false"
        :slides-to-show="imagesCount"
        :infinite="false"
        :draggable="true"
      >
        <template v-for="(image, idx) in images">
          <img
            :key="image.url"
            :src="image.url"
            alt="Image"
            @click="selectImage(idx)"
          />
        </template>
        <!--      <template #prevArrow>-->
        <!--        <button class="photo-gallery__slick__arrow prev">-->
        <!--          <svg-icon name="arrow" :width="11.26" :height="6.65" />-->
        <!--        </button>-->
        <!--      </template>-->
        <!--      <template #nextArrow>-->
        <!--        <button class="photo-gallery__slick__arrow next">-->
        <!--          <svg-icon name="arrow" :width="11.26" :height="6.65" />-->
        <!--        </button>-->
        <!--      </template>-->
      </vue-slick-carousel>
    </template>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
  name: 'PhotoGallery',

  components: { VueSlickCarousel },

  props: {
    images: {
      type: Array,
      default: Array,
    },

    // imagesCount: {
    //   type: Array,
    //   required: true,
    // },
  },

  data() {
    return {
      currentImage: null,
      model: 0,
      width: 0,
    }
  },

  computed: {
    imagesCount() {
      if (this.width > 986) {
        return 6
      }

      if (this.width > 575) {
        return 5
      }

      return 3
    },
  },

  mounted() {
    this.currentImage = this.images?.[0]?.url ?? null
    this.width = window.screen.width

    window.addEventListener('resize', this.checkWidth)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.checkWidth)
  },

  methods: {
    selectImage(id) {
      if (this.images?.[id]) {
        this.currentImage = this.images[id].url
      }
    },

    checkWidth() {
      this.width = window.screen.width
    },
  },
}
</script>
