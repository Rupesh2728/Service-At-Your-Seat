import { createSlice } from '@reduxjs/toolkit';

const initialState={
    value:[
        {
            client:"User",
            Id:"",
            currtheatrecity:""
        }
        ]
}

 const ClientSlice=createSlice({
    name:"Client",
    initialState,
    reducers:{
       
       ref:(state,action)=>{

        state.value[0].client=state.value[0].client
        state.value[0].Id=(action.payload)[0].Id
        state.value[0].currtheatrecity=(action.payload)[0].City
        
        console.log(state.value);
       },
       update:(state,action)=>{
   
        console.log(action.payload)
        // state.value=[...(action.payload)]
        
        state.value[0].client=(action.payload)[0].client

       } 
   
    }
 })
export const {ref,update}=ClientSlice.actions;
export default ClientSlice.reducer;






