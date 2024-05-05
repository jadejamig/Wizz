import { create } from "zustand";

interface UseProModalStore {
    isOpen: boolean | undefined;
    onOpen: () => void;
    onClose: () => void;
}

const UseProModal = create<UseProModalStore>(( set ) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default UseProModal