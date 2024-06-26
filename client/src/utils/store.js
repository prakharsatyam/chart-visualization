import {create} from 'zustand'
const useDataStore = create((set)=>({
    data:[],
    // eslint-disable-next-line no-unused-vars
    setData :(val)=> set((state)=>({data:val})),
}))

export {useDataStore}