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
              <h2>ข้อมูลการเข้างานพนักงาน</h2>
            </div>
          </div>
        </div>
        <div class="q-pa-md">
          <div class="search-bar">
            <q-input
              v-model="searchText"
              placeholder="ค้นหา"
              outlined
              dense
              @input="filterData"
              class="search-input"
              style="background-color: white"
            />
          </div>
          <q-table flat bordered :rows="rows" :columns="columns" :filter="filter" row-key="attendance_id" :rows-per-page-options="[6]" />
        </div>
      </q-page-container>
    </body>
  </q-layout>
</template>

  
<script>
import Navbar from "../../components/EmployeeHeader.vue";
import axios from "axios";
import {
    ref
} from "vue";
const rows = ref([]);
const columns = [{
        name: "eid",
        label: "รหัสพนักงาน",
        align: "left",
        field: (row) => row.employee_id,
        sortable: true,
    },
    {
        name: "date",
        label: "วันที่",
        align: "left",
        field: (row) => formatDate(row.attendance_date),
        sortable: true,
    },
    {
        name: "time",
        label: "เวลา",
        align: "left",
        field: (row) => row.attendance_time,
        sortable: true,
    },
    {
        name: "type",
        label: "ประเภท",
        align: "left",
        field: (row) => row.attendance_type,
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
        name: "department",
        label: "แผนก",
        align: "left",
        field: (row) => row.employee_department,
        sortable: true,
    },
    {
        name: "position",
        label: "ตำแหน่ง",
        align: "left",
        field: (row) => row.employee_position,
        sortable: true,
    },
    {
        name: "note",
        label: "หมายเหตุ",
        align: "left",
        field: (row) =>{
      if (!row.leave_request_note) {
        return "-";
      }
      return row.leave_request_note;
    },
        sortable: true,
    },
];
const fetchData = () => {
  axios
    .get("http://localhost:3000/attendances")
    .then((response) => {
      const slicedData = response.data.data.slice(0, 100);

      rows.value = slicedData;
      console.log(rows.value);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
};

export default {
  setup() {
    fetchData();
    rows.value = rows.value.sort((a, b) => {
  return b.attendance_date - a.attendance_date;
});
    return {
      filter: ref(""),
      columns,
      rows,
    };
  },
    components: {
        Navbar,
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
  background-image: url("../../assets/image/hrcheckinbackground.png");
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
.backtomenu{
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
  margin-top: 0.5rem;
  margin-left: 0.5rem;
}
</style>
