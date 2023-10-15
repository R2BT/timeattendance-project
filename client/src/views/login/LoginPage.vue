<template>
  <body>
    <q-page-container>
      <div class="clock-container">
        <div class="clock">
          <div class="successPic">
            <img
              src="../../assets/image/logoCPE.png"
              style="margin: 15px; height: 150px; width: 150px"
            />
          </div>

          <h4 class="textDone">Employee Time Attendance Management</h4>
          <q-form @submit="onSubmit" ref="form">
            <div class="col-margin">
              <q-input
                color="purple"
                bg-color="white"
                filled
                v-model="Username"
                label="Username"
                :rules="[(value) => !!value || 'กรุณากรอก Username']"
              ></q-input>
            </div>
            <div class="col-margin">
              <q-input
                v-model="Password"
                color="purple"
                bg-color="white"
                filled
                type="password"
                label="Password"
                :rules="[(value) => !!value || 'กรุณากรอก Password']"
              />
            </div>
            <div class="col-margin">
              <q-btn
                unelevated
                rounded
                color="positive"
                label="Login"
                class="text-center"
                type="submit"
                style="padding-left: 200px; padding-right: 200px"
              />
            </div>
          </q-form>
          <q-dialog v-model="showAlertDialog" >
            <q-card style="width: 400px; padding:  10px;background-color: red;color: white;">
              <q-card-section>
                <div class="text-h6">Alert</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                Username หรือ Password ผิดกรุญาตรวจสอบใหม่อีกครั้ง?
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="OK" color="white" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </q-page-container>
  </body>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import router from "../../router";

const Username = ref(null);
const Password = ref(null);
const showAlertDialog = ref(false);


async function login() {
  if (Username.value != null && Password.value != null) {
    console.log(Username.value);
    console.log(Password.value);

    try {
      let response = await axios.post("http://localhost:3000/login", {
        id: Username.value,
        password: Password.value,
      });

      if (response.status === 200) {
        if (response.data.message === "User not found.") {
          console.log(response.data.message);
          showAlertDialog.value = true;
          return;
        } else {
          if (response.data.data[0].employee_roles === "Employee") {
            localStorage.clear();
            localStorage.setItem('user-info', JSON.stringify(response.data.data[0]));
            router.push("/recordworkingtime");
          } else if (response.data.data[0].employee_roles === "HR") {
            localStorage.clear();
            localStorage.setItem('user-info', JSON.stringify(response.data.data[0]));
            console.log("HR");
            router.push("/recordworkingtime");
          } else if (response.data.data[0].employee_roles === "Admin") {
            localStorage.clear();
            localStorage.setItem('user-info', JSON.stringify(response.data.data[0]));
            console.log("Admin");
            router.push("/hrmenus");
          }
        }
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure here
    }
  }
}

function onSubmit() {
  login();
}
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
body {
  background-image: url("../../assets/image/background.jpg");
  background-size: cover;
  margin: 0;
  min-block-size: 100vh;
}
.clock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.clock {
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background: #ffffff22;
  border: 1px solid #000000;
  border-radius: 1.4rem;
  box-shadow: 0 0 1.2rem rgba(0, 0, 0, 0.35);
  color: white;
  width: 600px;
}

.col-margin {
  margin-top: 30px;
  margin-left: 90px;
  margin-right: 90px;
}
.textDone {
  color: #ffffff;
  font-size: 25px;
  font-weight: 700;
  line-height: 130%;
  justify-content: center;
  display: grid;
  flex-direction: column;
  margin: 15px;
}
.successPic {
  justify-content: center;
  display: grid;
}
.q-dialog {
  width: 300px;
  height: 200px;
  background-color: red;
  color: white;
}
</style>
