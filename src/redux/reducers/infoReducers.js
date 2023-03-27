export const   CAP_NHAT_EMAIL = "CAP_NHAT_EMAIL";
export const   CAP_NHAT_ID = "CAP_NHAT_ID"

const initialState = {
    id: '',
    email: '',
    userInfo: [],
   
}
export default function appReducer(state = initialState, payLoad){
    switch (payLoad.type) {
        case CAP_NHAT_EMAIL:
            
            return {
                ...state,
                
                email: payLoad.email,
                id: payLoad.id,
                userInfo: payLoad.userInfo
               
            }
        case CAP_NHAT_ID:
            return {
                ...state,
                
                id: payLoad.id
            }
       
        default:
            return state;
    }
}
