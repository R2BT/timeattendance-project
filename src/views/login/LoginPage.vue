<template>
      <body>
  <q-page-container>
    <div class="clock-container " style="margin-left: 80px;">
      <div class="clock">
        <div class="successPic">
            <img src="../../assets/image/logoCPE.png" style="margin: 15px; height: 150px; width: 150px;"  />
        </div>
          
        <h4 class="textDone" >Employee Time Attendance Management</h4>	
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
          <q-input v-model="Password"  color="purple"
              bg-color="white" filled type="password" label="Password" :rules="[(value) => !!value || 'กรุณากรอก Password']"/>
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
      </div>
    </div>
  </q-page-container>
</body>
</template>

<script scope>
import { ref, onMounted } from "vue";
import router from "../../router";
export default {
  setup() {
    
    const Username = ref(null);
    const Password = ref(null);

    return {
      Username,
      Password,

      onSubmit() {
        if (Username.value != null && Username.value != null) {
          console.log("go");
          router.push({ name: "recordworkingtime" });
        }
      },
    };
  },
};
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
	color: #FFFFFF;
	font-size: 25px;
	font-weight: 700;
	line-height: 130%;
    justify-content: center;
    display: grid;
    flex-direction: column;
    margin: 15px;
}
.successPic{
    justify-content: center;
    display: grid;
}
</style>
