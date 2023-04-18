<template>
    <div v-if="addUserFormOpen" class="q-pa-md">
  
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="newUser.name"
          label="Name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'You need to fill in this field']"
        />
  
        <q-input
          filled
          v-model="newUser.surname"
          label="Surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'You need to fill in this field']"
        />

        <q-input
          filled
          v-model="newUser.nickname"
          label="Nickname"
        />
  
  
        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
  
    </div>
  </template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'AddUserForm',
    props: ["newUser", "addUserFormOpen"],
    data () {
      return {

      }
    },
    methods:{
        onSubmit () {
        console.log("Ready to add user")
        this.$emit('addUser')
          },
    
        onReset () {
        this.newUser.name = ""
        this.newUser.surname = ""
        this.newUser.nickname = ""
        this.$emit('closeForm')
        }
    }    
})
</script>
  