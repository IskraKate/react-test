import { useContext } from "react"
import Modal from "./UI/Modal"
import { CartContext } from "../store/CartContext"
import { currencyFormatter } from "../util/formatting"
import Button from "./UI/Button"
import { UserProgressContext } from "../store/UserProgressContext"
import CartItem from "./CartItem"

const Cart = () => {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext)

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * price,
    0
  )

  function handleHideCart() {
    userProgressCtx.hideCart()
    console.log(userProgressCtx.progress)
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleHideCart}>
          Close
        </Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  )
}

export default Cart
