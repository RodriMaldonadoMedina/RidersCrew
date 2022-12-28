import React, { useState, useContext } from "react";

import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/home.css";

const Login = () => {
  const [datos, setDatos] = useState({});
  const { store, actions } = useContext(Context);
  const nav = useNavigate();

  function handleInputChange(e) {
    setDatos({ ...datos, [e.target.type]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    actions.loguearUsuario(datos);
    setTimeout(() => {
      if (store.token !== null) {
        nav("/userHome");
      } else alert("Algo salio mal al loguear");
    }, 500);
  }

  return (
    <div className="div-container mt-5">
      <div className="d-flex justify-content-center align-items-center mt-2 flex-column">
        <div>
          <h1 className="logo text-white">*Riders|Crew*</h1>
        </div>
        <div className="logo">
          <h2 className="text-white mt-5 mb-0">Bienvenidos</h2>
        </div>
      </div>{" "}
      <section className="d-flex justify-content-center align-items-center section-init ">
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center border-start border-bottom  border-white login-form "
        >
          {" "}
          <div className="div_logo">
            <h1 className="text-white my-3 logo">R|C</h1>
          </div>
          <h3 className="text-white my-3 login">Login</h3>
          <div className="form-group w-75 my-2">
            <input
              onChange={handleInputChange}
              type="email"
              className="form-control rounded-pill bg-transparent my-2 text-center text-white"
              placeholder="email"
              required=""
            />
          </div>
          <div className="form-group w-75 mb-2">
            <input
              onChange={handleInputChange}
              type="password"
              className="form-control rounded-pill bg-transparent my-2 text-center text-white"
              placeholder="Password"
              required=""
            />
          </div>
          <div className="form-group my-2">
            <button
              type="submit"


              className="form-control btn btn-light submit rounded-pill bg-transparent text-white  boton-log"

            >
              Entrar
            </button>
          </div>
          <div className="form-group d-flex justify-content-center">
            <div className="mt-3">
              <Link
                to="/signup"
                className="text-white link d-flex justify-content-center align-items-center"
              >
                Todavia no estas registrado?
              </Link>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
