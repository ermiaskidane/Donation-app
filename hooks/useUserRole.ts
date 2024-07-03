import { create } from 'zustand'

interface useUserRoleState {
  roleUser: string,
  setRoleUser: (roleUser: string | undefined) => void
}

const useUserRoleStore = create<useUserRoleState>()((set) => ({
  roleUser: "GUEST",
  setRoleUser: (roleUser: string | undefined) => set({roleUser}),
}))


export default useUserRoleStore;