import { currencyFormatter } from "../util/formatting"

const CartItem = ({ name, quantity, price }) => {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} X {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <p>
          <button>-</button>
        </p>
        <span>{quantity}</span>
        <p>
          <button>+</button>
        </p>
      </p>
    </li>
  )
}

export default CartItem
