let cartGlobal = []
let order = document.getElementById("order")
let orderProduct = document.getElementById("order-product")
const orderModalContainer = document.getElementById("order-modal-container")

setTimeout(() => {
    console.info("userDoc : ", userDoc)
    const usernameProfile = document.getElementById("usernameProfile") //Global
    const fullnameProfile = document.getElementById("fullnameProfile")
    const emailProfile = document.getElementById("emailProfile")

    if (usernameProfile) {
        usernameProfile.placeholder = userDoc.username
    }

    if (fullnameProfile) {
        fullnameProfile.placeholder = userDoc.fullname
    }

    if (emailProfile) {
        emailProfile.placeholder = userDoc.email
    }
}, 4000)

const Detail = {
    props: ['product', 'cart'],
    data() {
        return {
            // Anda bisa menambahkan data lain sesuai kebutuhan
            detail: null,
        }
    },
    computed: {
        productDetail() {
            const id = this.$route.params.id; // Mengambil parameter id dari URL
            const detail = this.product.find(product => product.id == id); // Mencari produk berdasarkan id
            this.detail = detail
            console.log("Found product detail:", detail);
            return detail;
        }
    },
    methods: {
        buyNow() {
            console.log("Buy Now button clicked");
        },
        addToCart() {
            this.cart = []

            // Tambahkan detail ke cart
            this.cart.push(this.detail.id);
            
            // Buat referensi ke sub-koleksi "cartItems" di dalam uid users
            const cartItemsRef = db.collection("users").doc(firebase.auth().currentUser.uid).collection("cartItems");
            
            // Dapatkan semua dokumen dalam sub-koleksi "cartItems"
            cartItemsRef.get().then(snapshot => {
                const batch = db.batch();
                snapshot.forEach(doc => {
                    const data = doc.data();
                    
                    // Akses array yang ada di dalam data
                    if (data.cart && Array.isArray(data.cart)) {
                        data.cart.forEach(item => {
                            // Push item dari data.cart ke this.cart
                            this.cart.push(item);
                        });
                    }
                    
                    console.log(data); // Menampilkan data untuk verifikasi
                    
                    // Hapus dokumen
                    batch.delete(doc.ref);
                });
                return batch.commit(); // Komit batch untuk menghapus semua dokumen
            }).then(() => {
                // Tambahkan item baru ke sub-koleksi "cartItems" setelah menghapus semua dokumen sebelumnya
                return cartItemsRef.add({
                    cart: this.cart
                })
            }).catch(error => {
                console.error("Error adding to cart: ", error);
            });
        }        
        
    },
    template: `
        <div>

            <img class="img-detail" :src="productDetail.img" alt="product detail image">

            <div class="detail-container">
                <h1 class="price-detail">Rp. {{ productDetail.price }}</h1>
                <p>{{ productDetail.name }}</p>
                <div class="location-container">
                    <p>8 / M</p>
                    <p>Very Good</p>
                    <p>{{ productDetail.location }}</p>
                </div>
                <div class="desc-container">
                    <p class="item-desc">Item Description</p>
                    <div class="category">
                        <p>Category</p>
                        <p>{{ productDetail.desc }}</p>
                    </div>
                    <div class="category">
                        <p>Size</p>
                        <p>8 / M</p>
                    </div>
                    <div class="category">
                        <p>Condition</p>
                        <p>Very Good</p>
                    </div>
                    <div class="category">
                        <p>Color</p>
                        <p>White</p>
                    </div>
                    <div class="category">
                        <p>Uploaded</p>
                        <p>5 hours ago</p>
                    </div>
                    <div class="category">
                        <p>Shipping</p>
                        <p>Rp. 20.000</p>
                    </div>
                </div>
                <button class="buy-now-button" @click="buyNow">Buy Now</button>
                <button class="add-to-cart-button" @click="addToCart">Add To Cart</button>
            </div>

        </div>
    `,
    beforeRouteLeave(to, from, next) {
        // Mengakses instance Vue utama dan mengubah nilai mainPage dan productDetailRouter
        const app = this.$root;
        app.mainPage = true;
        app.productDetailRouter = false;
        next(); // Lanjutkan navigasi
    }
}

const routes = [
    { path: '/detail/:id', component: Detail, props: (route) => ({ id: route.params.id, product: app.product, cart: app.cart }) }
]

const router = new VueRouter({
    routes
})


const app = new Vue({
    el: '#app',
    data: {
        signinValue: {},
        userInfoShow: false,
        shopByBrands: ["Vans", "Bohoo", "Mango", "Reebook", "Converse", "Nike", "Saysky"],
        popularItems: [
            {
                id: 1,
                img: "product_img/0.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "denpasar",
                category: "T-shirt"
            },
            {
                id: 2,
                img: "product_img/1.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 3,
                img: "product_img/2.png",
                name: "Vintage Chicago cibs white crewneck",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 4,
                img: "product_img/3.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 5,
                img: "product_img/4.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
        ],
        newProduct: [
            {
                id: 8,
                img: "product_img/7.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 9,
                img: "product_img/8.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 10,
                img: "product_img/9.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 11,
                img: "product_img/10.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 12,
                img: "product_img/11.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
        ],
        product: [
            {
                id: 1,
                img: "product_img/0.png",
                name: "Kaos Nike Hitam",
                price: 200000,
                desc: "Its a products descripsion",
                location: "denpasar",
                category: "T-shirt"
            },
            {
                id: 2,
                img: "product_img/1.png",
                name: "Kutang Nike Hitam",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 3,
                img: "product_img/2.png",
                name: "Nike Hitam",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 4,
                img: "product_img/3.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 5,
                img: "product_img/4.png",
                name: "Kaos Hijau Gelap",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 6,
                img: "product_img/5.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 7,
                img: "product_img/6.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 8,
                img: "product_img/7.png",
                name: "Kutang Motif Bunga",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 9,
                img: "product_img/8.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 10,
                img: "product_img/9.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 11,
                img: "product_img/10.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
            {
                id: 12,
                img: "product_img/11.png",
                name: "My Product",
                price: 200000,
                desc: "Its a products descripsion",
                location: "no",
                category: "T-shirt"
            },
        ],
        mainPage: true,
        productDetailRouter: false,
        cart: [],
        cartDetail: [],
        cartQty: 0,
        totalPrice: [],
        order: [],
        orderDetail: [],
        transaction: [],
        transactionHistory: [],
        transactionHistoryView: false,
        changePasswordView: false,
        profileView: true,
        filteredProducts: [],
        searchQuery: '',
        searchResultView: false,
        shopByBrandsDetail: [],
    },
    router,
    created() {
        setTimeout(() => {
            const cartItemsRef = db.collection("users").doc(firebase.auth().currentUser.uid).collection("cartItems");
    
            cartItemsRef.get().then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.cart && Array.isArray(data.cart)) {
                        this.cart = data.cart;
                    }
                });
    
                // Debugging dengan JSON.stringify
                this.$nextTick(() => {
                    console.log("Cart data:", (this.cart));
                    this.cart.forEach(item => {
                        const productId = this.product.find(product => product.id == item)
                        this.cartDetail.push(productId)
                    })
                });
            }).catch(error => {
                console.error("Error fetching data: ", error);
            });

            console.log("create has been called")
            setTimeout(() =>{
                this.sumPrice()
            }, 1000)
            
            if (order) {
                this.orderCreated()
            }

            if (orderProduct) {
                this.orderCretedFromCart()
            }
        }, 2000);
    },
    methods: {
        toUserInfo () {
            window.location.href = "profile.html"
        },
        userInfo () {
            this.userInfoShow = true
        },
        userInfoNo () {
            this.userInfoShow = false 
        },
        settings (value) {

            // const profile = document.getElementById("profile")
            const password = document.getElementById("password")
            const transaction = document.getElementById("transaction")
            const settingsView = document.getElementById("settingsView")
            let html = ''

            if (value === "profileDetails") {

                profile.style.opacity = "1"
                password.style.opacity = "0.2"
                transaction.style.opacity = "0.2"

                this.transactionHistoryView = false
                this.changePasswordView = false
                this.profileView = true

                setTimeout(() => {
                    console.info("userDoc : ", userDoc)
                    const usernameProfile = document.getElementById("usernameProfile") //Global
                    const fullnameProfile = document.getElementById("fullnameProfile")
                    const emailProfile = document.getElementById("emailProfile")
                
                    if (usernameProfile) {
                        usernameProfile.placeholder = userDoc.username
                    }
                
                    if (fullnameProfile) {
                        fullnameProfile.placeholder = userDoc.fullname
                    }
                
                    if (emailProfile) {
                        emailProfile.placeholder = userDoc.email
                    }
                }, 1000)

            } else if (value === "changePassword") {

                profile.style.opacity = "0.2"
                password.style.opacity = "1"
                transaction.style.opacity = "0.2"

                this.transactionHistoryView = false
                this.profileView = false
                this.changePasswordView = true

            } else if (value === "transactionHistory") {
                profile.style.opacity = "0.2"
                password.style.opacity = "0.2"
                transaction.style.opacity = "1"
            
                this.transactionHistoryView = true
                this.changePasswordView = false
                this.profileView = false
            
                // Mengambil data transactionItems di firebase
                const userUid = firebase.auth().currentUser.uid;
                const transactionItemsRef = db.collection("users").doc(userUid).collection("transactionItems");
            
                // Array untuk menyimpan semua transaksi
                let allTransactions = [];
            
                // Ambil semua dokumen dari sub-koleksi "transactionItems"
                transactionItemsRef.get().then(snapshot => {
                    snapshot.forEach(doc => {
                        const data = doc.data();
            
                        // Periksa apakah field "transaction" ada dan merupakan array
                        if (data.transaction && Array.isArray(data.transaction)) {
                            // Push seluruh array transaction ke dalam allTransactions
                            allTransactions.push(data.transaction);
                        }
                    });
            
                    // Setelah semua dokumen diproses, allTransactions akan berisi semua transaksi
                    this.transactionHistory = allTransactions;
                    console.info(this.transactionHistory);
            
                }).catch(error => {
                    console.error("Error retrieving transactions: ", error);
                });
            }            

        },
        detail () {
            this.mainPage = false
            this.productDetailRouter = true
            console.log("test")
            document.getElementById("nav").scrollIntoView({
                behavior: 'smooth'
            });
        },
        cartButton () {
            window.location.href = "cart.html"
        },
        likeButton () {

        },
        contoh () {
            this.cartDetail.forEach(item => {
                console.log(item.id)
            })
        },
        remove(index) {
            const userUid = firebase.auth().currentUser.uid;
            const cartItemsRef = db.collection("users").doc(userUid).collection("cartItems");
        
            cartItemsRef.get().then(snapshot => {
                const batch = db.batch();
        
                snapshot.forEach(doc => {
                    const data = doc.data();
        
                    if (data.cart && Array.isArray(data.cart)) {
                        // Push items from data.cart to this.cart
                        this.cart.push(...data.cart);
                    }
        
                    // Delete the document
                    batch.delete(doc.ref);
                });
        
                return batch.commit();
            }).then(() => {
                let cartDetail2 = []
                // Update cartDetail after deletion and addition
                this.cartDetail.splice(index, 1);

                this.cartDetail.forEach(item => {
                    cartDetail2.push(item.id)
                })

                this.cartDetail = cartDetail2
        
                return cartItemsRef.get();
            }).then(() => {
                // Add new items to sub-collection "cartItems"
                return cartItemsRef.add({
                    cart: this.cartDetail
                });
            }).then(snapshot => {
                // Reset cartDetail to avoid duplication
                this.cartDetail = [];
        
                snapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.cart && Array.isArray(data.cart)) {
                    this.cart = data.cart;
                }
            });
        
            // Debugging with JSON.stringify
            this.$nextTick(() => {
                console.log("Cart data:", JSON.stringify(this.cart));
                this.cart.forEach(item => {
                const productId = this.product.find(product => product.id === item);
                if (productId) {
                    this.cartDetail.push(productId);
                }
            });
            });
            }).catch(error => {
                    console.error("Error processing cart: ", error);
            });
        },
        sumPrice () {
            this.cartDetail.forEach(item => {
                this.totalPrice.push(item.price)
                console.log("item price : " + item.price)
            })
            // console.log("total price : " + this.totalPrice)
            let sum = 0
            this.totalPrice.forEach(number => {
                sum += number;
            });
            this.totalPrice = sum
            console.log( this.totalPrice)
        },
        cartCheckoutButton () {
            const userUid = firebase.auth().currentUser.uid;
            const orderItemsRef = db.collection("users").doc(userUid).collection("orderItems");

            orderItemsRef.get().then(snapshot => {
                const batch = db.batch();
        
                snapshot.forEach(doc => {
                    const data = doc.data();
        
                    if (data.order && Array.isArray(data.order)) {
                        // Push items from data.order to this.order
                        this.order.push(...data.order);
                    }
        
                    // Delete the document
                    batch.delete(doc.ref);
                })
        
                return batch.commit();
            }).then(() => {
                orderItemsRef.add({
                    order: this.cart
                })
            })

            setTimeout(() => {
                location.href = "order.html"
            }, 3000)
        },
        orderCreated () {
            console.info("order has been created")
        },
        orderCretedFromCart () {
            const userUid = firebase.auth().currentUser.uid;
            const orderItemsRef = db.collection("users").doc(userUid).collection("orderItems");

            orderItemsRef.get().then(snapshot => {
                const orderData = []; // Array untuk menyimpan data order

                snapshot.forEach(doc => {
                    const data = doc.data(); // Mengambil data dari dokumen
                    const orderField = data.order; // Akses field "order"

                    orderData.push(...orderField); // Masukkan ke dalam orderData
                 });

            // Membuat data non-reaktif dari data order
            const nonReactiveData = [...orderData];

            console.log("nonReactiveData:", nonReactiveData);

            nonReactiveData.forEach(item => {
                const productId = this.product.find(product => product.id === item);
                console.log("productId:", productId);

                this.orderDetail.push(productId);
            });

            console.log("orderDetail:", this.orderDetail);
            }).catch(error => {
                console.error("Error fetching data from Firebase:", error);
            });
        },
        test () {
           
        },
        orderButton () {
            setTimeout(() => {
                orderModalContainer.style.display = "block"
            }, 1000)

            const userUid = firebase.auth().currentUser.uid;
            const transactionItemsRef = db.collection("users").doc(userUid).collection("transactionItems");

            let orderDetailId = []
            this.orderDetail.forEach(item => {
                orderDetailId.push(item.id)
            })

            transactionItemsRef.add({
                transaction: orderDetailId
            })

        },
        searchProduct() {
            const query = this.searchQuery.toLowerCase();
            this.filteredProducts = this.product.filter(product =>
              product.name.toLowerCase().includes(query)
            );
            console.log(this.filteredProducts)

            if (this.filteredProducts.length === 0) {
                this.filteredProducts.push({
                    id: -1, // ID unik untuk item placeholder
                    name: "Product tidak ada",
                    img: "", // Anda dapat menggunakan URL gambar placeholder jika ada
                    price: 0,
                    desc: "Tidak ada produk yang sesuai dengan pencarian Anda.",
                    location: "",
                    category: ""
                });
            }

            this.mainPage = false
            this.searchResultView = true

            if (this.searchQuery == '') {
                this.mainPage = true
                this.searchResultView = false
            }
        },
        filterByBrands (item) {
            this.shopByBrandsDetail = []

            if (item == 'Vans') {
                
            } else if (item == 'Bohoo') {

            } else if (item == 'Mango') {
                
            }  else if (item == 'Reebook') {
                
            }  else if (item == 'Converse') {
                
            }  else if (item == 'Nike') {
                this.shopByBrandsDetail.push(this.product[0], this.product[1], this.product[2], this.product[3])
            } else if (item == 'Saysky') {
                this.shopByBrandsDetail.push(this.product[4], this.product[5], this.product[6], this.product[7], this.product[8], this.product[9], this.product[10], this.product[11])
            }

            this.mainPage = false
            this.searchResultView = true

            document.getElementById("nav").scrollIntoView({
                behavior: 'smooth'
            });

            console.log(this.shopByBrandsDetail)
        },
        backToHome () {
            this.mainPage = true
            this.searchResultView = false
        },
    },
    computed: {}
})

function continueShopping () {
    location.href = "index.html"
}

function goToHistory () {
    location.href = "profile.html"
}