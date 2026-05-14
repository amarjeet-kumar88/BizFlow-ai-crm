import { create } from 'zustand'

interface DashboardState {
    sidebarOpen: boolean
    setSidebarOpen: (value: boolean) => void
}

export const useDashboardStore = create<DashboardState>((set) => (
    {
        sidebarOpen: true,
        setSidebarOpen: (value) => set({ sidebarOpen: value })
    }
))