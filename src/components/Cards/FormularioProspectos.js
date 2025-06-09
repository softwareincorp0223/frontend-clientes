import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { agregarProspecto, editarProspectos } from "functions/functions";
import { showAlert } from '../../components/Alert';  
// components

export default function FormularioProspectos({ NuevoProspecto, prospectoSeleccionado }) {

  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fuente, setFuente] = useState('');
  const [actualizar_id, setId] = useState('');
  
  const toggleForm = () => setShowForm(!showForm);

  useEffect(() => {
    if (prospectoSeleccionado) {
      setNombre(prospectoSeleccionado.nombre_prospecto);
      setCorreo(prospectoSeleccionado.correo_prospecto);
      setTelefono(prospectoSeleccionado.telefono_prospecto);
      setFuente(prospectoSeleccionado.fuente_prospecto);
      setId(prospectoSeleccionado.prospecto_id);
      toggleForm();
    }
  }, [prospectoSeleccionado]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (actualizar_id) {
        const datos = await editarProspectos(nombre, correo, telefono, fuente, actualizar_id);
        //showAlert(datos.type, datos.mensaje);
        setNombre('');
        setCorreo('');
        setTelefono('');
        setFuente('');
        setId('');
      } else {
        const datos = await agregarProspecto(nombre, correo, telefono, fuente);
        showAlert(datos.type, datos.mensaje);
        setNombre('');
        setCorreo('');
        setTelefono('');
        setFuente('');
        setId('');
      }

      if (typeof NuevoProspecto === "function") {
        NuevoProspecto(); // Notifica al padre que hay un nuevo prospecto
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      showAlert("error", "Ocurrió un error al guardar el prospecto. Intenta nuevamente.");
    }
  };

  return (
    <>
      <ToastContainer />
    
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Nuevo prospecto</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={toggleForm}
            >
              {showForm ? "Ocultar formulario" : "Mostrar formulario"}
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
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nombre "
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Correo
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="correo@correo.com"
                      value={correo}
                      onChange={e => setCorreo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Teléfono
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="720000000"
                      value={telefono}
                      onChange={e => setTelefono(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Fuente / Referencia
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Internet"
                      value={fuente}
                      onChange={e => setFuente(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/*
              <hr className="mt-6 border-b-1 border-blueGray-300" />

              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Contact Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      City
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="New York"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="United States"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="Postal Code"
                    />
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />

              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                About Me
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      About me
                    </label>
                    <textarea
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div>
              */}
              <div className="text-right">
                <input
                  type="submit"
                  value={actualizar_id ? "Actualizar" : "Guardar"}
                  className="mr-4 mt-2 mb-0 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                  style={{ backgroundColor: '#10B981', cursor: 'pointer' }}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
