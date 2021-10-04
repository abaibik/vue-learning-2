/**
 * @jest-environment jsdom
 */

import { shallowMount } from "@vue/test-utils";
import ExpenceListRow from "@/components/ExpenceListRow.vue";

describe("ExpenceListRow.vue", () => {
  it("renders row", () => {
    const languageGetter = jest.spyOn(window.navigator, "language", "get");
    languageGetter.mockReturnValue("ru");
    const item = {
      date: new Date("1995-12-17T03:24:00"),
      category: "cats",
      value: 40,
    };
    const wrapper = shallowMount(ExpenceListRow, {
      propsData: { item: item, index: 2 },
    });

    {
      // Check index
      const ths = wrapper.findAll("th");
      expect(ths.length).toBe(1);
      expect(ths.at(0).text()).toBe("2");
    }

    {
      //Check category
      const tdCategory = wrapper.findAll(".row-category");
      expect(tdCategory.length).toBe(1);
      expect(tdCategory.at(0).text()).toBe("cats");
    }

    {
      //Check value
      const tdValue = wrapper.findAll(".row-value");
      expect(tdValue.length).toBe(1);
      expect(tdValue.at(0).text()).toBe("40");
    }

    {
      //Check date
      const tdDate = wrapper.findAll(".row-date");
      expect(tdDate.length).toBe(1);
      expect(tdDate.at(0).text()).toBe("17.12.1995");
    }
  });
});
