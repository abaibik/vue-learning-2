<template>
  <tr @contextmenu.stop.prevent="contextMenuHandler()">
    <th scope="row">{{ index }}</th>
    <td class="row-date">
      {{ item.date.toLocaleDateString(language) }}
    </td>
    <td class="row-category">{{ item.category }}</td>
    <td class="row-value">{{ item.value }}</td>
  </tr>
</template>

<script>
export default {
  name: "ExpenceListRow",
  data() {
    return {
      language: window.navigator.language,
    };
  },
  props: {
    item: Object,
    index: Number,
  },
  emits: ["contextMenu"],
  methods: {
    contextMenuHandler() {
      this.$emit("contextMenu");
    },
  },
};
</script>
