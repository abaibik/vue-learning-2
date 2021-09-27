<template>
  <div class="container">
    <h1 class="mb-5"><ins>Expence list</ins></h1>
    <button
      type="button"
      class="btn btn-outline-secondary mb-5"
      @click="dialogShown = true"
    >
      Add new cost
    </button>
    <AddDialog v-model="dialogShown" @addCost="itemsStorage.add($event)" />
    <ExpenceList :items="itemsStorage.getExpences()" />
  </div>
</template>

<script>
import AddDialog from "./components/AddDialog.vue";
import ExpenceList from "./components/ExpenceList.vue";
import ExpenceStorage from "./expence-storage.js";

export default {
  name: "App",
  components: { ExpenceList, AddDialog },
  data: function () {
    return { itemsStorage: new ExpenceStorage(), dialogShown: false };
  },
};
</script>
