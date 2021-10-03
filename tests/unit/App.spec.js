import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import ExpenceList from "@/components/ExpenceList.vue";
import App from "@/App.vue";

describe("App.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const mockDispatch = jest.fn();
  const mockCommit = jest.fn();
  beforeEach(() => {
    mockDispatch.mockClear();
    mockCommit.mockClear();
  });

  it("renders single item", async () => {
    const item = { date: new Date(), category: "cats", value: 40 };

    const wrapper = shallowMount(App, {
      mocks: {
        $store: {
          getters: {
            pageCount: 1,
            currentPageItems: [item],
          },
          dispatch: mockDispatch,
        },
      },
      localVue,
    });
    const list = wrapper.findComponent(ExpenceList);
    expect(list.props().items).toStrictEqual([item]);
    expect(mockDispatch).toHaveBeenCalledWith("fetchData");
  });

  it("dialog shown when button clicked", async () => {
    const wrapper = shallowMount(App, {
      mocks: {
        $store: {
          getters: {
            pageCount: 1,
            currentPageItems: [],
          },
          commit: mockCommit,
          dispatch: mockDispatch,
        },
      },
      localVue,
    });
    const btn = wrapper.find("button");
    await btn.trigger("click");
    expect(mockCommit).toHaveBeenCalledWith("showDialog");
  });
});
