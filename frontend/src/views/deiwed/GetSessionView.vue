<template>
    <v-card :flat="$store.getters.isMobile">
      <v-card-title>Adicionar Participante no DEI às quartas.</v-card-title>
      <div>
    <form @submit.prevent="submitForm" v-if="!formSubmitted">
      <span>Id da Sessão: </span><br>
      
      <input style=" border: 2px solid beige"
        v-model="id"
        type="text" 
        required
      />
      <br>
    <br>

      <input 
        class="submit"
        type="submit" 
        value="Procurar Sessão">
    </form>
    <div v-if="formSubmitted && error">
      <h3>Sessão não Encontrada.</h3>
    </div>
    <div v-if="formSubmitted && !error">
      <h3>Data da Sessão: {{session.date}}</h3>
      <h3>Orador da Sessão: {{session.speaker}}</h3>
      <h3>Tema da Sessão: {{session.theme}}</h3>
    </div>
  </div>
    </v-card>
  </template>
  
  <script lang="ts">
  import SessionDto from '@/models/deiwed/SessionDto';
  import RemoteServices from '@/services/RemoteServices';
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class GetSessionView extends Vue {
    session: SessionDto = {id: -1, date: "", speaker: "", theme: ""};
    id: number = 0;
    formSubmitted: boolean = false;
    error: boolean = false;


    async submitForm() {
        this.formSubmitted = true;
        await this.$store.dispatch('loading');
        try {
        this.session = await RemoteServices.getSession(this.id);
        console.log(this.session);
        } catch (error) {
        this.$store.dispatch('error', error);
        this.error = true;
        }
        await this.$store.dispatch('clearLoading');
      }
  }
  </script>
