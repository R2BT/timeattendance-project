<template>
  <q-layout view="hHh lpR fFf">
    <Navbar></Navbar>
    <body>
        <q-page-container>
        <h2>Arbid Soiju Photharam Sab Sab ถุ้ๆ</h2>
        </q-page-container>
      </body>
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