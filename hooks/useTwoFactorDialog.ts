import { create } from 'zustand';

import { DialogsProp } from '@/utils/types';

export const useTwoFactorDialog = create<DialogsProp>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    data: {},
    setData: (data) => set({ data: { data } })
}));
