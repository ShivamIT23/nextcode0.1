import { Id } from "@nextCode/convex/_generated/dataModel";
import { create } from "zustand"

interface UserDetail {
    name?: string ,
    email?: string,
    img?:string,
    isGuest:boolean,
    createdAt?: number,
    uid:string,
    _id:Id<"users">
}

interface UserState {
    user: UserDetail | null;
    setUser: (newUser: UserDetail |null) => void;
}

export const useUserDetail = create<UserState>((set)=>({
    user: null,
    setUser: (newUser) => set({user: newUser}),
}))

