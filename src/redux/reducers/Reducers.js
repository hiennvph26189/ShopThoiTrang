import { ADD_TO_CART, ADD_TO_WISHLIST,FECTH_CATEGORIES,CAP_NHAT_EMAIL, REMOVE_FORM_CART, REMOVE_FORM_WISHLIST } from "../ActionTypes";
import actionTypes from '../action/actionTypes';
import React, { useState } from "react";
const initState = {
    arrUser: [],
    arrCart: [],
    categoties: [],
}
export const Reducers = (state = initState, action) => {
 
    switch (action.type) {
         // let arrCart = [...state.arrCart]
        case ADD_TO_CART:
            console.log(1222333);
            let arrpayload = action.payload
            console.log(arrCart,"test arr")
            for(let i = 0; i < arrCart.lenght; i++){
                if(arrCart[i].id == arrpayload.id){
                    return {
                        ...state
                    }
                }else{
                    state.arrCart = [... state.arrCart,action.payload]
                    return {
                        ...state,
                    };
                }
            }
            setArrcard([...arrCart,action.payload])
            return {...state}
            
        case CAP_NHAT_EMAIL:
            state.arrUser= action.arrUser
            return {...state};
            
        case FECTH_CATEGORIES:
            state.categoties= action.arrCategories
            return {...state};
       
            
        case REMOVE_FORM_CART:
            console.log(action.payloads)
            // const deletedArray1 = state.arrCart.filter((item, index) => {
            //     return index !== action.payloads;
            // });
        // return {...state};
         
        default:
            return state;
    }
    // return false
};



