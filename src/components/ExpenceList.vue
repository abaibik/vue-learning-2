<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Date</th>
        <th scope="col">Category</th>
        <th scope="col">Value</th>
      </tr>
    </thead>
    <tbody>
      <ExpenceListRow
        v-for="idx in items.length"
        :key="idx"
        :index="idx"
        :item="items[idx - 1]"
      />
    </tbody>
  </table>
</template>

<script>
import ExpenceListRow from "./ExpenceListRow.vue";

export default {
  name: "ExpenceList",
  components: { ExpenceListRow },
  props: {
    items: Array,
  },
};
</script>
