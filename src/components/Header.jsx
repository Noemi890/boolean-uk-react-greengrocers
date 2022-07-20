import { useEffect, useState } from 'react'
import initialStoreItems from '../store-items'

initialStoreItems.forEach(item => {
  item.quantity = 1
  item.type = 
  (item.name === 'bananas' || item.name === 'berry' || item.name === 'apricot'
   || item.name === 'blueberry' || item.name === 'apple') ?
   'fruit' : 'veg'
})

export const Header = props => {
  const { onAddItemToCart } = props

  const [details, setDetails] = useState(false)
  const [storeItems, setStoreItems] = useState(initialStoreItems)
  const [sort, setSort] = useState(false)

  console.log(storeItems)
  const sortedItems = () => {
    let updatedStoreItems = initialStoreItems
    if (!sort) {
      updatedStoreItems = storeItems.slice().sort((a, b) => {
        if (a.price < b.price) return -1
        else if (a.price > b.price) return 1
        else return 0
      })
    }
    setStoreItems(updatedStoreItems)
    setSort(!sort)
  }

  const filterItems = (value) => {
    console.log(value)
    if (value === 'all') setStoreItems(initialStoreItems)
    else {
      const updatedStoreItems = initialStoreItems.filter(item => item.type === value)
      setStoreItems(updatedStoreItems)
    }
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
            sortedItems()
          }}
        >
          filter by price
        </button>
        <form action="#">
      <select name="languages" id="lang" onChange={(event) => {
        filterItems(event.target.value)
      }}>
        <option value="all">All</option>
        <option value="fruit">Fruit</option>
        <option value="veg">Vegetables</option>
      </select>
</form>
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
