//reducer fonksiyonları, kendisine gönderilen 1. parametredeki veriseti üzerinde, 2. parametrede belirtilen aksiyonu uygular

const reducer = (state, action) => {

  //sepeti temizleme
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }

  //sepetten bir ürünü komple kaldırma işlemi
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    } 
  }

  //sepetteki bir ürünün sipariş adetini arttırma
  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 }
      }

      return cartItem
    })

    return { ...state, cart: tempCart }
  }

  //sepetteki bir ürünün sipariş adetini azaltma
  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 }
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0)

    return { ...state, cart: tempCart }
  }

  //toplam tutarı ve sepetteki ürün sayısını hesaplama
  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        const itemTotal = price * amount

        cartTotal.total += itemTotal
        cartTotal.amount += amount
        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    total = parseFloat(total.toFixed(2))

    return { ...state, total, amount }
  }

  //sepetteki ürün bilgisinin apiden çekilirken yükleniyor ekranı için
  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }

  //ürünlerin gösterilmesi için aksiyon
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false }
  }

  //sepetteki ürün miktarını arttırma veya azaltma yapabilen aksiyon
  if (action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === 'inc') {
            return { ...cartItem, amount: cartItem.amount + 1 }
          }
          if (action.payload.type === 'dec') {
            return { ...cartItem, amount: cartItem.amount - 1 }
          }
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0)

    return { ...state, cart: tempCart }
  }

  throw new Error('no matching action type')
}

export default reducer
