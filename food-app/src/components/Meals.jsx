import { useState, useEffect } from "react"
import MealItem from "./MealItem"

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([])

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals")

        if (!response.ok) {
        }

        const meals = await response.json()
        setLoadedMeals(meals)
      } catch {}
    }

    fetchMeals()
  }, [])

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  )
}

export default Meals
