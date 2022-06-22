import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanDetail } from "../actions/index";
import "../css/Detail.css";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();
  const { id } = useParams();
  const myDog = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  function handleClean() {
    dispatch(cleanDetail());
  }
  return (
    <div className="container__detail">
      <div>

      
      <div className="container__details__card">
        {myDog.length > 0  ? (
          <>
            <div className="container__image__breed">
              <img src={myDog[0].image} alt="dog" />
            </div>
            <div className="container__card__info">
              <h1 className="container__detail__tittle">{myDog[0].name}</h1>
              <div className="container__detail__text">
                <p> Esperanza de vida: {myDog[0].life_span} </p>
                <p> Temperamentos: {myDog[0].temperament
                    ? myDog[0].temperament
                    : myDog[0].temperaments.map((temp) =>
                        temp.name.concat(" ")
                      )        
                      }</p>
                <p> Altura: {myDog[0].max_height} - {myDog[0].min_height} Cm</p>
                <p> Peso: {myDog[0].max_weight} - {myDog[0].min_weight} Kg</p>
              </div>
              <div className="container__button__detail">
                <Link to="/home">
                  <button onClick={() => handleClean()}> Volver </button>
                </Link>
              </div>
            </div>
          </>
        ): <div>Cargando</div>}
      </div>
      </div>
    </div>
  );
}
