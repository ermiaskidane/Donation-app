import { create } from 'zustand'

interface useMemberState {
  roleUser: string,
  setRoleUser: (roleUser: string) => void
}

const useMemberStore = create<useMemberState>()((set) => ({
  roleUser: "GUEST",
  setRoleUser: (roleUser: string) => set({roleUser}),
}))


export default useMemberStore;