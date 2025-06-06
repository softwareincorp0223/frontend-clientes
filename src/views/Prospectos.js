import React, { useState, useEffect } from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import FormularioProspectos from "components/Cards/FormularioProspectos.js";
import CardProspectos from "components/Cards/CardProspectos.js";
import { obtenerProspectos, obtenerClientes } from "functions/functions";

export default function Prospectos() {
  const [prospectos, setProspectos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 6; // 6 tarjetas = 2 filas de 3

  const cardProspectos = async () => {
    const datos = await obtenerProspectos();
    setProspectos(datos);
  }

  const cardClientes = async () => {
    const datos2 = await obtenerClientes();
    console.log('datos2');
    console.log(datos2);
  }

  useEffect(() => {
    cardProspectos();
    cardClientes();
  }, []);

  // Filtrar por búsqueda (opcional)
  const prospectosFiltrados = prospectos.filter(p =>
    p.nombre_prospecto.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(prospectosFiltrados.length / porPagina);
  const inicio = (paginaActual - 1) * porPagina;
  const fin = inicio + porPagina;
  const prospectosPaginados = prospectosFiltrados.slice(inicio, fin);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        
        <section className="relative block h-350-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>

        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">

              <div className="px-6">

                <div className="w-full px-4">
                  <FormularioProspectos NuevoProspecto={cardProspectos} />
                </div>

                <div className="w-full px-4">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={busqueda}
                    onChange={(e) => {
                      setBusqueda(e.target.value);
                      setPaginaActual(1); // Reinicia a la primera página si hay búsqueda
                    }}
                  />
                </div>

                {/* Listado de prospectos */}
                  <div className="w-full px-4 flex flex-wrap">
                    {prospectosPaginados.map(p => (
                      <div key={p.prospecto_id} className="w-full md:w-6/12 lg:w-4/12 px-2 mb-6">
                        <CardProspectos
                          nombre={p.nombre_prospecto}
                          correo={p.correo_prospecto}
                          telefono={p.telefono_prospecto}
                          fuente={p.fuente_prospecto}
                          fecha={p.fecha_registro_prospecto}
                        />
                      </div>
                    ))}
                  </div>

              </div>

               {/* Paginación */}
                <div className="w-full px-4 py-5">
                  <div className="flex justify-center items-center space-x-2 flex-wrap">
                    <button
                      onClick={() => cambiarPagina(paginaActual - 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      disabled={paginaActual === 1}
                    >
                      &laquo;
                    </button>

                    {[...Array(totalPaginas)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => cambiarPagina(i + 1)}
                        className={`px-3 py-1 rounded ${
                          paginaActual === i + 1
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => cambiarPagina(paginaActual + 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      disabled={paginaActual === totalPaginas}
                    >
                      &raquo;
                    </button>
                  </div>
                </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}