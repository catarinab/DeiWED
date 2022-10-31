<template>
    <v-card :flat="$store.getters.isMobile">
      <v-card-title>Adicionar Participante no DEI às quartas.</v-card-title>
      <div>
    <form @submit.prevent="submitForm" v-if="!formSubmitted">
      <span>istID do Participante:</span><br>
      
      <input style=" border: 2px solid beige"
        v-model="istId"
        type="text" 
      />
      <br>

      <span>Nome do Participante:</span><br>
      <!-- v-model allows us to sync the form input elements-->
      <input style=" border: 2px solid beige"
        v-model="name" 
        type="text"
      />
      <br>

      <!-- TODO: Por radio Button Required?-->

      <span>Tipo de Participante:</span><br>
      <input 
        type="radio" 
        v-model="type" 
        value="GRANTEE"
      />
      <label>Bolseiro</label>
      <input 
        type="radio" 
        v-model="type" 
        value="TEACHER"
      />
      <label>Professor</label><br>

      <input 
        class="submit"
        type="submit" 
        value="Adicionar Participante">
    </form>
    <div v-if="formSubmitted && invalidFields">
      <h3>Campos fornecidos não aceites!</h3>
      <br>
      <p><b>istId:</b> istXXXXXX, sendo XXXXXX o numero de aluno, ate 6 caracteres.</p>
      <p><b>Name:</b> Pelo menos Primeiro e Último Nome, ate 50 caracteres.</p>
      <p><b>Type:</b> Selecione Bolseiro ou Professor.</p>
    </div>
    <div v-if="formSubmitted && !invalidFields">
      <h3>Attendee Adicionado!</h3>
      <p>istId: {{ istId }}</p>
      <p>Name: {{ name }}</p>
      <p>Type: {{ type }}</p>
    </div>
  </div>
      <v-card-text>
      </v-card-text>
    </v-card>
  </template>
  
  <script lang="ts">
  import AttendeeDto from '@/models/deiwed/AttendeeDto';
  import RemoteServices from '@/services/RemoteServices';
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class AddAttendeeView extends Vue {
    attendee: AttendeeDto = {id: -1, istId: "", name: "", type: ""};
    istId: string = "";
    name: string = "";
    type: string = "";
    formSubmitted: boolean = false;
    invalidFields: boolean = false;


    async submitForm() {
        this.formSubmitted = true;
        var nameSplit = this.name.split(" ")
        await this.$store.dispatch('loading');
        if(this.istId.length > 9 || this.name.length > 50 || nameSplit.length < 2 ||
        (this.type != "GRANTEE" && this.type != "TEACHER")){
          this.invalidFields = true;
        }
        else{
          this.attendee = {id: -1, istId: this.istId, name: this.name, type: this.type}
          try {
            await RemoteServices.addAttendee(this.attendee);
          } catch (error) {
            this.$store.dispatch('error', error);
          }
        }
        await this.$store.dispatch('clearLoading');
      }
  }
  </script>


  