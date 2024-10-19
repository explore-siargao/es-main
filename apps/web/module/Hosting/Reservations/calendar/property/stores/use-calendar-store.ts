import { addDays } from "date-fns"
import { create } from "zustand"
import { T_Calendar_Property, T_Calendar_Property_Reservation } from "@repo/contract"

type T_Calendar_Store = {
  daysPerPage: number
  startDate: Date
  filterCalendarDate: string
  selectedLegendType: string
  isLegendTypeSelected: boolean
  collapsed: { [key: string]: boolean }
  selectedReservation:  { unit: string, reservation: T_Calendar_Property_Reservation } | null
  isReservationModalOpen: boolean
  isAddReservationModalOpen: boolean
  selectedDate: string
  selectedUnitId: string
  propertyData: T_Calendar_Property[]
  editingUnitQtyId: string | null
  tempUnitQtyName: string
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
  setSelectedReservation: (value: { unit: string, reservation: T_Calendar_Property_Reservation } | null) => void
  setIsReservationModalOpen: (value: boolean) => void
  setIsAddReservationModalOpen: (value: boolean) => void
  setSelectedDate: (value: string) => void
  setSelectedUnitId: (value: string) => void
  setPropertyData: (value: T_Calendar_Property[]) => void
  setEditingUnitQtyId: (value: string | null) => void
  setTempUnitQtyName: (value: string) => void
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
  propertyData: [],
  editingUnitQtyId: null,
  tempUnitQtyName: "",
  isEditReservation: false,
  isCancelReservation: false,
  searchString: "",
  isEditPricePerDatesModalOpen: false,

  // Setters
  setStartDate: (value: Date) => set({ startDate: value }),
  setFilterCalendarDate: (value: string) => set({ filterCalendarDate: value }),
  setSelectedLegendType: (value: string) => set({ selectedLegendType: value }),
  setIsLegendTypeSelected: (value: boolean) =>
    set({ isLegendTypeSelected: value }),
  setCollapsed: (value: { [key: string]: boolean }) =>
    set({ collapsed: value }),
  setSelectedReservation: (value: { unit: string, reservation: T_Calendar_Property_Reservation } | null) =>
    set({ selectedReservation: value }),
  setIsReservationModalOpen: (value: boolean) =>
    set({ isReservationModalOpen: value }),
  setIsAddReservationModalOpen: (value: boolean) =>
    set({ isAddReservationModalOpen: value }),
  setSelectedDate: (value: string) => set({ selectedDate: value }),
  setSelectedUnitId: (value: string) => set({ selectedUnitId: value }),
  setPropertyData: (value: any) => set({ propertyData: value }),
  setEditingUnitQtyId: (value: string | null) =>
    set({ editingUnitQtyId: value }),
  setTempUnitQtyName: (value: string) => set({ tempUnitQtyName: value }),
  setIsEditReservation: (value: boolean) => set({ isEditReservation: value }),
  setIsCancelReservation: (value: boolean) =>
    set({ isCancelReservation: value }),
  setSearchString: (value: string) => set({ searchString: value }),
  setIsEditPricePerDatesModalOpen: (value: boolean) =>
    set({ isEditPricePerDatesModalOpen: value }),
}))
