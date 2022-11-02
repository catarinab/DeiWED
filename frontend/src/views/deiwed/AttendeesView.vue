<template>
  <v-card :flat="$store.getters.isMobile" class="table pb-4">
    <v-card-title>Participantes no DEI às Quartas</v-card-title>
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
        :items="attendees"
        :search="search"
        :loading="loading"
        single-select
        locale="pt-PT"
        no-data-text="Não existem participantes registados"
        no-results-text="Nenhum participante corresponde aos critérios indicados"
        sort-by="name"
      >
        <template v-slot:[`item.type`]="{ item }">
          <v-chip
            v-if="item.type === 'TEACHER'"
            color="purple"
            text-color="white"
          >
            Professor
          </v-chip>
          <v-chip v-else color="green" text-color="white"> Bolseiro </v-chip>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-chip
          close 
          close-icon="mdi-delete" 
          @click="deleteAttendee(item)"
          >
          Delete
        </v-chip>
        </template>
        <template v-slot:[`item.update`]="{ item }">
          <v-chip
          icon="mdi-update"
          v-on:click="attendeeUpdate = item ;showModal();"
          >
          Edit
        </v-chip>
        </template>
      </v-data-table>
    </v-card-text>
    <Modal
      v-show="isModalVisible"
      @close="updateAttendee"
    >

    <template v-slot:header>
      Editar Participante: <br>
    </template>

    </Modal>

  </v-card>
</template>

<script lang="ts">
import AttendeeDto from '@/models/deiwed/AttendeeDto';
import RemoteServices from '@/services/RemoteServices';
import { Component, Vue } from 'vue-property-decorator';
import Modal from '@/components/Modal.vue';
import { DataTableHeader } from 'vuetify';
      
@Component({
  components: { Modal },
})
export default class AttendeesView extends Vue {
  attendees: AttendeeDto[] = [];
  attendeeUpdate: AttendeeDto = {id: -1, istId: "", name: "", type: ""};
  headers: DataTableHeader[] = [
    { text: 'ID', value: 'id', sortable: true, filterable: true },
    { text: 'Nome', value: 'name', sortable: true, filterable: true },
    { text: 'IST ID', value: 'istId', sortable: true, filterable: true },
    { text: 'Tipo', value: 'type', sortable: true, filterable: false },
    { text: 'Apagar Participante', value: 'delete', sortable: false, filterable: false },
    { text: 'Editar Participante', value: 'update', sortable: false, filterable: false },
  ];
  search = '';
  loading = true;
  isModalVisible = false;

  async mounted() {
    await this.$store.dispatch('loading');
    try {
      this.attendees = await RemoteServices.getAttendees();
      this.loading = false;
    } catch (error) {
      this.$store.dispatch('error', error);
    }
    await this.$store.dispatch('clearLoading');
  }

  async deleteAttendee(attendee: AttendeeDto){
    await this.$store.dispatch('loading');
    try {
      await RemoteServices.deleteAttendee(attendee.id);
      this.attendees = await RemoteServices.getAttendees();
    } catch (error) {
      this.$store.dispatch('error', error);
    }
    await this.$store.dispatch('clearLoading');
    this.$emit('refresh');
  }

   

  showModal() {
    this.isModalVisible = true;
    this.$emit('open');
  }

  updateValues(attendee: any) {
    if(attendee.istId.length <= 9 && attendee.istId.length >= 2){
      this.attendeeUpdate.istId = attendee.istId;
    }
    if(attendee.name.length < 50 && String(attendee.name).split(" ").length >= 2) {
      this.attendeeUpdate.name = attendee.name;
    }
    if(attendee.type == "GRANTEE" || attendee.type == "TEACHER") {
      this.attendeeUpdate.type = attendee.type;
    }
  }

  async updateAttendee(attendee: any) {
    this.isModalVisible = false;
    
    this.updateValues(attendee);
    await this.$store.dispatch('loading');
    try {
      await RemoteServices.updateAttendee(this.attendeeUpdate);
      this.attendees = await RemoteServices.getAttendees();
    } catch (error) {
      this.$store.dispatch('error', error);
    }
    await this.$store.dispatch('clearLoading');
    this.$emit('refresh');
  }
}
</script>
