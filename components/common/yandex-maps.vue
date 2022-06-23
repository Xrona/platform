<template>
  <yandex-map
    :coords="coords"
    :controls="['geolocationControl']"
    :zoom="15"
    @map-was-initialized="initHandler"
    @click="clickHandler"
  />
</template>

<script>
import { loadYmap } from 'vue-yandex-maps'
export default {
  name: 'YandexMaps',

  data() {
    return {
      map: null,
      myPlacemark: null,
      coords: [55.636448, 37.675648],
    }
  },

  async mounted() {
    const settings = {
      lang: 'ru_RU',
      zoom: 15,
    }

    await loadYmap(settings)
    const location = ymaps.geolocation.get()

    await location.then(
      async (result) => {
        // Добавление местоположения на карту.
        const coords = [...result?.geoObjects?.position]
        this.coords = coords
        settings.coords = coords

        await loadYmap(settings)
        await this.map?.geoObjects.add(result.geoObjects)
      },
      (err) => {
        console.log('Ошибка: ' + err)
      }
    )
  },

  methods: {
    initHandler(obj) {
      this.map = obj
    },

    async clickHandler(e) {
      const coords = e.get('coords')

      await ymaps?.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0)

        const city = firstGeoObject.getLocalities().length
          ? firstGeoObject.getLocalities()
          : firstGeoObject.getAdministrativeAreas()
        const street =
          firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()

        const house = firstGeoObject.getPremiseNumber()

        let address = ''

        if (city?.[0]) {
          address += city[0]
        }

        if (street) {
          address += `, ${street}`
        }

        if (house) {
          address += `, д. ${house}`
        }

        // mark
        if (this.myPlacemark) {
          this.myPlacemark.geometry.setCoordinates(coords)
          this.myPlacemark.properties.set({
            iconCaption: address,
            balloonContent: firstGeoObject.getAddressLine(),
          })
        }
        // Если нет – создаем.
        else {
          this.myPlacemark = this.createPlacemark(coords)
          this.map.geoObjects.add(this.myPlacemark)
          // Слушаем событие окончания перетаскивания на метке.
          this.myPlacemark.events.add('dragend', address)
          this.myPlacemark.properties.set({
            iconCaption: address,
            balloonContent: firstGeoObject.getAddressLine(),
          })
        }
        // -- mark

        this.$emit('getAddress', address)
      })
    },
    createPlacemark(coords) {
      return new ymaps.Placemark(
        coords,
        {
          iconCaption: 'поиск...',
        },
        {
          preset: 'islands#violetDotIconWithCaption',
          draggable: true,
        }
      )
    },
  },
}
</script>

<style scoped>
.ymap-container {
  height: 100%;
}
</style>
