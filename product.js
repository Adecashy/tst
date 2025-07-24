import { app } from "./firebase.js";
import { getFirestore, collection, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const DB = getFirestore(app);

const productsColRef = collection(DB, "products");

const productFormEl = document.getElementById("product-form");
const productNameEl = document.getElementById("product-name");
const categoryEl = document.getElementById("category");
const priceEl = document.getElementById("price");
const messageEl = document.getElementById("message");
const displayEl = document.getElementById("display-product");
const getProductBtn = document.getElementById("get-product");
const delProductBtn = document.getElementById("del");

const addNewProduct = async () => {
    messageEl.textContent = "adding product...";
    try {
        const docRef = await addDoc(productsColRef, {
            name: productNameEl.value,
            category: categoryEl.value,
            price: priceEl.value
        })
        console.log(docRef);
    } catch (error) {
        console.log(error);
    } finally{
        messageEl.textContent = "product added!";
        // console.log("DONE!");
        productNameEl.value = "";
        categoryEl.value = "";
        priceEl.value = "";
        window.location.reload();
    }
}
productFormEl.addEventListener("submit", (e)=>{
    e.preventDefault()
    addNewProduct()
})

const getProducts = async () => {
    try {
        const querySnapShot = await getDocs(productsColRef)
        querySnapShot.forEach((doc) => {
            // console.log(doc.id);
            const data = doc.data()
            console.log(data);
            
            displayEl.innerHTML += `
                <div class="product-item">
                        <h2>${data.name}</h2>
                        <p>${data.category}</p>
                        <p>$${data.price}</p>
                        <button id="del">Delete</button>
                </div>     
            `
        })
    } catch (error) {
        console.log(error);
    } finally{
        // console.log("DONE!");
        alert("success")
    }
}
getProductBtn.addEventListener("click", getProducts)

const deleteProduct = async () => {
    try {
        const querySnapShot = await getDocs(productsColRef)
        querySnapShot.forEach((doc) => {
            const docRef = doc(productsColRef, doc.id)
            deleteDoc(docRef)
        })
    } catch (error) {
        console.log(error)
    } finally{
        console.log("DONE!");
    }
}
// delProductBtn.addEventListener("click", deleteProduct)

