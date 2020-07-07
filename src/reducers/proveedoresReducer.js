import {
  CREAR_PROVEEDOR,
  TRAER_PROVEEDORES,
  ERROR_PROVEEDORES,
} from "../types/ProveedorTypes";

const INITIAL_STATE = {
  Proveedores: [],
  Busqueda_proveedores: [],
  error_proveedor: "",
  mensaje_proveedor: "",
  cargar_proveedor: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREAR_PROVEEDOR:
      return {
        ...state,
        cargar_proveedor: true,
      };
    case TRAER_PROVEEDORES:
      return {
        ...state,
        Proveedores: action.payload,
        Busqueda_proveedores: action.payload,
        cargar_proveedor: false,
      };
    case ERROR_PROVEEDORES:
      return {
        ...state,
        error_proveedor: action.payload,
      };

    default:
      return state;
  }
};