<template>
  <q-layout view="hHh lpR fFf">
    <Navbar></Navbar>
    <body>
      <q-page-container>
        <div class="clock-container">
          <div class="clock">
            <div class="historyButton">
              <div class="col">
                <router-link :to="{ name: 'historytimerecords' }">
                  <q-btn
                    dense
                    flat
                    round
                    icon="history"
                    color="grey"
                    @click="toggleRightDrawer"
                    label="ประวัติ"
                  />
                </router-link>
              </div>
            </div>
            <div class="date">{{ currentDate }}</div>
            <div class="time">{{ currentTime }}</div>
            <q-form @submit="onSubmit" ref="form">
              <q-select
                color="purple"
                bg-color="white"
                filled
                v-model="typeRecord"
                :options="options"
                label="ประเภท"
                :rules="[(value) => !!value || 'กรุณาเลือกประเภท']"
              ></q-select>
              <div class="col-margin">
                <q-input
                  color="purple"
                  bg-color="white"
                  filled
                  v-model="infoRecord"
                  label="หมายเหตุ"
                ></q-input>
              </div>
              <div class="col-margin">
                <q-btn
                  unelevated
                  rounded
                  color="positive"
                  label="บันทึก"
                  class="text-center"
                  type="submit"
                  style="padding-left: 220px; padding-right: 220px"
                />
              </div>
            </q-form>
          </div>
        </div>
      </q-page-container>
    </body>
  </q-layout>
</template>

<script scope>
import { ref, onMounted } from "vue";
import Navbar from "../../components/EmployeeHeader.vue";
import router from "../../router";
import axios from "axios";
export default {
  components: {
    Navbar,
  },
  setup() {
    const myItem = localStorage.getItem("user-info");
    console.log(myItem);
    const userInfo = JSON.parse(myItem);

    const currentTime = ref("");
    const currentDate = ref("");

    const typeRecord = ref(null);
    const infoRecord = ref(null);

    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const meridiem = hours >= 12 ? "PM" : "AM";
      const twelveHourFormat = hours > 12 ? hours - 12 : hours;
      const time = `${twelveHourFormat}:${minutes}:${seconds} ${meridiem}`;
      const month = now.toLocaleString("default", {
        month: "long",
      });
      const day = now.getDate();
      const year = now.getFullYear();
      const date = `${month} ${day}, ${year}`;

      currentTime.value = time;
      currentDate.value = date;
    };

    onMounted(() => {
      updateClock();
      setInterval(updateClock, 1000);
    });

    const options = ["เข้างาน", "ออกงาน"];

    return {
      currentTime,
      currentDate,
      typeRecord,
      options,
      infoRecord,

      async onSubmit() {
        if (typeRecord.value != null) {
          try {
            const now = new Date(); // Get the current date and time

            // Convert currentTime to a timestamp
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const timestamp = `${hours}:${minutes}:${seconds}`;

            // Format currentDate as "YYYY-MM-DD" (date type)
            const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

            let response = await axios.post(
              "http://localhost:3000/attendance",
              {
                employee_id: userInfo.employee_id,
                attendance_date: formattedDate,
                attendance_time: timestamp,
                attendance_type: typeRecord.value,
                attendance_note:   infoRecord.value,
              }
            );
            if (response.status === 200) {
              if (
                response.data.message ===
                "Attendance record created successfully"
              ) {
                console.log("go");
                router.push({ name: "recordworkingtimesuccess" });
              }
            }
          } catch (error) {
            console.error("Record Working Time failed:", error);
            // Handle the error here
          }
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
  width: 550px;
}

.time {
  display: grid;
  flex-direction: column;
  justify-content: center;
  font-size: 5rem;
  font-weight: bold;
}

.date {
  display: grid;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;
}
.historyButton {
  display: grid;
  flex-direction: column;
  justify-content: right;
  font-size: 1.5rem;
  margin-bottom: 10px;
}
.col-margin {
  margin-top: 28px;
}
</style>
