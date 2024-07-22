import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Authenticatedlayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Create({ auth, user_types, window_list }) {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        user_type_id: "",
        window_id: "",
        window_num: "",
    });
    const [showAdditionalSelect, setShowAdditionalSelect] = useState(false);
    const [windowNum, setWindowNum] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("users.store"));
    };

    const handleUserTypeChange = (e) => {
        const value = e.target.value;
        setData("user_type_id", value);
        setShowAdditionalSelect(value === "2");
    };

    const handleWindowSelect = (e) => {
        const value = e.target.value;
        setData("window_id", value);
        setWindowNum(true);
    };

    return (
        <Authenticatedlayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create New User
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
                                        htmlFor="user_name"
                                        value="Name"
                                    />
                                    <TextInput
                                        id="user_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_email"
                                        value="Email"
                                    />
                                    <TextInput
                                        id="user_email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_password"
                                        value="Password"
                                    />
                                    <TextInput
                                        id="user_password"
                                        type="Password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_password_confirm"
                                        value="Confirm Password"
                                    />
                                    <TextInput
                                        id="user_password_confirm"
                                        type="Password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_type"
                                        value="Select User Type"
                                    />

                                    <SelectInput
                                        id="user_type"
                                        name="user_type_id"
                                        className="mt-1 block w-full"
                                        onChange={handleUserTypeChange}
                                    >
                                        <option value="" selected hidden>
                                            Select User Type
                                        </option>
                                        {user_types.map((ut) => (
                                            <option value={ut.id} key={ut.id}>
                                                {ut.name}
                                            </option>
                                        ))}
                                    </SelectInput>

                                    <InputError
                                        message={errors.user_type_id}
                                        className="mt-2"
                                    />
                                </div>

                                {showAdditionalSelect && (
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="window"
                                            value="Select Window"
                                        />
                                        <SelectInput
                                            id="window"
                                            name="window_id"
                                            className="mt-1 block w-full"
                                            onChange={handleWindowSelect}
                                        >
                                            <option value="" selected hidden>
                                                Select Window
                                            </option>
                                            {window_list.map((wl) => (
                                                <option
                                                    value={wl.id}
                                                    key={wl.id}
                                                >
                                                    {wl.window_name}
                                                </option>
                                            ))}
                                        </SelectInput>

                                        <InputError
                                            message={errors.window_id}
                                            className="mt-2"
                                        />
                                    </div>
                                )}
                                {windowNum && (
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="window_n"
                                            value="Select Window"
                                        />
                                        <SelectInput
                                            id="window_n"
                                            name="window_num"
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "window_num",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="" selected hidden>
                                                Select Window Number
                                            </option>
                                            <option value="1">Window 1</option>
                                            <option value="2">Window 2</option>
                                            <option value="3">Window 3</option>
                                        </SelectInput>

                                        <InputError
                                            message={errors.window_num}
                                            className="mt-2"
                                        />
                                    </div>
                                )}

                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("users.index")}
                                        className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                    >
                                        Cancel
                                    </Link>
                                    <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticatedlayout>
    );
}
