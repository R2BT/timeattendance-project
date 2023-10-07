<template>
  <q-layout view="hHh lpR fFf">
    <Navbar></Navbar>

    <q-page-container style="background-color: #f7f7f7">
      <h3
        class="q-mb-md"
        style="
          margin: 20px;
          font-family: Noto Sans;
          font-size: 30px;
          font-style: normal;
          font-weight: 700;
          line-height: 130%;
          color: #332360;
        "
      >
        เพิ่มข้อมูลพนักงาน
      </h3>
      <div id="q-app" style="min-height: 100vh">
        <div
          class="q-pa-md"
          style="
            display: flex;
            flex-wrap: wrap;
            padding-top: 0px;
            flex-direction: column;
          "
        >
          <q-form @submit="onSubmit" @reset="onReset">
            <q-card class="rounded-borders" bordered style="flex-grow: 1">
              <q-card-section style="display: flex; flex-wrap: wrap">
                <div
                  class="q-gutter-md"
                  style="flex-basis: 50%; box-sizing: border-box; flex-grow: 1"
                >
                  <div class="mb-3">
                    <label class="form-label">เพศ</label>
                    <div class="mb-2">
                      <q-radio
                        v-model="selectedGender"
                        checked-icon="task_alt"
                        unchecked-icon="panorama_fish_eye"
                        val="ชาย"
                        label="ชาย"
                      />
                      <q-radio
                        v-model="selectedGender"
                        checked-icon="task_alt"
                        unchecked-icon="panorama_fish_eye"
                        val="หญิง"
                        label="หญิง"
                      />
                    </div>
                  </div>
                  <q-input
                    color="purple-8"
                    v-model="name"
                    label="ชื่อ"
                    lazy-rules
                    :rules="[
                      (val) => (val && val.length > 0) || 'กรุณากรอกชื่อ',
                    ]"
                  />
                  <q-input
                    color="purple-8"
                    v-model="department"
                    label="แผนก"
                    lazy-rules
                    :rules="[
                      (val) => (val && val.length > 0) || 'กรุณากรอกข้อมูล',
                    ]"
                  />
                  <q-input
                    color="purple-8"
                    v-model="phoneNumber"
                    label="เบอร์โทรศัพท์"
                    lazy-rules
                    :rules="[
                      (val) =>
                        /^0[689]\d{8}$/.test(val) ||
                        'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง',
                    ]"
                  />
                  <q-input
                    color="purple-8"
                    v-model="birthdate"
                    label="วันเกิด"
                    type="date"
                    lazy-rules
                    :rules="[
                      (val) =>
                        /^(19|20)\d{2}-\d{2}-\d{2}$/.test(val) ||
                        'รูปแบบวันเกิดไม่ถูกต้อง (ตัวอย่าง: 1990-01-01)',
                    ]"
                  />
                  <q-input
                    color="purple-8"
                    v-model="salary"
                    label="เงินเดือน"
                    lazy-rules
                    :rules="[
                      (val) =>
                        /^\d+(\.\d{1,2})?$/.test(val) ||
                        'รูปแบบเงินเดือนไม่ถูกต้อง (ตัวอย่าง: 5000 หรือ 5000.50)',
                    ]"
                  />
                  <q-input
                    color="purple-8"
                    v-model="address"
                    label="ที่อยู่"
                    lazy-rules
                    :rules="[
                      (val) => (val && val.length > 0) || 'กรุณากรอกข้อมูล',
                    ]"
                  />
                  <q-input
                    color="purple-8"
                    v-model="idCardBank"
                    label="บัญชีธนาคาร"
                    lazy-rules
                    :rules="[
                      (val) =>
                        /^\d+$/.test(val) || 'รูปแบบบัญชีธนาคารไม่ถูกต้อง',
                    ]"
                  />
                </div>
                <div style="margin: 10px"></div>
                <div
                  class="q-gutter-md"
                  style="flex-basis: 50%; box-sizing: border-box; flex-grow: 1"
                >
                  <div class="mb-3">
                    <label class="form-label">คำนำหน้า</label>
                    <div class="mb-2">
                      <q-radio
                        v-model="preName"
                        checked-icon="task_alt"
                        unchecked-icon="panorama_fish_eye"
                        val="นาย"
                        label="นาย"
                      />
                      <q-radio
                        v-model="preName"
                        checked-icon="task_alt"
                        unchecked-icon="panorama_fish_eye"
                        val="นาง"
                        label="นาง"
                      />
                      <q-radio
                        v-model="preName"
                        checked-icon="task_alt"
                        unchecked-icon="panorama_fish_eye"
                        val="นางสาว"
                        label="นางสาว"
                      />
                    </div>
                  </div>
                  <q-input
                    color="purple-8"
                    v-model="lastName"
                    label="นามสกุล"
                    lazy-rules
                    :rules="[
                      (val) => (val && val.length > 0) || 'กรุณากรอกนามสกุล',
                    ]"
                  />
                  <q-input
                    color="purple-8"
                    v-model="position"
                    label="ตำแหน่ง"
                    lazy-rules
                    :rules="[
                      (val) => (val && val.length > 0) || 'กรุณากรอกข้อมูล',
                    ]"
                  />
                  <q-input
                    color="purple-8"
                    v-model="email"
                    label="อีเมล"
                    lazy-rules
                    :rules="[
                      (val) =>
                        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                          val
                        ) || 'รูปแบบอีเมลไม่ถูกต้อง',
                    ]"
                  />
                  <q-input
                    color="purple-8"
                    v-model="startDate"
                    label="วันเริ่มงาน"
                    type="date"
                    lazy-rules
                    :rules="[
                      (val) =>
                        /^(19|20)\d{2}-\d{2}-\d{2}$/.test(val) ||
                        'รูปแบบวันเริ่มงานไม่ถูกต้อง (ตัวอย่าง: 2023-01-01)',
                    ]"
                  />
                  <q-input
                    color="purple-8"
                    v-model="idCard"
                    label="รหัสบัตรประชาชน"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length === 13 && /^[0-9]+$/.test(val)) ||
                        'รหัสบัตรประชาชนไม่ถูกต้อง',
                    ]"
                  />
                  <q-input
                    color="purple-8"
                    v-model="taxId"
                    label="เลขประจำตัวผู้เสียภาษีอากร"
                    lazy-rules
                    :rules="[
                      (val) =>
                        /^\d+$/.test(val) ||
                        'รูปแบบเลขประจำตัวผู้เสียภาษีอากรไม่ถูกต้อง',
                    ]"
                  />
                </div>
              </q-card-section>
            </q-card>
            <div style="padding: 5px"></div>
            <q-card
              class="rounded-borders"
              bordered
              style="flex-grow: 1; height: fit-content"
            >
              <q-card-section>
                <label class="form-label">ข้อมูลในบริษัท</label>
                <q-input
                  color="purple-8"
                  v-model="employeeId"
                  label="รหัสพนักงาน"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'กรุณากรอกรหัสพนักงาน',
                  ]"
                />
                <q-input
                  color="purple-8"
                  v-model="id"
                  label="ID"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'กรุณากรอก ID']"
                />
                <q-input
                  color="purple-8"
                  v-model="password"
                  label="Password"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'กรุณากรอก Password',
                  ]"
                />
                <div style="margin: 10px"></div>
                <div class="mb-3">
                  <div class="mb-2">
                    <q-file
                      color="purple-8"
                      outlined
                      label-color="grey"
                      v-model="model"
                      label="Upload รูปภาพพนักงาน"
                    >
                      <template v-slot:append>
                        <q-icon name="attachment" color="grey" />
                      </template>
                    </q-file>
                  </div>
                </div>
                <div style="margin: 10px"></div>
                <div class="mb-3">
                  <div class="mb-2">
                    <q-file
                      color="purple-8"
                      outlined
                      label-color="grey"
                      v-model="model"
                      label="Upload รูปสำเนาบัตรประชาชน"
                    >
                      <template v-slot:append>
                        <q-icon name="attachment" color="grey" />
                      </template>
                    </q-file>
                  </div>
                </div>
                <div style="margin: 10px"></div>
                <div class="mb-3">
                  <div class="mb-2">
                    <q-file
                      color="purple-8"
                      outlined
                      label-color="grey"
                      v-model="model"
                      label="Upload รูปสำเนาTranscript"
                    >
                      <template v-slot:append>
                        <q-icon name="attachment" color="grey" />
                      </template>
                    </q-file>
                  </div>
                </div>
                <div style="margin: 10px"></div>
                <div class="mb-3">
                  <div class="mb-2">
                    <q-file
                      color="purple-8"
                      outlined
                      label-color="grey"
                      v-model="model"
                      label="Upload รูปเอกสารสัญญาพนักงาน"
                    >
                      <template v-slot:append>
                        <q-icon name="attachment" color="grey" />
                      </template>
                    </q-file>
                  </div>
                </div>
                <div style="margin: 15px"></div>
                <div
                  class="q-gutter-md"
                  style="display: flex; justify-content: end"
                >
                  <router-link :to="{ name: 'hrinfo' }">
                    <q-btn
                    color="white"
                    text-color="black"
                    label="กลับ"
                    @click="goBack"
                  />
                  </router-link>
                  
                  <div style="margin: 0px"></div>
                  <q-btn
                    color="green"
                    text-color="white"
                    label="ยืนยัน"
                    type="submit"
                  />
                </div>
              </q-card-section>
            </q-card>
          </q-form>
        </div>
      </div>
    </q-page-container>
  </q-layout>

  <q-dialog v-model="dialog" persistent>
    <q-card>
      <q-card-section>
        {{ dialogMessage }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="ยกเลิก" color="negative" @click="dialog = false" />
        <q-btn label="ยืนยัน" color="positive" @click="handleConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import Navbar from "../../components/EmployeeHeader.vue";
import { ref } from "vue";

export default {
  components: {
    Navbar,
  },
  setup() {
    return {
      shape: ref("line"),
    };
  },
  data() {
    return {
      selectedGender: "",
      preName: "",
      name: "",
      lastName: "",
      idCard: "",
      phoneNumber: "",
      email: "",
      birthdate: "",
      address: "",
      position: "",
      department: "",
      startDate: "",
      salary: "",
      idCardBank: "",
      taxId: "",
      employeeId: "",
      id: "",
      password: "",
      model: null,
      dialog: false,
      dialogMessage: "",
    };
  },
  methods: {
    onSubmit() {
      if (
        this.selectedGender &&
        this.preName &&
        this.name &&
        this.lastName &&
        this.idCard &&
        this.phoneNumber &&
        this.email &&
        this.birthdate &&
        this.address &&
        this.position &&
        this.department &&
        this.startDate &&
        this.salary &&
        this.idCardBank &&
        this.taxId &&
        this.employeeId &&
        this.id &&
        this.password
      ) {
        this.dialogMessage = "คุณต้องการยืนยันข้อมูลใช่หรือไม่?";
        this.dialog = true;
      } else {
        this.dialogMessage = "กรุณากรอกข้อมูลให้ครบทุกช่อง";
        this.dialog = true;
      }
    },
    onReset() {},
    goBack() {
      this.dialog = false;
    },
    handleConfirm() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  min-block-size: 100vh;
}

.rounded-borders {
  border-radius: 8px;
  background: #fff;

  /* Shadow */
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
}
</style>
