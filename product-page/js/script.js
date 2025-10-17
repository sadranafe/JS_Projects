import productsData from "./dummyData.js";

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector(".category");
const sortSelect = document.querySelector("#sort");
const productsContainer = document.querySelector(".products");

const showProducts = () => {
    const filteredData = productsData
    .filter(item => item.name.toLowerCase().includes(searchInput.value.toLowerCase()))
    .filter(item => categorySelect.value === 'all' ? true : item.category === categorySelect.value)

    if(sortSelect.value === 'price-asc') {
        filteredData.sort((a , b) => a.price - b.price);
    } else if(sortSelect.value === 'price-desc') {
        filteredData.sort((a , b) => b.price - a.price);
    }
    
    productsContainer.innerHTML = filteredData.map( item =>
        `
            <div class="card">
                <div class = "productImg">
                    <img src = ${item.img} alt = ${item.name}>
                </div>
                <div>
                    <h2>${item.name}</h2>
                    <div>
                        <p>${item.category}</p>
                        <p>$${item.price}</p>
                    </div>
                </div>
                <div>
                    <button>add to bag</button>
                </div>
            </div>
        `
    ).join('')

    if(filteredData.length <= 1) {
        if(filteredData.length === 0) productsContainer.innerHTML = `<p class = 'feedback'>no products found ❌</p>`

        sortSelect.disabled = true;
    } else {
        sortSelect.disabled = false;
    }
}

const debounce = (fn , delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this , args) , delay);
    }
}

window.addEventListener('DOMContentLoaded' , () => {
    [categorySelect , sortSelect].forEach(el => {
        el.addEventListener('change' , showProducts)
    });
    
    searchInput.addEventListener('input' , debounce(() => showProducts(), 500))
    showProducts()
})