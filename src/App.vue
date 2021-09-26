<template>
  <div class="container">
    <h1 class="mb-5">Expence list</h1>
    <ExpenceList :items="itemsStorage.getExpences()" />
  </div>
</template>

<script>
import ExpenceList from "./components/ExpenceList.vue";
import ExpenceStorage from "./expence-storage.js";

export default {
  name: "App",
  components: { ExpenceList },
  data: function () {
    return { itemsStorage: new ExpenceStorage() };
  },
};
</script>
