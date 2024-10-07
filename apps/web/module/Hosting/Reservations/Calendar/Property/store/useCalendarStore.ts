import { addDays } from "date-fns"
import { create } from "zustand"
import { Category, SelectedReservation } from "../../../types/CalendarTable"

type T_Calendar_Store = {
  daysPerPage: number
  startDate: Date
  filterCalendarDate: string
  selectedLegendType: string
  isLegendTypeSelected: boolean
  collapsed: { [key: string]: boolean }
  selectedReservation: SelectedReservation | null
  isReservationModalOpen: boolean
  isAddReservationModalOpen: boolean
  selectedDate: string
  selectedUnitId: string
  filteredData: {items?: Category[]} | null
  unitData: { items: [] }
  editingRoom: string | null
  tempRoomAbbr: string
  isEditReservation: boolean
  isCancelReservation: boolean
  searchString: string
  isEditPricePerDatesModalOpen: boolean

  // Setters
  setStartDate: (value: Date) => void
  setFilterCalendarDate: (value: string) => void
  setSelectedLegendType: (value: string) => void
  setIsLegendTypeSelected: (value: boolean) => void
  setCollapsed: (value: { [key: string]: boolean }) => void
  setSelectedReservation: (value: SelectedReservation | null) => void
  setIsReservationModalOpen: (value: boolean) => void
  setIsAddReservationModalOpen: (value: boolean) => void
  setSelectedDate: (value: string) => void
  setSelectedUnitId: (value: string) => void
  setFilteredData: (value: {items?: Category[]} | null) => void
  setUnitData: (value: any) => void
  setEditingRoom: (value: string | null) => void
  setTempRoomAbbr: (value: string) => void
  setIsEditReservation: (value: boolean) => void
  setIsCancelReservation: (value: boolean) => void
  setSearchString: (value: string) => void
  setIsEditPricePerDatesModalOpen: (value: boolean) => void
}

export const useCalendarStore = create<T_Calendar_Store>((set) => ({
  daysPerPage: 12,
  startDate: addDays(new Date(), -4),
  filterCalendarDate: "",
  selectedLegendType: "",
  isLegendTypeSelected: false,
  collapsed: {},
  selectedReservation: null,
  isReservationModalOpen: false,
  isAddReservationModalOpen: false,
  selectedDate: "",
  selectedUnitId: "",
  filteredData: null,
  unitData: { items: [] },
  editingRoom: null,
  tempRoomAbbr: "",
  isEditReservation: false,
  isCancelReservation: false,
  searchString: "",
  isEditPricePerDatesModalOpen: false,

  // Setters
  setStartDate: (value: Date) => set({ startDate: value }),
  setFilterCalendarDate: (value: string) => set({ filterCalendarDate: value }),
  setSelectedLegendType: (value: string) => set({ selectedLegendType: value }),
  setIsLegendTypeSelected: (value: boolean) => set({ isLegendTypeSelected: value }),
  setCollapsed: (value: { [key: string]: boolean }) => set({ collapsed: value }),
  setSelectedReservation: (value: SelectedReservation | null) => set({ selectedReservation: value }),
  setIsReservationModalOpen: (value: boolean) => set({ isReservationModalOpen: value }),
  setIsAddReservationModalOpen: (value: boolean) => set({ isAddReservationModalOpen: value }),
  setSelectedDate: (value: string) => set({ selectedDate: value }),
  setSelectedUnitId: (value: string) => set({ selectedUnitId: value }),
  setFilteredData: (value: {items?: Category[]} | null) => set({ filteredData: value }),
  setUnitData: (value: any) => set({ unitData: value }),
  setEditingRoom: (value: string | null) => set({ editingRoom: value }),
  setTempRoomAbbr: (value: string) => set({ tempRoomAbbr: value }),
  setIsEditReservation: (value: boolean) => set({ isEditReservation: value }),
  setIsCancelReservation: (value: boolean) => set({ isCancelReservation: value }),
  setSearchString: (value: string) => set({ searchString: value }),
  setIsEditPricePerDatesModalOpen: (value: boolean) => set({ isEditPricePerDatesModalOpen: value }),
}))
