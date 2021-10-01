import { shallowMount } from "@vue/test-utils";
import PaginationItem from "@/components/PaginationItem.vue";
import Pagination from "@/components/Pagination.vue";

describe("Pagination.vue", () => {
  it("renders 2 pages", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        pageCount: 2,
        currentPage: 1,
      },
    });
    const paginationItems = wrapper.findAllComponents(PaginationItem);
    expect(paginationItems.length).toBe(2);
    for (let i = 0; i < paginationItems.length; i++) {
      const paginationItem = paginationItems.at(i);
      expect(paginationItem.props().pageNumber).toBe(i + 1);
      expect(paginationItem.props().pageActive).toBe(i === 1);
    }
  });

  it("previous/next page state", async () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        pageCount: 2,
        currentPage: 1,
      },
    });
    const previousButton = wrapper.find(".previous-button");
    const nextButton = wrapper.find(".next-button");
    expect(previousButton.classes()).not.toContain("disabled");
    expect(nextButton.classes()).toContain("disabled");

    await wrapper.setProps({ currentPage: 0, pageCount: 2 });
    expect(previousButton.classes()).toContain("disabled");
    expect(nextButton.classes()).not.toContain("disabled");
  });

  it("emits currentPageChange", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        pageCount: 3,
        currentPage: 1,
      },
    });
    const previousButton = wrapper.find(".previous-button > a");
    const nextButton = wrapper.find(".next-button > a");
    const paginationItem = wrapper.findComponent(PaginationItem);

    previousButton.trigger("click");
    nextButton.trigger("click");
    paginationItem.vm.$emit("choose");
    expect(wrapper.emitted().currentPageChange).toBeTruthy();
    expect(wrapper.emitted().currentPageChange.length).toBe(3);
    expect(wrapper.emitted().currentPageChange[0]).toEqual([0]);
    expect(wrapper.emitted().currentPageChange[1]).toEqual([2]);
    expect(wrapper.emitted().currentPageChange[2]).toEqual([0]);
  });
});
