import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import "../../css/Queview.css";

export default function QueView({ queue_number }) {
    const [showModal, setShowModal] = useState(false);
    const [currentStation, setCurrentStation] = useState(null);
    const [selectedWindow, setSelectedWindow] = useState(null);

    const openModal = (station) => {
        setCurrentStation(station);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentStation(null);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleButtonClick = (window_id) => {
        setSelectedWindow(window_id);
    };

    const handleMenuClick = (window_id, window_number) => {
        router.post(route("transac.store", { window_id, window_number }));
        openModal(window_id);
    };

    return (
        <>
            <Head title="Queueing" />
            <div className="content-header flex justify-center mt-8">
                <div className="card shadow-lg mb-8 w-full max-w-md border-b-4 border-primary p-8">
                    <div className="relative mb-4">
                        <button
                            className="btn bg-green-500 hover:bg-green-600 text-white py-12 text-5xl w-full relative"
                            onClick={() => handleMenuClick(3, 0)}
                        >
                            REGISTRAR
                        </button>
                    </div>
                    <div className="relative mb-4">
                        <button
                            className="btn bg-red-500 hover:bg-red-600 text-white py-12 text-5xl w-full relative"
                            onClick={() => handleMenuClick(1, 0)}
                        >
                            CASHIER
                        </button>
                    </div>
                    <div className="relative mb-4">
                        <button
                            className="btn bg-yellow-500 hover:bg-yellow-600 text-white py-12 text-5xl w-full relative"
                            onClick={() => handleButtonClick("assessment")}
                        >
                            ASSESSMENT
                        </button>
                        {selectedWindow === "assessment" && (
                            <div className="floating-menu right-0 top-0">
                            <button
                                    className="btn bg-yellow-300 hover:bg-gray-400 text-black py-4 px-6 mb-4 rounded-lg w-full"
                                    onClick={() => handleMenuClick(2, 1)}
                                >
                                    Window 1
                                </button>
                                <button
                                    className="btn bg-yellow-300 hover:bg-gray-400 text-black py-4 px-6 mb-4 rounded-lg w-full"
                                    onClick={() => handleMenuClick(2, 2)}
                                >
                                    Window 2
                                </button>
                                <button
                                    className="btn bg-yellow-300 hover:bg-gray-400 text-black py-4 px-6 rounded-lg w-full"
                                    onClick={() => handleMenuClick(2, 3)}
                                >
                                    Window 3
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="modal-container w-full max-w-4xl mx-auto p-8">
                        <div className="modal-content bg-white shadow-lg rounded-lg p-6">
                            <div className="modal-header flex justify-between items-center border-b pb-4">
                                <h3 className="text-lg font-semibold">
                                    {currentStation} - Queueing Number
                                </h3>
                                <div className="flex">
                                    <button
                                        className="text-slate-50 hover:text-gray-900 mr-2 p-3 pr-4 pl-4 bg-red-600 rounded-sm"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="hover:text-gray-900 bg-lime-600 p-3 pr-4 pl-4 rounded-sm text-slate-50"
                                        onClick={handlePrint}
                                    >
                                        <FontAwesomeIcon icon={faPrint} /> Print
                                    </button>
                                </div>
                            </div>
                            <div className="modal-body pt-4 que_n">
                                <h1
                                    style={{
                                        fontSize: "7rem",
                                        textAlign: "center",
                                    }}
                                >
                                    {queue_number}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
