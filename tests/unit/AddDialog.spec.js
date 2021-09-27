import { shallowMount } from "@vue/test-utils";
import AddDialog from "@/components/AddDialog.vue";

describe("AddDialog.vue", () => {
  it("dialog shown when prop set", async () => {
    const wrapper = shallowMount(AddDialog, {
      propsData: {
        visible: false,
      },
    });
    const mockCallback = jest.fn();
    wrapper.vm.$refs.dialogRef.addEventListener("shown.bs.modal", mockCallback);
    await wrapper.setProps({ visible: true });
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
