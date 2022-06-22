import React from "react";
import "../css/Cards.css";

export default function Card({
  image,
  name,
  temperament,
  min_weight,
  max_weight,
}) {
  return (
    <div className="container__card">
      <div className="container__thumb">
        <img  src={image} alt={name} />
      </div>
      <div className="container__body">
        <h2 className="container__tittle">{name}</h2>
        <p className="container__description"> Nombre : {name} </p>
        <p className="container__description"> Temperamentos: {temperament} </p>
        <p className="container__description">
          Peso: {max_weight} - {min_weight} kg
        </p>
      </div>
    </div>
  );
}
