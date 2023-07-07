export function expectToBeSelected(element: Element) {
    expect(element).toHaveAttribute("data-selected");
}

export function expectToNotBeSelected(element: Element) {
    expect(element).not.toHaveAttribute("data-selected");
}
