<template>
  <div class="container">
    <h1 class="mb-5"><ins>Expence list</ins></h1>
    <button
      type="button"
      class="btn btn-outline-secondary mb-5"
      @click="$store.commit('showDialog')"
    >
      Add new cost
    </button>
    <AddDialog />
    <a href="/add/payment/Transport?value=50">Add regular payment</a>
    <Pagination v-if="$store.getters.pageCount >= 2" />
    <ExpenceList :items="currentPageItems" />
    <Pagination v-if="pageCount >= 2" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddDialog from "./components/AddDialog.vue";
import ExpenceList from "./components/ExpenceList.vue";
import Pagination from "./components/Pagination.vue";

export default {
  name: "App",
  components: { ExpenceList, AddDialog, Pagination },
  computed: mapGetters(["currentPageItems", "pageCount"]),
  mounted() {
    this.$store.dispatch("fetchData");
  },
};
</script>
