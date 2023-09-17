<template>
  <q-layout view="hHh lpR fFf">
    <Navbar></Navbar>
    <body>
    <q-page-container>
      <div class="clock-container">
        <div class="clock">
            <div class="backButton">
        <div class="col">
          <router-link :to="{ name: 'recordworkingtime' }">
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
          <div class="q-pa-md">
            <q-table
              class="my-sticky-header-table"
              flat
              bordered 
              title="ประวัติการเข้างาน"
              :rows="rows"
              :columns="columns"
              row-key="date"
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
      </div>
    </q-page-container>
  </body>
  </q-layout>
</template>

<script >
import Navbar from "../../components/EmployeeHeader.vue";
import { ref } from 'vue'
const columns = [
  {
    name: "date",
    required: true,
    label: "วัน/เดือน/ปี",
    align: "left",
    field: "date",
    format: (val) => `${val}`,
    sortable: true,
    
  },
  {
    name: "workTimeStart",
    align: "left",
    label: "เริ่มงาน",
    field: "worktimestart",
    sortable: true,
  },
  {
    name: "workTimeEnd",
    align: "left",
    label: "เลิกงาน",
    field: "worktimeend",
    sortable: true,
  },
  {
    name: "infoRecord",
    align: "left",
    label: "หมายเหตุ",
    field: "inforecord",
    sortable: true,
  },


];

const rows = [
  {
    date: "15/05/2023",
    worktimestart: "08.30",
    worktimeend: "18.00",
    inforecord: "-",
   
  },
  {
    date: "16/05/2023",
    worktimestart: "08.10",
    worktimeend: "18.00",
    inforecord: "-",
   
  },
  {
    date: "17/05/2023",
    worktimestart: "08.20",
    worktimeend: "18.00",
    inforecord: "-",
   
  },
  {
    date: "18/05/2023",
    worktimestart: "08.40",
    worktimeend: "18.00",
    inforecord: "-",
   
  },
  {
    date: "19/05/2023",
    worktimestart: "08.35",
    worktimeend: "18.00",
    inforecord: "-",
   
  },
  {
    date: "20/05/2023",
    worktimestart: "08.00",
    worktimeend: "18.00",
    inforecord: "-",
   
  },
  {
    date: "21/05/2023",
    worktimestart: "08.00",
    worktimeend: "18.00",
    inforecord: "-",
   
  },
  {
    date: "22/05/2023",
    worktimestart: "08.00",
    worktimeend: "18.00",
    inforecord: "-",
   
  },
  {
    date: "23/05/2023",
    worktimestart: "08.00",
    worktimeend: "18.00",
    inforecord: "-",
   
  },
  {
    date: "24/05/2023",
    worktimestart: "08.00",
    worktimeend: "18.00",
    inforecord: "-",
   
  },

];
export default {
  setup() {
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