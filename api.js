export const URL = "http://192.168.1.62:8080"
    //Hiển: ở nhà:  192.168.1.62,192.168.1.61, 192.168.1.244 ở trường:  192.168.137.1,10.24.38.241
// loggin member
export const LOGIN = URL + "/api/login-member"
// đăng kí tài khoản member
export const ADD_MENBER = URL + "/api/add-member"
// get profile member
export const PROFILE_MEMBER = URL + "/api/profile-member"
// edit profile member
export const EDIT_PROFILE_MEMBER = URL + "/api/edit-profile-member"
// nạp tiền
export const NAP_TIEN_MEMBER = URL + "/api/naptien-members"
// get lịch sử nạp tiền
export const LICHSU_NAPTIEN_MEMBER = URL + "/api/lich-su-naptien-members"
// get danh mục sản phẩm
export const GET_CATEGORIES = URL + "/api/get-all-categories"
// get tất cả các snar phẩm trong trang chỉ
export const GETALLPRODUCTS = URL + "/api/get-all-total-product"
// get one product
export const GET_ONE_PRODUCT = URL + "/api/get-one-product"
// lấy ra sản phẩm trong giỏ hàng
export const GET_CART_USER = URL + "/api/user-carts-product"
export const POST_CART_USER = URL + "/api/oders-product"
export const DELETE_CARTU_SER = URL + "/api/delete-cart-product"
export const UPDATE_CART_USER = URL + "/api/update-cart-product"
export const ORDER_CART_USER = URL + "/api/orders-cart-product"
export const GET_ALL_USER_ORDERS = URL + "/api/lich-su-cart-product"
export const HUY_USER_ORDERS = URL + "/api/huy-don-cart-product"
export const CHI_TIET_ORDERS = URL + "/api/chi-tiet-don-cart-product"
export const DELETE_ORDERS = URL + "/api/delete-orders"
export const GET_ALL_NEWS = URL + "/api/get-all-news"
export const GET_ONE_MEMBER = URL + "/get/one-member"
export const GET_DANH_SACH_SAN_PHAM_MEMBER = URL + "/api/get-all-catygory-product"
export const DELETE_TIEN_DA_NAP = URL + "/api/delete-nap-tien-Member"