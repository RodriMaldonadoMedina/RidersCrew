import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navbar } from "../../component/navbar";
import IndividualAllEvents from "../../component/Events/individualAllEvents.jsx";
import { AutoComplete } from "../../component/autocomplete.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import "../../../styles/searchEvent.css";

registerLocale("es", es);

const SearchEvents = () => {
  const { store, actions } = useContext(Context);
  const [startDate, setStartDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  let lastDate = Date.now() + 864000000;
  let eventsLength = null;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (page > 1) {
      searchEvents(origin, destination);
    }
  }, [page]);

  const searchEvents = async (name, start, end, date) => {
    if (date) {
      date = date.toString().slice(0, 15);
    }
    if (name.length < 1) {
      name = "any";
    }
    if (start.length < 1) {
      start = "any";
    }
    if (end.length < 1) {
      end = "any";
    }
    if (date == null || date.length < 1) {
      date = "any";
    }
    const opts = {
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
    };
    try {
      const resp = await fetch(
        process.env.BACKEND_URL +
          "/api/searchevent/" +
          name +
          "/" +
          start +
          "/" +
          end +
          "/" +
          date +
          "/" +
          page,
        opts
      );
      const data = await resp.json();
      setEvents(data[0]);
      eventsLength = data[1];
      setPage(1);

      return data;
    } catch (error) {
      console.error("There has been an error retrieving data");
    }
  };

  const submitEvent = () => {
    let name = document.getElementById("nameInput").value;
    let start = document.getElementById("startInput").value;
    let end = document.getElementById("endInput").value;
    let date = startDate;
    searchEvents(name, start, end, date);
  };
  const deleteEvent = async (id) => {
    await actions.deleteEvent(id);
    navigate("/allpublicevents/1/5");
  };

  if (eventsLength > 0) {
    return (
      <div>
        <Navbar />
        <div>
          <Link to="/newevent">
            <h3 className="text-light">Crear tu propio evento</h3>
          </Link>
        </div>
        <button className="btn btn-primary" onClick={setPage(1)}>
          Buscar otra vez
        </button>
        <div>
          <h1 className="text-white title-container">Todos los eventos</h1>
        </div>
        <div className="event-container event-scroll">
          {events.map((item, i) => (
            <IndividualAllEvents
              item={item}
              key={item.id}
              deleteEvent={deleteEvent}
              updateMethod={null}
            />
          ))}
        </div>
        <div className="w-100 d-flex justify-content-center mt-5">
          {page >= 1 && page < Math.ceil(eventsLength / 5) ? (
            <button
              className="btn btn-primary mx-5"
              onClick={() => setPage(page + 1)}
            >
              Siguiente
            </button>
          ) : null}
          {page > 1 && page <= Math.ceil(eventsLength / 5) ? (
            <button
              className="btn btn-primary mx-5"
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </button>
          ) : null}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <div className="d-flex align-items-center flex-column mt-2">
          <div className="card rounded-3 p-3">
            {" "}
            <form onSubmit={submitEvent}>
              <div className="d-flex justify-content-center">
                <DatePicker
                  className="datePickerLong rounded-pill px-2 mx-auto align-self-center border-0 text-center"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  maxDate={lastDate}
                  dateFormat="dd/MM/yyy"
                  locale="es"
                  placeholderText="Seleciona una fecha"
                />
              </div>

              <div className="mb-3 rounded-pill">
                <label htmlFor="nameInput" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill px-2"
                  id="nameInput"
                  aria-describedby="nameHelp"
                />
              </div>
              <div className="mb-3 ">
                <label htmlFor="startInput" className="form-label">
                  Inicio
                </label>
                <AutoComplete id="startInput" pokemon="inicio" />
              </div>
              <div className="mb-3">
                <label htmlFor="endInput" className="form-label">
                  Final
                </label>
                <AutoComplete id="endInput" />
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn mySearch"
                  onClick={submitEvent}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <h1 className="text-white title-container">Todos los eventos</h1>
        </div>
        <div className="event-container event-scroll">
          {events.map((item, i) => (
            <IndividualAllEvents
              item={item}
              key={i}
              deleteEvent={deleteEvent}
              updateMethod={null}
            />
          ))}
        </div>
        <div className="w-100 d-flex justify-content-center mt-5">
          {page >= 1 && page < Math.ceil(eventsLength / 5) ? (
            <button
              className="btn btn-primary mx-5"
              onClick={() => setPage(page + 1)}
            >
              Siguiente
            </button>
          ) : null}
          {page > 1 && page <= Math.ceil(eventsLength / 5) ? (
            <button
              className="btn btn-primary mx-5"
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </button>
          ) : null}
        </div>
      </div>
    );
  }
};

export default SearchEvents;
