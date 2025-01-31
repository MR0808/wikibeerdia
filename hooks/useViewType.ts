import { create } from 'zustand';

interface Store {
    view: 'grid' | 'list';
    setView: (view: 'grid' | 'list') => void;
};

const useViewStore = create<Store>((set) => ({
    view: 'grid',
    setView: (view: 'grid' | 'list') => set(() => ({ view })),
}));

export default useViewStore;