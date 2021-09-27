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
    wrapper.vm.$refs.dialogRef.addEventListener("show.bs.modal", mockCallback);
    await wrapper.setProps({ visible: true });
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it("makeCost returns values from inputs", async () => {
    const wrapper = shallowMount(AddDialog);
    wrapper.vm.$refs.categoryRef.value = "cats";
    wrapper.vm.$refs.amountRef.value = "40";
    wrapper.vm.$refs.dateRef.value = "2017-06-01";
    expect(wrapper.vm.makeCost()).toStrictEqual({
      date: new Date("2017-06-01"),
      category: "cats",
      value: "40",
    });
  });

  it("makeCost returns values from inputs", async () => {
    const wrapper = shallowMount(AddDialog);
    wrapper.vm.makeCost = jest.fn(() => {
      return {
        date: new Date("2017-06-01"),
        category: "cats",
        value: "40",
      };
    });
    const button = wrapper.find("#buttonAdd");
    await button.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.makeCost).toBeCalled();
    expect(wrapper.emitted().addCost).toBeTruthy();
    expect(wrapper.emitted().addCost.length).toBe(1);
    expect(wrapper.emitted().addCost[0]).toEqual([
      {
        date: new Date("2017-06-01"),
        category: "cats",
        value: "40",
      },
    ]);
  });
});
