<template>
  <div class="main-navbar">
    <button :class="{ active: menu }" @click="setMenu(!menu)">
      <span></span>
    </button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'MainNavbar',

  computed: {
    ...mapState('menu', ['menu']),
  },

  methods: {
    ...mapMutations('menu', ['setMenu']),
  },
}
</script>
