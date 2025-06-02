import { showAlert } from '../components/Alert';
import axiosInstance from '../config/axios';

export const obtenerProspectos = async () => {

    try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axiosInstance.get('/api/prospectos', config);

        return data;
    } catch (error) {
        // El servidor respondió con un código de estado diferente a 2xx
        const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
        showAlert('error', errorMessage);
    }
}

export const obtenerClientes = async () => {

    try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axiosInstance.get('/api/clientes', config);
        console.log(data);
        return data;
    } catch (error) {
        // El servidor respondió con un código de estado diferente a 2xx
        const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
        showAlert('error', errorMessage);
    }
}

export const agregarProspecto = async (nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto) => {

    if ([nombre_prospecto, telefono_prospecto].includes('')) {
        showAlert('error', 'Campos son obligatorios');
        return
    }
    try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axiosInstance.post('/api/register-prospecto', { nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto }, config);

        return data;
    } catch (error) {
        // El servidor respondió con un código de estado diferente a 2xx
        const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
        showAlert('error', errorMessage);
    }
}




export const agregarCliente = async (prospecto_sid, cotizacion_cliente, notas_cliente,fecha_conversion_cliente) => {

    if ([prospecto_sid, cotizacion_cliente, notas_cliente,fecha_conversion_cliente].includes('')) {
        showAlert('error', 'Campos son obligatorios');
        return { type: 'error', mensaje: 'Campos obligatorios' }; // <-- Retornar algo aunque falle la validación
    }
    try {
        const token = localStorage.getItem('token');

        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axiosInstance.post('/api/register-cliente', { prospecto_sid, cotizacion_cliente, notas_cliente,fecha_conversion_cliente }, config);

        return data;

    } catch (error) {

        // El servidor respondió con un código de estado diferente a 2xx
        const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
        showAlert('error', errorMessage);
        //  return { type: 'error', mensaje: errorMessage }; // <-- Asegúrate de retornar algo aquí también
    }

}


