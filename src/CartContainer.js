import React from 'react'
import CartItem from './CartItem.js'
import { useGlobalContext } from './context'

const CartContainer = () => {
  const { cart, total, clearCart } = useGlobalContext()

  if (cart.length === 0) { //Sepette hiç ürün yoksa..

    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>sepetiniz</h2>
          <h4 className='empty-cart'>şu anda boş</h4>
        </header>
      </section>
    )
    
  }

  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </div>

      {/* cart footer */}
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={clearCart}>
          Sepeti Temizle
        </button>
      </footer>

    </section>
  )
}

export default CartContainer
