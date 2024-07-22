import React, { useState, useEffect } from "react";
import axios from "axios";
import { Head } from "@inertiajs/react";
import Pusher from "pusher-js";

export default function Screen({
    cashier1,
    cashier2,
    cashier3,
    registrar1,
    registrar2,
    registrar3,
    assessment1,
    assessment2,
    assessment3,
}) {
    const [queues, setQueues] = useState({
        cashier1: cashier1?.queue_number ?? "••••",
        cashier2: cashier2?.queue_number ?? "••••",
        cashier3: cashier3?.queue_number ?? "••••",

        assessment1: assessment1?.queue_number ?? "••••",
        assessment2: assessment2?.queue_number ?? "••••",
        assessment3: assessment3?.queue_number ?? "••••",

        registrar1: registrar1?.queue_number ?? "••••",
        registrar2: registrar2?.queue_number ?? "••••",
        registrar3: registrar3?.queue_number ?? "••••",
    });

    const [modalMessages, setModalMessages] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        // Initialize Pusher
        Pusher.logToConsole = true;

        const pusher = new Pusher("25ae6a9430c3b57279c8", {
            cluster: "ap1",
        });

        const channel = pusher.subscribe("my-channel");
        channel.bind("que-event", (data) => {
            let newMessage = "";
            let queMessage = "";

            const messagePrefixes = {
                CS: "Cashier",
                RG: "Registrar",
                AS: "Assessment",
                AST: "Assessment",
                ASM: "Assessment",
            };

            for (const prefix in messagePrefixes) {
                if (data.message.startsWith(prefix)) {
                    if (prefix === "CS" || prefix === "RG") {
                        newMessage =
                            data.message +
                            ` Please proceed to ${messagePrefixes[prefix]} Window ${data.window_no}.`;
                    } else {
                        newMessage =
                            data.message +
                            ` Please proceed to ${messagePrefixes[prefix]} Window ${data.window_no}.`;
                    }
                    queMessage = data.message;
                    break;
                }
            }

            // Set que message and Que speak Data with window and station
            setModalMessages((prevMessages) => [
                ...prevMessages,
                {
                    message: queMessage,
                    speak: newMessage,
                    window: data.window_no,
                    station: messagePrefixes[data.message.slice(0, 2)],
                },
            ]);
            fetchData(); // Re-fetch data to update the UI
        });

        // Clean up the Pusher connection on component unmount
        return () => {
            pusher.unsubscribe("my-channel");
        };
    }, []);

    useEffect(() => {
        if (modalMessages.length > 0 && !isSpeaking) {
            const currentMessage = modalMessages[0];
            setIsSpeaking(true);
            speakData(currentMessage.speak);
        }
    }, [modalMessages, isSpeaking]);

    const fetchData = async () => {
        try {
            const response = await axios.get("/screen/latest-queues");
            setQueues({
                cashier1: response.data.cashier1?.queue_number ?? "••••",
                cashier2: response.data.cashier2?.queue_number ?? "••••",
                cashier3: response.data.cashier3?.queue_number ?? "••••",

                assessment1: response.data.assessment1?.queue_number ?? "••••",
                assessment2: response.data.assessment2?.queue_number ?? "••••",
                assessment3: response.data.assessment3?.queue_number ?? "••••",

                registrar1: response.data.registrar1?.queue_number ?? "••••",
                registrar2: response.data.registrar2?.queue_number ?? "••••",
                registrar3: response.data.registrar3?.queue_number ?? "••••",
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const speakData = (text) => {
        if ("speechSynthesis" in window) {
            const speech = new SpeechSynthesisUtterance(text);
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;

            speech.onend = () => {
                setIsSpeaking(false);
                setModalMessages((prevMessages) => prevMessages.slice(1));
            };

            speech.onerror = (event) => {
                console.error("Speech synthesis error:", event.error);
                setIsSpeaking(false);
                setModalMessages((prevMessages) => prevMessages.slice(1));
            };

            window.speechSynthesis.speak(speech);
        } else {
            console.error("Speech synthesis not supported.");
        }
    };

    const WindowDisplay = ({ windowTitle, queueNumber }) => (
        <div className="flex-1 ml-3">
            {queueNumber === "••••" ? (
                <>
                    <div className="bg-slate-100 text-2xl text-slate-900 p-4 font-bold rounded border-b-2 border-slate-500 text-center">
                        {windowTitle}
                    </div>

                    <div className="bg-slate-100 text-slate-900 text-7xl p-8 rounded text-center">
                        {queueNumber}
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-green-700 text-white text-2xl p-4 font-bold rounded border-b-2 text-center">
                        {windowTitle}
                    </div>
                    <div className="bg-green-700 text-white text-7xl p-8 rounded text-center">
                        {queueNumber}
                    </div>
                </>
            )}
        </div>
    );

    const QueueDisplay = ({ title, queueNumbers }) => (
        <div className="flex-1 mb-3 mx-8">
            <h2 className="text-3xl font-bold bg-gray-200 p-2 text-center">
                {title}
            </h2>
            <div className="flex mt-3">
                {queueNumbers.map((number, index) => (
                    <WindowDisplay
                        key={index}
                        windowTitle={`WINDOW ${index + 1}`}
                        queueNumber={number}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <>
            <Head title="Queue" />
            <div className="flex flex-col bg-gray-300 p-2">
                <div className="flex justify-center">
                    <QueueDisplay
                        title="CASHIER"
                        queueNumbers={[
                            queues.cashier1,
                            queues.cashier2,
                            queues.cashier3,
                        ]}
                    />
                </div>
                <div className="flex justify-center">
                    <QueueDisplay
                        title="ASSESSMENT"
                        queueNumbers={[
                            queues.assessment1,
                            queues.assessment2,
                            queues.assessment3,
                        ]}
                    />
                </div>
                <div className="flex justify-center">
                    <QueueDisplay
                        title="REGISTRAR"
                        queueNumbers={[
                            queues.registrar1,
                            queues.registrar2,
                            queues.registrar3,
                        ]}
                    />
                </div>
            </div>

            {modalMessages.length > 0 && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                    <div className="bg-white p-16 rounded-lg shadow-2xl text-center w-3/4 max-w-4xl">
                        <h1 className="text-9xl mb-8 text-blue-600 font-bold">
                            {modalMessages[0].message}
                        </h1>
                        <h2 className="text-5xl mb-4 text-green-600 font-bold">
                            Window {modalMessages[0].window}
                        </h2>
                        <h3 className="text-4xl text-red-600 font-bold">
                            {modalMessages[0].station}
                        </h3>
                    </div>
                </div>
            )}
        </>
    );
}
