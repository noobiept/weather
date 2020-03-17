import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { expectToBeSelected, expectToNotBeSelected } from "../../tests/utils";
import SearchList from "./search_list";

describe("SearchList", () => {
    test("Should have all the expected elements.", () => {
        const props = {
            cityNames: ["one", "two"],
            selectedPosition: 1,
            onItemClick: jest.fn(),
        };
        const { container } = render(<SearchList {...props} />);
        const searches = container.querySelector("#PreviousSearches")!;
        const list = searches.querySelector(".horizontalList")!;
        const cityButtons = list.querySelectorAll(".searchItem");

        expect(searches).toHaveTextContent("Previous searches:");
        expect(list).toBeInTheDocument();
        expect(cityButtons).toHaveLength(props.cityNames.length);
    });

    test("Should be empty if there's no city names.", () => {
        const props = {
            cityNames: [],
            selectedPosition: -1,
            onItemClick: jest.fn(),
        };
        const { container } = render(<SearchList {...props} />);
        const searches = container.querySelector("#PreviousSearches")!;
        const list = searches.querySelector(".horizontalList");

        expect(searches).not.toHaveTextContent("Previous searches:");
        expect(list).not.toBeInTheDocument();
    });

    test("The selected city should have an extra css class.", () => {
        const props = {
            cityNames: ["one", "two"],
            selectedPosition: 1,
            onItemClick: jest.fn(),
        };
        const { container } = render(<SearchList {...props} />);
        const searches = container.querySelector("#PreviousSearches")!;
        const list = searches.querySelectorAll(".horizontalList .searchItem");

        props.cityNames.forEach((_, index) => {
            const item = list[index];

            if (index === props.selectedPosition) {
                expectToBeSelected(item);
            } else {
                expectToNotBeSelected(item);
            }
        });
    });

    test("Clicking on a list entry should call the click listener.", () => {
        const props = {
            cityNames: ["one", "two"],
            selectedPosition: 1,
            onItemClick: jest.fn((name: string, position?: number) => {
                expect(name).toBe("one");
                expect(position).toBe(0);
            }),
        };
        const { container } = render(<SearchList {...props} />);
        const searches = container.querySelector("#PreviousSearches")!;
        const list = searches.querySelector(".horizontalList")!;

        fireEvent.click(list.firstElementChild!);
        expect(props.onItemClick).toHaveBeenCalled();
    });
});
