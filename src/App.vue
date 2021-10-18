<template>
  <div class="container">
    <h1 class="mb-5"><ins>Expence list</ins></h1>
    <div class="button-and-links d-flex mb-5 align-items-baseline gap-3">
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="$store.commit('showDialog')"
      >
        Add new cost
      </button>

      <router-link
        class="text-decoration-none"
        :to="{
          name: 'Add',
          params: { category: 'Transport' },
          query: { value: 456 },
        }"
        >Add regular payment</router-link
      >
    </div>

    <AddDialog />
    <Pagination v-if="$store.getters.pageCount >= 2" />
    <ExpenceList :items="currentPageItems" />
    <Pagination v-if="pageCount >= 2" />
    <div class="flex-chart d-flex w-100 justify-content-center">
      <div class="chart mt-5 w-50 h-50"><Chart /></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddDialog from "./components/AddDialog.vue";
import Chart from "./components/Chart.vue";
import ExpenceList from "./components/ExpenceList.vue";
import Pagination from "./components/Pagination.vue";

export default {
  name: "App",
  components: { ExpenceList, AddDialog, Pagination, Chart },
  computed: mapGetters(["currentPageItems", "pageCount"]),
  mounted() {
    this.$store.dispatch("fetchData");
  },
};
</script>
