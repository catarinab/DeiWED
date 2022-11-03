<template>
  <v-card :flat="$store.getters.isMobile" class="table pb-4">
    <v-card-title>Pratos do Dei às Quartas</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="dishes"
        :search="search"
        :loading="loading"
        single-select
        locale="pt-PT"
        no-data-text="Não existem pratos disponiveis"
        no-results-text="Nenhum prato corresponde aos critérios indicados"
        sort-by="name"
      >
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import AttendeeDto from '@/models/deiwed/AttendeeDto';
import RemoteServices from '@/services/RemoteServices';
import { Component, Vue } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';

class Dish {
  name: String;
  unitPrice: number;
  vegetarian: boolean;
  constructor() {
    this.name = "";
    this.unitPrice = 0;
    this.vegetarian = false;
  }
}
      
@Component
export default class DishesView extends Vue {
  dishes: Dish[] = [];
  attendeeUpdate: AttendeeDto = {id: -1, istId: "", name: "", type: ""};
  headers: DataTableHeader[] = [
    { text: 'Nome', value: 'name', sortable: true, filterable: true },
    { text: 'Preço', value: 'unitPrice', sortable: true, filterable: true },
    { text: 'Vegetariano?', value: 'vegetarian', sortable: false, filterable: true}
  ];
  search = '';
  loading = true;

  async mounted() {
    await this.$store.dispatch('loading');
    try {
      this.dishes = await RemoteServices.getDishes();
      console.log(this.dishes);
      this.loading = false;
    } catch (error) {
      this.$store.dispatch('error', error);
    }
    await this.$store.dispatch('clearLoading');
  }
}
</script>
