import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

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

export const userLogin = createAsyncThunk('user/login',async (loginData,thunkAPI)=>{
    try {
        console.log('yessss');
        console.log(loginData);

        const response = await fetch('http://localhost:3030/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(loginData)
        })

        if(response.status===302){
            console.log('response',response);

            const data= await response.json()
            console.log(response);
            throw new Error(data.message)
        }

       

        const data = await response.json()

        Cookies.set('token',data.token,{expires:7})
        Cookies.set('refreshToken',data.refreshToken,{expires:7})
        console.log(data.token);

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
        clearUser:(state)=>{
            state.user=null
        },
        userLoginSuccess:(state,action)=>{
            state.error= null
        },
        userLoginFailure:(state,action)=>{
            state.error=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
        }

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
                console.log(state.user,'ithaaaaaan user');

           })
           .addCase(userRegister.rejected,(state,action)=>{
                console.log(action.payload.message);
                state.loading=false
                state.error=action.error.message
           })
           .addCase(userLogin.pending,(state,action)=>{
                state.loading=true
                state.error=null
                console.log(state,'Statee');
            })
            .addCase(userLogin.fulfilled,(state,action)=>{
                
                state.loading=false
                state.msg=action.payload.message;
                state.user=action.payload.user
                state.error= null
                console.log(state.user,'login user aaanneeeee');
            }) 
            .addCase(userLogin.rejected,(state,action)=>{
               console.log('action',action);
                state.loading=false
                state.error=action.error.message
                console.log(state.error);
            })
    }

})

export default userSlice.reducer;

export const {clearUser,userLoginFailure,userLoginSuccess,setUser}= userSlice.actions;