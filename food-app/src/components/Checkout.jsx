import { useContext } from "react"
import Modal from "./UI/Modal"
import { CartContext } from "../store/CartContext"
import { UserProgressContext } from "../store/UserProgressContext"
import { currencyFormatter } from "../util/formatting"
import Input from "./UI/Input"
import Button from "./UI/Button"

const Checkout = () => {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext)

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  )

  function handleClose() {
    userProgressCtx.hideCheckout()
  }

  function handleSubmit(event) {
    event.preventDefault()

    const fd = new FormData(event.target)
    const customerData = Object.fromEntries(fd.entries())
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    })
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2></h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" id="name" />
        <Input label="E-mail Address" id="email" type="email" />
        <Input label="Street" id="street" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" />
          <Input label="City" id="city" />
        </div>
        <div className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </div>
      </form>
    </Modal>
  )
}

export default Checkout
