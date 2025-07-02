import type { RootState } from "@/redux/store";
import type { IUser } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    users: IUser[];
}

const initialState: InitialState = {
    users: [],
}

type DraftTask = Pick<IUser, "name">;

const createUser = (userData: DraftTask): IUser => {
    return { 
        id: nanoid(),
        ...userData
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<DraftTask>) => {
            const userData = createUser(action.payload);
            state.users.push(userData);
        },
        removeUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter((user) => user.id != action.payload)
        }
    }
});


export const selectUsers = (state: RootState) => {
    return state.user.users;
}

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;