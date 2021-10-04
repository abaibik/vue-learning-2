import { shallowMount } from "@vue/test-utils";
import PaginationItem from "@/components/PaginationItem.vue";

describe("PaginationItem.vue", () => {
  it("renders page number", () => {
    const wrapper = shallowMount(PaginationItem, {
      propsData: {
        pageNumber: 50,
      },
    });
    expect(wrapper.text()).toBe("50");
  });

  it("renders active page", () => {
    const wrapper = shallowMount(PaginationItem, {
      propsData: {
        pageActive: true,
      },
    });
    expect(wrapper.classes()).toContain("active");
  });

  it("renders not active page", () => {
    const wrapper = shallowMount(PaginationItem, {
      propsData: {
        pageActive: false,
      },
    });
    expect(wrapper.classes()).not.toContain("active");
  });

  it("emits choose when link clicked", () => {
    const wrapper = shallowMount(PaginationItem);
    const link = wrapper.find("a");
    link.trigger("click");
    expect(wrapper.emitted().choose).toBeTruthy();
    expect(wrapper.emitted().choose.length).toBe(1);
  });
});
