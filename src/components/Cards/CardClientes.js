import React from "react";

export default function CardClientes({
    prospecto,
    cotizacion,
    notas,
    fecha_autorizada
}) {
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div className="px-6 pb-4">
                    <div className="text-center mt-2">
                        <h3 className="text-xl font-semibold leading-normal text-blueGray-700">
                            {prospecto}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                            {cotizacion}
                        </div>
                        <div className="mb-0 text-blueGray-600 mt-5">
                            {notas}
                        </div>
                        <div className="mb-0 text-blueGray-600">
                            Autorizado el {new Date(fecha_autorizada).toLocaleDateString("es-MX")}
                        </div>
                    </div>
                    {/* botones */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            className=" text-white rounded hover:bg-blue-600 "
                            style={{ padding: '5px 10px', fontSize: '13px', backgroundColor: '#1AB7EA' }}
                        >
                            Editar
                        </button>
                        <button
                            className=" text-white rounded hover:bg-blue-600 "
                            style={{ padding: '5px 10px', fontSize: '13px', backgroundColor: '#BD081C' }}
                        >
                            Eliminar
                        </button>
                        <button
                            className=" text-white rounded hover:bg-blue-600 "
                            style={{ padding: '5px 10px', fontSize: '13px', backgroundColor: '#3AAF85' }}
                        >
                            Archivar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}