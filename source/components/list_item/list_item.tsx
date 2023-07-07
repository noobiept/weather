import { ItemRoot } from "./list_item.styles";
import { ListItemProps } from "./list_item.types";

export function ListItem({
    onClick,
    selected,
    children,
    testId,
}: ListItemProps) {
    return (
        <ItemRoot
            data-testid={testId}
            data-selected={selected === true ? selected : undefined}
            onClick={onClick}
            selected={selected}
        >
            {children}
        </ItemRoot>
    );
}
