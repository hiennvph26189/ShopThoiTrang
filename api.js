export const IP = '192.168.1.62'
export const URL = "http://"+IP+":8080"
    //Hiển: ở nhà:  192.168.1.62,192.168.1.61, 192.168.1.244 ở trường:  192.168.137.1,10.24.38.241
// loggin member
export const LOGIN = URL + "/api/login-member"
// đăng kí tài khoản member
export const ADD_MENBER = URL + "/api/add-member"
// get profile member
export const PROFILE_MEMBER = URL + "/api/profile-member"
// list host sale products
export const LIST_HOST_SALES_PRODUCTS = URL + "/api-app/list-hot-sale-product"
// List host order products app
export const LIST_HOST_ODERS_PRODUCTS = URL + "/api-app/list-hot-order-product"
// edit profile member
export const EDIT_PROFILE_MEMBER = URL + "/api/edit-profile-member"
// nạp tiền
export const NAP_TIEN_MEMBER = URL + "/api/naptien-members"
// get lịch sử nạp tiền
export const LICHSU_NAPTIEN_MEMBER = URL + "/api/lich-su-naptien-members"
// list sản phẩm theo danh sách sản phẩm
export const LIST_PRODUCTS_IN_CATEGORIES = URL + "/api-app/list-category-in-products"
// get danh mục sản phẩm
export const GET_CATEGORIES = URL + "/api/get-all-categories"
//Phản hồi
export const FEED_BACK = URL+"/api-app/lienhe-member";
// get tất cả các sản phẩm trong trang chủ
export const GETALLPRODUCTS = URL + "/api/get-all-total-product"
// get one productr
export const GET_ONE_PRODUCT = URL + "/api/get-one-product"
// lấy ra sản phẩm trong giỏ hàng
export const GET_CART_USER = URL + "/api/user-carts-product"
export const POST_CART_USER = URL + "/api-app/add-cart-products-size"
export const DELETE_CARTU_SER = URL + "/api/delete-cart-product"
export const UPDATE_CART_USER = URL + "/api/update-cart-product"
export const ORDER_CART_USER = URL + "/api/orders-cart-product"
export const GET_ALL_USER_ORDERS = URL + "/api/lich-su-cart-product"
export const HUY_USER_ORDERS = URL + "/api/huy-don-cart-product"
export const CHI_TIET_ORDERS = URL + "/api/chi-tiet-don-cart-product"
export const DELETE_ORDERS = URL + "/api/delete-orders"
export const GET_ALL_NEWS = URL + "/api/get-all-news"
export const GET_ONE_MEMBER = URL + "/get/one-member"
export const CONVERT_CODE_SHA = URL + "/api-app/convert-sha"
export const GET_DANH_SACH_SAN_PHAM_MEMBER = URL + "/api/get-all-catygory-product"
export const DELETE_TIEN_DA_NAP = URL + "/api/delete-nap-tien-Member"
export const THANH_TOAN_9PAY = 'https://shopacc12312.000webhostapp.com/thongtinkhachhang.php'
export const ORDER_CARD_9PAY = URL+ '/api-app/post-order-product-9pay-card'
// List size theo product
export const LIST_SIZE_IN_PRODUCT = URL+ '/api-app/list-products-size'
// List sản phẩm theo  cart và size
export const LIST_SIZE_IN_CART_PRODUCT = URL+ '/api-app/list-cart-products-size'
// check số lượng sản phẩm theo size và cart
export const CHECK_SOLUONG_SP_THEOSIZE_TRONG_ODER = URL+ '/api-app/Check-soluong-sanpham-theo-size'
export const RESET_CART_ORDER = URL+ '/api-app/post-reset-cart'
// list size products
export const LIST_SIZE_PRODUCTS = URL+ '/api-app/list-products-size'
// get one product in cart vote star
export const GET_ONE_PRODUCT_IN_CART_VOTE_START = URL+ '/api-app/get-product-cart-vote-star'
// post vote star
export const POST_VOTE_START = URL+ '/api-app/post-vote-star-product'
// check star product
export const CHECK_STAR_PRODUCT = URL+ '/api-app/check-vote-star'
//  
export const GET_TOTAL_STAR_TB_STAR_PRODUCT = URL+ '/api-app/get-total-star-product'
//
export const GET_TINH_THANH = URL +'/api-app/tinhThanh';
//get quận huyện
export const GET_QUAN = URL+'/api-app/quan';
//get xã phường hị trấn
export const GET_XA = URL+'/api-app/xa'
//thêm địa chỉ nhận hàng
export const POST_ADDRESS_MEMBERS= URL+'/api-app/address-member'
//get Địa chỉ
export const GET_ADDRESS_MEMBERS = URL+'/api-app/get-address-member'
//sửa địa chỉ
export const UPDATE_ADDRESS_MEMBERS = URL+'/api-app/put-address-member'
//xóa địa chỉ
export const DELETE_ADDRESS_MEMBERS = URL+'/api-app/delete-address-member'
//suawr
export const UPDATE_STATUS_ADDRESS_MEMBERS=URL+'/api-app/edit-status-address-member'
// 
export const GET_PRODUCT_CART_MEMBER=URL+'/api-app/get-cart-product-in-idmember'
// get item address menber 
export const ITEM_ADDRESS_MEMBER=URL+'/api-app/get-item-address-in-idmember'
// item address order detail
export const ITEM_ADDRESS_ORDER_DETAIL=URL+'/api-app/get-item-address-order-detail'
// get thanh toán order
export const GET_METHUD_THANH_TOAN_ORDER = URL+'/api-app/get-method-thanh-toan'
//Đổi mật khẩu
export const CHANGE_PASSWD = URL+"/api-app/changepass-member"
// post key_Code email
export const POST_KEY_CODE_EMAIL = URL + "/api-app/quen-mat-khau"
// gửi mã xác minh
export const POST_MA_XAC_MINH = URL + "/api-app/xac-minh-email"
// post Mật khẩu
export const POST_PASSWORD_MEMBER = URL + "/api-app/lay-mat-khau-member"
//nạp tiền tài khoản bằng 9Pay
export const POST_PRICE_9PAY = URL + "/api-app/nap-tien-tk"
//
export const GET_ONE_THANHTOAN_9PAY = URL + "/api-app/detail-nap-tien-tk"
// thống kê sao 
export const THONG_KE_START = URL + "/api-app/thong-ke-danh-gia"
//list all start in product
export const LIST_ALL_THONG_KE_START = URL + "/api-app/list-ke-danh-gia-detai"
// tìm kiếm sản phẩm
export const SEARCH_PRODUCT_APP = URL + "/api-app/search-product-app"



