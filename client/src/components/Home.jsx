import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreated,
  filterDogsByTemperament,
  getDogs,
  orderByName,
  orderByWeight,
  getTemperaments,
} from "../actions/index";
import { Link } from "react-router-dom";
import Card from "./Cards";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "../css/Home.css";
import dog from "../img/dogs.svg";

export default function Home() {
  
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);

  const allTemp = useSelector((state) => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [dogsPerPage, setDogsPerPage] = useState(8);
  // eslint-disable-next-line no-unused-vars
  const [orden, setOrden] = useState("");
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFilterTemperament(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    setCurrentPage(1);
    dispatch(filterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  function handleSortW(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }
  function handleChange(e) {
    console.log("llego");
    setCurrentPage(1);
  }

  return (
    <div>
      <header>
        <div
          className="logo"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <img src={dog} alt="" />
          Dogs
        </div>

        <nav>
          <ul className="nav__links">
            <li>
              <div className="a__color">
                <Link to="/dog" className="button">
                  Agregar
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </header>

      <div className="container__options">
        <div className="container__filter">
          <select onChange={(e) => handleSort(e)} defaultValue="Ordenar Alfabeticamente">
            <option disabled >Ordenar Alfabeticamente</option>
            <option value="asc">Ascendente (A-Z)</option>
            <option value="desc">Descendente (Z-A)</option>
          </select>
          <select onChange={(e) => handleSortW(e)} defaultValue="Ordernar por peso">
            <option disabled>Ordernar por peso</option>
            <option value="mayor">Peso Maximo</option>
            <option value="menor">Peso Minimo</option>
          </select>
          <select onChange={(e) => handleFilterCreated(e)}>
            <option value="all"> Todos</option>
            <option value="created">Creados</option>
            <option value="api">Api</option>
          </select>
          <select onChange={(e) => handleFilterTemperament(e)} defaultValue="Temperamentos">
            <option disabled> Temperamentos </option>
            <option value="all"> Todos </option>
            {allTemp.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div
          className="container__input__Search"
          onChange={(e) => handleChange(e)}
        >
          <SearchBar />
        </div>
      </div>

      <div className="containerCard">
        {currentDogs !== "error" && currentDogs.length > 0 ? (
          currentDogs?.map((el) => {
            return (
              <div key={el.id} className="container__card">
                <Link to={"/home/" + el.id}>
                  <Card
                    name={el.name}
                    image={el.image}
                    min_weight={el.min_weight}
                    max_weight={el.max_weight}
                    temperament={
                      el.temperament
                        ? el.temperament
                        : el.temperaments &&
                          el.temperaments.map((temp) => temp.name.concat(" "))
                    }
                    key={el.id}
                  />
                </Link>
              </div>
            );
          })
        ) : currentDogs.length === 0 ? (
          <div className="container__center2">
            <div className="container__details__card">
              <div>Cargando</div>
            </div>
          </div>
        ) : (
          <div className="container__center">
            <div className="container__error">
              <p>No existe perro!</p>
            </div>
          </div>
        )}
      </div>
      {
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          currentDogs={currentDogs}
          paginado={paginado}
          currentPage={currentPage}
        />
      }
    </div>
  );
}
