import App from "@/App";
import Tasks from "@/pages/tasks";
import User from "@/pages/user";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        // element: <App></App>,
        Component: App,
        children: [
            {
                index: true,
                Component: Tasks,
            },
            {
                path: "tasks",
                Component: Tasks,
            },
            {
                path: "users",
                Component: User,
            },
        ]
    }
])

export default router;