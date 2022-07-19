import { useState } from 'react'
import initialStoreItems from '../store-items'

initialStoreItems.forEach(item => {
    item.quantity = 1
})

export const Header = (props) => {
    const {onAddItemToCart} = props

    
    const [storeItems, setStoreItems] = useState(initialStoreItems)

      

    return (
        <header id="store">
        <h1>Greengrocers</h1>
        <ul className="item-list store--item-list">
          {storeItems.map((item, index) => {
            return (
            <li key={index}>
              <div className='store--item-icon'>
                <img src={`../../assets/icons/${item.id}.svg`} alt={item.name}/>
              </div>
              <button onClick={() => onAddItemToCart(item)}>Add to cart</button>
            </li>
            )
          })}
        </ul>
      </header>
    )
}