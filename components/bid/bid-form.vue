<template>
  <v-row class="bid-create__form">
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="address"
        :error="errors.address"
        input-id="bidCreateAddress"
        :is-required="true"
        label="Адрес"
        placeholder="Введите адрес объекта"
        @blur="clearErrorMessage('address')"
      />
      <div class="map">
        <yandex-maps @getAddress="getAddress" />
      </div>
    </v-col>
    <v-col cols="12" sm="6" md="8" class="py-0">
      <text-box
        v-model="description"
        :error="errors.description"
        box-id="bidCreateDescription"
        label="Описание"
        :is-required="true"
        placeholder="Добавьте описание объекта: расскажите про расположение инфраструктуру и почему данное предложение может быть привлекательным?"
        @blur="clearErrorMessage('description')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" class="py-0">
      <text-input
        v-model="sum"
        :error="errors.sum"
        input-id="bidCreateAmount"
        :is-required="true"
        label="Сумма"
        placeholder="Сумма для привлечения"
        @blur="clearErrorMessage('sum')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" class="py-0">
      <text-input
        v-model="creditPeriod"
        :error="errors.creditPeriod"
        input-id="bidCreatePeriod"
        :is-required="true"
        label="Срок"
        placeholder="Укажите срок займа"
        @blur="clearErrorMessage('creditPeriod')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" class="py-0">
      <input-dropdown
        label="Материалы стен"
        :value="material"
        :is-required="true"
        :error="errors.material"
        placeholder="Укажите материал стен"
      >
        <template #menu="{ close, className }">
          <template v-for="type in objectMaterials">
            <button
              :key="type.name"
              :class="className"
              @click="selectMaterial(type.id, close)"
            >
              {{ type.name }}
            </button>
          </template>
        </template>
      </input-dropdown>
    </v-col>
    <v-col cols="12" sm="6" md="3" class="py-0">
      <input-dropdown
        label="Этажность"
        :value="floorsCount"
        :is-required="true"
        :error="errors.floorsCount"
        placeholder="Укажите этажность объекта"
      >
        <template #menu="{ close, className }">
          <template v-for="floor in 100">
            <button
              :key="`bidCreate${floor}`"
              :class="className"
              @click="selectFloor(floor, close)"
            >
              {{ floor }}
            </button>
          </template>
        </template>
      </input-dropdown>
    </v-col>
    <v-col cols="12" sm="6" md="3" class="py-0">
      <text-input
        v-model="houseArea"
        :error="errors.houseArea"
        input-id="bidCreateArea"
        :is-required="true"
        label="Площадь дома"
        placeholder="Укажите площадь дома (м3)"
        @blur="clearErrorMessage('houseArea')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" class="py-0">
      <input-dropdown
        :value="objectType"
        label="Вид объекта"
        :error="errors.objectType"
        placeholder="Укажите вид объекта"
      >
        <template #menu="{ close, className }">
          <template v-for="type in objectTypes">
            <button
              :key="type.name"
              :class="className"
              @click="selectType(type.id, close)"
            >
              {{ type.name }}
            </button>
          </template>
        </template>
      </input-dropdown>
    </v-col>
    <v-col cols="12" sm="6" md="3" class="py-0">
      <text-input
        v-model="landArea"
        :error="errors.landArea"
        input-id="bidCreateArea"
        :is-required="true"
        label="Площадь участка"
        placeholder="Укажите площадь участка (сот)"
        @blur="clearErrorMessage('landArea')"
      />
    </v-col>
    <v-col cols="12" class="py-0">
      <h3>Загрузка документов</h3>
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <file-input
        v-model="images"
        :multiple="true"
        :error="errors.images"
        label="Изображения"
        :is-required="true"
        @load="clearErrorMessage('images')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <file-input
        v-model="egrn"
        :multiple="true"
        :error="errors.egrn"
        label="Выписка из ЕГРН"
        :is-required="true"
        @load="clearErrorMessage('egrn')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <file-input
        v-model="informationBuilding"
        :multiple="true"
        :error="errors.informationBuilding"
        label="Справка о строениях на участке"
        :is-required="true"
        @load="clearErrorMessage('informationBuilding')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <file-input
        v-model="certNoDebt"
        :multiple="true"
        :error="errors.certNoDebt"
        label="Справка об отсутствии задолженностей"
        :is-required="true"
        @load="clearErrorMessage('certNoDebt')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <file-input
        v-model="cadastralPassport"
        :multiple="true"
        :error="errors.cadastralPassport"
        label="Кадастровый паспорт"
        :is-required="true"
        @load="clearErrorMessage('cadastralPassport')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <file-input
        v-model="landTaxDocument"
        :multiple="true"
        :error="errors.landTaxDocument"
        label="Документ об оплате налога на землю"
        :is-required="true"
        @load="clearErrorMessage('landTaxDocument')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <file-input
        v-model="technicalPassport"
        :multiple="true"
        :error="errors.technicalPassport"
        label="Технический паспорт"
        :is-required="true"
        @load="clearErrorMessage('technicalPassport')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <file-input
        v-model="presentation"
        :multiple="false"
        :error="errors.presentation"
        label="Презентация"
        :is-required="true"
        @load="clearErrorMessage('presentation')"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import TextInput from '~/components/common/text-input'
import TextBox from '~/components/common/text-box'
import InputDropdown from '~/components/common/input-dropdown'
import FileInput from '~/components/common/file-input'
import YandexMaps from '~/components/common/yandex-maps'

export default {
  name: 'BidForm',

  components: { YandexMaps, FileInput, InputDropdown, TextBox, TextInput },

  data() {
    return {}
  },

  computed: {
    ...mapState('application', ['objectTypes', 'objectMaterials']),
    ...mapGetters('application', ['data', 'errors']),

    address: {
      get() {
        return this.data?.address ?? ''
      },
      set(value) {
        this.setDataProperty({
          prop: 'address',
          value,
        })
      },
    },
    description: {
      get() {
        return this.data?.description ?? ''
      },
      set(value) {
        this.setDataProperty({
          prop: 'description',
          value,
        })
      },
    },
    sum: {
      get() {
        return this.data?.sum ?? ''
      },
      set(value) {
        this.setDataProperty({
          prop: 'sum',
          value,
        })
      },
    },
    creditPeriod: {
      get() {
        return this.data?.creditPeriod ?? ''
      },
      set(value) {
        this.setDataProperty({
          prop: 'creditPeriod',
          value,
        })
      },
    },
    material() {
      const materialId = this.data?.material ?? null
      let material = ''

      this.objectMaterials.forEach((elem) => {
        if (elem.id === materialId) {
          material = elem.name
        }
      })

      return material
    },
    floorsCount() {
      return this.data?.floorsCount ?? null
    },
    objectType() {
      const typeId = this.data?.objectType ?? null
      let type = ''

      this.objectTypes.forEach((elem) => {
        if (elem.id === typeId) {
          type = elem.name
        }
      })

      return type
    },
    houseArea: {
      get() {
        return this.data?.houseArea ?? ''
      },
      set(value) {
        this.setDataProperty({
          prop: 'houseArea',
          value,
        })
      },
    },
    landArea: {
      get() {
        return this.data?.landArea ?? ''
      },
      set(value) {
        this.setDataProperty({
          prop: 'landArea',
          value,
        })
      },
    },
    images: {
      get() {
        return this.data?.images
      },
      set(value) {
        this.setDataProperty({
          prop: 'images',
          value,
        })
      },
    },
    egrn: {
      get() {
        return this.data?.egrn
      },
      set(value) {
        this.setDataProperty({
          prop: 'egrn',
          value,
        })
      },
    },
    informationBuilding: {
      get() {
        return this.data?.informationBuilding
      },
      set(value) {
        this.setDataProperty({
          prop: 'informationBuilding',
          value,
        })
      },
    },
    certNoDebt: {
      get() {
        return this.data?.certNoDebt
      },
      set(value) {
        this.setDataProperty({
          prop: 'certNoDebt',
          value,
        })
      },
    },
    cadastralPassport: {
      get() {
        return this.data?.cadastralPassport
      },
      set(value) {
        this.setDataProperty({
          prop: 'cadastralPassport',
          value,
        })
      },
    },
    landTaxDocument: {
      get() {
        return this.data?.landTaxDocument
      },
      set(value) {
        this.setDataProperty({
          prop: 'landTaxDocument',
          value,
        })
      },
    },
    technicalPassport: {
      get() {
        return this.data?.technicalPassport
      },
      set(value) {
        this.setDataProperty({
          prop: 'technicalPassport',
          value,
        })
      },
    },
    presentation: {
      get() {
        return this.data?.presentation
      },
      set(value) {
        this.setDataProperty({
          prop: 'presentation',
          value,
        })
      },
    },
  },

  methods: {
    ...mapMutations('application', ['setDataProperty', 'clearErrorMessage']),

    getAddress(address) {
      this.address = address
    },

    selectMaterial(value, fn) {
      this.setDataProperty({
        prop: 'material',
        value,
      })

      fn()
    },

    selectFloor(value, fn) {
      this.setDataProperty({
        prop: 'floorsCount',
        value,
      })

      fn()
    },

    selectType(value, fn) {
      this.setDataProperty({
        prop: 'objectType',
        value,
      })

      fn()
    },
  },
}
</script>
