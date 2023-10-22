import { create } from 'zustand'

// type State = {
//   role: string
// }

// type Action = {
//   ChangeRole: (firstName: State['role']) => void
// }
interface useMemberState {
  roleUser: string,
  setRoleUser: (roleUser: string) => void
}

const useMemberStore = create<useMemberState>()((set) => ({
  roleUser: "GUEST",
  setRoleUser: (roleUser: string) => set({roleUser}),
  // setRole: (role: string) => set(() => ({ role: role  })),
}))


export default useMemberStore;