import { create } from 'zustand'

// returns an object that will be our global state
const useEvent = create((set) => ({
    selectedEvent: null,
    setSelectedEvent: (selectedEvent) => set({ selectedEvent }),
    events: [],
    setEvents: (events) => set({ events }),
}))

export default useEvent