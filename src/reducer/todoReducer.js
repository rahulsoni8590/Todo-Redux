import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {  toast } from 'react-toastify';

const initialState = {
    todos: [],
    error: "",
    loading:false
}


export const getInitialStateAsync = createAsyncThunk("todo/get", (arg, thunkAPI) => {
    return fetch("https://jsonplaceholder.typicode.com/todos/")
    .then((res)=>res.json())
    .then((data)=>data)
})

export const postTodoAsync = createAsyncThunk("todo/post", async (payload)=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", 
        {
            method:"post", 
            headers:{"content-type":"application/json"},
            body: JSON.stringify({
                title:payload,
                completed:false,
                id: initialState.todos.length,
                userid:5
            })
        })

    const result = await response.json()
    return result
})

export const putTodoAsync = createAsyncThunk("todo/put", async (items)=>{
    const data = {...items, completed:!items.completed}
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`, 
        {
            method:"put", 
            body: JSON.stringify({...data}),
            headers: {
            "Content-type": "application/json; charset=UTF-8",
  }
        })
    const result = await response.json()
    toast.success("Todo Status Updated")
    return result
})

export const deletTodoAsync = createAsyncThunk("todo/delet", async (payload)=>{
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`, 
        {
            method:"DELETE", 
           })
    response.id = payload
    toast.warn("Todo Deleted")
    return response
})

const todoSlice = createSlice({
    name: "todo",
    initialState: initialState,
    reducers: {
        delet: (state, action) => {
            const id = action.payload
            const idx = state.todos.findIndex((todo) => todo.id === id)
            state.todos.splice(idx, 1)
        },
        changeState:(state,action)=>{
            const id = action.payload
            const idx = state.todos.findIndex((todo) => todo.id === id)
            state.todos[idx].completed = !state.todos[idx].completed
        },
        addTodo:(state,action)=>{
            const id = state.todos.length + 1
            state.todos.push({id, title:action.payload, completed:false})
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getInitialStateAsync.fulfilled, (state,action)=>{
            console.log(action.payload)
            state.todos = action.payload
        }).addCase(postTodoAsync.fulfilled, (state,action)=>{
            state.todos.push(action.payload)
        }).addCase(putTodoAsync.fulfilled, (state,action)=>{
            console.log(action)
            const title = action.payload.title
            const idx = state.todos.findIndex((todo)=> todo.title === title)
            console.log(idx);
            state.todos[idx] = action.payload 
        }).addCase(deletTodoAsync.fulfilled, (state,action)=>{
            const id = action.payload.id
            const idx = state.todos.findIndex((todo)=>todo.id === id)
            state.todos.splice(idx,1)
        })
    }
})

export const action = todoSlice.actions;
export const todoReducer = todoSlice.reducer
export const todoSelector = (state) => state.todos