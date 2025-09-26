import logoImg from "../assets/logo.jpg"
import Button from "./UI/Button"
import { useContext } from "react"
import { CartContext } from "../store/CartContext"
import { UserProgressContext } from "../store/UserProgressContext"

const Header = () => {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext)

  const totalNumberOfItems = cartCtx.items.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  )

  function handleShowCart() {
    userProgressCtx.showCart()
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo image of react food" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalNumberOfItems})
        </Button>
      </nav>
    </header>
  )
}

export default Header
