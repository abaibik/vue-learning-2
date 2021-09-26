import { shallowMount } from "@vue/test-utils";
import ExpenceList from "@/components/ExpenceList.vue";
import ExpenceStorage from "@/expence-storage.js";
import App from "@/App.vue";

jest.mock("@/expence-storage.js");

describe("App.vue", () => {
  it("renders ExpenceList with items", async () => {
    const item = { date: new Date(), category: "cats", value: 40 };
    ExpenceStorage.mockImplementation(() => {
      return {
        getExpences: () => {
          return [item];
        },
      };
    });
    const wrapper = shallowMount(App);
    const list = wrapper.findComponent(ExpenceList);
    expect(list.props().items).toStrictEqual([item]);
  });

  it("dialog shown when button clicked", async () => {
    const wrapper = shallowMount(App);
    const btn = wrapper.find("button");
    await btn.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.dialogShown).toBeTruthy();
  });
});
