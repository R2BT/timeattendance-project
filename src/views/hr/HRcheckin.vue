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
              <h6>สำหรับ HR</h6>
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
          <q-table
            flat
            bordered
            :rows="filteredRows"
            :columns="columns"
            row-key="eid"
          />
        </div>
      </q-page-container>
    </body>
  </q-layout>
</template>

<script>
import Navbar from "../../components/EmployeeHeader.vue";
export default {
  data() {
    return {
      rows: [
        {
          eid: "ABC123",
          date: "25/07/2023",
          start: "8.00",
          end: "17.00",
          firstname: "AAA",
          surename: "BBB",
          department: "ฝ่ายขาย",
          position: "หัวหน้าฝ่าย",
          note: "",
        },
        {
          eid: "DFDE4513",
          date: "05/07/2023",
          start: "8.00",
          end: "12.00",
          firstname: "FEW",
          surename: "BFGEWBB",
          department: "ฝ่ายขาย",
          position: "พนักงานทั่วไป",
          note: "ลาป่วยช่วงบ่าย",
        },
        {
          eid: "JYTJ15",
          date: "20/07/2023",
          start: "8.00",
          end: "17.00",
          firstname: "DWQDWQ",
          surename: "DWQD",
          department: "ฝ่ายไหน",
          position: "พนักงานทั่วไป",
          note: "",
        },
        {
          eid: "GRTG5415",
          date: "12/07/2023",
          start: "8.00",
          end: "17.00",
          firstname: "HTRHTR",
          surename: "BGRB",
          department: "ฝ่ายไหน",
          position: "หัวหน้าฝ่าย",
          note: "",
        },
        {
          eid: "JYGR15",
          date: "17/08/2023",
          start: "8.00",
          end: "17.00",
          firstname: "YRHRT",
          surename: "FEW",
          department: "ฝ่ายเอ",
          position: "สัญญาจ้าง",
          note: "",
        },
        {
          eid: "DDGR15",
          date: "22/08/2023",
          start: "8.00",
          end: "17.00",
          firstname: "GTRERFE",
          surename: "BFEW",
          department: "ฝ่ายบี",
          position: "สัญญาจ้าง",
          note: "",
        },
        {
          eid: "KYJK4812",
          date: "11/09/2023",
          start: "8.00",
          end: "17.00",
          firstname: "FEWF",
          surename: "FDSFD",
          department: "ฝ่ายซี",
          position: "พนักงานทั่วไป",
          note: "",
        },
      ],
      columns: [
        {
          name: "eid",
          label: "รหัสพนักงาน",
          align: "left",
          field: "eid",
          sortable: true,
        },
        {
          name: "date",
          label: "วันที่เข้างาน",
          align: "left",
          field: "date",
          sortable: true,
        },
        {
          name: "start",
          label: "เริ่มงาน",
          align: "left",
          field: "start",
          sortable: true,
        },
        {
          name: "end",
          label: "เลิกงาน",
          align: "left",
          field: "end",
          sortable: true,
        },
        {
          name: "firstname",
          label: "ชื่อ",
          align: "left",
          field: "firstname",
          sortable: true,
        },
        {
          name: "surename",
          label: "นามสกุล",
          align: "left",
          field: "surename",
          sortable: true,
        },
        {
          name: "department",
          label: "แผนก",
          align: "left",
          field: "department",
          sortable: true,
        },
        {
          name: "position",
          label: "ตำแหน่ง",
          align: "left",
          field: "position",
          sortable: true,
        },
        {
          name: "note",
          label: "หมายเหตุ",
          align: "left",
          field: "note",
          sortable: true,
        },
      ],
      pagination: {
        sortBy: "name",
      },
      dialog: false,
      searchText: "",
    };
  },
  components: {
    Navbar,
  },
  computed: {
    filteredRows() {
      return this.rows.filter(
        (row) =>
          row.eid.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.date.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.start.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.end.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.firstname.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.surename.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.department
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          row.position.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.note.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    onDelete(eid) {
      this.dialog = true;
      this.eidToDelete = eid;
    },
    confirmDelete() {
      const indexToDelete = this.rows.findIndex(
        (row) => row.eid === this.eidToDelete
      );
      if (indexToDelete !== -1) {
        this.rows.splice(indexToDelete, 1);
      }
      this.dialog = false;
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
