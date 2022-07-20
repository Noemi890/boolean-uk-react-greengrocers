export const Cart = (props) => {
    const {cart, remove, add, total, removeAll } = props
    
    return (
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
                    src={`../../assets/icons/${item.id}.svg`}
                    alt={item.name}
                    />
                    <p>{item.name}</p>
                    <button onClick={() => {removeAll(item)}}>remove</button>
                    <button 
                      className='quantity-btn remove-btn center'
                      onClick={() => {remove(item)}}>-</button>
                    <span className='quantity-text center'>{item.quantity}</span>
                    <button 
                      className='quantity-btn add-btn center'
                      onClick={() => {add(item)}}>+</button>
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
    )
}