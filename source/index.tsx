import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Weather } from "./pages/weather";

const container = document.getElementById("Root")!;
const root = createRoot(container);
root.render(
    <StrictMode>
        <Weather />
    </StrictMode>
);
