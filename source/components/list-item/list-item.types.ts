import { ReactNode } from "react";

export interface ListItemProps {
    selected?: boolean;
    onClick: () => void;
    children: ReactNode;
    testId?: string;
}
