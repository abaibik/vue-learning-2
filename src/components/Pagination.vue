<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li :class="previousClassName">
        <a
          @click="$store.commit('jumpPrevPage')"
          class="page-link"
          href="#"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only"> Previous</span>
        </a>
      </li>

      <PaginationItem
        v-for="pageNumber in pageCount"
        :key="pageNumber"
        :pageNumber="pageNumber"
        :pageActive="pageNumber === currentPage + 1"
        @choose="$store.commit('setCurrentPage', pageNumber - 1)"
      />

      <li :class="nextClassName">
        <a
          @click="$store.commit('jumpNextPage')"
          class="page-link"
          href="#"
          aria-label="Next"
        >
          <span class="sr-only">Next </span>
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import PaginationItem from "./PaginationItem.vue";
export default {
  components: { PaginationItem },
  name: "Pagination",
  computed: {
    pageCount: function () {
      return this.$store.getters.pageCount;
    },

    currentPage: function () {
      return this.$store.state.currentPage;
    },

    previousClassName: function () {
      if (this.currentPage === 0) {
        return "previous-button page-item disabled";
      }
      return "previous-button page-item";
    },

    nextClassName: function () {
      if (this.currentPage === this.pageCount - 1) {
        return "next-button page-item disabled";
      }
      return "next-button page-item";
    },
  },
};
</script>
