import { useEffect, useState } from 'react'
import initialStoreItems from '../store-items'

initialStoreItems.forEach(item => {
  item.quantity = 1
})

export const Header = props => {
  const { onAddItemToCart } = props

  const [details, setDetails] = useState(false)
  const [storeItems, setStoreItems] = useState(initialStoreItems)
  const [filter, setFilter] = useState(false)

  const filteredItems = () => {
    let updatedStoreItems = initialStoreItems
    if (!filter) {
      updatedStoreItems = storeItems.slice().sort((a, b) => {
        if (a.price < b.price) return -1
        else if (a.price > b.price) return 1
        else return 0
      })
    }
    setStoreItems(updatedStoreItems)
    setFilter(!filter)
  }

  return (
    <header id="store">
      <h1>Greengrocers</h1>
      <div className="ext">
        <button
          onClick={() => {
            setDetails(!details)
          }}
        >
          details
        </button>
        <button
          onClick={() => {
            filteredItems()
          }}
        >
          filter by price
        </button>
      </div>
      <ul className="item-list store--item-list">
        {storeItems.map((item, index) => {
          return (
            <li key={index}>
              {!details ? (
                <div className="store--item-icon">
                  <img
                    src={`../../assets/icons/${item.id}.svg`}
                    alt={item.name}
                  />
                </div>
              ) : (
                <div>
                  <img
                    className="small-img"
                    src={`../../assets/icons/${item.id}.svg`}
                    alt={item.name}
                  />
                  <p>{item.name.toUpperCase()}</p>
                  <p>{`Price: ${item.price.toFixed(2)}`}</p>
                </div>
              )}
              <button onClick={() => onAddItemToCart(item)}>Add to cart</button>
            </li>
          )
        })}
      </ul>
    </header>
  )
}
