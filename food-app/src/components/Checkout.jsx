import { useContext, useActionState } from "react"
import Modal from "./UI/Modal"
import { CartContext } from "../store/CartContext"
import { UserProgressContext } from "../store/UserProgressContext"
import { currencyFormatter } from "../util/formatting"
import Input from "./UI/Input"
import Button from "./UI/Button"
import useHttp from "../hooks/useHttp"
import Error from "./Error"

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
}

const Checkout = () => {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext)
  const { data, error, sendRequest } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  )

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  )

  function handleClose() {
    userProgressCtx.hideCheckout()
  }

  function handleFinish() {
    userProgressCtx.hideCheckout()
    cartCtx.clearCart()
  }

  async function checkoutAction(_, fd) {
    const customerData = Object.fromEntries(fd.entries())

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    )
  }

  const [_, formAction, isSending] = useActionState(checkoutAction, null)

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  )

  if (isSending) {
    actions = <span>Sending order data...</span>
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>Success</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    )
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2></h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" id="name" />
        <Input label="E-mail Address" id="email" type="email" />
        <Input label="Street" id="street" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" />
          <Input label="City" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  )
}

export default Checkout
