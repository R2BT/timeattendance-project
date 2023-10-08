<template>
  <q-layout view="hHh lpR fFf">
    <Navbar></Navbar>
    <body>
      <q-page-container>
        <div class="clock-container">
          <div class="clock">
            <div class="historyButton">
              <div class="col">
                <router-link :to="{ name: 'historyleaves' }">
                  <q-btn
                    dense
                    flat
                    round
                    color="grey"
                    icon="history"
                    @click="toggleRightDrawer"
                    label="ประวัติการลา"
                  />
                </router-link>
              </div>
            </div>
            <div class="date">{{ currentDate }}</div>
            <div class="time">{{ currentTime }}</div>
            <div class="inputChoice">
              <q-form @submit="onSubmit" ref="form">
                <div class="row justify-between">
                  <div class="col-6">
                    <q-select
                      color="purple"
                      bg-color="white"
                      filled
                      v-model="selectedLeaveType"
                      :options="optionsTypeLeave"
                      label="ประเภทการลา"
                      :rules="[(value) => !!value || 'กรุณาเลือกประเภท']"
                    >
                    </q-select>
                  </div>

                  <div class="col-6">
                    <q-select
                      color="purple"
                      bg-color="white"
                      filled
                      v-model="selectedTimeType"
                      :options="optionsTimeLeave"
                      label="ช่วงเวลา"
                      :rules="[(value) => !!value || 'กรุณาเลือกช่วงเวลาการลา']"
                    >
                    </q-select>
                  </div>
                </div>
                <div class="col" style="padding-top: 30px">
                  <div class="row justify-between">
                    <div class="col-6">
                      <q-input
                        color="purple"
                        bg-color="white"
                        filled
                        type="date"
                        v-model="leaveStartdate"
                        label="ลาวันที่"
                        lazy-rules :rules="[
                    val => /^(19|20)\d{2}-\d{2}-\d{2}$/.test(val) || 'กรุณาเลือกวันที่เริ่มลา'
                  ]"
                      ></q-input>
                    </div>
                    <div class="col-6">
                      <q-input
                        color="purple"
                        bg-color="white"
                        filled
                        type="date"
                        v-model="leaveEnddate"
                        label="ถึงวันที่"
                        lazy-rules :rules="[
                    val => /^(19|20)\d{2}-\d{2}-\d{2}$/.test(val) || 'กรุณาเลือกวันที่สิ้นสุดการลา'
                  ]"
                      ></q-input>
                    </div>
                  </div>
                </div>
                <div class="col" style="padding-top: 30px">
                  <div class="row">
                    <div class="col">
                      <q-input
                        color="purple"
                        bg-color="white"
                        filled
                        v-model="leaveMessage"
                        label="ข้อความประกอบการลา"
                      ></q-input>
                    </div>
                  </div>
                </div>
                <div class="col" style="padding-top: 25px">
                  <div class="row justify-between">
                    <div class="col-margin">
                      <q-btn
                        unelevated
                        rounded
                        color="positive"
                        label="ส่งใบลา"
                        class="text-center"
                        type="submit"
                        style="padding-left: 200px; padding-right: 200px"
                      />
                    </div>
                  </div>
                </div>
              </q-form>
            </div>
          </div>
        </div>
      </q-page-container>
    </body>
  </q-layout>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "../../router";
import Navbar from "../../components/EmployeeHeader.vue";
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

    const leaveStartdate = ref(null);
    const leaveEnddate = ref(null);
    const leaveMessage = ref(null);
    const selectedLeaveType = ref(null);
    const selectedTimeType = ref(null);

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

    const optionsTypeLeave = [
      "ลาป่วย (ไม่มีใบรับรองแพทย์)",
      "ลาป่วย (่มีใบรับรองแพทย์)",
      "ลากิจ",
      "ลาพักร้อน",
      "ลาบวช",
      "ลาคลอดบุตร",
      "ลาวันเกิด",
      "ลาประกอบพิธีแต่งงาน",
      "ลาทหาร",
      "ลาณาปนกิจคนในครอบครัว",
    ];

    const optionsTimeLeave = ["ลาเต็มวัน", "ลาครึ่งวันเช้า", "ลาครึ่งวันบ่าย"];

    return {
      currentTime,
      currentDate,
      selectedLeaveType,
      optionsTypeLeave,
      selectedTimeType,
      optionsTimeLeave,
      leaveStartdate,
      leaveEnddate,
      leaveMessage,

      async onSubmit() {
        if (
          selectedLeaveType.value != null &&
          selectedTimeType.value != null &&
          leaveStartdate.value != null &&
          leaveEnddate.value != null
        ) {
          try {

           

            let response = await axios.post(
              "http://localhost:3000/leaveRequest",
              {
                employee_id: userInfo.employee_id,
                leave_request_type: selectedLeaveType.value,
                leave_request_duration: selectedTimeType.value,
                leave_request_start_date: leaveStartdate.value,
                leave_request_end_date: leaveEnddate.value,
                leave_request_note: leaveMessage.value,
              }
            );
            if (response.status === 200) {
              if (
                response.data.message ===
                "Leave request created successfully"
              ) {
                console.log("go");
                router.push({ name: "sendleavesuccess" });
              }
            }
          } catch (error) {
            console.error("Send Leave failed:", error);
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
  padding: 1.2rem;
  background: #ffffff22;
  border: 1px solid #000000;
  border-radius: 1.4rem;
  box-shadow: 0 0 1.2rem rgba(0, 0, 0, 0.35);
  color: white;
  width: 700px;
}
.inputChoice {
  justify-content: center;
  width: 700px;
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
.row {
  margin-left: 20px;
  margin-right: 20px;
}
.historyButton {
  display: grid;
  flex-direction: column;
  justify-content: right;
  font-size: 1.5rem;
  margin-right: 40px;
}
.col-margin {
  margin-left: 105px;
  margin-right: 105px;
}
</style>
