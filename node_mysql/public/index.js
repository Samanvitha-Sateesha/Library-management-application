if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var id = shopItem.getElementsByClassName('shop-item-id')[0].innerText
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    addItemToCart(id,title)
}
function addItemToCart(id,title) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemID = cartItems.getElementsByClassName('cart-item-id')
    for (var i = 0; i < cartItemID.length; i++) {
        if (cartItemID[i].innerText == id) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <span class="cart-item-id">${id}</span>
    </div>
    <span class="cart-price cart-column">${title}</span>
    <div class="cart-quantity cart-column">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
}
function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        var request = new XMLHttpRequest();
        request.open('POST','/purchase');
        var book_id = document.getElementsByClassName('cart-item-id').innerText
        var uid = document.getElementsByClassName('user-id').innerText
        request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        request.send(JSON.stringify({book_id:book_id,id:uid}))
        cartItems.removeChild(cartItems.firstChild)
    }
}
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    // updateCartTotal()
}