<template>
  <v-row class="bid-create__checkup">
    <v-col cols="12" sm="6" md="4" class="py-0">
      <disabled-field :value="address" label="Aдрес" />
      <div class="map"></div>
    </v-col>
    <v-col cols="12" sm="6" md="8" class="py-0">
      <disabled-field :value="description" label="Описание" class="text-box" />
    </v-col>
    <v-col cols="12" sm="6" md="3" class="py-0">
      <disabled-field :value="sum" label="Сумма" />
    </v-col>
    <v-col cols="12" sm="6" md="3" class="py-0">
      <disabled-field :value="creditPeriod" label="Срок" />
    </v-col>
    <v-col cols="12" sm="6" md="3" class="py-0">
      <disabled-field label="Материалы стен" :value="material" />
    </v-col>
    <v-col cols="12" sm="6" md="3" class="py-0">
      <disabled-field label="Этажность" :value="floorsCount" />
    </v-col>
    <v-col cols="12" sm="6" md="3" class="py-0">
      <disabled-field :value="houseArea" label="Площадь дома" />
    </v-col>
    <v-col cols="12" sm="6" md="6" class="py-0">
      <disabled-field :value="objectType" label="Вид объекта" />
    </v-col>
    <v-col cols="12" sm="6" md="3" class="py-0">
      <disabled-field :value="landArea" label="Площадь участка" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import DisabledField from '@/components/common/disabled-field'
export default {
  name: 'BidCheckup',

  components: { DisabledField },

  computed: {
    ...mapState('application', ['objectTypes', 'objectMaterials']),
    ...mapGetters('application', ['data']),

    address() {
      return this.data?.address ?? ''
    },
    description() {
      return this.data?.description ?? ''
    },
    sum() {
      return this.data?.sum ?? ''
    },
    creditPeriod() {
      return this.data?.creditPeriod ?? ''
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
    houseArea() {
      return this.data?.houseArea ?? ''
    },
    landArea() {
      return this.data?.landArea ?? ''
    },
  },
}
</script>
