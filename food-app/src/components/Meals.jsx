import MealItem from "./MealItem"
import Error from "./Error"
import useHttp from "../hooks/useHttp"

const requestConfig = {}

const Meals = () => {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, [])

  if (isLoading) return <p className="center">Loading...</p>

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  )
}

export default Meals
