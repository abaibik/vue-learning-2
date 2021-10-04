import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import PaginationItem from "@/components/PaginationItem.vue";
import Pagination from "@/components/Pagination.vue";

describe("Pagination.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  it("renders 2 pages", () => {
    const wrapper = shallowMount(Pagination, {
      mocks: {
        $store: {
          state: {
            currentPage: 1,
          },
          getters: {
            pageCount: 2,
          },
        },
      },
      localVue,
    });
    const paginationItems = wrapper.findAllComponents(PaginationItem);
    expect(paginationItems.length).toBe(2);
    for (let i = 0; i < paginationItems.length; i++) {
      const paginationItem = paginationItems.at(i);
      expect(paginationItem.props().pageNumber).toBe(i + 1);
      expect(paginationItem.props().pageActive).toBe(i === 1);
    }
  });

  it("previous/next page state when on last page", async () => {
    const wrapper = shallowMount(Pagination, {
      mocks: {
        $store: {
          state: {
            currentPage: 1,
          },
          getters: {
            pageCount: 2,
          },
        },
      },
      localVue,
    });
    const previousButton = wrapper.find(".previous-button");
    const nextButton = wrapper.find(".next-button");
    expect(previousButton.classes()).not.toContain("disabled");
    expect(nextButton.classes()).toContain("disabled");
  });

  it("previous/next page state when on first page", async () => {
    const wrapper = shallowMount(Pagination, {
      mocks: {
        $store: {
          state: {
            currentPage: 0,
          },
          getters: {
            pageCount: 2,
          },
        },
      },
      localVue,
    });
    const previousButton = wrapper.find(".previous-button");
    const nextButton = wrapper.find(".next-button");
    expect(previousButton.classes()).toContain("disabled");
    expect(nextButton.classes()).not.toContain("disabled");
  });

  it("emits currentPageChange", () => {
    const mockCommit = jest.fn();
    const wrapper = shallowMount(Pagination, {
      mocks: {
        $store: {
          state: {
            currentPage: 1,
          },
          getters: {
            pageCount: 3,
          },
          commit: mockCommit,
        },
      },
      localVue,
    });

    const previousButton = wrapper.find(".previous-button > a");
    previousButton.trigger("click");
    expect(mockCommit).toBeCalledWith("jumpPrevPage");
    mockCommit.mockClear();

    const nextButton = wrapper.find(".next-button > a");
    nextButton.trigger("click");
    expect(mockCommit).toBeCalledWith("jumpNextPage");
    mockCommit.mockClear();

    const paginationItem = wrapper.findComponent(PaginationItem);
    paginationItem.vm.$emit("choose");
    expect(mockCommit).toBeCalledWith("setCurrentPage", 0);
  });
});
