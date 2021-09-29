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
    <Pagination
      :pageCount="pageCount"
      :currentPage="currentPage"
      @currentPageChange="currentPage = $event"
      v-if="pageCount >= 2"
    />
    <ExpenceList :items="pageItems" />
    <Pagination
      :pageCount="pageCount"
      :currentPage="currentPage"
      @currentPageChange="currentPage = $event"
      v-if="pageCount >= 2"
    />
  </div>
</template>

<script>
import AddDialog from "./components/AddDialog.vue";
import ExpenceList from "./components/ExpenceList.vue";
import Pagination from "./components/Pagination.vue";
import ExpenceStorage from "./expence-storage.js";

export default {
  name: "App",
  components: { ExpenceList, AddDialog, Pagination },
  data: function () {
    return {
      itemsStorage: new ExpenceStorage(),
      dialogShown: false,
      itemsPerPage: 5,
      currentPage: 0,
    };
  },
  computed: {
    pageItems: function () {
      const startNum = this.currentPage * this.itemsPerPage;
      const lastNum = startNum + this.itemsPerPage;
      return this.itemsStorage.getExpences().slice(startNum, lastNum);
    },

    pageCount: function () {
      return Math.ceil(
        this.itemsStorage.getExpences().length / this.itemsPerPage
      );
    },
  },
};
</script>
