<template>
  <v-row class="one-bid__form">
    <v-col cols="12" class="py-0">
      <h3>Проверьте данные объекта</h3>
    </v-col>
    <v-col col="12" lg="8" class="py-0">
      <photo-gallery
        :images-count="imagesCount"
        :images="[
          {
            url: 'https://images.unsplash.com/photo-1648737966316-864c713a8356?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          },
          {
            url: 'https://images.unsplash.com/photo-1648737966670-a6a53917ed19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          },
          {
            url: 'https://images.unsplash.com/photo-1517842264405-72bb906a1936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          },
          {
            url: 'https://images.unsplash.com/photo-1517842264405-72bb906a1936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          },
          {
            url: 'https://images.unsplash.com/photo-1517842264405-72bb906a1936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          },
          {
            url: 'https://images.unsplash.com/photo-1517842264405-72bb906a1936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          },
        ]"
      />
      <div class="one-bid__form__content">
        <read-field :value="address" class="full-size" label="Адрес" />
        <read-field :value="objectType" class="full-size" label="Вид объекта" />
        <read-field :value="sum" input-id="sum" label="Сумма" />
        <read-field :value="creditPeriod" input-id="period" label="Срок" />
        <read-field :value="floorsCount" input-id="floor" label="Этажность" />
        <read-field
          :value="material"
          input-id="material"
          label="Материалы стен"
        />
        <read-field v-model="houseArea" input-id="area" label="Площадь дома" />
        <read-field
          :value="landArea"
          input-id="areaPlace"
          label="Площадь участка"
        />
      </div>
    </v-col>
    <v-col cols="12" lg="8" class="py-0 one-bid__form__options">
      <box-button text="Подтвердить" class="main-button" />
      <box-button text="Отменить" class="main-button" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BoxButton from '~/components/common/box-button'
import ReadField from '@/components/common/read-field'
import PhotoGallery from '~/components/common/photo-gallery'
export default {
  name: 'BidView',

  components: { PhotoGallery, ReadField, BoxButton },

  data() {
    return {
      imagesCount: [2, 3, 4, 4],
    }
  },

  computed: {
    ...mapState('application', ['objectTypes', 'objectMaterials']),
    ...mapGetters('application', {
      application: 'data',
    }),

    address() {
      return this.application?.address ?? ''
    },
    sum() {
      return this.application?.sum?.requested + ' руб' ?? ''
    },
    creditPeriod() {
      return this.application?.creditPeriod ?? ''
    },
    objectType() {
      let objectType = ''

      this.objectTypes.forEach((type) => {
        if (type.id === this.application?.objectType) {
          objectType = type.name
        }
      })

      return objectType
    },
    floorsCount() {
      return this.application?.floorsCount ?? ''
    },
    material() {
      let material = ''

      this.objectMaterials.forEach((elem) => {
        if (elem.id === this.application?.material) {
          material = elem.name
        }
      })

      return material
    },
    landArea() {
      return this.application?.landArea ?? ''
    },
    houseArea() {
      return this.application?.houseArea ?? ''
    },
  },

  methods: {
    editBid() {
      this.$router.push(`/bid/edit/${this.$route.params.bid_id}`)
    },

    back() {
      this.$router.back()
    },
  },
}
</script>
