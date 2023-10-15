<template>
  <q-layout view="hHh lpR fFf">
    <Navbar></Navbar>

    <q-page-container style="background-color: #f7f7f7;">
      <h3 class="q-mb-md" style="margin: 20px; font-family: Noto Sans;
      font-size: 30px;
      font-style: normal;
      font-weight: 700;
      line-height: 130%; color: #332360;">เพิ่มข้อมูลพนักงาน</h3>
      <div id="q-app" style="min-height: 100vh;">
        <div class="q-pa-md" style="
    display: flex;
    flex-wrap: wrap; padding-top: 0px; flex-direction: column;">
          <q-form @submit="onSubmit" @reset="onReset">
            <q-card class="rounded-borders" bordered style="flex-grow: 1;">
              <q-card-section style="display: flex; flex-wrap: wrap;">
                <div class="q-gutter-md" style="flex-basis: 50%; box-sizing: border-box; flex-grow: 1;">
                  <div class="mb-3">
                    <label class="form-label">เพศ</label>
                    <div class="mb-2">
                      <q-radio v-model="selectedGender" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                        val="ชาย" label="ชาย" />
                      <q-radio v-model="selectedGender" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                        val="หญิง" label="หญิง" />
                    </div>
                  </div>
                  <q-input color="purple-8" v-model="name" label="ชื่อ" lazy-rules
                    :rules="[val => val && val.length > 0 || 'กรุณากรอกชื่อ']" />
                  <q-input color="purple-8" v-model="department" label="แผนก" lazy-rules
                    :rules="[val => val && val.length > 0 || 'กรุณากรอกข้อมูล']" />
                  <q-input color="purple-8" v-model="phoneNumber" label="เบอร์โทรศัพท์" lazy-rules :rules="[
                    val => /^0[689]\d{8}$/.test(val) || 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
                  ]" />

                  <q-input color="purple-8" v-model="birthdate" label="วันเกิด" type="date" lazy-rules="..."
                    mask="####-##-##" />
                  <q-input color="purple-8" v-model="salary" label="เงินเดือน" lazy-rules :rules="[
                    val => /^\d+(\.\d{1,2})?$/.test(val) || 'รูปแบบเงินเดือนไม่ถูกต้อง (ตัวอย่าง: 5000 หรือ 5000.50)'
                  ]" />
                  <q-input color="purple-8" v-model="address" label="ที่อยู่" lazy-rules
                    :rules="[val => val && val.length > 0 || 'กรุณากรอกข้อมูล']" />
                  <q-input color="purple-8" v-model="idCardBank" label="บัญชีธนาคาร *(SCB)" lazy-rules :rules="[
                    val => /^\d+$/.test(val) || 'รูปแบบบัญชีธนาคารไม่ถูกต้อง'
                  ]" />
                </div>
                <div style="margin: 10px;"></div>
                <div class="q-gutter-md" style="flex-basis: 50%; box-sizing: border-box; flex-grow: 1;">
                  <div class="mb-3">
                    <label class="form-label">คำนำหน้า</label>
                    <div class="mb-2">
                      <q-radio v-model="preName" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="นาย"
                        label="นาย" />
                      <q-radio v-model="preName" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="นาง"
                        label="นาง" />
                      <q-radio v-model="preName" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="นางสาว"
                        label="นางสาว" />
                    </div>
                  </div>
                  <q-input color="purple-8" v-model="lastName" label="นามสกุล" lazy-rules
                    :rules="[val => val && val.length > 0 || 'กรุณากรอกนามสกุล']" />
                  <q-input color="purple-8" v-model="position" label="ตำแหน่ง" lazy-rules
                    :rules="[val => val && val.length > 0 || 'กรุณากรอกข้อมูล']" />
                  <q-input color="purple-8" v-model="email" label="อีเมล" lazy-rules :rules="[
                    val => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(val) || 'รูปแบบอีเมลไม่ถูกต้อง'
                  ]" />
                  <q-input color="purple-8" v-model="startDate" label="วันเริ่มงาน" type="date" lazy-rules="..."
                    mask="####-##-##" />
                  <q-input color="purple-8" v-model="idCard" label="รหัสบัตรประชาชน" lazy-rules :rules="[
                    val => val && val.length === 13 && /^[0-9]+$/.test(val) || 'รหัสบัตรประชาชนไม่ถูกต้อง'
                  ]" />
                  <q-input color="purple-8" v-model="taxId" label="เลขประจำตัวผู้เสียภาษีอากร" lazy-rules :rules="[
                    val => /^\d+$/.test(val) || 'รูปแบบเลขประจำตัวผู้เสียภาษีอากรไม่ถูกต้อง'
                  ]" />
                </div>
              </q-card-section>
            </q-card>
            <div style="padding: 5px;"></div>
            <q-card class="rounded-borders" bordered style="
        flex-grow: 1; height: fit-content;">
              <q-card-section>
                <label class="form-label">ข้อมูลในบริษัท</label>
                <q-input color="purple-8" v-model="employeeId" label="รหัสพนักงาน" readonly/>
                <q-input color="purple-8" v-model="id" label="ID" readonly/>
                <q-input color="purple-8" v-model="password" label="Password" lazy-rules
                  :rules="[val => val && val.length > 0 || 'กรุณากรอก Password']" />
                <div style="margin: 10px;"></div>
                <div class="mb-3">
                  <div class="mb-2">
                    <q-file color="purple-8" outlined label-color="grey" v-model="employee_profile_img"
                      @change="handleProfileImageUpload" label="Upload รูปภาพพนักงาน">
                      <template v-slot:append>
                        <q-icon name="attachment" color="grey" />
                      </template>
                    </q-file>
                  </div>
                </div>
                <div style="margin: 10px;"></div>
                <div class="mb-3">
                  <div class="mb-2">
                    <q-file color="purple-8" outlined label-color="grey" v-model="employee_personnel_id_img"
                      @change="handlePersonnelIdImageUpload" label="Upload รูปสำเนาบัตรประชาชน">
                      <template v-slot:append>
                        <q-icon name="attachment" color="grey" />
                      </template>
                    </q-file>
                  </div>
                </div>
                <div style="margin: 10px;"></div>
                <div class="mb-3">
                  <div class="mb-2">
                    <q-file color="purple-8" outlined label-color="grey" v-model="employee_transcript_img"
                      @change="handleTranscriptImageUpload" label="Upload รูปสำเนาTranscript">
                      <template v-slot:append>
                        <q-icon name="attachment" color="grey" />
                      </template>
                    </q-file>
                  </div>
                </div>
                <div style="margin: 10px;"></div>
                <div class="mb-3">
                  <div class="mb-2">
                    <q-file color="purple-8" outlined label-color="grey" v-model="employee_contract"
                      @change="handleContractUpload" label="Upload รูปเอกสารสัญญาพนักงาน">
                      <template v-slot:append>
                        <q-icon name="attachment" color="grey" />
                      </template>
                    </q-file>
                  </div>
                </div>
                <div style="margin: 15px;"></div>
                <div class="q-gutter-md" style="display: flex; justify-content: end;">
                  <q-btn color="white" text-color="black" label="กลับ" @click="goBack" />
                  <div style="margin: 0px;"></div>
                  <q-btn color="green" text-color="white" label="ยืนยัน" type="button" @click="onSubmit" />
                </div>
              </q-card-section>
            </q-card>
          </q-form>
        </div>
      </div>
    </q-page-container>
  </q-layout>

  <q-dialog v-model="showDialog" no-esc-dismiss>
    <q-card :class="dialogClass">
      <q-card-section>
        <p class="q-mb-md">{{ dialogMessage }}</p>
        <q-btn color="primary" label="ตกลง" @click="closeDialog" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import Navbar from "../../components/EmployeeHeader.vue";
import { ref } from 'vue';
import axios from 'axios';

export default {
  components: {
    Navbar,
  },
  setup() {
    return {
      shape: ref('line'),
    }
  },
  data() {
    return {
      selectedGender: '',
      preName: '',
      name: '',
      lastName: '',
      idCard: '',
      phoneNumber: '',
      email: '',
      birthdate: '',
      address: '',
      position: '',
      department: '',
      startDate: '',
      salary: '',
      idCardBank: '',
      taxId: '',
      employeeId: '',
      id: '',
      password: '',
      model: null,
      employee_profile_img: null,
      employee_personnel_id_img: null,
      employee_transcript_img: null,
      employee_contract: null,
      dialogMessage: '',
      showDialog: false,
      dialogClass: '',
    };
  },
  methods: {
    async onSubmit() {
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
        this.password
      ) {
        const formData = new FormData();

        formData.append('employee_gender', this.selectedGender);
        formData.append('employee_title', this.preName);
        formData.append('employee_name', this.name);
        formData.append('employee_surname', this.lastName);
        formData.append('employee_personal_id', this.idCard);
        formData.append('employee_tel', this.phoneNumber);
        formData.append('employee_email', this.email);
        formData.append('employee_birthday', this.birthdate);
        formData.append('employee_address', this.address);
        formData.append('employee_position', this.position);
        formData.append('employee_department', this.department);
        formData.append('employee_start_date', this.startDate);
        formData.append('employee_salary', this.salary);
        formData.append('employee_bank_account', this.idCardBank);
        formData.append('employee_tax_id', this.taxId);
        formData.append('employee_bank_type', 'SCB');
        formData.append('employee_login_password', this.password);

        // เพิ่มการส่งไฟล์
        formData.append('employee_profile_img', this.employee_profile_img);
        formData.append('employee_personnel_id_img', this.employee_personnel_id_img);
        formData.append('employee_transcript_img', this.employee_transcript_img);
        formData.append('employee_contract', this.employee_contract);

        try {
          const response = await axios.post('http://localhost:3000/employee', formData);

          if (response.status == 200) {
            this.dialogMessage = 'บันทึกข้อมูลเรียบร้อย';
            this.dialogClass = 'q-bg-primary text-white';
            this.showDialog = true;
            this.goBack();
          } else {
            this.dialogMessage = 'บันทึกข้อมูลไม่สำเร็จ';
            this.dialogClass = 'bg-red-8 text-white';
            this.showDialog = true;
          }
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการส่งข้อมูล', error);
        }
      } else {
        alert('กรุณากรอกข้อมูลให้ถูกต้องและครบทุกช่อง');
        console.log('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      }
    },

    handleProfileImageUpload(event) {
      // Handle the file selection for the profile image
      this.employee_profile_img = event.target.files[0];
    },

    handlePersonnelIdImageUpload(event) {
      // Handle the file selection for the personnel ID image
      this.employee_personnel_id_img = event.target.files[0];
    },

    handleTranscriptImageUpload(event) {
      // Handle the file selection for the transcript image
      this.employee_transcript_img = event.target.files[0];
    },

    handleContractUpload(event) {
      // Handle the file selection for the contract
      this.employee_contract = event.target.files[0];
    },
    onReset() {

    },
    goBack() {
      window.history.go(-1);
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
  background: #FFF;

  /* Shadow */
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.10);
}
</style>
