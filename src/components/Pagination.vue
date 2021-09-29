<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li :class="previousClassName">
        <a
          @click="$emit('currentPageChange', currentPage - 1)"
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
        @choose="$emit('currentPageChange', pageNumber - 1)"
      />

      <li :class="nextClassName">
        <a
          @click="$emit('currentPageChange', currentPage + 1)"
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
  props: {
    pageCount: Number,
    currentPage: Number,
  },
  emits: ["currentPageChange"],
  computed: {
    previousClassName: function () {
      if (this.currentPage === 0) {
        return "page-item disabled";
      }
      return "page-item";
    },
    nextClassName: function () {
      if (this.currentPage === this.pageCount - 1) {
        return "page-item disabled";
      }
      return "page-item";
    },
  },
};
</script>
