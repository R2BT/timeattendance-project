<template>
  <q-layout view="hHh lpR fFf">
    <Navbar></Navbar>
    <body>
      <q-page-container>
        <div class="background">
          <div>
            <router-link :to="{ name: 'hrmenus' }">
              <q-btn class="backtomenu" icon="arrow_back" />
            </router-link>
          </div>
          <div class="background-container">
            <div class="block-background">
              <h6>จัดการข้อมูล</h6>
              <h2>ข้อมูลใบลาของพนักงาน</h2>
            </div>
          </div>
        </div>
        <div class="q-pa-md">
          <div class="search-bar">
            <q-input
              v-model="filter"
              placeholder="ค้นหา"
              outlined
              dense
              @input="filterData"
              class="search-input"
              style="background-color: white"
            />
          </div>
          <q-table
            flat
            bordered
            :rows="rows"
            :columns="columns"
            row-key="employee_id"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn
                  icon="check"
                  color="positive"
                  @click="onApprove(props.row.leave_request_id)"
                ></q-btn>
                <q-btn
                  icon="cancel"
                  color="negative"
                  @click="onReject(props.row.leave_request_id)"
                ></q-btn>
              </q-td>
            </template>
          </q-table>
        </div>
      </q-page-container>
    </body>
  </q-layout>
  <q-dialog v-model="dialog" persistent>
    <q-card>
      <q-card-title>
        <q-card-close class="close-container">
          <q-btn icon="close" @click="dialog = false" flat />
        </q-card-close>
      </q-card-title>
      <q-card-section>
        <div class="text-h6">
          {{ dialogMessage }}
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="ยกเลิก" color: @click="dialog = false" />
        <q-btn label="ยืนยัน" :color="actionColor" @click="confirmAction" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import Navbar from "../../components/EmployeeHeader.vue";
import axios from "axios";
import { ref } from "vue";
const rows = ref([]);
const columns = [
  {
    name: "eid",
    required: true,
    label: "รหัสพนักงาน",
    align: "left",
    field: (row) => row.employee_id,
    sortable: true,
  },
  {
    name: "firstname",
    label: "ชื่อ",
    align: "left",
    field: (row) => row.employee_name,
    sortable: true,
  },
  {
    name: "surename",
    label: "นามสกุล",
    align: "left",
    field: (row) => row.employee_surname,
    sortable: true,
  },
  {
    name: "leaveStartDate",
    required: true,
    label: "วันที่ลา",
    align: "left",
    field: (row) => row.leave_request_start_date,
    sortable: true,
  },
  {
    name: "leaveEndDate",
    required: true,
    label: "ถึงวันที่",
    align: "left",
    field: (row) => row.leave_request_end_date,
    sortable: true,
  },
  {
    name: "type",
    required: true,
    label: "ประเภทการลา",
    align: "left",
    field: (row) => row.leave_request_type,
    sortable: true,
  },
  {
    name: "period",
    required: true,
    label: "ระยะเวลา",
    align: "left",
    field: (row) => row.leave_request_duration,
    sortable: true,
  },
  {
    name: "note",
    required: true,
    label: "ข้อความประกอบการลา",
    align: "left",
    field: (row) => row.leave_request_note,
    sortable: true,
  },

  {
    name: "action",
    label: "Action",
    align: "center",
    field: "action",
  },
];
const fetchData = () => {
  axios
    .get("http://localhost:3000/leaveRequests/status")
    .then((response) => {
      const slicedData = response.data.data.slice(0, 100);
      rows.value = slicedData;
      console.log(rows.value);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default {
  setup() {
    const myItem = localStorage.getItem("user-info");
    const userInfo = JSON.parse(myItem);
    fetchData();
    return {
      userInfo,
      filter: ref(""),
      columns,
      rows,
    };
  },

  data() {
    return {
      pagination: {
        sortBy: "name",
      },
      dialog: false,
      searchText: "",
      dialogMessage: "",
      eidChangeStatus: "",
      actionColor: "",
    };
  },
  components: {
    Navbar,
  },
  methods: {
    onApprove(eid) {
      this.dialogMessage =
        "ข้อมูลใบลานี้จะถูกอนุมัติ ท่านต้องการยืนยันสถานะหรือไม่";
      this.dialog = true;
      this.eidChangeStatus = eid;
      this.actionColor = "positive";
    },
    onReject(eid) {
      this.dialogMessage =
        "ข้อมูลใบลานี้จะไม่ถูกอนุมัติ ท่านต้องการยืนยันสถานะหรือไม่";
      this.dialog = true;
      this.eidChangeStatus = eid;
      this.actionColor = "negative";
    },
    confirmAction() {
      
      const isApprove = this.actionColor === "positive";
      console.log(isApprove);
      const apiUrl = `http://localhost:3000/leaveRequest/${this.eidChangeStatus}/status`;
      console.log(this.eidChangeStatus);

      axios
        .put(apiUrl, {
          leave_request_status: isApprove ? "อนุมัติ" : "ปฏิเสธ",
        })
        .then((response) => {
          this.dialog = false;
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    filterData() {},
  },
};
</script>

<style scoped>
body {
  background-color: rgb(234, 234, 234);
  margin: 0;
  height: 100vh;
}

.background {
  background-image: url("../../assets/image/hrleavebackground.png");
  background-size: cover;
  margin: 0;
  height: 35vh;
}

.background-container {
  display: flex;
  justify-content: center;
  align-items: start;
  height: 35vh;
}

.block-background {
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background: #ffffff22;
  backdrop-filter: blur(10px);
  /* border: 1px solid #000000; */
  border-radius: 1.4rem;
  box-shadow: 0 0 1.2rem rgba(0, 0, 0, 0.35);
  color: white;
  text-align: center;
}
h2 {
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}
h6 {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 5px;
}
.search-bar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.search-input {
  width: 15%;
  margin: 0px;
  margin-bottom: 10px;
}

.add-button {
  margin: 0px;
  margin-bottom: 10px;
}
.close-container {
  display: flex;
  justify-content: flex-end;
}
.backtomenu {
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
  margin-top: 0.5rem;
  margin-left: 0.5rem;
}
</style>
