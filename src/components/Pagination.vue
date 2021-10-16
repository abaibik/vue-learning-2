<template>
  <BPagination
    :value="currentPage"
    :per-page="1"
    :total-rows="pageCount"
    @input="setCurrentPage($event)"
  ></BPagination>
</template>

<script>
import { BPagination } from "bootstrap-vue";

export default {
  components: { BPagination },
  name: "Pagination",
  methods: {
    setCurrentPage(page) {
      this.$store.commit("setCurrentPage", page - 1);
    },
  },
  computed: {
    pageCount: function () {
      return this.$store.getters.pageCount;
    },

    currentPage: function () {
      return this.$store.state.currentPage + 1;
    },
  },
};
</script>
