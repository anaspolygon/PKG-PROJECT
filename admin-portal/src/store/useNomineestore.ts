import { create } from "zustand"
import { persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"

// ==============================
// Types
// ==============================

export interface Nominee {
  id?: string
  name: string
  relation: string
  dob: string
  share: string
  document_type: string
  guardian_document_type?: string

  // Optional fields
  mobile?: string
  email?: string
  address?: string
  nid_number?: string
  passport_number?: string
  birth_certificate_number?: string
  driving_license_number?: string
  

  // Image URLs
  user_image_urls?: string[]
  nid_front_urls?: string[]
  nid_back_urls?: string[]
  nominee_signature_urls?: string[]
  passport_urls?: string[]
  guardian_passport_urls?: string[]
  birth_certificate_urls?: string[]
  guardian_birth_certificate_urls?: string[]
  guardian_nid_front_urls?: string[]
  guardian_nid_back_urls?: string[]
  guardian_image_url?: string[]
  driving_license_urls?: string[]
  guardian_driving_license_urls?: string[]



  // File uploads
  user_image?: File[] | string[]
  nid_front?: File[] | string[]
  nid_back?: File[] | string[]
  nominee_signature?: File[] | string[]
  passport?: File[] | string[]
  guardian_passport?: File[] | string[]
  birth_certificate?: File[] | string[]
  guardian_birth_certificate?: File[] | string[]
  guardian_nid_front?: File[] | string[]
  guardian_nid_back?: File[] | string[]
  driving_license?: File[] | string[]
  guardian_driving_license?: File[] | string[]

  // Guardian information
  guardian_name?: string
  guardian_nid_number?: string
  guardian_passport_number?: string
  guardian_birth_certificate_number?: string
  guardian_driving_license_number?: string
  images?: {
    user_image?: File[] | string[]
    nid_front?: File[] | string[]
    nid_back?: File[] | string[]
    passport?: File[] | string[]
    guardian_passport?: File[] | string[]
    birth_certificate?: File[] | string[]
    guardian_birth_certificate?: File[] | string[]
    nominee_signature?: File[] | string[]
    guardian_nid_front?: File[] | string[]
    guardian_nid_back?: File[] | string[]
    driving_license?: File[] | string[]
    guardian_driving_license?: File[] | string[]
    
  }
  previous?: {
    user_image?: File[] | string[]
    nid_front?: File[] | string[]
    nid_back?: File[] | string[]
    nominee_signature?: File[] | string[]
    passport?: File[] | string[]
    guardian_passport?: File[] | string[]
    birth_certificate?: File[] | string[]
    guardian_birth_certificate?: File[] | string[]
    guardian_nid_front?: File[] | string[]
    guardian_nid_back?: File[] | string[]
    driving_license?: File[] | string[]
    guardian_driving_license?: File[] | string[]
  }
  deletedImages?: {
    user_image?: string[]
    nid_front?: string[]
    nid_back?: string[]
    nominee_signature?: string[]
    passport?: string[]
    guardian_passport?: string[]
    birth_certificate?: string[]
    guardian_birth_certificate?: string[]
    guardian_nid_front?: string[]
    guardian_nid_back?: string[]
    driving_license?: string[]
    guardian_driving_license?: string[]
  }
}

interface NomineeStore {
  nominees: Nominee[]
  selectedIndex: number | null

  setSelectedIndex: (index: number | null) => void
  getNomineeByIndex: (index: number) => Nominee | undefined

  addNominee: (nominee: Nominee) => void
  editNominee: (index: number, updatedNominee: Nominee) => void
  removeNominee: (index: number) => void
  loadNominees: (nominees: Nominee[]) => void
  getRemainingShare: () => number
  clearNominees: () => void
  resetStore: () => void
}



const initialState = {
  nominees: [],
  selectedIndex: null,
}



export const useNomineeStore = create<NomineeStore>()(
  persist(
    (set, get) => ({
      ...initialState,


      setSelectedIndex: (index: number | null) => set({ selectedIndex: index }),

      getNomineeByIndex: (index: number): Nominee | undefined => get().nominees[index],

      addNominee: (nominee) => {
        set((state) => ({
          nominees: [...state.nominees, { ...nominee, id: nominee.id ?? uuidv4() }],
        }))
      },

      editNominee: (index: number, updatedNominee: Nominee) => {

        set((state) => {
          const updated = [...state.nominees]
          updated[index] = {
            ...updatedNominee,
            id: updatedNominee.id ?? uuidv4(),
          }
          return { nominees: updated }
        })
      },

      removeNominee: (index) =>
        set((state) => {
          const updated = [...state.nominees]
          updated.splice(index, 1)
          return { nominees: updated }
        }),

      loadNominees: (nominees) =>
        set({
          nominees: nominees.map((nominee) => ({
            ...nominee,
            id: nominee.id ?? uuidv4(),
          })),
        }),



      getRemainingShare: () => {
        const totalShare = get().nominees.reduce((acc, curr) => {
          const share = Number.parseFloat(curr.share)
          return acc + Number(share)
        }, 0)
        return Math.max(0, 100 - totalShare)
      },



      clearNominees: () => set({ nominees: [] }),

      resetStore: () => {
        // First clear the persisted data
        if (typeof window !== "undefined") {
          localStorage.removeItem("nominee-storage")
        }
        // Then reset the state
        set(initialState)
      },
    }),
    {
      name: "nominee-storage",
    },
  ),
)
