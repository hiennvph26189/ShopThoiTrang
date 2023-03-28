import { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FORM_CART, REMOVE_FORM_WISHLIST,CAP_NHAT_EMAIL,FECTH_CATEGORIES } from "../ActionTypes";
import {GETCATEGORIES} from "../../../api"
import actionTypes from './actionTypes';
import axios from "axios";
export const addItemToCart = data =>({
    type: ADD_TO_CART,
    payload: data,
});
export const updateEmail = data =>({
    type: CAP_NHAT_EMAIL,
    arrUser: data,
});
export const arrCategories = data =>({
    type: FECTH_CATEGORIES,
    arrCategories: data,
});
export const removeFormCart = index =>({
    type: REMOVE_FORM_CART,
    payloads: index,
});

export const addToWishlist = data =>({
    type: ADD_TO_WISHLIST,
    payload: data,
});

export const removeFormWishlist = index =>({
    type: REMOVE_FORM_WISHLIST,
    payload: index,
});



