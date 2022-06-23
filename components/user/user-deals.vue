<template>
  <v-col v-if="$options.deals.length > 0" class="user__deals">
    <v-row>
      <v-col cols="12" class="py-0">
        <div class="deals-head">
          <h3>
            Сделки <span>({{ $options.deals.length }})</span>
          </h3>
          <period-buttons />
        </div>
        <box-dropdown class="deal-sort">
          <template #target>
            <span>Все сделки</span>
          </template>
          <template #menu="{ className, closeMenu }">
            <button :class="className">
              <svg-icon name="time" />
              <span>В процессе</span>
            </button>
          </template>
        </box-dropdown>
      </v-col>
    </v-row>
    <v-row>
      <template v-for="deal of $options.deals">
        <v-col :key="deal.name" cols="12" sm="6" md="4" class="py-0">
          <data-card :content="deal" />
        </v-col>
      </template>
    </v-row>
  </v-col>
</template>

<script>
import PeriodButtons from '@/components/common/period-buttons'
import DataCard from '@/components/common/data-card'
import BoxDropdown from '@/components/common/box-dropdown'
export default {
  name: 'UserDeals',
  components: { BoxDropdown, DataCard, PeriodButtons },
  deals: [
    {
      id: 1,
      name: 'Объект №1',
      slug: 'object-1',
      houseArea: 100,
      floorsCount: 2,
      address: 'Example address, 24',
      sum: { requested: '500000', collected: '5000', collectedPercent: '1' },
      objectType: 'Дом',
      investAmount: null,
      status: 'accepted',
    },
    {
      id: 2,
      name: 'Объект №2',
      slug: 'object-2',
      houseArea: 100,
      floorsCount: 2,
      address: 'Example address, 24',
      sum: { requested: '3221321', collected: '0', collectedPercent: '0' },
      objectType: 'Дом',
      investAmount: null,
      status: 'moderation',
    },
    {
      id: 7,
      name: 'Объект №7',
      slug: 'object-7',
      houseArea: 100,
      floorsCount: 2,
      address: 'Example address, 24',
      sum: { requested: '434323', collected: '0', collectedPercent: '0' },
      objectType: 'Дом',
      investAmount: null,
      status: 'moderation',
    },
    {
      id: 4,
      name: 'Объект №4',
      slug: 'object-4',
      houseArea: 100,
      floorsCount: 2,
      address: 'Example address, 24',
      sum: { requested: '5444544', collected: '0', collectedPercent: '0' },
      objectType: 'Дом',
      investAmount: null,
      status: 'moderation',
    },
    {
      id: 6,
      name: 'Объект №6',
      slug: 'object-6',
      houseArea: 100,
      floorsCount: 2,
      address: 'Example address, 24',
      sum: { requested: '322232', collected: '0', collectedPercent: '0' },
      objectType: 'Дом',
      investAmount: null,
      status: 'moderation',
    },
    {
      id: 3,
      name: 'Объект №3',
      slug: 'object-3',
      houseArea: 100,
      floorsCount: 2,
      address: 'Example address, 24',
      sum: { requested: '3213213', collected: '0', collectedPercent: '0' },
      objectType: 'Дом',
      investAmount: null,
      status: 'moderation',
    },
  ],
}
</script>
