import React from "react";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import ConfirEliminar from "../componentes/confirmacion";
import Footer from "../componentes/footer";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { exist_token, domain } from "../util/verifi-local-token";

import * as ProductoAction from "../actions/productoAction";

class Stock extends React.Component {
  state = {
    producto: "",
    laboratorio: "",
    cantidad: 0,
    presentacion: "",
    lote: "",
    registro_sanitario: "",
    dosis: "",
    tipo_dosis: "",
    fecha_elaboracion: "",
    fecha_caducidad: "",
  };

  componentDidMount() {
    if (this.props.ProductoReducer.Producto_Name.length == 0) {
      this.props.obterner_name_productos();
    }
    if (this.props.ProductoReducer.Laboratorio_Name.length == 0) {
      this.props.obterner_name_laboratorio();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.ProductoReducer.mensaje != "") {
      document.getElementById(
        "sms-name-product"
      ).innerText = `${nextProps.ProductoReducer.mensaje}`;
      this.props.obterner_name_productos();
    }

    if (nextProps.ProductoReducer.mensaje_laboratorio != "") {
      document.getElementById(
        "sms-name-laboratorio"
      ).innerText = `${nextProps.ProductoReducer.mensaje_laboratorio}`;
      this.props.obterner_name_laboratorio();
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  add_name_product = () => {
    let name = document.getElementById("nombre_producto");

    if (name.value == "") {
      alert("Campo vacio en nombre del producto");
    } else {
      this.props.create_name_product(name.value);
      name.value = "";
    }
  };

  add_name_laboratorio = () => {
    let name = document.getElementById("name_laboratorio");

    if (name.value == "") {
      alert("Campo vacio en nombre del Laboratorio");
    } else {
      this.props.create_name_laboratorio(name.value);
      name.value = "";
    }
  };

  save_product = () => {
    if (
      this.state.producto == "-----" ||
      this.state.laboratorio == "------" ||
      this.state.cantidad == "" ||
      this.state.lote == "" ||
      this.state.registro_sanitario == "" ||
      this.state.dosis == "" ||
      this.state.tipo_dosis == "-----" ||
      this.state.fecha_elaboracion == "" ||
      this.state.fecha_caducidad == ""
    ) {
      alert("Campos vacios en agregar productos a stock");
    } else {
      let data = new FormData();

      let file = document.getElementById("foto-producto").files[0];
      data.append("file", file);
      data.append("id_name_product", this.state.producto);
      data.append("id_name_laboratorio", this.state.laboratorio);
      data.append("cantidad", this.state.cantidad);
      data.append("presentacion", this.state.presentacion);
      data.append("lote", this.state.lote);
      data.append("registro_sanitario", this.state.registro_sanitario);
      data.append("dosis", this.state.dosis);
      data.append("tipo_dosis", this.state.tipo_dosis);
      data.append("fecha_elaboracion", this.state.fecha_elaboracion);
      data.append("fecha_caducidad", this.state.fecha_caducidad);

      this.props.create_product(data);
    }
  };

  render() {
    if (exist_token(Cookie.get("access_token")) == false) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Head titulo="Stock" />
        <Nav />

        <section className="container-fluid">
          <h4 className="p-1 text-center">
            Agregar y Actualizar Productos en Stock
          </h4>

          <br />

          <div className="row justify-content-center mt-1">
            <div className="col-2">
              <x-button>
                <span className="material-icons">local_offer</span> &nbsp;
                <x-label>
                  <b style={{ fontSize: 15 }}>Add Product</b>
                </x-label>
                <dialog
                  style={{
                    position: "relative",
                    top: 200,
                    height: 120,
                    width: 400,
                  }}
                >
                  <form className="p-2">
                    <label className="text-center">
                      <b>Registrar producto:</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre_producto"
                      placeholder="Nombre del producto"
                    />
                    <input
                      type="button"
                      className="btn btn-primary mt-2"
                      value="Registrar"
                      onClick={this.add_name_product}
                    />{" "}
                    &nbsp; &nbsp;{" "}
                    <span style={{ color: "red" }} id="sms-name-product"></span>
                  </form>
                </dialog>
              </x-button>
            </div>

            <div className="col-2">
              <x-button>
                <span className="material-icons">add_box</span> &nbsp;
                <x-label>
                  <b style={{ fontSize: 15 }}>Add Laboratorio</b>
                </x-label>
                <dialog
                  style={{
                    position: "relative",
                    top: 200,
                    height: 120,
                    width: 400,
                  }}
                >
                  <form className="p-2">
                    <label>
                      <b>Registrar Laboratorio:</b>
                    </label>
                    <input
                      type="text"
                      id="name_laboratorio"
                      className="form-control"
                      placeholder="Nombre del laboratorio"
                    />
                    <input
                      type="button"
                      className="btn btn-primary mt-2"
                      value="Registrar"
                      onClick={this.add_name_laboratorio}
                    />{" "}
                    &nbsp; &nbsp;{" "}
                    <span
                      style={{ color: "red" }}
                      id="sms-name-laboratorio"
                    ></span>
                  </form>
                </dialog>
              </x-button>
            </div>

            <div className="col-2">
              <x-button>
                <span className="material-icons">add_circle</span> &nbsp;
                <x-label>
                  {" "}
                  <b style={{ fontSize: 15 }}> Add Stock</b>{" "}
                </x-label>
                <dialog style={{ position: "relative", top: 200 }}>
                  <h3
                    className="text-center p-2"
                    style={{
                      backgroundColor: "#0866dc",
                      color: "#fff",
                      padding: 5,
                    }}
                  >
                    Agregar en Stock
                  </h3>

                  <form className="pb-5">
                    <div className="row justify-content-center">
                      <div className="col p-2">
                        <label>
                          <b>Imagen:</b>
                        </label>
                        <input type="file" id="foto-producto" />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Producto:</b>
                        </label>
                        <select
                          className="form-control"
                          name="producto"
                          onChange={this.handleInputChange}
                        >
                          <option>-----</option>
                          {this.props.ProductoReducer.Producto_Name.map(
                            (item) => (
                              <option
                                key={item.id_product_name}
                                value={item.id_product_name}
                              >
                                {item.product_name}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Laboratorio:</b>
                        </label>
                        <select
                          className="form-control"
                          name="laboratorio"
                          onChange={this.handleInputChange}
                        >
                          <option>------</option>
                          {this.props.ProductoReducer.Laboratorio_Name.map(
                            (item) => (
                              <option
                                key={item.id_name_laboratorio}
                                value={item.id_name_laboratorio}
                              >
                                {item.nombre_laboratorio}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Cantidad:</b>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="cantidad"
                          onChange={this.handleInputChange}
                          placeholder="100"
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Presentacion:</b>
                        </label>
                        <select
                          className="form-control"
                          name="presentacion"
                          onChange={this.handleInputChange}
                        >
                          <option>Option one</option>
                          <option>Option two</option>
                          <option>Option three</option>
                        </select>
                      </div>
                    </div>

                    <div className="row justify-content-center">
                      <div className="col p-2">
                        <label>
                          <b>Lote:</b>
                        </label>
                        <input
                          type="number"
                          name="lote"
                          onChange={this.handleInputChange}
                          className="form-control"
                          placeholder="20004893"
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Registro Sanitario:</b>
                        </label>
                        <input
                          type="text"
                          name="registro_sanitario"
                          onChange={this.handleInputChange}
                          className="form-control"
                          placeholder="011862-1-04-11"
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Dosis:</b>
                        </label>
                        <input
                          type="number"
                          name="dosis"
                          onChange={this.handleInputChange}
                          className="form-control"
                          placeholder="000"
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Tipo de dosis:</b>
                        </label>
                        <select
                          className="form-control"
                          name="tipo_dosis"
                          onChange={this.handleInputChange}
                        >
                          <option>-----</option>
                          <option>Miligramos</option>
                        </select>
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Fecha elaboracion:</b>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="fecha_elaboracion"
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Fecha caducidad:</b>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="fecha_caducidad"
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col-12 p-2">
                      <button
                        type="button"
                        onClick={this.save_product}
                        className="btn btn-mini btn-primary mt-2 ml-2"
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </dialog>
              </x-button>
            </div>
            <div className="col-5">
              <input
                type="text"
                className="form-control input-buscar"
                placeholder="Buscar Producto por: ----- Nombre ----- Laboratorio ----- Presentacion"
              />
            </div>

            <div className="col-12 seccion-table-productos_all">
              <table className="table-striped mt-1 text-center">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Laboratorio</th>
                    <th>Stock</th>
                    <th>Presentacion</th>
                    <th>Miligramos</th>
                    <th>Fecha de elaboracion</th>
                    <th>Fecha de caducidad</th>
                    <th>Fecha de Ingreso</th>
                    <th>Ingresado Por</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((valor) => (
                    <tr key={valor}>
                      <td>
                        <img src="img/medicamento/paracetamol.jpg" />
                      </td>
                      <td>Paracetamol</td>
                      <td>Mi favorito</td>
                      <td># 5</td>
                      <td>Tabletas</td>
                      <td>500</td>
                      <td>20/02/2020</td>
                      <td>12/05/2021</td>
                      <td>15/01/2020</td>
                      <td>Andres coello</td>
                      <td>
                        <button className="btn btn-mini btn-warning">
                          Modificar
                        </button>
                        <span>
                          <ConfirEliminar />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }
}

const mapStateToProps = ({ ProductoReducer }) => {
  return { ProductoReducer };
};

export default connect(mapStateToProps, ProductoAction)(Stock);
