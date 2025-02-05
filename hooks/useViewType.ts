import { create } from 'zustand';

interface Store {
    view: 'grid' | 'list';
    setView: (view: 'grid' | 'list') => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;

};

const useViewStore = create<Store>((set) => ({
    view: 'grid',
    setView: (view: 'grid' | 'list') => set(() => ({ view })),
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}));

export default useViewStore;