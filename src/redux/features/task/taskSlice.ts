import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface InitialState {
    tasks: ITask[];
    filter: "all" | "high" | "medium" | "low";
}

const initialState: InitialState = {
    tasks : [
        // {
        //     id: "ytrwfd",
        //     title: " Initialize frontend",
        //     description: "Create Home page and routing",
        //     dueDate: "2025-11-01",
        //     isCompleted: false,
        //     priority: "high"
        // },
        //         {
        //     id: "ytrwfd5",
        //     title: " Initialize GitHub Repo",
        //     description: "Connect GitHub",
        //     dueDate: "2025-11-01",
        //     isCompleted: false,
        //     priority: "medium"
        // },
    ],
    filter: "all",
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            // const id = Math.random().toString(36).substring(2, 15);
            const id = uuidv4();
            const taskData = {
                ...action.payload,
                id,
                isCompleted: false
            };
            state.tasks.push(taskData);
        }
    }
});

export const selectTasks = (state: RootState) => {
    return state.todo.tasks;
};

export const selectFilter = (state: RootState) => {
    return state.todo.filter;
}

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;