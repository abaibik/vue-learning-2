<script>
import { Doughnut } from "vue-chartjs";
import { mapState } from "vuex";

export default {
  extends: Doughnut,
  name: "Chart",
  mounted() {
    this.renderMyChart();
  },
  methods: {
    renderMyChart: function () {
      this.renderChart(this.chartData, {});
    },
  },
  computed: {
    ...mapState(["expences"]),
    categoryValue: function () {
      const result = {};
      for (const page in this.expences) {
        for (const item of this.expences[page]) {
          if (Object.prototype.hasOwnProperty.call(result, item.category)) {
            result[item.category] += item.value;
          } else {
            result[item.category] = item.value;
          }
        }
      }
      return result;
    },
    chartData: function () {
      const dynamicColors = function () {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
      };
      const colors = [];
      for (let i = 0; i < Object.keys(this.categoryValue).length; i++) {
        colors.push(dynamicColors());
      }
      return {
        datasets: [
          {
            data: Object.values(this.categoryValue),
            backgroundColor: colors,
          },
        ],
        labels: Object.keys(this.categoryValue),
      };
    },
  },
  watch: {
    chartData: function () {
      this.$data._chart.destroy();
      this.renderMyChart();
    },
  },
};
</script>
