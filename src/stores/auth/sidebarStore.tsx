import { create } from 'zustand';
interface useSidebarStoreProps {
  state: {
    isCollapsed: boolean;
    isClosed: boolean;
  };
  actions: {
    toggleCollapsed: () => void;
    toggleClosed: () => void;
    setClosed: (status: boolean) => void;
  };
}

export const useSidebarStore = create<useSidebarStoreProps>((set, get) => ({
  state: {
    isCollapsed: false,
    isClosed: false
  },
  actions: {
    toggleCollapsed: () => {
      set(state => ({
        state: { ...state.state, isCollapsed: !state.state.isCollapsed }
      }));
    },
    toggleClosed: () => {
      set(state => ({
        state: { ...state.state, isClosed: !state.state.isClosed }
      }));
    },
    setClosed: status => {
      set(state => ({
        state: { ...state.state, isClosed: status }
      }));
    }
  }
}));
