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
    </q-page-container>
    </body>
  </q-layout>
</template>

<script  >
import Navbar from "../../components/EmployeeHeader.vue";
import { ref } from 'vue'
const columns = [
  {
    name: "dateLeaveStart",
    required: true,
    label: "วันที่เริ่มลา",
    align: "left",
    field: "dateleavestart",
    format: (val) => `${val}`,
    sortable: true,
    
  },
  {
    name: "dateLeaveEnd",
    align: "left",
    label: "วันสิ้นสุดการลา",
    field: "dateleaveend",
    sortable: true,
  },
  {
    name: "leaveType",
    align: "left",
    label: "ประเภทการลา",
    field: "leavetype",
    sortable: true,
  },
  {
    name: "timeLeaveType",
    align: "left",
    label: "ประเภทการลา",
    field: "timeleavetype",
    sortable: true,
  },
  {
    name: "infoLeave",
    align: "left",
    label: "หมายเหตุ",
    field: "infoleave",
    sortable: true,
  },
  {
    name: "statusLeave",
    align: "left",
    label: "สถานะ",
    field: "statusleave",
    sortable: true,
  },

];

const rows = [
  {
    dateleavestart: "15/05/2023",
    dateleaveend: "16/05/2023",
    leavetype: "ลาพักร้อน",
    timeleavetype: "ลาเต็มวัน",
    infoleave: "-",
    statusleave: "อนุมัติ",
   
  },
  {
    dateleavestart: "25/05/2023",
    dateleaveend: "25/05/2023",
    leavetype: "ลากิจ",
    timeleavetype: "ลาครึ่งวัน",
    infoleave: "-",
    statusleave: "รอดำเนินการ",
   
  },
  {
    dateleavestart: "30/05/2023",
    dateleaveend: "30/05/2023",
    leavetype: "ลาบวช",
    timeleavetype: "ลาครึ่งวัน",
    infoleave: "-",
    statusleave: "ไม่อนุมัติ",
   
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
