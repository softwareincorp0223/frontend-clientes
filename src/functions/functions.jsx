import { showAlert } from '../components/Alert';
import axiosInstance from '../config/axios';

// Función auxiliar para obtener config con token
const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };
};

export const obtenerProspectos = async () => {
    const config = getAuthConfig();
    if (!config) return;

    try {
        const { data } = await axiosInstance.get('/api/prospectos', config);
        return data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Error al obtener prospectos';
        showAlert('error', errorMessage);
    }
};

export const eliminarProspectos = async (id) => {
    const config = getAuthConfig();
    if (!config) return;

    try {
        const { data } = await axiosInstance.delete('/api/prospecto-delete/' + id, config);
        return data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Error al obtener prospectos';
        showAlert('error', errorMessage);
    }
};

export const editarProspectos = async (nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto, id) => {
    const config = getAuthConfig();
    if (!config) return;

    try {
        const { data } = await axiosInstance.put('/api/prospecto-update/' + id, { nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto }, config);
        return data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Error al obtener prospectos';
        showAlert('error', errorMessage);
    }
};

export const obtenerClientes = async () => {
    const config = getAuthConfig();
    if (!config) return;

    try {
        const { data } = await axiosInstance.get('/api/clientes', config);
        return data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Error al obtener clientes';
        showAlert('error', errorMessage);
    }
};

export const agregarProspecto = async (nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto) => {
    if ([nombre_prospecto, telefono_prospecto].includes('')) {
        showAlert('error', 'Campos son obligatorios');
        return;
    }

    const config = getAuthConfig();
    if (!config) return;

    try {
        const { data } = await axiosInstance.post(
            '/api/register-prospecto',
            { nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto },
            config
        );
        return data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Error al agregar prospecto';
        showAlert('error', errorMessage);
    }
};

export const agregarCliente = async (prospecto_sid, cotizacion_cliente, notas_cliente, fecha_conversion_cliente) => {
    if ([prospecto_sid, cotizacion_cliente, notas_cliente, fecha_conversion_cliente].includes('')) {
        showAlert('error', 'Campos son obligatorios');
        return { type: 'error', mensaje: 'Campos obligatorios' };
    }

    const config = getAuthConfig();
    if (!config) return;

    try {
        const { data } = await axiosInstance.post(
            '/api/register-cliente',
            { prospecto_sid, cotizacion_cliente, notas_cliente, fecha_conversion_cliente },
            config
        );
        return data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Error al agregar cliente';
        showAlert('error', errorMessage);
    }
};
