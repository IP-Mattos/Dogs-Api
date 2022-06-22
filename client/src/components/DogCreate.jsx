import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTemperaments, postDog, getDogs } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "../css/DogCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "El nombre es requerido";
  }
  if (!input.max_weight) {
    errors.max_weight = "El peso maximo es requerido";
  }
  if (!input.min_weight) {
    errors.min_weight = "El peso minimo es requerido";
  }
  if (!input.min_height) {
    errors.min_height = "La altura minima es requerida";
  }
  if (!input.max_height) {
    errors.max_height = "La altura maxima es requerida";
  }

  return errors;
}

export function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [temps, setTemps] = useState([]);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    max_height: 0,
    min_height: 0,
    max_weight: 0,
    min_weight: 0,
    life_span: 0,
    image: "",
    temperament: [], //lo seteo en un array para poder guardar la cantidad de temperamentos que quiera.
  });

  function handleChange(e) {
    if (
      e.target.name === "min_height" ||
      e.target.name === "max_height" ||
      e.target.name === "max_weight" ||
      e.target.name === "min_weight" ||
      e.target.name === "life_span"
    ) {
      if (e.target.value > 80) {
        e.target.value = 80;
        alert("No puede ingresar ese valor");
      }
      if (e.target.value < 0) {
        e.target.value = 0;
        alert("No puede ingresar ese valor");
      }

    }

    setInput({
      ...input,
      [e.target.name]: e.target.value, //cada vez que la funcion se ejecute a mi estado input ademas de lo que tiene agregale el target value de lo que esta modificando
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handeSelect(e) {
    if (temps.length >= 6) alert("Hay un limite de 6 Temperamentos!");
    else {
      if (!temps.includes(e.target.value)) {
        if (temps.length > 0) {
          setTemps([...temps, e.target.value]);
        } else {
          setTemps([e.target.value]);
        }
      } else {
        alert("No puedes Agregar el mismo temperamento!");
      }
    }
  }
  function handleDeleted(e) {
    e.preventDefault();
    setTemps(temps.filter((t) => t !== e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    let isEmpty = Object.keys(errors).length === 0;

    if (!isEmpty) {
      alert("Debe llenar los campos obligatorios!");
    } else {
      const addDog = {
        name: input.name,
        life_span: input.life_span + " years",
        min_height: input.min_height,
        max_height: input.max_height,
        min_weight: input.min_weight,
        max_weight: input.max_weight,
        image: input.image,
        temperament: temps,
      };
      const exist = allDogs.map((x) => x.name);
      if (exist.includes(addDog.name)) {
        alert("Este perro ya existe");
      } else {
        dispatch(postDog(addDog));
        setInput({
          name: "",
          max_height: 0,
          min_height: 0,
          max_weight: 0,
          min_weight: 0,
          life_span: 0,
          image: "",
          temperament: [],
        });
        setTemps([]);
        alert("Se ha creado correctamente!");
        navigate("/home");
      }
    }
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Nueva Raza</h1>
        <div className="container__input">
          <div className="container__box">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="container__box">
            <label htmlFor="max_height">Altura Maxima:</label>
            <input
              type="number"
              value={input.max_height}
              name="max_height"
              onChange={handleChange}
              required
            />
            {errors.max_height && <p className="error">{errors.max_height}</p>}
          </div>
          <div className="container__box">
            <label htmlFor="min_height">Altura Minima:</label>
            <input
              type="number"
              value={input.min_height}
              name="min_height"
              onChange={handleChange}
              required
            />
            {errors.min_height && <p className="error"> {errors.min_height}</p>}
          </div>
          <div className="container__box">
            <label htmlFor="max_weight">Peso Maximo:</label>
            <input
              type="number"
              value={input.max_weight}
              name="max_weight"
              onChange={handleChange}
              required
            />
            {errors.max_weight && <p className="error">{errors.max_weight}</p>}
          </div>
          <div className="container__box">
            <label htmlFor="min_weight">Peso Minimo:</label>
            <input
              type="number"
              value={input.min_weight}
              name="min_weight"
              onChange={handleChange}
              required
            />
            {errors.min_weight && <p className="error">{errors.min_weight}</p>}
          </div>
          <div className="container__box">
            <label htmlFor="life_span">Años de Vida:</label>
            <input
              type="text"
              value={input.life_span}
              name="life_span"
              onChange={handleChange}
            />
          </div>
          <div className="container__box">
            <label htmlFor="image">Imagen:</label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="container__select">
          <label htmlFor="temp">Temperamentos</label>
          <select name="temp" onChange={(e) => handeSelect(e)}>
            <option value={null}>Temperamentos</option>
            {temperaments.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
          <div className="container__temperaments">
            
            {temps.map((temp) => {
              return (
                <div key={temp}>
                  <div className="container__temp__box">
                    <p>{temp}</p>
                    <button
                      className="container__button"
                      value={temp}
                      onClick={(e) => handleDeleted(e)}
                    >
                      x
                    </button>
                  </div>
                </div>
              );
            })}
         
          </div>
        </div>
        <div className="container__form__button">
          <button type="submit">Crear</button>
          <Link to="/home">
            <button>Volver</button>
          </Link>
        </div>
      </form>
      <div></div>
    </div>
  );
}
