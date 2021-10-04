import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import AddDialog from "@/components/AddDialog.vue";

describe("AddDialog.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const $store = {
    state: {
      dialogShown: false,
    },
  };

  it("makeCost returns values from inputs", () => {
    const wrapper = shallowMount(AddDialog, {
      mocks: {
        $store,
      },
      localVue,
    });
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
    const mockCommit = jest.fn();
    const wrapper = shallowMount(AddDialog, {
      mocks: {
        $store: {
          state: {
            dialogShown: false,
          },
          commit: mockCommit,
        },
      },
      localVue,
    });
    const cost = {
      date: new Date("2017-06-01"),
      category: "cats",
      value: "40",
    };
    wrapper.vm.makeCost = jest.fn(() => cost);

    const button = wrapper.find("#buttonAdd");
    await button.trigger("click");
    expect(wrapper.vm.makeCost).toBeCalled();
    expect(mockCommit).toHaveBeenCalledWith("addCost", cost);
  });

  it("clearForm clear inputs", () => {
    const wrapper = shallowMount(AddDialog, {
      mocks: {
        $store,
      },
      localVue,
    });
    wrapper.vm.$refs.categoryRef.value = "cats";
    wrapper.vm.$refs.amountRef.value = "40";
    wrapper.vm.$refs.dateRef.value = "2017-06-01";
    wrapper.vm.clearForm();
    expect(wrapper.vm.$refs.categoryRef.value).toBe("");
    expect(wrapper.vm.$refs.amountRef.value).toBe("");
    expect(wrapper.vm.$refs.dateRef.value).toBe("");
  });

  it("categories", () => {
    const wrapper = shallowMount(AddDialog, {
      mocks: {
        $store: {
          state: {
            expences: {
              page0: [{ category: "cats" }, { category: "dogs" }],
              page1: [{ category: "cats" }, { category: "snakes" }],
            },
          },
        },
      },
      localVue,
    });
    expect(wrapper.vm.categories).toEqual(new Set(["cats", "dogs", "snakes"]));
  });
});
