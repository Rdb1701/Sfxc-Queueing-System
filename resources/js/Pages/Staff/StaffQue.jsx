import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function StaffQue({ auth, que_number, que_no }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [serve, setServe] = useState(false);

    const queueNow = () => {
        router.put(route("staff.update", auth.user.window_id, auth.user.window_num));

        setServe(!serve);
    };

    const regReque = (window_id, queue_number) => {
        // router.post(route("staff.requeue",window_id, queue_number))
    };

    const assReque = (window_id, queue_number) => {
        // router.post(route("staff.requeue",window_id, queue_number))
    };

    const cashierReque = (window_id, queue_number) => {
        // router.post(route("staff.requeue",window_id, queue_number))
    };

    const getDropdownItems = () => {
        switch (auth.user.window_id) {
            case 1:
                return (
                    <>
                        <Link
                            href="#"
                            className="text-gray-300 block px-4 py-2 text-lg hover:bg-gray-700 hover:text-white"
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() => regReque(3, que_number.queue_number)}
                        >
                            Registrar
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-300 block px-4 py-2 text-lg hover:bg-gray-700 hover:text-white"
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() => assReque(2, que_number.queue_number)}
                        >
                            Assessment
                        </Link>
                    </>
                );
            case 2:
                return (
                    <>
                        <Link
                            href="#"
                            className="text-gray-300 block px-4 py-2 text-lg hover:bg-gray-700 hover:text-white"
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() =>
                                cashierReque(1, que_number.queue_number)
                            }
                        >
                            Cashier
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-300 block px-4 py-2 text-lg hover:bg-gray-700 hover:text-white"
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() => regReque(3, que_number.queue_number)}
                        >
                            Registrar
                        </Link>
                    </>
                );
            case 3:
                return (
                    <>
                        <Link
                            href="#"
                            className="text-gray-300 block px-4 py-2 text-lg hover:bg-gray-700 hover:text-white"
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() => assReque(2, que_number.queue_number)}
                        >
                            Assessment
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-300 block px-4 py-2 text-lg hover:bg-gray-700 hover:text-white"
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() =>
                                cashierReque(1, que_number.queue_number)
                            }
                        >
                            Cashier
                        </Link>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {auth.user.window_id === 1 ? "Cashier" : ""}
                        {auth.user.window_id === 2 ? "Assessment" : ""}
                        {auth.user.window_id === 3 ? "Registrar" : ""} Queue 

                        {auth.user.window_num === 1 ? " ( Window 1 )" : ""}
                        {auth.user.window_num === 2 ? " ( Window 2 )" : ""}
                        {auth.user.window_num === 3 ? " ( Window 3 )" : ""}
                    </h2>
                </div>
            }
        >
            <Head title="Queue" />

            <div className="content-wrapper bg-gray-900 min-h-screen p-8 text-white">
                <div className="content-header">
                    <div className="flex justify-center">
                        <div className="text-center">
                            <div className="flex items-center justify-center">
                                <button
                                    className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 text-xl"
                                    onClick={queueNow}
                                >
                                    Next Serve
                                </button>
                                <div className="relative inline-block text-left ml-6">
                                    {/* <button
                                        className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 text-xl"
                                        id="menu-button"
                                        aria-expanded="true"
                                        aria-haspopup="true"
                                        onClick={() =>
                                            setIsDropdownOpen(!isDropdownOpen)
                                        }
                                    >
                                        Requeue
                                    </button> */}
                                    {/* {isDropdownOpen && (
                                        <div
                                            className="dropdown-menu absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="menu-button"
                                            tabIndex="-1"
                                        >
                                            <div className="py-1" role="none">
                                                {getDropdownItems()}
                                            </div>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3 mx-8">
                            <div className="card bg-gray-800 shadow-md rounded-lg overflow-hidden">
                                <div className="card-header bg-green-600 text-white p-6">
                                    <h3 className="text-center text-2xl">
                                        <b>Now Serving</b>
                                    </h3>
                                </div>
                                <div className="card-body p-6">
                                    <h4 className="text-center">
                                        <h1
                                            className="text-red-500 text-center text-8xl"
                                            id="que_name"
                                        >
                                            {que_number ? (
                                                <ul>
                                                    <li key={que_number.id}>
                                                        {
                                                            que_number.queue_number
                                                        }
                                                    </li>
                                                </ul>
                                            ) : (
                                                <p>Click Next Serve</p>
                                            )}
                                        </h1>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
