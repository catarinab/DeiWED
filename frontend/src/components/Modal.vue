<template>
  <!-- Modal could have been made with slots, and reused on other views-->
    <div class="modal-backdrop">
      <div class="modal">

    <form id="editForm">
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

      <button
            type="button"
            class="btn-blue"
            @click="close"
            data-dismiss="modal">
        Guardar
      </button>
      
    </form>
      </div>
    </div>
  </template>

<script>

export default {
  name: 'Modal',
  data() {
    return {
      istId: '',
      name: '',
      type: ''
    }
  },
  //
  methods: {
    close() {
      document.getElementById("editForm").reset(); 
      this.$emit('close', {istId: this.istId, name: this.name, type: this.type});
    },
  },
};
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #a1a1a1;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .btn-blue {
    color: white;
    background: #63cde4;
    border: 1px solid #63cde4;
    border-radius: 2px;
  }
</style>