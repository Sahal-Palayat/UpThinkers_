import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userRegister= createAsyncThunk('user/register',async ( signupData,thunkAPI)=>{
    try {
        console.log(signupData);

        const response = await fetch('http://localhost:3030/user/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)

        })

        if(!response.ok){
            console.log('failed to register');
            throw new Error('invalid response')
        }

        const data= await response.json()

        Cookies.set('token',data.token,{expires:7})
        return data
    } catch (error) {
        throw error
    }
}) 



const initialState= {
    msg:'',
    user:null,
    loading :false,
    error:null
}

 const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        // clearUser:(state,action)=>{
        //     state.user=null
        // },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(userRegister.pending,(state,action)=>{
                state.loading=true
                state.error=null
            })
           .addCase(userRegister.fulfilled,(state,action)=>{
                state.loading=false
                state.msg=action.payload.message;
                state.user=action.payload.user

           })
           .addCase(userRegister.rejected,(state,action)=>{
                state.loading=false
                state.error=action.error.message
           })
    }

})

export default userSlice.reducer;

// export const {clearUser}= userSlice.actions;