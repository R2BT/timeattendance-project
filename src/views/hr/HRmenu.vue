<template>
  <q-layout view="hHh lpR fFf">
    <Navbar></Navbar>
  </q-layout>
</template>


<script>
import Navbar from "../../components/EmployeeHeader.vue"; 
export default {
    components: {
    Navbar, 
    }
}
</script>

<style scoped>
body {

  margin: 0;
  min-block-size: 100vh;
}
</style>