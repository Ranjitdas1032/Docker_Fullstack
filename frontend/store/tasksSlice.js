import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const APIURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const fetchtasks = createAsyncThunk(
    'tasks/fetchAll',async() => {
        const response = await axios.get(`${APIURL}/tasks/`)
        return response.data
    }
)

export const updatetask = createAsyncThunk(
    'tasks/updatetask',async({id,status}) =>{
        const response = await axios.patch(`${APIURL}/tasks/${id}/`,{status})
        return response.data
    }
)
export const deletetask = createAsyncThunk(
    'tasks/deletetask',async(id) =>{
        await axios.delete(`${APIURL}/tasks/${id}/`)
        return id
    }
)

export const addtask = createAsyncThunk(
    'task/addtask',async(tsk)=>{
        const response = await axios.post(`${APIURL}/tasks/`,tsk)
        return response.data
    }
)

const taskSlice = createSlice({
    name : 'task',
    initialState : {
        items : [],
        loading : true,
        error : null,
    },
    reducers : {
        ClearError : (state)=>{
            state.error = null
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(fetchtasks.pending,(state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchtasks.fulfilled,(state,action) => {
                state.items = action.payload
                state.loading = false
            })
            .addCase(fetchtasks.rejected,(state,action)=> {
                state.error = action.error.message
                state.loading = false
            })
            .addCase(addtask.fulfilled,(state,action)=>{
                state.items.unshift(action.payload)
            })
            .addCase(deletetask.fulfilled,(state,action)=> {
                state.items = state.items.filter((item)=> item.id !== action.payload)
            })
            .addCase(updatetask.fulfilled,(state,action)=> {
                const idx = state.items.findIndex((item)=> item.id === action.payload.id)
                state.items[idx] = action.payload
            })
    }
    
})

export const {ClearError} = taskSlice.actions
export default taskSlice.reducer