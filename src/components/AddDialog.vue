<template>
  <div class="modal fade" tabindex="-1" ref="dialogRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add new cost</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="paymentCategory" class="form-label"
                >Payment category</label
              >
              <input
                type="text"
                class="form-control"
                id="paymentCategory"
                ref="categoryRef"
              />
            </div>
            <div class="mb-3">
              <label for="paymentAmount" class="form-label"
                >Payment amount</label
              >
              <input
                type="text"
                class="form-control"
                id="paymentAmount"
                ref="amountRef"
              />
            </div>
            <div class="mb-3">
              <label for="paymentDate" class="form-label">Payment date</label>
              <input
                type="date"
                class="form-control"
                id="paymentDate"
                ref="dateRef"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            id="buttonAdd"
            @click="$emit('addCost', makeCost())"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  name: "AddDialog",
  props: {
    visible: Boolean,
  },
  emits: ["addCost"],
  model: {
    prop: "visible",
    event: "visibleChange",
  },
  watch: {
    visible: function (newValue) {
      const myModal = new Modal(this.$refs.dialogRef);
      if (newValue) {
        myModal.show();
      } else {
        myModal.hide();
      }
    },
  },
  methods: {
    makeCost: function () {
      const category = this.$refs.categoryRef.value;
      const amount = this.$refs.amountRef.value;
      const date = this.$refs.dateRef.value;
      return {
        date: new Date(date),
        category: category,
        value: amount,
      };
    },
    clearForm: function () {
      this.$refs.categoryRef.value = "";
      this.$refs.amountRef.value = "";
      this.$refs.dateRef.value = "";
    },
  },
  mounted() {
    this.$refs.dialogRef.addEventListener("shown.bs.modal", () => {
      this.$emit("visibleChange", true);
    });
    this.$refs.dialogRef.addEventListener("hidden.bs.modal", () => {
      this.$emit("visibleChange", false);
      this.clearForm();
    });
  },
};
</script>
