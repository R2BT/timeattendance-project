import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import SendLeave from '../views/employee/SendLeave.vue'
import RecordWorking from '../views/employee/RecordWorking.vue'
import RecordWorkingSuccess from '../views/successPage/RecordWorkingSuccess.vue'
import SendLeaveSuccess from '../views/successPage/SendLeaveSuccess.vue'
import Login from '../views/login/LoginPage.vue'
import HistoryLeaves from '../views/history/HistoryLeave.vue'
import HistoryTimeRecords from '../views/history/HistoryTimeRecord.vue'
import HRMenu from '../views/hr/HRmenu.vue'
import RegisterEmployee from '../views/hr/RegisterEmployee.vue'
import EmployeeHeader from '../components/EmployeeHeader.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      component: Login
    },
    {
      path: '/recordworkingtime',
      name: 'recordworkingtime',
      component: RecordWorking
    },
    {
      path: '/sendleave',
      name: 'sendleave',

      component: SendLeave
    },
    {
      path: '/recordworkingtime/success',
      name: 'recordworkingtimesuccess',

      component: RecordWorkingSuccess
    },
    {
      path: '/sendleave/success',
      name: 'sendleavesuccess',

      component: SendLeaveSuccess
    },
    {
      path: '/historytimerecords',
      name: 'historytimerecords',

      component: HistoryTimeRecords
    },
    {
      path: '/historyleaves',
      name: 'historyleaves',
      component:  HistoryLeaves
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/hrmenus',
      name: 'hrmenus',
      component: HRMenu
    },
    {
      path: '/addemployee',
      name: 'addemployee',
      component: RegisterEmployee
    }
  ]
})

export default router
