import Authenticatedlayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPenToSquare,
    faPlus,
    faKey,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import $ from "jquery";
import "datatables.net/js/dataTables.min.mjs";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

export default function User({ auth, users, success }) {
    useEffect(() => {
        $(document).ready(function () {
            $("#userTable").DataTable();
        });
    }, []);

    const handleDelete = (user) => {
        if (window.confirm("are you sure you want to delete it?")) {
            router.delete(route("users.destroy", user.id));
        }
        return;
    };

    return (
        <Authenticatedlayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Users
                    </h2>
                    <Link
                        href={route("users.create")}
                        className="bg-emerald-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        <FontAwesomeIcon icon={faPlus} /> Add New User
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto overflow-y-auto">
                                <table
                                    id="userTable"
                                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-2">ID</th>
                                            <th className="px-3 py-2">Name</th>
                                            <th className="px-3 py-2">Email</th>
                                            <th className="px-3 py-2">
                                                User Type
                                            </th>
                                            <th className="px-3 py-2">
                                                Window Type
                                            </th>
                                            <th className="px-3 py-2">
                                                Window Number
                                            </th>
                                            <th className="px-3 py-2">
                                                Created At
                                            </th>
                                            <th className="px-3 py-2">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.map((user) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={user.id}
                                            >
                                                <td className="px-3 py-3">
                                                    {user.id}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {user.name}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {user.email}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {user.user_type_name}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {user.win_name}
                                                </td>
                                                <td className="px-3 py-3">
                                                 {user.window_num ? "Window " + user.window_num : ""}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {user.created_at}
                                                </td>
                                                <td className="px-3 py-3 flex">
                                                    <Link
                                                        href={route(
                                                            "users.edit",
                                                            user.id
                                                        )}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPenToSquare}
                                                        />{" "}
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "users.changepassword_view",
                                                            user.id
                                                        )}
                                                        className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline mx-1"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faKey}
                                                        />{" "}
                                                        Change Password
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            handleDelete(user)
                                                        }
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />{" "}
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticatedlayout>
    );
}
