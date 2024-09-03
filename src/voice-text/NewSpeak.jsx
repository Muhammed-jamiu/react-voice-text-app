import React, { useState } from "react";
import "./NewSpeak.css";
import { FaMicrophone } from "react-icons/fa6";
import { FaMicrophoneAltSlash } from "react-icons/fa";

function SpeechText() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [clearText, setClearText] = useState(false);

  let recognition = null;

  const startRecognition = () => {
    recognition = new window.webkitSpeechRecognition(); // For browsers that support webkitSpeechRecognition
    // recognition = new window.SpeechRecognition(); // For modern browsers supporting SpeechRecognition
    recognition.lang = "en-GB"; // Language for recognition (US English)
    recognition.interimResults = true; // Get interim results while speaking
    recognition.continuous = true; // Keep recognition active until stopped explicitly

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const { transcript } = result[0];
      setTranscript(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error detected:", event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setListening(false);
    };

    recognition.start();
    setListening(true);
  };

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
      recognition = null;
      setListening(false);
    }
  };

  return (
    <>
      <div className=" w-full flex justify-center items-center mt-[50px]  h-[full]">
        <div>
          <div className="h-full w-full flex justify-center flex-col items-center mt-[50px] ">
            <h1 className="text-2xl font-semibold ">
              Voice to Text (Voice Note)
            </h1>
            <div className="flex gap-[30px] mt-[20px]">
              <button
                className="action-btn bg-green-700 text-white relative hover:bg-green-600"
                onClick={startRecognition}
                disabled={listening}
              >
                <span className="absolute right-[125px] top-[3px] text-lg">
                  <FaMicrophone className={listening ? "animate-pulse" : ""} />
                </span>
                Start Listening
              </button>
              <button
                className="action-btn  bg-red-700 text-white relative hover:bg-red-600"
                onClick={stopRecognition}
                disabled={!listening}
              >
                <span className="absolute right-[125px] top-[3px] text-lg">
                  <FaMicrophoneAltSlash />
                </span>
                Stop Listening
              </button>
            </div>
            <div className="mt-[70px] ">
              <p>{transcript}</p>
            </div>
            <button
              className="border-2 w-[100px] rounded-lg bg-pink-700 text-white font-semibold tracking-wider absolute top-[260px] mt-[40px] hover:bg-pink-600"
              onClick={() => setTranscript(() => "")}
            >
              Clear Text
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpeechText;
