<template>

    <q-header elevated class="custom-navbar" height-hint="98">   
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
        <q-toolbar-title> ETAMS Project </q-toolbar-title>
        <!-- <q-tabs>
          <q-route-tab to="/sendleave" label="About Us" />
        </q-tabs> -->
   
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      show-if-above
      :width="300"
      :breakpoint="400"
      class="custom-drawer"
    >
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px"
        active-class="active-link"
      >
        <q-list padding>
       <router-link :to="{ name: 'recordworkingtime'}" class="custom-link" v-if="userInfo.employee_roles !== 'Admin'">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="alarm" />
              </q-item-section>
              <q-item-section> บันทึกเวลาทํางาน </q-item-section>
            </q-item>
          </router-link>
          <router-link :to="{ name: 'sendleave'}" class="custom-link" v-if="userInfo.employee_roles !== 'Admin'">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="edit" />
            </q-item-section>
            <q-item-section> ใบลา </q-item-section>
          </q-item>
        </router-link>
        <router-link :to="{ name: 'hrmenus'}" class="custom-link" v-if="userInfo.employee_roles !== 'Employee'">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section> จัดการข้อมูลพนักงาน </q-item-section>
          </q-item>
        </router-link>
        <div class="custom-link" @click="showLogoutDialog" >
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="power_settings_new" />
            </q-item-section>
            <q-item-section> Logout </q-item-section>
          </q-item>
          <logout-dialog ref="logoutDialog" />
        </div>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="../assets/image/backgrounProfile.svg"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm" v-if="userInfo.employee_gender === 'หญิง'">
            <img src="../assets/image/person.png" />
          </q-avatar>
          <q-avatar size="56px" class="q-mb-sm" v-if="userInfo.employee_gender === 'ชาย'">
            <img src="../assets/image/man.png" />
          </q-avatar>
          <div>{{ userInfo.employee_roles }}</div>
          <div class="text-weight-bold">{{ userInfo.employee_title }}  {{ userInfo.employee_name }}  {{ userInfo.employee_surname }}</div>
          <div>{{ userInfo.employee_email }}</div>
        </div>
      </q-img>
    </q-drawer>
    
</template>

<script>
import { ref } from "vue";
import LogoutDialog from "../components/LogoutDialog.vue";

export default {

  components: {
    LogoutDialog,
  },
  methods: {
    showLogoutDialog() {
      this.$refs.logoutDialog.show = true;
    },
  },
  setup() {
    const rightDrawerOpen = ref(false);
    // Check if the item exists in localStorage
    const myItem = localStorage.getItem('user-info');
       console.log(myItem);
        const userInfo = JSON.parse(myItem);
       console.log(userInfo.employee_id);
       console.log(userInfo.employee_roles);

    return {
      userInfo,
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
};
</script>


<style >
/* Define a custom CSS class for your navbar */
.custom-navbar {
  background-color: rgb(70, 41, 86);
  color: white;
}

.custom-drawer {
  background-color: rgb(
    45,
    25,
    56
  ); /* Change the background color to your desired color */
  color: #ffffff; /* Change the text color to your desired color */
}
.custom-link {
  text-decoration: none; /* Remove underline */
  color: #ffffff; /* Change the text color to your desired color */
}

</style>
