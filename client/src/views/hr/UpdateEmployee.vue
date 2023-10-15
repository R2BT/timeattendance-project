<template>
  <q-layout view="hHh lpR fFf">
    <Navbar></Navbar>

    <q-page-container style="background-color: #f7f7f7;">
      <h3 class="q-mb-md" style="margin: 20px; font-family: Noto Sans;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 130%; color: #332360;">แก้ไขข้อมูลพนักงาน</h3>
      <div id="q-app" style="min-height: 100vh;">
        <div class="q-pa-md" style="
      display: flex;
      flex-wrap: wrap; padding-top: 0px; flex-direction: column;">
          <q-form @submit="saveEmployeeData">
            <q-card class="rounded-borders" bordered style="flex-grow: 1;">
              <q-card-section style="display: flex; flex-wrap: wrap;">
                <div class="q-gutter-md" style="flex-basis: 50%; box-sizing: border-box; flex-grow: 1;">
                  <div class="mb-3">
                    <label class="form-label">เพศ</label>
                    <div class="mb-2">
                      <q-radio v-model="employeeData.selectedGender" checked-icon="task_alt"
                        unchecked-icon="panorama_fish_eye" val="ชาย" label="ชาย" />
                      <q-radio v-model="employeeData.selectedGender" checked-icon="task_alt"
                        unchecked-icon="panorama_fish_eye" val="หญิง" label="หญิง" />
                    </div>
                  </div>
                  <q-input color="purple-8" v-model="employeeData.name" label="ชื่อ" lazy-rules
                    :rules="[val => val && val.length > 0 || 'กรุณากรอกชื่อ']" />
                  <q-input color="purple-8" v-model="employeeData.department" label="แผนก" lazy-rules
                    :rules="[val => val && val.length > 0 || 'กรุณากรอกข้อมูล']" />
                  <q-input color="purple-8" v-model="employeeData.phoneNumber" label="เบอร์โทรศัพท์" lazy-rules :rules="[
                    val => /^0[689]\d{8}$/.test(val) || 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
                  ]" />

                  <q-input color="purple-8" v-model="employeeData.birthdate" label="วันเกิด" type="date" lazy-rules="..."
                    mask="####-##-##" @input="updateBirthdate" />
                  <q-input color="purple-8" v-model="employeeData.salary" label="เงินเดือน" lazy-rules :rules="[
                    val => /^\d+(\.\d{1,2})?$/.test(val) || 'รูปแบบเงินเดือนไม่ถูกต้อง (ตัวอย่าง: 5000 หรือ 5000.50)'
                  ]" />
                  <q-input color="purple-8" v-model="employeeData.address" label="ที่อยู่" lazy-rules
                    :rules="[val => val && val.length > 0 || 'กรุณากรอกข้อมูล']" />
                  <q-input color="purple-8" v-model="employeeData.idCardBank" label="บัญชีธนาคาร *(SCB)" lazy-rules
                    :rules="[
                      val => /^\d+$/.test(val) || 'รูปแบบบัญชีธนาคารไม่ถูกต้อง'
                    ]" />
                </div>
                <div style="margin: 10px;"></div>
                <div class="q-gutter-md" style="flex-basis: 50%; box-sizing: border-box; flex-grow: 1;">
                  <div class="mb-3">
                    <label class="form-label">คำนำหน้า</label>
                    <div class="mb-2">
                      <q-radio v-model="employeeData.preName" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                        val="นาย" label="นาย" />
                      <q-radio v-model="employeeData.preName" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                        val="นาง" label="นาง" />
                      <q-radio v-model="employeeData.preName" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                        val="นางสาว" label="นางสาว" />
                    </div>
                  </div>
                  <q-input color="purple-8" v-model="employeeData.lastName" label="นามสกุล" lazy-rules
                    :rules="[val => val && val.length > 0 || 'กรุณากรอกนามสกุล']" />
                  <q-input color="purple-8" v-model="employeeData.position" label="ตำแหน่ง" lazy-rules
                    :rules="[val => val && val.length > 0 || 'กรุณากรอกข้อมูล']" />
                  <q-input color="purple-8" v-model="employeeData.email" label="อีเมล" lazy-rules :rules="[
                    val => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(val) || 'รูปแบบอีเมลไม่ถูกต้อง'
                  ]" />
                  <q-input color="purple-8" v-model="employeeData.startDate" label="วันเริ่มงาน" type="date"
                    lazy-rules="..." mask="####-##-##" @input="updateStartDate" />
                  <q-input color="purple-8" v-model="employeeData.idCard" label="รหัสบัตรประชาชน" lazy-rules :rules="[
                    val => val && val.length === 13 && /^[0-9]+$/.test(val) || 'รหัสบัตรประชาชนไม่ถูกต้อง'
                  ]" />
                  <q-input color="purple-8" v-model="employeeData.taxId" label="เลขประจำตัวผู้เสียภาษีอากร" lazy-rules
                    :rules="[
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
                <q-input color="purple-8" v-model="employeeData.employeeId" label="รหัสพนักงาน" readonly />
                <q-input color="purple-8" v-model="employeeData.id" label="ID" readonly />
                <q-input color="purple-8" v-model="employeeData.password" label="Password" lazy-rules
                  :rules="[val => val && val.length > 0 || 'กรุณากรอก Password']" />
                <div style="margin: 10px;"></div>
                <div class="mb-3">
                  <div class="mb-2">
                    <q-file color="purple-8" outlined label-color="grey" v-model="employeeData.employee_profile_img"
                      @change="handleProfileImageUpload" label="Upload รูปภาพพนักงาน">
                      <template v-slot:append>
                        <q-icon name="attachment" color="grey" />
                      </template>
                    </q-file>
                  </div>
                  <div class="mb-2">{{ employeeData.employee_profile_img ?
                    employeeData.employee_profile_img.replace(/^uploads\\/, '') : '' }}</div>
                  <div>
                    <a :href="`http://localhost:3000/download-pdf/${employeeData.employee_profile_img}`" download>ดาวน์โหลดไฟล์</a>
                  </div>
                </div>
                <div style="margin: 10px;"></div>
                <div class="mb-3">
                  <div class="mb-2">
                    <q-file color="purple-8" outlined label-color="grey" v-model="employeeData.employee_personnel_id_img"
                      @change="handlePersonnelIdImageUpload" label="Upload รูปสำเนาบัตรประชาชน">
                      <template v-slot:append>
                        <q-icon name="attachment" color="grey" />
                      </template>
                    </q-file>
                  </div>
                  <div class="mb-2">{{ employeeData.employee_personnel_id_img ?
                    employeeData.employee_personnel_id_img.replace(/^uploads\\/, '') : '' }}</div>
                  <div>
                    <a :href="`http://localhost:3000/download-pdf/${employeeData.employee_profile_img}`" download>ดาวน์โหลดไฟล์</a>
                  </div>
                </div>
                <div style="margin: 10px;"></div>
                <div class="mb-3">
                  <div class="mb-2">
                    <q-file color="purple-8" outlined label-color="grey" v-model="employeeData.employee_transcript_img"
                      @change="handleTranscriptImageUpload" label="Upload รูปสำเนาTranscript">
                      <template v-slot:append>
                        <q-icon name="attachment" color="grey" />
                      </template>
                    </q-file>
                  </div>
                  <div class="mb-2">{{ employeeData.employee_transcript_img ?
                    employeeData.employee_transcript_img.replace(/^uploads\\/, '') : '' }}</div>
                  <div>
                    <a :href="`http://localhost:3000/download-pdf/${employeeData.employee_transcript_img}`" download>ดาวน์โหลดไฟล์</a>
                  </div>
                </div>
                <div style="margin: 10px;"></div>
                <div class="mb-3">
                  <div class="mb-2">
                    <q-file color="purple-8" outlined label-color="grey" v-model="employeeData.employee_contract"
                      @change="handleContractUpload" label="Upload รูปเอกสารสัญญาพนักงาน">
                      <template v-slot:append>
                        <q-icon name="attachment" color="grey" />
                      </template>
                    </q-file>
                  </div>
                  <div class="mb-2">{{ employeeData.employee_contract ?
                    employeeData.employee_contract.replace(/^uploads\\/, '') : '' }}</div>
                  <div>
                    <a :href="`http://localhost:3000/download-pdf/${employeeData.employee_contract}`" download>ดาวน์โหลดไฟล์</a>
                  </div>
                </div>
                <div style="margin: 15px;"></div>
                <div class="q-gutter-md" style="display: flex; justify-content: end;">
                  <q-btn color="white" text-color="black" label="กลับ" @click="goBack" />
                  <div style="margin: 0px;"></div>
                  <q-btn color="green" text-color="white" label="ยืนยัน" type="submit" />
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  components: {
    Navbar,
  },
  setup() {
    const router = useRouter();
    const employeeData = ref({
      selectedGender: "",
      name: "",
      department: "",
      phoneNumber: "",
      birthdate: null,
      salary: "",
      address: "",
      idCardBank: "",
      preName: "",
      lastName: "",
      position: "",
      email: "",
      startDate: null,
      idCard: "",
      taxId: "",
      employeeId: "",
      id: "",
      password: "",
      employee_profile_img: null,
      employee_personnel_id_img: null,
      employee_transcript_img: null,
      employee_contract: null,
    });

    onMounted(async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/employee/" + router.currentRoute.value.params.id
        );

        if (response.status === 200) {
          const { data } = response.data;
          employeeData.value.selectedGender = data.employee_gender;
          employeeData.value.name = data.employee_name;
          employeeData.value.department = data.employee_department;
          employeeData.value.phoneNumber = data.employee_tel;
          employeeData.value.startDate = new Date(data.employee_start_date);
          employeeData.value.birthdate = new Date(data.employee_birthday);
          employeeData.value.salary = data.employee_salary;
          employeeData.value.address = data.employee_address;
          employeeData.value.idCardBank = data.employee_bank_account;
          employeeData.value.preName = data.employee_title;
          employeeData.value.lastName = data.employee_surname;
          employeeData.value.position = data.employee_position;
          employeeData.value.email = data.employee_email;
          employeeData.value.idCard = data.employee_personal_id;
          employeeData.value.taxId = data.employee_tax_id;
          employeeData.value.employeeId = data.employee_id;
          employeeData.value.id = data.employee_login_id;
          employeeData.value.password = data.employee_login_password;
          employeeData.value.employee_profile_img = data.employee_profile_img;
          employeeData.value.employee_personnel_id_img = data.employee_personnel_id_img
          employeeData.value.employee_transcript_img = data.employee_transcript_img
          employeeData.value.employee_contract = data.employee_contract
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    const goBack = () => {
      router.go(-1);
    };

    const updateStartDate = (newDate) => {
      // Format the new date as yyyy-mm-dd
      employeeData.value.startDate = newDate.toISOString().split('T')[0];
    };

    const updateBirthdate = (newDate) => {
      // Format the new date as yyyy-mm-dd
      employeeData.value.birthdate = newDate.toISOString().split('T')[0];
    };

    const saveEmployeeData = async () => {
      try {
        const formData = new FormData();

        formData.append('employee_gender', employeeData.value.selectedGender);
        formData.append('employee_title', employeeData.value.preName);
        formData.append('employee_name', employeeData.value.name);
        formData.append('employee_surname', employeeData.value.lastName);
        formData.append('employee_personal_id', employeeData.value.idCard);
        formData.append('employee_tel', employeeData.value.phoneNumber);
        formData.append('employee_email', employeeData.value.email);
        formData.append('employee_birthday', employeeData.value.birthdate);
        formData.append('employee_address', employeeData.value.address);
        formData.append('employee_position', employeeData.value.position);
        formData.append('employee_department', employeeData.value.department);
        formData.append('employee_start_date', employeeData.value.startDate);
        formData.append('employee_salary', employeeData.value.salary);
        formData.append('employee_bank_account', employeeData.value.idCardBank);
        formData.append('employee_tax_id', employeeData.value.taxId);
        formData.append('employee_bank_type', 'SCB');
        formData.append('employee_id', employeeData.value.employeeId);
        formData.append('employee_login_id', employeeData.value.id);
        formData.append('employee_login_password', employeeData.value.password);

        // เพิ่มการส่งไฟล์
        formData.append('employee_profile_img', employeeData.value.employee_profile_img);
        formData.append('employee_personnel_id_img', employeeData.value.employee_personnel_id_img);
        formData.append('employee_transcript_img', employeeData.value.employee_transcript_img);
        formData.append('employee_contract', employeeData.value.employee_contract);
        const response = await axios.put(
          "http://localhost:3000/employee/" + router.currentRoute.value.params.id,
          formData
        );

        if (response.status === 200) {
          goBack();
          console.log("Data updated successfully");
        } else {
          console.error("Failed to update data");
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };

    return {
      employeeData,
      goBack,
      saveEmployeeData,
      updateStartDate,
      updateBirthdate,
    };
  },

  handleProfileImageUpload(event) {
  // Handle the file selection for the profile image
  employeeData.value.employee_profile_img = event.target.files[0];
},

handlePersonnelIdImageUpload(event) {
  // Handle the file selection for the personnel ID image
  employeeData.value.employee_personnel_id_img = event.target.files[0];
},

handleTranscriptImageUpload(event) {
  // Handle the file selection for the transcript image
  employeeData.value.employee_transcript_img = event.target.files[0];
},

handleContractUpload(event) {
  // Handle the file selection for the contract
  employeeData.value.employee_contract = event.target.files[0];
},
};
</script>
  