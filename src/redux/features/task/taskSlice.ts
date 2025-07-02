import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";

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
        {       
            id:"LodP7qqbmHdTTBlg58ne_",
            isCompleted:false,
            title:"Esse sed ea nostrud ",
            description:"Temporibus at volupt",
            priority:"medium",
            dueDate:"2025-07-22T18:00:00.000Z"
        }
    ],
    filter: "all",
}

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;

const createTask = (taskData: DraftTask): ITask => {
    return { 
        id: nanoid(),
        isCompleted: false,
        ...taskData
    }
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<DraftTask>) => {
            // const id = Math.random().toString(36).substring(2, 15);
            // const id = uuidv4();
            // const taskData = {
            //     ...action.payload,
            //     id,
            //     isCompleted: false
            // };
            const taskData = createTask(action.payload);
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