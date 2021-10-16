import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Pagination from "@/components/Pagination.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import { BPagination } from "bootstrap-vue";

describe("Pagination.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(BootstrapVue);
  localVue.use(BootstrapVueIcons);

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
    const pagination = wrapper.findComponent(BPagination);
    expect(pagination.props().totalRows).toBe(2);
    expect(pagination.props().perPage).toBe(1);
  });

  it("commit setCurrentPage when input event", async () => {
    const mockCommit = jest.fn();
    const wrapper = shallowMount(Pagination, {
      mocks: {
        $store: {
          state: {
            currentPage: 1,
          },
          getters: {
            pageCount: 2,
          },
          commit: mockCommit,
        },
      },
      localVue,
    });
    const pagination = wrapper.findComponent(BPagination);
    pagination.vm.$emit("input", 5);
    await wrapper.vm.$nextTick();
    expect(mockCommit).toHaveBeenCalledWith("setCurrentPage", 4);
  });
});
