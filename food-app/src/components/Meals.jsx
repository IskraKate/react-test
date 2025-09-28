import MealItem from "./MealItem"
import useHttp from "../hooks/useHttp"

const requestConfig = {}

const Meals = () => {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, [])

  if (isLoading) return <p>Loading...</p>

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  )
}

export default Meals
