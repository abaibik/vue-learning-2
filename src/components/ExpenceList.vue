<template>
  <BTable striped hover :items="items" :fields="fields">
    <template #cell(index)="data">
      {{ getItemIndex(data) }}
    </template>
    <template #cell(date)="data">
      {{ getItemDate(data) }}
    </template>
  </BTable>
</template>

<script>
import { BTable } from "bootstrap-vue";

export default {
  name: "ExpenceList",
  components: { BTable },
  props: {
    items: Array,
  },
  methods: {
    getItemIndex(data) {
      return this.$store.state.currentPage * 5 + data.index + 1;
    },
    getItemDate(data) {
      return data.item.date.toLocaleDateString(window.navigator.language);
    },
  },
  data() {
    return {
      fields: [
        { key: "index", label: "#" },
        { key: "date", label: "Date" },
        { key: "category", label: "Category" },
        { key: "value", label: "Value" },
      ],
    };
  },
};
</script>
