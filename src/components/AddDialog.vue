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
              <input type="text" class="form-control" id="paymentCategory" />
            </div>
            <div class="mb-3">
              <label for="paymentAmount" class="form-label"
                >Payment amount</label
              >
              <input type="text" class="form-control" id="paymentAmount" />
            </div>
            <div class="mb-3">
              <label for="paymentDate" class="form-label">Payment date</label>
              <input type="date" class="form-control" id="paymentDate" />
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
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
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
  mounted() {
    this.$refs.dialogRef.addEventListener("shown.bs.modal", () => {
      this.$emit("visibleChange", true);
    });
    this.$refs.dialogRef.addEventListener("hidden.bs.modal", () => {
      this.$emit("visibleChange", false);
    });
  },
};
</script>
