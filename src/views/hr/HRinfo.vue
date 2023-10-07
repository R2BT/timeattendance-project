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
              <h2>ข้อมูลพนักงาน</h2>
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
            <router-link :to="{ name: 'addemployee' }">
              <q-btn
                label="เพิ่มข้อมูล"
                color="positive"
                icon-right="add"
                @click="handleGoldenrod"
                class="add-button"
              />
            </router-link>
          </div>
          <q-table
            flat
            bordered
            :rows="filteredRows"
            :columns="columns"
            row-key="eid"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn
                  icon="groups"
                  color="info"
                  @click="onChange(props.row.eid)"
                ></q-btn>
                <router-link :to="{ name: 'editemployee' }"
                  ><q-btn
                    icon="mode_edit"
                    color="warning"
                  ></q-btn
                ></router-link>
                <q-btn
                  icon="delete"
                  color="negative"
                  @click="onDelete(props.row.eid)"
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
        <q-btn label="ยืนยัน" :color="actionColor" @click="confirmDelete" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import Navbar from "../../components/EmployeeHeader.vue";
export default {
  data() {
    return {
      rows: [
        {
          index: "001",
          eid: "ABC123",
          firstname: "AAA",
          surename: "BBB",
          department: "ฝ่ายขาย",
          position: "หัวหน้าฝ่าย",
        },
        {
          index: "002",
          eid: "DFDE4513",
          firstname: "FEW",
          surename: "BFGEWBB",
          department: "ฝ่ายขาย",
          position: "พนักงานทั่วไป",
        },
        {
          index: "003",
          eid: "JYTJ15",
          firstname: "DWQDWQ",
          surename: "DWQD",
          department: "ฝ่ายไหน",
          position: "พนักงานทั่วไป",
        },
        {
          index: "004",
          eid: "GRTG5415",
          firstname: "HTRHTR",
          surename: "BGRB",
          department: "ฝ่ายไหน",
          position: "หัวหน้าฝ่าย",
        },
        {
          index: "005",
          eid: "JYGR15",
          firstname: "YRHRT",
          surename: "FEW",
          department: "ฝ่ายเอ",
          position: "สัญญาจ้าง",
        },
        {
          index: "006",
          eid: "DDGR15",
          firstname: "GTRERFE",
          surename: "BFEW",
          department: "ฝ่ายบี",
          position: "สัญญาจ้าง",
        },
        {
          index: "007",
          eid: "KYJK4812",
          firstname: "FEWF",
          surename: "FDSFD",
          department: "ฝ่ายซี",
          position: "พนักงานทั่วไป",
        },
        {
          index: "008",
          eid: "JYI4185",
          firstname: "BFDF",
          surename: "HTRGFE",
          department: "ฝ่ายดี",
          position: "พนักงานทั่วไป",
        },
        {
          index: "009",
          eid: "ZFDE71",
          firstname: "FDSC",
          surename: "GREG",
          department: "ฝ่ายอี",
          position: "สัญญาจ้าง",
        },
        {
          index: "010",
          eid: "GTG78",
          firstname: "FWEFD",
          surename: "REWFD",
          department: "ฝ่ายเอฟ",
          position: "หัวหน้าฝ่าย",
        },
        {
          index: "011",
          eid: "PIKIU15",
          firstname: "ERWFD",
          surename: "WEWQ",
          department: "ฝ่ายถลุง",
          position: "พนักงานทั่วไป",
        },
        {
          index: "012",
          eid: "EWQ48",
          firstname: "FGVRE",
          surename: "NGHFD",
          department: "ฝ่ายHR",
          position: "พนักงานทั่วไป",
        },
      ],
      columns: [
        {
          name: "index",
          required: true,
          label: "ID",
          align: "left",
          field: "index",
          sortable: true,
        },
        {
          name: "eid",
          label: "รหัสพนักงาน",
          align: "left",
          field: "eid",
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
          name: "action",
          label: "Action",
          align: "center",
          field: "action",
          sortable: true,
        },
      ],
      pagination: {
        sortBy: "name",
      },
      dialog: false,
      searchText: "",
      dialogMessage: "",
      eidChangeStatus: "",
    };
  },
  components: {
    Navbar,
  },
  computed: {
    filteredRows() {
      return this.rows.filter(
        (row) =>
          row.index.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.eid.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.firstname.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.surename.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.department
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          row.position.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    onChange(eid) {
      this.dialogMessage =
        "พนักงานคนนี้จะถูกเปลี่ยนสถานะเป็น Hr ต้องการเปลี่ยนหรือไม่?";
      this.dialog = true;
      this.actionColor = "primary";
      this.eidChangeStatus = eid;
    },
    onDelete(eid) {
      this.dialogMessage = "ข้อมูลพนักงานจะถูกลบท่านต้องการดำเนินการต่อหรือไม่";
      this.dialog = true;
      this.actionColor = "negative";
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
  background-image: url("../../assets/image/hrdatabackground.png");
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
