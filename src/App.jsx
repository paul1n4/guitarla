import { useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])
  const [isCartVisible, setIsCartVisible] = useState(false) // New state for cart visibility

  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id
    )
    if(itemExists >= 0) {
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
    setIsCartVisible(true) // Show cart when an item is added
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id != id))
  }

  // function increaseQuantity(id) {
  //   console.log("Incrementando", id);
    
  // }

  return (
    <>
    <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      isCartVisible={isCartVisible} // Pass the cart visibility state to Header
      setIsCartVisible={setIsCartVisible}
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => {
            return(
              <Guitar 
                key={guitar.id}
                guitar={guitar}
                setCart={setCart}
                addToCart={addToCart}
              />
            )
          })}

        </div>
    </main>

    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
