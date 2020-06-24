import {
  CREAR_VENTAS,
  TRAER_VENTAS,
  MOSTRAR_POR_FECHAS,
  MENSAJE_VENTAS,
  ERROR_VENTAS,
} from "../types/ventasTypes";
import { createVenta, obtenerVentas, eliminarVentas } from "../api/ventas";
import { LIMPIAR_CARRITO } from "../types/carritoTypes";
import { NOTIFICACION_ACTIVIVDAD } from "../types/ProductoTypes";

export const crear_venta = (data) => async (dispatch, getState) => {
  setTimeout(() => {
    const array = getState().carritoReducer.carrito;
    array.splice(0, array.length);

    dispatch({
      type: LIMPIAR_CARRITO,
      payload: array,
    });
  }, 3000);
  try {
    createVenta(data).then((res) => {
      dispatch({
        type: CREAR_VENTAS,
        payload: "Venta Exitosa",
      });

      obtenerVentas().then((res) => {
        dispatch({
          type: TRAER_VENTAS,
          payload: res.data,
        });
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_VENTAS,
      payload: `Error: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const traer_ventas = () => async (dispatch) => {
  try {
    obtenerVentas().then((res) => {
      dispatch({
        type: TRAER_VENTAS,
        payload: res.data,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_VENTAS,
      payload: `Error: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const traer_por_fecha = (array) => async (dispatch) => {
  dispatch({
    type: MOSTRAR_POR_FECHAS,
    payload: array,
  });
};

export const limpiar_ventas = () => async (dispatch) => {
  dispatch({
    type: ERROR_VENTAS,
    payload: "",
  });

  dispatch({
    type: MENSAJE_VENTAS,
    payload: "",
  });
};

export const eliminar_venta = (id) => async (dispatch) => {
  try {
    eliminarVentas(id).then((res) => {
      obtenerVentas().then((res) => {
        dispatch({
          type: TRAER_VENTAS,
          payload: res.data,
        });
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_VENTAS,
      payload: `Error: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `${error.message}`,
        date: new Date(),
      },
    });
  }
};
