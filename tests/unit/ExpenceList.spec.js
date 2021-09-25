import { shallowMount } from "@vue/test-utils";
import ExpenceList from "@/components/ExpenceList.vue";
import ExpenceListRow from "@/components/ExpenceListRow.vue";

describe("ExpenceList.vue", () => {
  it("renders single item", () => {
    const item = { date: new Date(), category: "cats", value: 40 };
    const wrapper = shallowMount(ExpenceList, {
      propsData: { items: [item] },
    });
    const rows = wrapper.findAllComponents(ExpenceListRow);
    expect(rows.length).toBe(1);
    const row = rows.at(0);
    expect(row.props().index).toBe(1);
    expect(row.props().item).toBe(item);
  });
});
