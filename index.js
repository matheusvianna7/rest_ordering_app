import {menuArray} from "./data.js"

let orderArray = []
const orderChart = document.getElementById("order-chart")
const chartItems = document.getElementById("chart-items")
const itemPrices = document.getElementById("items-price")
const orderModal = document.getElementById("modal")
const orderPaymentForm = document.getElementById("order-payment")

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    } else if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    } if(e.target.id === "order-btn"){
        handleOrderClick()
    } 
})

orderPaymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    const paymentForm = new FormData(orderPaymentForm)
    const clientName = paymentForm.get('fullName')
    renderConfirmation(clientName)
})

function handleAddClick(itemId){
    orderChart.classList.remove("hidden")
    const targetObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    orderArray.push(targetObj)
    updateOrderPrice()
    renderOrderList()
}

function updateOrderPrice(){
    let totalPrice = 0
    orderArray.forEach(function(item){
        totalPrice += item.price
        return totalPrice
    })
    itemPrices.innerText = `$${totalPrice}`
}

function renderOrderList(){
    let chartItemsHtml = ''
    orderArray.forEach(function(item){
        chartItemsHtml += `
        <div class="chart-item">
            <h3 class="item-name">${item.name}</h3>
            <button class="remove-btn" data-remove="${item.id}">remove</button>
            <p class="item-price price-right">$${item.price}</p>
        </div>`
    })
    chartItems.innerHTML = chartItemsHtml
}

function handleRemoveClick(itemId){
    const targetObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    
    for(let i = 0; i < orderArray.length; i++){
        if(targetObj === orderArray[i]){
            orderArray.splice(i, 1)  
        }
    }
    
    if(orderArray.length > 0){
        renderOrderList()
        updateOrderPrice()
    } else {
        orderChart.classList.add("hidden")
    }
}

function handleOrderClick(){
    orderModal.classList.remove("hidden")
}

function renderConfirmation(name){
    let messageHtml = `
    <div class="message">
        <h2>Thanks, ${name}! Your order is on its way</h2>
    </div>`
    orderModal.classList.add("hidden")
    orderChart.classList.add("hidden")
    document.getElementById("confirmation-message").innerHTML = messageHtml  
}

function getItemsHtml(){
    let itemsHtml = ''
    
    menuArray.forEach(function(item){
        itemsHtml += `
            <div class="menu-item">
                <span class="item-emoji">${item.emoji}</span>
                <div class="item-info">
                    <h2 class="item-name">${item.name}</h2>
                    <p class="item-ingredients">${item.ingredients}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
                <button class="item-btn" data-add="${item.id}">+</button>
            </div>`
    })
    
    return itemsHtml
}

function render(){
    document.getElementById("main-feed").innerHTML = getItemsHtml()
}

render()