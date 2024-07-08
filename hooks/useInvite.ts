import { Member, Position, Server } from '@prisma/client';
import { create } from 'zustand';

interface InviteState {
  isOpen: boolean;
  server: Server & {positions: Position[]} | null;
  setServer: (data: Server & {positions: Position[]}) => void;
  onCloseServer: () => void;
}

const useInvite = create<InviteState>((set) => ({
  isOpen: false,
  server: null,
  setServer: (data) => set({ isOpen: true, server: data }),
  onCloseServer: () => set({isOpen: false})
}));

export default useInvite;