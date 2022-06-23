<template>
  <div v-click-outside="closeMenu" class="box-dropdown">
    <button class="box-dropdown__button" @click="isShow = !isShow">
      <slot name="target"></slot>
      <svg-icon
        :name="iconArrow"
        class="box-dropdown__button__arrow"
        :class="{ active: isShow }"
        width="24"
        height="24"
      />
    </button>
    <transition name="slide">
      <template v-if="isShow">
        <div class="box-dropdown__menu">
          <slot
            name="menu"
            :className="'box-dropdown__menu__item'"
            :closeMenu="closeMenu"
          ></slot>
        </div>
      </template>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BoxDropdown',

  props: {
    iconArrow: {
      type: String,
      default: 'arrow',
    },
  },

  data() {
    return {
      isShow: false,
    }
  },

  methods: {
    closeMenu() {
      this.isShow = false
    },
  },
}
</script>
