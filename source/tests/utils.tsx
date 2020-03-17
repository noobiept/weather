export function expectToBeSelected(element: Element) {
    expect(element).toHaveStyle(`
    background-color: rgba(70, 50, 150, 0.1);
`);
}

export function expectToNotBeSelected(element: Element) {
    expect(element).toHaveStyle(`
    background-color: none;
`);
}
