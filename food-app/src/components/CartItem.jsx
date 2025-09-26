import { currencyFormatter } from "../util/formatting"

const CartItem = ({ name, quantity, price, onIncrease, onDecrease }) => {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} X {currencyFormatter.format(price)}
      </p>
      <div className="cart-item-actions">
        <p>
          <button onClick={onDecrease}>-</button>
        </p>
        <span>{quantity}</span>
        <p>
          <button onClick={onIncrease}>+</button>
        </p>
      </div>
    </li>
  )
}

export default CartItem
