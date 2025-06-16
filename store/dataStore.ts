// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { create } from 'zustand'
// import { createJSONStorage, persist } from 'zustand/middleware'



// export interface Profile {
//   id: string
//   name: string
//   email: string
//   bookings: string[]
// }

// export interface Data {
//   properties: []
//   bookings: []
//   profile: Profile
// }

// interface DataStore {
//   data: Data[] | null
//   loading: boolean
//   error: string | null
//   fetchUsers: () => Promise<void>
//   // addBookingToProfile: (userId: string, bookingId: string) => void
// }

// const useDataStore= create<DataStore>()(
//   persist(
//     (set) => ({
//         data: null,
//         loading: false,
//         error: null,

//       fetchUsers: async () => {
//         set({ loading: true, error: null })

//         try {
//           const res = await fetch('https://pastebin.com/raw/Sa0LzR3T')
//           const data: Data[] = await res.json()
//           set({ data: data, loading: false })
//         } catch (err: any) {
//           set({ error: err.message || 'Fetch error', loading: false })
//           console.log('Error')
//         }
//       },
//       addBookingToProfile: async () => {
//         const currentData = get().data
//         if (!currentData) return

//         const newData = currentData.map((item) => {
//           if (item.profile.id === userId) {
//             return {
//               ...item,
//               profile: {
//                 ...item.profile,
//                 bookings: [...item.profile.bookings, bookingId],
//               },
//             }
//           }
//           return item
//         })

//         set({ data: newData })
//       },
//     }),
//     {
//       name: 'app-data',
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// )

// export default useDataStore


import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// Profile type
export interface Profile {
  id: string
  name: string
  email: string
  bookings: string[]
}

// Each item in your data array
export interface Data {
  properties: any[]
  bookings: any[]
  profile: Profile
}

// Zustand store interface
interface DataStore {
  data: Data[] | null
  loading: boolean
  error: string | null
  fetchUsers: () => Promise<void>
  addBookingToProfile: (property_id: string) => void
}

// Create the Zustand store
const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      data: null,
      loading: false,
      error: null,

      // Fetch and set data from remote API
      fetchUsers: async () => {
        set({ loading: true, error: null })

        try {
          const res = await fetch('https://pastebin.com/raw/Sa0LzR3T')
          const data: Data[] = await res.json()
          set({ data, loading: false })
        } catch (err: any) {
          set({ error: err.message || 'Fetch error', loading: false })
        }
      },

      // Add a booking ID to profile.bookings
      addBookingToProfile: (property_id) => {
        const currentData = get().data
        if (!currentData) return

        console.log('currentData :: ',currentData) 
        let bookings = currentData.profile.bookings; 
        bookings.push(property_id);
        currentData.profile.bookings = bookings;

        set({ data: currentData })
      },
    }),
    {
      name: 'app-data',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useDataStore
