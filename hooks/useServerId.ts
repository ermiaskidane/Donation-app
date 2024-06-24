import { create } from 'zustand';

interface ServerState {
  serverId: string | null;
  setServerId: (id: string) => void;
}

const useServerStore = create<ServerState>((set) => ({
  serverId: null,
  setServerId: (id: string) => set({ serverId: id }),
}));

export default useServerStore;