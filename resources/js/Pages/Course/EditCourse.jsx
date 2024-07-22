import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticatedlayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";


export default function EditCourse({ auth, course }) {
    const { data, setData, post, errors, reset } = useForm({
        course_name: course.data.course_name || "",
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    
        post(route("course.update", course.data.id));
      };
    
    return (
        <Authenticatedlayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit Course "{course.data.course_name}"
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                            onSubmit={handleSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                            >
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="course_desc"
                                        value="Course Name"
                                    />
                                    <TextInput
                                        id="course_desc"
                                        type="text"
                                        name="course_name"
                                        value={data.course_name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "course_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.course_name}
                                        className="mt-2"
                                    />
                                    <div className="mt-4 text-right">
                                        <Link
                                            href={route("course.index")}
                                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                        >
                                            Cancel
                                        </Link>
                                        <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticatedlayout>
    );
}
