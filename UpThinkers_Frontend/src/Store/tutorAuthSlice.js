import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";



export const tutorRegister= createAsyncThunk('tutor/register',async ( signupData,thunkAPI)=>{
    try {
        console.log(signupData);

        const response = await fetch('http://localhost:3030/tutor/register',{
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



export const tutorLogin = createAsyncThunk('tutor/login',async (loginData,thunkAPI)=>{
    try {
        console.log('yessss');
        console.log(loginData);

        const response = await fetch('http://localhost:3030/tutor/login',{
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
    tutor:null,
    loading :false,
    error:null
}


const tutorSlice= createSlice({
    name:'tutor',
    initialState,
    reducers:{
        clearTutor:(state)=>{
            state.tutor=null
        },
        tutorLoginSuccess:(state,action)=>{
            state.error= null
        },
        tutorLoginFailure:(state,action)=>{
            state.error=action.payload
        },
        setTutor:(state,action)=>{
            state.tutor=action.payload
        }

    },
    extraReducers:(builder)=>{
        builder
            .addCase(tutorRegister.pending,(state,action)=>{
                state.loading=true
                state.error=null
            })
           .addCase(tutorRegister.fulfilled,(state,action)=>{
            alert('11')
                state.loading=false
                state.msg=action.payload.message;
                state.tutor=action.payload.tutor
                console.log(state.tutor,'ithaaaaaan tutporrr');

           })
           .addCase(tutorRegister.rejected,(state,action)=>{
                console.log(action.payload.message);
                state.loading=false
                state.error=action.error.message
           })
           .addCase(tutorLogin.pending,(state,action)=>{
                state.loading=true
                state.error=null
                console.log(state,'Statee');
            })
            .addCase(tutorLogin.fulfilled,(state,action)=>{
                
                state.loading=false
                state.msg=action.payload.message;
                state.tutor=action.payload.tutor
                state.error= null
                console.log(state.tutor,'login tutor aaanneeeee');
            }) 
            .addCase(tutorLogin.rejected,(state,action)=>{
               console.log('action',action);
                state.loading=false
                state.error=action.error.message
                console.log(state.error);
            })
    }

})


export default tutorSlice.reducer;

export const {clearTutor,tutorLoginFailure,tutorLoginSuccess,setTutor}= tutorSlice.actions;