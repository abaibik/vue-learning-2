import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import ExpenceList from "@/components/ExpenceList.vue";
import App from "@/App.vue";

describe("App.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  it("renders single item", async () => {
    const item = { date: new Date(), category: "cats", value: 40 };

    const wrapper = shallowMount(App, {
      mocks: {
        $store: {
          getters: {
            pageCount: 1,
            currentPageItems: [item],
          },
        },
      },
      localVue,
    });
    const list = wrapper.findComponent(ExpenceList);
    expect(list.props().items).toStrictEqual([item]);
  });

  it("dialog shown when button clicked", async () => {
    const mockCommit = jest.fn();
    const wrapper = shallowMount(App, {
      mocks: {
        $store: {
          getters: {
            pageCount: 1,
            currentPageItems: [],
          },
          commit: mockCommit,
        },
      },
      localVue,
    });
    const btn = wrapper.find("button");
    await btn.trigger("click");
    expect(mockCommit).toHaveBeenCalledWith("showDialog");
  });
});
