import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import $ from "jquery";
import "datatables.net/js/dataTables.min.mjs";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Index({ auth, courses, success }) {
    useEffect(() => {
        $(document).ready(function () {
            $("#coursesTable").DataTable();
        });
    }, []);

    const handleDelete = (course) => {
        if (window.confirm("are you sure you want to delete it?")) {
            router.delete(route("course.destroy", course.id));
        }
        return;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Courses
                    </h2>
                    <Link
                        href={route("course.create")}
                        className="bg-emerald-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        <FontAwesomeIcon icon={faPlus} /> Add New Course
                    </Link>
                </div>
            }
        >
            <Head title="Courses" />

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
                                    id="coursesTable"
                                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-2">ID</th>
                                            <th className="px-3 py-2">
                                                Course Name
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
                                        {courses.data.map((course) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={course.id}
                                            >
                                                <td className="px-3 py-3">
                                                    {course.id}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {course.course_name}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {course.created_at}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <Link
                                                        href={route(
                                                            "course.edit",
                                                            course.id
                                                        )}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPenToSquare}
                                                        />{" "}
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            handleDelete(course)
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
