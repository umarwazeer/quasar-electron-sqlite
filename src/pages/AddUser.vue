<template>
  <q-page >
    <div>
    <div class="q-gutter-md q-px-md  q-pt-md " >
      <AddUserForm
        :user="this.editedUser"
        :newUser="this.newUser"
        :addUserFormOpen="addUserFormOpen"
        @addUser="addUser"
        @closeForm="addUserFormOpen = false"
    />
    <q-btn style="float: center;" @click="this.addUserFormOpen = true" label="Add user" color="primary"/>
    </div>

    <!-- <ul>
        <li v-for="item in users" :key="item.id">{{ item.name }}</li>
    </ul> -->
      <div class="q-pa-md">
        <q-table
        title="All Users Data"
        dense
        :rows="users"
        row-key="id"
        :rows-per-page-options="[10, 25, 50]"
    >
      <template>
        <q-tr>
          <q-th>Name</q-th>
          <q-th>Surname</q-th>
          <q-th>Nickname</q-th>
          <q-th>Last Subscription</q-th>
          <q-th>Action</q-th>
          <q-th>Action</q-th>

        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>{{ props.row.id }}</q-td>
          <q-td>{{ props.row.name }}</q-td>
          <q-td>{{ props.row.surname }}</q-td>
          <q-td>{{ props.row.nickname }}</q-td>
          <q-td>{{ new Date(props.row.last_subscription).toLocaleString() }}</q-td>
          <q-td>
            <q-item class="  q-gutter-x-md">
            <q-btn @click="del(props.row.id)"  dense color="red" > <q-icon name="delete"></q-icon></q-btn>
            <q-btn @click="edit(props.row)" color="primary" dense  icon="edit"></q-btn>
          </q-item>
          </q-td>

        </q-tr>
      </template>
    </q-table>
    <!-- Add an edit form -->
  <q-dialog v-model="editFormOpen">
    <q-card>
      <AddUserForm
    :newUser="this.newUser"
    :addUserFormOpen="this.addUserFormOpen"
    @addUser="addUser"
    @closeForm="this.addUserFormOpen = false"
    />
    </q-card>
  </q-dialog>
      </div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { queryAllUsers , insertUser, deleteUser, updateUser } from '../database/users'
import AddUserForm from 'src/components/AddUserForm.vue'
import { QBtn, QPage, QTable, QTr, QTd } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  components:{
    AddUserForm,
    QBtn,
    QPage,
    QTable, // Import the QTable component
    QTr,
    QTd,
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
      addUserFormOpen:false,
    editFormOpen: false, // Add this property
    editedUser: null
    }
  },
  methods:{
    getUsers(){
      queryAllUsers().then((rows)=>{
        // console.log(rows)
        this.users = [];
        rows.forEach(row => {
          this.users.push(row)
        });
      })
    },

    addUser(){
      insertUser(this.newUser.name, this.newUser.surname, this.newUser.nickname, Math.floor(Date.now())).then(lastId=>{
        // console.log(lastId)
        // console.log(this.newUser)
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
    },
    del(id){
      deleteUser(id).then((res) => {
        this.getUsers()
        // console.log(res,id)
      })

    },
    edit(user) {
          this.addUserFormOpen = true; // Open the edit form
          // this.newUser.id = user.id,
          this.newUser.name = user.name,
          this.newUser.surname = user.surname,
          this.newUser.nickname = user.nickname,
          this.newUser.last_subscription = user.last_subscription
          // console.log("user",user.name)
          // console.log("newdUser",this.newUser.id)
        }
      },
  mounted () {
   this.getUsers()
  },
})
</script>
