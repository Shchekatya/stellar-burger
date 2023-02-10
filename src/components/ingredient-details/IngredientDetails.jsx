import detailsStyle from "../ingredient-details/ingredient-details.module.css";

export const IngredientDetails = (props) => {
  const arr = props.items;
  const item = arr.findIndex((el) => el._id === props.id);

  return (
    <div className={detailsStyle.container}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <img src={arr[item].image} />
      <h2 className="text text_type_main-medium">{arr[item].name}</h2>
      <div className={detailsStyle.calories}>
        <p className="mr-5 text text_type_main-small">
          Калории,ккал
          <br /> {arr[item].calories}
        </p>
        <p className="mr-5 text text_type_main-small">
          Белки,г
          <br /> {arr[item].proteins}
        </p>
        <p className="mr-5 text text_type_main-small">
          Жиры,г
          <br /> {arr[item].fat}
        </p>
        <p className=" text text_type_main-small">
          Углеводы,г
          <br /> {arr[item].carbohydrates}
        </p>
      </div>
    </div>
  );
};
