import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { agregarCliente, obtenerClientes } from "functions/functions";
import { showAlert } from '../../components/Alert';

//componentes

export default function FormularioClientes({ NuevoCliente }) {


    const [showForm, setShowForm] = useState(false);
    const [prospecto, setProspecto] = useState('');
    const [cotizacion, setCotizacion] = useState('');
    const [notas, setNotas] = useState('');
    const [fecha_ingreso, setFechaIngreso] = useState('');



    const toggleForm = () => setShowForm(!showForm);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datos = await agregarCliente(prospecto, cotizacion, notas,fecha_ingreso);

        if (datos.type == 'success') {

            showAlert(datos.type, datos.mensaje);
            
            setProspecto('');
            setCotizacion('');
            setNotas('');
            setFechaIngreso('');

            if (typeof NuevoCliente === "function") {
                NuevoCliente(); // <- Notifica al padre que hay un nuevo prospecto
            }
        }
    }

    return (
        // fragmentos
        <>
            <ToastContainer />

            <div className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Nuevo Cliente</h6>
                        {/* boton  */}
                        <button
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={toggleForm}
                        >
                            Mostrar formulario
                        </button>
                    </div>

                </div>
                {showForm && (
                    <div className="flex-auto px-4 lg:px-10 py-10 pb-6 pt-0">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-wrap mt-6">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Nombre Prospecto
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Prospecto "
                                            value={prospecto}
                                            onChange={e => setProspecto(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Cotización
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Cotización "
                                            value={cotizacion}
                                            onChange={e => setCotizacion(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Notas
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Notas "
                                            value={notas}
                                            onChange={e => setNotas(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Fecha
                                        </label>
                                        <input
                                            type="date"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Fecha Ingreso "
                                            value={fecha_ingreso}
                                            onChange={e => setFechaIngreso(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <input
                                    style={{ backgroundColor: '#10B981', cursor: 'pointer' }}
                                    className="mr-4 mt-2 mb-0 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                    type="submit"
                                    value='Agregar'
                                />
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

