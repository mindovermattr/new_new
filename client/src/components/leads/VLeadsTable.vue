<script setup lang="ts">
import type { Lead } from '@/api/types/lead.type'
import { dateFormatter, priceFormatter } from '@/lib/formatters'
import { apiLeadUrlToDetail } from '@/lib/link'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputNumber from 'primevue/inputnumber'
import MultiSelect from 'primevue/multiselect'
import VLeadsTableEmpty from './VLeadsTableEmpty.vue'

const props = defineProps<{
  leads: Lead[]
}>()

const formatPrice = (price: Lead['price']) => priceFormatter.format(price)

const formatDate = (createdAt: Lead['created_at']) =>
  dateFormatter.format(new Date(createdAt * 1000))
</script>

<template>
  <DataTable :value="props.leads" dataKey="id" stripedRows>
    <template #header>
      <div class="table-header">
        <div class="table-header__top">
          <span class="table-header__title">Лиды</span>
          <Button
            label="Сбросить"
            icon="pi pi-filter-slash"
            severity="secondary"
            text
            size="small"
          />
        </div>
        <div class="filters">
          <label class="filter">
            <span class="filter__label">Воронка</span>
            <MultiSelect
              optionLabel="label"
              optionValue="id"
              placeholder="Все"
              display="chip"
              filter
              :maxSelectedLabels="1"
              class="filter__control"
            />
          </label>
          <label class="filter">
            <span class="filter__label">Этап</span>
            <MultiSelect
              optionLabel="label"
              optionValue="id"
              placeholder="Все"
              display="chip"
              filter
              :maxSelectedLabels="1"
              class="filter__control"
            />
          </label>
          <label class="filter">
            <span class="filter__label">Ответственный</span>
            <MultiSelect
              optionLabel="label"
              optionValue="id"
              placeholder="Все"
              display="chip"
              filter
              :maxSelectedLabels="1"
              class="filter__control"
            />
          </label>
          <div class="filter filter--budget">
            <span class="filter__label">Бюджет</span>
            <div class="range-filter">
              <InputNumber
                placeholder="от"
                :min="0"
                :useGrouping="false"
                class="range-filter__input"
              />
              <InputNumber
                placeholder="до"
                :min="0"
                :useGrouping="false"
                class="range-filter__input"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <Column field="id" header="ID">
      <template #body="{ data }">
        <a class="link" :href="apiLeadUrlToDetail(data._links.self.href)">{{ data.id }}</a>
      </template>
    </Column>
    <Column field="name" header="Название" />
    <Column field="price" header="Сумма" sortable>
      <template #body="{ data }">
        {{ formatPrice(data.price) }}
      </template>
    </Column>
    <Column field="created_at" header="Создан" sortable>
      <template #body="{ data }">
        {{ formatDate(data.created_at) }}
      </template>
    </Column>
    <Column field="statusName" header="Статус" />
    <Column field="pipelineName" header="Воронка" />
    <Column field="responsibleUserName" header="Ответственный" />

    <template #empty>
      <VLeadsTableEmpty />
    </template>
  </DataTable>
</template>

<style scoped>
.link {
  text-decoration: underline;
}

.table-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 12px;
}

.table-header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.table-header__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--p-text-color);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.filter {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.filter__label {
  font-size: 12px;
  color: var(--p-text-muted-color);
}

.filter__control {
  width: 100%;
}

.range-filter {
  display: flex;
  gap: 4px;
}

.range-filter__input {
  width: 100%;
}
</style>
