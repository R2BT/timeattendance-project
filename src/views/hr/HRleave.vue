<template>
  <q-layout view="hHh lpR fFf">
    <Navbar></Navbar>
    <body>
      <q-page-container>
        <div class="background">
          <div>
            <router-link :to="{ name: 'hrmenus' }">
              <q-btn
                class="backtomenu"
                icon="arrow_back"
              />
            </router-link>
          </div>
          <div class="background-container">
            <div class="block-background">
              <h6>สำหรับ HR</h6>
              <h2>ข้อมูลใบลาของพนักงาน</h2>
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
              style="background-color: white;"
            />
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
                  icon="check"
                  color="positive"
                  @click="onApprove(props.row.eid)"
                ></q-btn>
                <q-btn
                  icon="cancel"
                  color="negative"
                  @click="onReject(props.row.eid)"
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
export default {
  data() {
    return {
      rows: [
        {
          eid: "ABC123",
          date: "28/08/2023",
          type: "ลาป่วย",
          period: "ลาเต็มวัน",
          firstname: "AAA",
          surename: "BBB",
          department: "ฝ่ายขาย",
          position: "หัวหน้าฝ่าย",
          note: "หัวหน้าสั่งงานเยอะปวดหัว",
        },
        {
          eid: "DPEL4823",
          date: "20/09/2023 - 22/09/2023",
          type: "ลาพักร้อน",
          period: "ลาเต็มวัน",
          firstname: "KFOEK",
          surename: "LFPEL",
          department: "ฝ่ายเอ",
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
          label: "วัน/เดือน/ปี",
          align: "left",
          field: "date",
          sortable: true,
        },
        {
          name: "type",
          label: "ประเภทการลา",
          align: "left",
          field: "type",
          sortable: true,
        },
        {
          name: "period",
          label: "ช่วงเวลา",
          align: "left",
          field: "period",
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
          label: "ข้อความประกอบการลา",
          align: "left",
          field: "note",
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
      actionColor: "",
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
          row.type.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.period.toLowerCase().includes(this.searchText.toLowerCase()) ||
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
    onApprove(eid) {
      this.dialogMessage =
        "ข้อมูลใบลานี้จะถูกอนุมัติ ท่านต้องการยืนยันสถานะหรือไม่";
      this.dialog = true;
      this.eidToApprove = eid;
      this.actionColor = "positive";
    },
    onReject(eid) {
      this.dialogMessage =
        "ข้อมูลใบลานี้จะไม่ถูกอนุมัติ ท่านต้องการยืนยันสถานะหรือไม่";
      this.dialog = true;
      this.eidToReject = eid;
      this.actionColor = "negative";
    },
    confirmAction() {
      const indexToAction = this.rows.findIndex(
        (row) => row.eid === this.eidToApprove || this.eidToReject
      );
      if (indexToAction !== -1) {
        this.rows.splice(indexToAction, 1);
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
.backtomenu{
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
  margin-top: 0.5rem;
  margin-left: 0.5rem;
}
</style>
