<template>
  <q-layout view="hHh lpR fFf">
    <Navbar></Navbar>

    <body>
      <q-page-container>
        <div class="background">
          <div class="background-container">
            <div class="block-background">
              <h6>จัดการข้อมูล</h6>
              <h2>ข้อมูลพนักงาน</h2>
            </div>
          </div>
        </div>
        <div class="q-pa-md">
          <div class="search-bar">
            <q-input v-model="filter" placeholder="ค้นหา" outlined dense class="search-input"
              style="background-color: white" />
            <router-link :to="{ name: 'addemployee' }">
              <q-btn label="เพิ่มข้อมูล" color="positive" icon-right="add" @click="handleGoldenrod" class="add-button" />
            </router-link>
          </div>
          <q-table flat bordered :rows="rows" :columns="columns" row-key="employee_id" :filter="filter">
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn icon="mode_edit" @click="onEdit(props.row.employee_id)"></q-btn>
                <q-btn icon="delete" color="negative" @click="onDelete(props.row.employee_id)"></q-btn>
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
          คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลพนักงานรายการนี้?
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="ยกเลิก" @click="dialog = false" />
        <q-btn label="ลบ" color="negative" @click="confirmDelete" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import Navbar from "../../components/EmployeeHeader.vue";
import axios from "axios";
import { ref } from "vue";
import router from "../../router";

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
    name: "action",
    label: "Action",
    align: "center",
    field: "action",
  },
];
const fetchData = () => {
  axios
    .get("http://localhost:3000/employees")
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
    fetchData();
    return {
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
    };
  },
  components: {
    Navbar,
  },
  methods: {
    onDelete(eid) {
      console.log(eid);
      this.dialog = true;
      this.eidToDelete = eid;
    },
    onEdit(eid) {
      router.push('/update/' + eid);
    },
    confirmDelete() {
      axios
        .delete("http://localhost:3000/employee/" + this.eidToDelete)
        .then((response) => {
          console.log(response.value);
        });
      // const indexToDelete = this.rows.findIndex(
      //   (row) => row.eid === this.eidToDelete
      // );
      // if (indexToDelete !== -1) {
      //   this.rows.splice(indexToDelete, 1);
      // }
      this.dialog = false;
      window.location.reload();
    },
    filterData() { },
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
  align-items: center;
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
</style>
