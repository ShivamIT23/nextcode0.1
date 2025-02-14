import { create } from "zustand"

interface UserDetail {
    name?: string ,
    email?: string,
    img:string,
    isGuest:boolean,
    createdAt?: number,
    uid:string
}

interface UserState {
    user: UserDetail;
    setUser: (newUser: UserDetail) => void;
}

export const useUserDetail = create<UserState>((set)=>({
    user: {name: "" ,
        email: "",
        img:"",
        isGuest:true,
        createdAt: Date.now(),
        uid:""},
        setUser: (newUser) => set({user: newUser}),
}))

