import { useState } from 'react'
import './styles/reset.css'
import './styles/index.css'
import initialStoreItems from './store-items'

/*
Here's what a store item should look like
{
  id: '001-beetroot',
  name: 'beetroot',
  price: 0.35
}

What should a cart item look like? 🤔
*/

export default function App() {

  const addQuantityToItems = () => {
    initialStoreItems.forEach(item => {
      item.quantity = 1
    })
    return initialStoreItems
  }


  let myTotal = 0

  const [cart, setCart] = useState([])
  const [storeItems, setStoreItems] = useState(addQuantityToItems)
  const [total, setTotal] = useState(myTotal.toFixed(2))
  console.log('my cart', cart)
  console.log('my total', total)

  const cartCopy = cart.slice()

  const addItemToCart = (item) => {
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
        console.log('total for each item',itemTotal)
        console.log('myTotal', myTotal)
        myTotal += itemTotal
      })
      setTotal(myTotal.toFixed(2))
  }

  

  console.log('my store', storeItems)
  console.log('my cart', cart)

  return (
    <>
      <header id="store">
        <h1>Greengrocers</h1>
        <ul className="item-list store--item-list">
          {storeItems.map((item, index) => {
            return (
            <li key={index}>
              <div className='store--item-icon'>
                <img src={`../../assets/icons/${item.id}.svg`} alt={item.name}/>
              </div>
              <button onClick={() => addItemToCart(item)}>Add to cart</button>
            </li>
            )
          })}
        </ul>
      </header>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">
            {
              (cart.length > 0) &&
              cart.map((item, index) => {
                return (
                  <li key={index}>
                    <img 
                    className='cart--item-icon'
                    src={`/assets/icons/${item.id}.svg`}
                    alt={item.name}
                    />
                    <p>{item.name}</p>
                    <button 
                      className='quantity-btn remove-btn center'
                      onClick={() => {removeQuantity(item)}}>-</button>
                    <span className='quantity-text center'>{item.quantity}</span>
                    <button 
                      className='quantity-btn add-btn center'
                      onClick={() => {addQuantity(item)}}>+</button>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <span className="total-number">{`£${total}`}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  )
}
