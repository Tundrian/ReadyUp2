import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import libraryService from './libraryService'

const games = JSON.parse(localStorage.getItem('games')) || ''

const initialState = {
    games: games ? games : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Set Games
export const setGame = createAsyncThunk('library/setGame', async (games, thunkAPI) => {
    
    try{

        const token = thunkAPI.getState().auth.user.token
        return await libraryService.addGame(games, token)
    }  
    catch (err){

        const message = (err.response && err.response.data && err.response.data.message ) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getGames = createAsyncThunk('lirary/getGames', async (games, thunkAPI) => {
    
    try {
        
        const token = thunkAPI.getState().auth.user.token
        
        return await libraryService.getGames(games, token)

    } catch (err){
        const message = (err.response && err.response.data && err.response.data.message ) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const librarySlice = createSlice ({
    name: 'library',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(setGame.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setGame.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.games = action.payload
            })
            .addCase(setGame.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.games = null
            })
            .addCase(getGames.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGames.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.games = action.payload
            })
            .addCase(getGames.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.games = null
            })
    }
})

export const {reset} = librarySlice.actions
export default librarySlice.reducer