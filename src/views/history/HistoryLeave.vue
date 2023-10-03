<template>
  <q-layout view="hHh lpR fFf">
    <Navbar></Navbar>
    <body>
    <q-page-container>
      <div class="clock-container">
        <div class="clock">
            <div class="backButton">
        <div class="col">
          <router-link :to="{ name: 'sendleave' }">
          <q-btn
            dense
            flat
            round
            icon="arrow_back_ios"
            color="grey"
            @click="toggleRightDrawer"
            label="ย้อนกลับ"
          />
        </router-link>
        </div>
      </div>
        
            <q-table
              class="my-sticky-header-table"
              flat
              bordered 
              title="ประวัติการลา"
              :rows="rows"
              :columns="columns"
              row-key="leave_request_id"
              :filter="filter"
              :rows-per-page-options="[7]"
            >
        <template v-slot:top-right>
        <q-input    bg-color="white" borderless dense debounce="300" v-model="filter" placeholder="  Search...">
          <template v-slot:append>
      
          </template>
        </q-input>
      </template>
    </q-table>
        
        </div>
      </div>
    </q-page-container>
    </body>
  </q-layout>
</template>

<script  >
import Navbar from "../../components/EmployeeHeader.vue";
import { ref } from 'vue'
import axios from "axios";

const rows = ref([]);

const columns = [
  {
    name: "dateLeaveStart",
    required: true,
    label: "วันที่เริ่มลา",
    align: "left",
    field: (row) => formatDate(row.leave_request_start_date), 
    sortable: true,
    
  },
  {
    name: "dateLeaveEnd",
    align: "left",
    label: "วันสิ้นสุดการลา",
    field: (row) => formatDate(row.leave_request_end_date), 
    sortable: true,
  },
  {
    name: "leaveType",
    align: "left",
    label: "ประเภทการลา",
    field: (row) => row.leave_request_type, 
    sortable: true,
  },
  {
    name: "timeLeaveType",
    align: "left",
    label: "ช่วงเวลา",
    field: (row) => row.leave_request_duration, 
    sortable: true,
  },
  {
    name: "infoLeave",
    align: "left",
    label: "หมายเหตุ",
    field: (row) => {
      if (!row.leave_request_note) {
        return "-";
      }
      return row.leave_request_note;
    },
    sortable: true,
  },
  {
    name: "statusLeave",
    align: "left",
    label: "สถานะ",
    field: (row) => row.leave_request_status, 
    sortable: true,
  },

];
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
};

const fetchData = () => {
  const myItem = localStorage.getItem("user-info");
  const userInfo = JSON.parse(myItem);
  console.log(userInfo.employee_id);
  axios
    .get("http://localhost:3000/leaveRequest/employee/" + userInfo.employee_id)
    .then((response) => {
      const slicedData = response.data.data.slice(0, 100);

      rows.value = slicedData;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
export default {
  setup() {
    fetchData();
    return {
      filter: ref(''),
      columns,
      rows,
    };
  },
  components: {
    Navbar,
  },
};
</script>

<style scoped >
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
  width: 1100px;
}

.my-sticky-header-table::v-deep .q-table__top,
.my-sticky-header-table::v-deep .q-table__bottom,
.my-sticky-header-table::v-deep thead tr:first-child th {
  background-color: #3D0133;
  color: white;
}

.my-sticky-header-table::v-deep thead tr th {
  position: sticky;
  z-index: 1;
}

.my-sticky-header-table::v-deep thead tr:first-child th {
  top: 0;
}

.my-sticky-header-table::v-deep.q-table--loading thead tr:last-child th {
  top: 48px;
}

.my-sticky-header-table {
  scroll-margin-top: 48px;
  height: 500px;
  width: 1000px;
}


.backButton {
  display: grid;
  flex-direction: column;
  justify-content: left;
  font-size: 1.5rem;
  margin-bottom: 10px;
}


</style>
