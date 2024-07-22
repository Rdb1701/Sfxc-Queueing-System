import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPenToSquare,
    faPlus,
    faKey,
} from "@fortawesome/free-solid-svg-icons";

export default function Que({ auth, ques }) {

    const handleDelete = (que) => {
        if (window.confirm("are you sure you want to delete it?")) {
            router.delete(route("que.destroy", que.id));
        }
        return;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Queue
                    </h2>
                </div>
            }
        >
            <Head title="Ques" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )} */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto overflow-y-auto">
                                <table
                                    id="coursesTable"
                                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-2">
                                                Window
                                            </th>
                                            <th className="px-3 py-2">
                                                No. of Ques
                                            </th>
                                            <th className="px-3 py-2">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ques.map((que) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={que.id}
                                            >
                                                <td className="px-3 py-3">
                                                    {que.win_name}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {que.que_count}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <button
                                                        onClick={(e) =>
                                                            handleDelete(que)
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
                                {/* <Pagination links={courses.meta.links} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
