<template>
  <li :class="className">
    <a @click="$emit('choose')" class="page-link" href="#">{{ pageNumber }}</a>
  </li>
</template>

<script>
export default {
  name: "PaginationItem",
  props: {
    pageNumber: Number,
    pageActive: Boolean,
  },
  emits: ["choose"],
  computed: {
    className: function () {
      if (this.pageActive) {
        return "page-item active";
      }
      return "page-item";
    },
  },
};
</script>
