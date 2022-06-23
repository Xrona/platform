<template>
  <div>
    <admin-head :name="objectOptions.name" @edit="disabled = false" />
    <v-row class="admin-content">
      <v-col cols="12" class="py-0">
        <h3>Проверьте правильность объекта</h3>
      </v-col>
      <v-col cols="12" md="8" class="py-0">
        <photo-gallery
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
          ]"
          :images-count="[2, 3, 3, 4]"
        />
      </v-col>
      <v-col cols="0" md="4" class="py-0 d-none d-md-block" />
      <v-col cols="12" md="4" class="py-0">
        <text-input
          v-model="objectOptions.address"
          input-id="adminContentAddress"
          label="Адрес"
          :disabled="disabled"
          :error="errors.address"
        />
      </v-col>
      <v-col cols="12" md="4" class="py-0">
        <input-dropdown
          :value="type"
          input-id="adminContentObjectType"
          label="Вид объекта"
          :disabled="disabled"
          :error="errors.objectTypeId"
        >
          <template #menu="{ close, className }">
            <template v-for="item in objectTypes">
              <button
                :key="`adminContentType${item.id}`"
                :class="className"
                @click="selectType(item.id, close)"
              >
                {{ item.name }}
              </button>
            </template>
          </template>
        </input-dropdown>
      </v-col>
      <v-col cols="0" md="4" class="py-0 d-none d-md-block" />
      <v-col cols="12" sm="6" md="2" class="py-0">
        <text-input
          v-model="sum"
          input-id="adminContentSum"
          label="Сумма"
          :disabled="disabled"
          :error="errors.sum"
        />
      </v-col>
      <v-col cols="12" sm="6" md="2" class="py-0">
        <text-input
          v-model="objectOptions.creditPeriod"
          input-id="adminContentPeriod"
          label="Срок"
          :disabled="disabled"
          :error="errors.creditPeriod"
        />
      </v-col>
      <v-col cols="12" sm="6" md="2" class="py-0">
        <input-dropdown
          label="Этажность"
          :disabled="disabled"
          :value="objectOptions.floorsCount"
          :error="errors.floorsCount"
        >
          <template #menu="{ close, className }">
            <template v-for="floor in 100">
              <button
                :key="`adminContentFloor${floor}`"
                :class="className"
                @click="selectFloor(floor, close)"
              >
                {{ floor }}
              </button>
            </template>
          </template>
        </input-dropdown>
      </v-col>
      <v-col cols="12" sm="6" md="2" class="py-0">
        <input-dropdown
          label="Материалы стен"
          :disabled="disabled"
          :value="material"
          :error="errors.objectMaterialId"
        >
          <template #menu="{ close, className }">
            <template v-for="item in objectMaterials">
              <button
                :key="`adminContentMaterial${item.id}`"
                :class="className"
                @click="selectMaterial(item.id, close)"
              >
                {{ item.name }}
              </button>
            </template>
          </template>
        </input-dropdown>
      </v-col>
      <v-col cols="0" md="4" class="py-0 d-none d-md-block" />
      <v-col cols="12" sm="6" md="2" class="py-0">
        <text-input
          v-model="objectOptions.houseArea"
          input-id="adminContentHouseArea"
          label="Площадь дома"
          :disabled="disabled"
          :error="errors.houseArea"
        />
      </v-col>
      <v-col cols="12" sm="6" md="2" class="py-0">
        <text-input
          v-model="objectOptions.landArea"
          input-id="adminContentLandArea"
          label="Площадь участка"
          :disabled="disabled"
          :error="errors.landArea"
        />
      </v-col>
      <v-col cols="12" sm="6" md="2" class="py-0">
        <text-input
          v-model="objectOptions.fundingPeriod"
          input-id="adminContentFundraisingPeriod"
          label="Срок сбора средств"
          :disabled="disabled"
          :error="errors.fundingPeriod"
        />
      </v-col>
      <v-col cols="12" sm="6" md="2" class="py-0">
        <text-input
          v-model="objectOptions.percent"
          input-id="adminContentPercent"
          label="Процент"
          :disabled="disabled"
          :error="errors.percent"
        />
      </v-col>
      <v-col cols="0" md="4" class="py-0 d-none d-md-block" />
    </v-row>
    <template v-if="!disabled">
      <v-row class="admin-content__changes">
        <v-col cols="12" md="2" sm="4" class="py-0">
          <box-button
            class="main-button w-full"
            text="Применить"
            @click="saveChanges"
          />
        </v-col>
        <v-col cols="12" md="2" sm="4" offset-md="4" offset-sm="4" class="py-0">
          <box-button
            text="Отменить"
            class="main-button w-full"
            @click="cancelChanges"
          />
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PhotoGallery from '@/components/common/photo-gallery'
import TextInput from '@/components/common/text-input'
import InputDropdown from '@/components/common/input-dropdown'
import AdminHead from '@/components/objects/admin-head'
import BoxButton from '@/components/common/box-button'

export default {
  name: 'AdminContent',

  components: { BoxButton, AdminHead, InputDropdown, TextInput, PhotoGallery },

  props: {
    options: {
      type: Object,
      default: Object,
    },

    disabledProp: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      objectOptions: {
        name: '',
        address: '',
        requestedSum: 0,
        objectMaterialId: null,
        objectTypeId: null,
        percent: 0,
        landArea: 0,
        houseArea: 0,
        floorsCount: 0,
        creditPeriod: 0,
        fundingPeriod: 0,
      },
    }
  },

  computed: {
    ...mapGetters('object', ['objectMaterials', 'objectTypes', 'errors']),

    disabled: {
      get() {
        return this.disabledProp
      },
      set(value) {
        this.$emit('disabledEvent', value)
      },
    },
    sum: {
      get() {
        return this.$priceFormat(this.objectOptions.requestedSum)
      },
      set(value) {
        this.objectOptions.requestedSum = value.replace(' ', '')
      },
    },

    material() {
      const material = this.objectMaterials.find(
        (material) => material.id === this.objectOptions.objectMaterialId
      )

      return material?.name
    },

    type() {
      const object = this.objectTypes.find(
        (type) => type.id === this.objectOptions.objectTypeId
      )

      return object?.name
    },
  },

  created() {
    this.prepareObject()
  },

  methods: {
    ...mapActions('object', ['updateObject']),

    selectFloor(floor, fn = null) {
      if (fn) {
        fn()
      }
    },
    selectMaterial(material, fn = null) {
      if (fn) {
        fn()
      }
    },
    selectType(type, fn = null) {
      this.objectOptions.objectTypeId = type

      if (fn) {
        fn()
      }
    },
    prepareObject() {
      const keys = Object.keys(this.objectOptions)

      keys.forEach((key) => {
        console.log(this.options?.[key], key)
        this.objectOptions[key] = this.options?.[key] ?? this.objectOptions[key]
      })
    },
    cancelChanges() {
      this.disabled = true
      this.prepareObject()
    },
    async saveChanges() {
      const res = await this.updateObject(this.objectOptions)
      if (res) {
        this.disabled = true
      }
    },
  },
}
</script>
