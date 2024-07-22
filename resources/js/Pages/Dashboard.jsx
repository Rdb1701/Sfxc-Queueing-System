import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Dashboard({ auth }) {
    const [counts, setCounts] = useState({
        cashier: 0,
        assessment: 0,
        registrar: 0,
    });

    useEffect(() => {
        axios
            .get("/dashboard/queue-counts")
            .then((response) => {
                setCounts(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the counts!", error);
            });
    }, []);
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="content-wrapper py-12">
                <div className="content-header max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-wrap -mx-2 mt-6">
                                <div className="w-full md:w-1/3 px-2 mb-4">
                                    <div className="border-l-4 border-blue-500 shadow h-full py-2">
                                        <div className="p-4">
                                            <div className="flex items-center">
                                                <div className="flex-1">
                                                    <div className="text-xs font-bold text-green-500 uppercase mb-1">
                                                        No. of Cashier Ques
                                                    </div>
                                                    <div className="text-xl font-bold text-white-800">
                                                        {counts.cashier}{" "}
                                                        Record(s)
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <i className="fa fa-money-check text-3xl"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/3 px-2 mb-4">
                                    <div className="border-l-4 border-blue-500 shadow h-full py-2">
                                        <div className="p-4">
                                            <div className="flex items-center">
                                                <div className="flex-1">
                                                    <div className="text-xs font-bold text-red-500 uppercase mb-1">
                                                        No. of Assessment Ques
                                                    </div>
                                                    <div className="text-xl font-bold text-white-800">
                                                        {counts.assessment}{" "}
                                                        Record(s)
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <i className="fa fa-list text-3xl"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/3 px-2 mb-4">
                                    <div className="border-l-4 border-blue-500 shadow h-full py-2">
                                        <div className="p-4">
                                            <div className="flex items-center">
                                                <div className="flex-1">
                                                    <div className="text-xs font-bold text-green-500 uppercase mb-1">
                                                        No. of Registrar Ques
                                                    </div>
                                                    <div className="text-xl font-bold text-white-800">
                                                        {counts.registrar}{" "}
                                                        Record(s)
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <i className="fa fa-users text-3xl"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
