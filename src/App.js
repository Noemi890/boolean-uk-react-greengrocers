import { useState } from 'react'
import './styles/reset.css'
import './styles/index.css'
import { Header } from './components/Header'
import { Cart } from './components/Cart'
import { Footer } from './components/Footer'

export default function App() {

  let myTotal = 0

  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(myTotal.toFixed(2))

  const cartCopy = cart.slice()

  const addItemToCart = (item) => {
    console.log(item)
    cartCopy.push(item)
    getTotal()
    setCart(cartCopy)
  }

  const addQuantity = (item) => {
    const index = cart.indexOf(item)
    cartCopy[index].quantity++
    getTotal()
    setCart(cartCopy)
  }

  const removeQuantity = (item) => {
    const index = cart.indexOf(item)
    const myItemQuantity = cartCopy[index].quantity
    if (myItemQuantity <= 1) cartCopy.splice(index, 1)
    else cartCopy[index].quantity--
    getTotal()
    setCart(cartCopy)
  }

  const getTotal = () => {
      cartCopy.forEach(item => {
        const itemTotal = item.quantity * item.price
        myTotal += itemTotal
      })
      setTotal(myTotal.toFixed(2))
  }

  return (
    <>
      <Header onAddItemToCart={addItemToCart}/>
      <Cart cart={cart}
        add={addQuantity}
        remove={removeQuantity}
        total={total}/>
      <Footer />
    </>
  )
}
