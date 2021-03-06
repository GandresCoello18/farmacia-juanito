import React from "react";
import PropsType from "prop-types";
import Cookie from "js-cookie";
import moment from "moment";
import { domain } from "../util/verifi-local-token";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Alerta from "../componentes/alert";
import "../assest/css/nav.css";
import {
  history_session,
  limpiar_history_session,
} from "../actions/usuariosActions";

class Nav extends React.Component {
  state = {};

  styles = {
    exito_actividad: {
      color: "#721c24",
      backgroundColor: "#f8d7da",
      borderColor: "#f5c6cb",
      cursor: "pointer",
    },
    error_actividad: {
      color: "#155724",
      backgroundColor: "#d4edda",
      borderColor: "#c3e6cb",
    },
    dialog: {
      width: "30vw",
      height: "70vh",
      left: 0,
      right: "auto",
      top: "auto",
      color: "white",
      background: "#f5f5f4",
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
      opacity: 0.95,
      border: "solid",
      borderColor: "#326960",
      borderWidth: 1,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
  };

  componentDidMount() {
    moment.lang("es");
    let btn_carrito = document.getElementById("btn-carrito");

    if (this.props.userHistoryReducer.historySession.length == 0) {
      this.props.history_session();
    }

    if (this.props.carritoReducer.carrito.length == 0) {
      btn_carrito.classList.add("btn-negative");
    } else {
      btn_carrito.classList.add("btn-positive");
    }

    let pathnombre = window.location.pathname;
    let item_menu = document.querySelectorAll(".tab-item");

    switch (pathnombre) {
      case "/":
        item_menu[0].classList.add("active");
        break;
      case "/producto":
        item_menu[1].classList.add("active");
        break;
      case "/stock":
        item_menu[2].classList.add("active");
        break;
      case "/ventas":
        item_menu[3].classList.add("active");
        break;
      case "/graficos":
        item_menu[4].classList.add("active");
        break;
      case "/clientes":
        item_menu[5].classList.add("active");
        break;
      case "/proveedores":
        item_menu[6].classList.add("active");
        break;
      case "/flujo-caja":
        item_menu[7].classList.add("active");
        break;
    }
  }

  componentWillUpdate(nextProps, nextState) {
    let btn_carrito = document.getElementById("btn-carrito");
    if (nextProps.carritoReducer.carrito.length == 0) {
      btn_carrito.classList.add("btn-negative");
      btn_carrito.classList.remove("btn-positive");
    } else {
      btn_carrito.classList.remove("btn-negative");
      btn_carrito.classList.add("btn-positive");
    }
  }

  cerrar_session = () => {
    Cookie.remove("access_token");
    window.location.href = "/login";
  };

  render() {
    return (
      <>
        <div className="tab-group">
          <Link to="/" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 40, fontSize: 20 }}
            >
              house
            </span>
            <b style={{ fontSize: 14 }}>Inicio</b>
          </Link>
          <Link to="/producto" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 10, fontSize: 20 }}
            >
              local_offer
            </span>
            <b style={{ fontSize: 14 }}>Mis Productos</b>
          </Link>
          <Link to="/stock" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 10, fontSize: 20 }}
            >
              add_circle
            </span>
            <b style={{ fontSize: 14 }}>Agregar Stock</b>
          </Link>
          <Link to="/ventas" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 40, fontSize: 20 }}
            >
              store
            </span>
            <b style={{ fontSize: 14 }}>Ventas</b>
          </Link>
          <Link to="/graficos" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 30, fontSize: 20 }}
            >
              insert_chart
            </span>
            <b style={{ fontSize: 14 }}>Graficos</b>
          </Link>
          <Link to="/clientes" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 30, fontSize: 20 }}
            >
              people
            </span>
            <b style={{ fontSize: 14 }}>Clientes</b>
          </Link>
          <Link to="/proveedores" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 15, fontSize: 20 }}
            >
              local_shipping
            </span>
            <b style={{ fontSize: 14 }}>Proveedores</b>
          </Link>
          <Link to="/flujo-caja" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 20, fontSize: 20 }}
            >
              attach_money
            </span>
            <b style={{ fontSize: 14 }}>Flujo de caja</b>
          </Link>

          <div className="tab-item tab-item-fixed">
            <span className="icon icon-plus"></span>
          </div>
        </div>

        <div className="row justify-content-end" style={{ padding: 10 }}>
          <div className="col-4">
            <x-button
              style={{
                cursor: "pointer",
              }}
            >
              <span className="material-icons" style={{ marginRight: 5 }}>
                restore
              </span>
              <x-label>Historial Session</x-label>
              <dialog style={this.styles.dialog}>
                <h3 className="text-center p-2">Historial Session</h3>
                <ul className="list-group">
                  {this.props.userHistoryReducer.historySession ? (
                    this.props.userHistoryReducer.historySession.map(
                      (valor) => (
                        <li
                          className="list-group-item"
                          key={valor.id_historial_session}
                        >
                          <img
                            className="img-circle media-object pull-left mt-2"
                            src={`${domain()}/static/${valor.foto}`}
                            width="32"
                            height="32"
                          />
                          <div className="media-body">
                            <strong>
                              {valor.nombres} {valor.apellidos}
                            </strong>{" "}
                            &nbsp; &nbsp;
                            <span className="p-1">
                              Email: <b>{valor.email}</b>
                            </span>
                            <p>
                              <b>
                                Ultima coneccion:{" "}
                                {moment(valor.fecha_session).format("LL, LT")}
                              </b>
                              .
                            </p>
                            <p>
                              <strong>Tipo User:</strong> &nbsp;{" "}
                              <span
                                className={
                                  valor.tipo_user == "Administrador"
                                    ? "alert-danger"
                                    : "badge-warning"
                                }
                              >
                                {valor.tipo_user}
                              </span>{" "}
                            </p>
                          </div>
                        </li>
                      )
                    )
                  ) : (
                    <Alerta
                      titulo="Aviso"
                      contenido="Registro de sesiones vacio."
                    />
                  )}
                </ul>
                <strong
                  className="btn-limpiar-history"
                  onClick={() => {
                    if (
                      this.props.userHistoryReducer.historySession.length > 1
                    ) {
                      this.props.limpiar_history_session();
                    }
                  }}
                >
                  Limpiar historial
                </strong>
                <Link to="/usuarios">
                  <strong className="btn-mostrar-usuarios">
                    Mostrar Usuarios
                  </strong>
                </Link>
              </dialog>
            </x-button>
          </div>

          <div className="col-5">
            <x-button
              style={
                this.props.ProductoReducer.notificaciones_actividades[
                  this.props.ProductoReducer.notificaciones_actividades.length -
                    1
                ] == undefined
                  ? {}
                  : this.props.ProductoReducer.notificaciones_actividades[
                      this.props.ProductoReducer.notificaciones_actividades
                        .length - 1
                    ].tipo == "ERROR"
                  ? this.styles.exito_actividad
                  : this.props.ProductoReducer.notificaciones_actividades[
                      this.props.ProductoReducer.notificaciones_actividades
                        .length - 1
                    ].tipo == "EXITO"
                  ? this.styles.error_actividad
                  : {}
              }
            >
              <span className="material-icons" style={{ marginRight: 5 }}>
                sort
              </span>
              <x-label>Notificacion de actividades</x-label>
              <dialog style={this.styles.dialog}>
                <h3 className="text-center p-2">Notificacion de actividades</h3>

                <ul className="list-group list-notification">
                  {this.props.ProductoReducer.notificaciones_actividades
                    .length > 0 ? (
                    this.props.ProductoReducer.notificaciones_actividades
                      .reverse()
                      .sort((a, b) => a.date > b.date)
                      .map((valor) => (
                        <li
                          className="list-group-item"
                          key={(Math.random() * 100).toString()}
                        >
                          {valor.tipo == "ERROR" ? (
                            <div className="alert alert-danger">
                              <p>
                                {" "}
                                <strong>{valor.tipo}:</strong> {valor.text}
                              </p>
                              <span>
                                Fecha: <i>{moment(valor.date).format("LTS")}</i>
                              </span>
                            </div>
                          ) : (
                            <div
                              className="alert alert-success"
                              key={valor.text}
                            >
                              <p>
                                {" "}
                                <strong>{valor.tipo}:</strong> {valor.text}
                              </p>
                              <span>
                                Fecha: <i>{moment(valor.date).format("LTS")}</i>
                              </span>
                            </div>
                          )}
                        </li>
                      ))
                  ) : (
                    <div className="alert alert-danger">
                      <strong>No hay actividades por el momento.</strong>
                    </div>
                  )}
                </ul>
              </dialog>
            </x-button>
          </div>

          <div className="col-1">
            <Link
              to="/carrito"
              id="btn-carrito"
              className="btn"
              style={{ cursor: "pointer" }}
            >
              {" "}
              <span className="material-icons">local_grocery_store</span>
              <b style={{ fontSize: 24 }}>
                {this.props.carritoReducer.carrito.length}
              </b>
            </Link>
          </div>

          <div className="col-2">
            <button
              onClick={this.cerrar_session}
              className="btn btn-mini btn-negative"
            >
              Cerrar Session
            </button>
          </div>
        </div>
      </>
    );
  }
}

Nav.prototypes = {
  userHistoryReducer: PropsType.object,
  ProductoReducer: PropsType.object,
  carritoReducer: PropsType.object,
  history_session: PropsType.func,
  limpiar_history_session: PropsType.func,
};

const mapStateToProps = ({
  userHistoryReducer,
  ProductoReducer,
  carritoReducer,
}) => {
  return { userHistoryReducer, ProductoReducer, carritoReducer };
};

const mapDispchToProps = {
  history_session,
  limpiar_history_session,
};

export default connect(mapStateToProps, mapDispchToProps)(Nav);
