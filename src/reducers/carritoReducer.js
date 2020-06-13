import {
  ADD_AL_CARRITO,
  QUITAR_DEL_CARRITO,
  ERRROR_CARRITO,
} from "../types/carritoTypes";

const INITIAL_STATE = {
  carrito: [],
  error_carrito: "",
  mensaje_carrito: "",
};

const array = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_AL_CARRITO:
      array.push(action.payload);
      return {
        ...state,
        carrito: array,
        error_carrito: "",
      };

    case QUITAR_DEL_CARRITO:
      return {
        ...state,
        clientes: [],
        error_carrito: "",
        mensaje_carrito: "Se quito producto del carrito",
      };

    case ERRROR_CARRITO:
      return {
        ...state,
        error_carrito: action.payload,
        cargando: false,
      };

    default:
      return state;
  }
};
