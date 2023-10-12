<template>
  <q-page >
  <h1> Using Github for this repositry</div>
    <AddUserForm
    :newUser="this.newUser"
    :addUserFormOpen="this.addUserFormOpen"
    @addUser="addUser"
    @closeForm="this.addUserFormOpen = false"
    />
    <q-btn @click="this.addUserFormOpen = true" label="Add user" color="primary"/>
    <ul>
        <li v-for="item in users" :key="item.id">{{ item.name }}</li>
    </ul>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { queryAllUsers , insertUser } from '../database/users'
import AddUserForm from 'src/components/AddUserForm.vue'

export default defineComponent({
  name: 'IndexPage',
  components:{
    AddUserForm
  },
  data () {
    return {
      users: [],
      name: '', 
      newUser: {
        name: "",
        surname: "", 
        nickname: ""
      },
      addUserFormOpen:false
    }
  },
  methods:{
    addUser(){
      insertUser(this.newUser.name, this.newUser.surname, this.newUser.nickname, Math.floor(Date.now())).then(lastId=>{
        console.log(lastId)
        console.log(this.newUser)
        this.users.push(
          {
            id: lastId,
            name:this.newUser.name,
            surname: this.newUser.surname,
            nickname: this.newUser.nickname,
            last_subscription: Math.floor(Date.now())
          }
        )
        this.addUserFormOpen = false
        this.newUser.name = ""
        this.newUser.surname = ""
        this.newUser.nickname = ""
      })
    }
},
  mounted () {
    queryAllUsers().then((rows)=>{
        console.log(rows)
        rows.forEach(row => {
          this.users.push(row)
        });
      })
  },
})
</script>
