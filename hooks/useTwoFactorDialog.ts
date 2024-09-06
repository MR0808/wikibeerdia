import { create } from 'zustand';

import { TwoFactorDialogsProp } from '@/utils/types';

export const useTwoFactorDialog = create<TwoFactorDialogsProp>((set) => ({
    isOpen: false,
    isEdit: false,
    onEdit: (edit: boolean) => set({ isEdit: edit }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    data: {},
    setData: (data) => set({ data: { data } })
}));
