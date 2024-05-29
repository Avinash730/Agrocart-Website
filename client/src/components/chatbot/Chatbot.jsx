// // import React, { useContext, useState } from "react";
// // import { FaPaperPlane, FaRobot } from "react-icons/fa";
// // import { MdClose, MdOutlineUndo } from "react-icons/md";
// // import { Context } from "./Context";
// // import SpeechRecognitionComponent from "../SpeechRecognitionComponent ";
// // import SpeechRecognition, {
// //   useSpeechRecognition,
// // } from "react-speech-recognition";
// // import { BiSolidMicrophone } from "react-icons/bi";

// // export default function Chatbot() {
// //   const {
// //     onSent,
// //     recentPrompt,
// //     showResult,
// //     loading,
// //     resultData,
// //     setResultData,
// //     setInput,
// //     input,
// //   } = useContext(Context);

// //   const [isOpen, setIsOpen] = useState(false);

// //   const toggleChatbot = () => {
// //     setIsOpen(!isOpen);
// //   };

// //   const clearResult = () => {
// //     setResultData(""); // Clear the result data
// //   };

// //   const [showNotification, setShowNotification] = useState(false);
// //   const [posts, setPosts] = useState([]);

// //   const {
// //     transcript,
// //     resetTranscript,
// //     listening,
// //     browserSupportsSpeechRecognition,
// //   } = useSpeechRecognition({
// //     language: "hi-IN", // Specify Hindi (India) language
// //   });

// //   const startListening = () => {
// //     if (browserSupportsSpeechRecognition) {
// //       setShowNotification(true);
// //       SpeechRecognition.startListening({ language: "hi-IN" });
// //     } else {
// //       console.error("Speech recognition is not supported by your browser.");
// //     }
// //   };

// //   const stopListening = () => {
// //     setShowNotification(false);
// //     SpeechRecognition.stopListening();
// //   };

// //   const handleListen = () => {
// //     if (!listening) {
// //       startListening();
// //     } else {
// //       stopListening();
// //     }
// //   };

// //   return (
// //     <div className="fixed bottom-4 right-5 z-50">
// //       {isOpen ? (
// //         <div className="bg-white rounded-md p-4 w-96 shadow-lg max-h-[30rem] overflow-y-auto">
// //           <div className="flex justify-between items-center mb-4">
// //             <h3 className="text-lg font-semibold text-emerald-500">
// //               ग्रीनी एआई
// //             </h3>
// //             <button onClick={toggleChatbot} className="text-gray-600">
// //               <MdClose />
// //             </button>
// //           </div>

// //           {!showResult ? (
// //             <div className="mb-4">
// //               <p className="text-sm text-gray-800">
// //                 आपकी कैसे सहायता कर सकता हूँ?
// //               </p>
// //             </div>
// //           ) : (
// //             <div className="mb-4">
// //               <p className="text-gray-800">{recentPrompt}</p>
// //             </div>
// //           )}

// //           <div className="mb-4">
// //             {loading ? (
// //               <div className="h-16 bg-emerald-50 animate-pulse"></div>
// //             ) : (
// //               <p
// //                 className="text-sm text-gray-800"
// //                 dangerouslySetInnerHTML={{ __html: resultData }}
// //               ></p>
// //             )}
// //           </div>

// //           <div className="flex items-center justify-between">
// //             <input
// //               className="flex-1 mr-2 py-1 px-3 border border-gray-300 rounded-md focus:outline-none"
// //               onChange={(e) => setInput(e.target.value)}
// //               value={input}
// //               type="text"
// //               placeholder="अपना प्रश्न यहां लिखें..."
// //             />
// //             <div className="">
// //               {showResult ? (
// //                 <div className="flex gap-1 items-center">
// // <button
// //   className=" text-sm bg-red-100 rounded-md p-1"
// //   onClick={clearResult}
// // >
// //   <MdOutlineUndo size={24} />
// // </button>
// //                   <button
// //                     className={`${
// //                       input
// //                         ? "bg-emerald-500 hover:bg-emerald-600"
// //                         : "bg-emerald-300 cursor-not-allowed"
// //                     } text-white p-2 rounded-md`}
// //                     disabled={!input}
// //                     onClick={() => onSent()}
// //                   >
// //                     <FaPaperPlane size={16} />
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <>
// // <button
// //   onClick={handleListen}
// //   className="hover:bg-gray-200 rounded-full p-2 "
// // >
// //   <BiSolidMicrophone size={24} />
// // </button>
// //                   <button
// //                     className={`${
// //                       input
// //                         ? "bg-emerald-500 hover:bg-emerald-600"
// //                         : "bg-emerald-300 cursor-not-allowed"
// //                     } text-white p-2 rounded-md`}
// //                     disabled={!input}
// //                     onClick={() => onSent()}
// //                   >
// //                     <FaPaperPlane size={16} />
// //                   </button>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       ) : (
// //         <div
// //           className="bg-emerald-500 rounded-full p-2 shadow-xl cursor-pointer"
// //           onClick={toggleChatbot}
// //         >
// //           <FaRobot className="text-white" size={25} />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useContext, useState } from "react";
// import { FaPaperPlane, FaRobot } from "react-icons/fa";
// import { MdClose, MdOutlineUndo } from "react-icons/md";
// import { Context } from "./Context";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import { BiSolidMicrophone } from "react-icons/bi";

// export default function Chatbot() {
//   const {
//     onSent,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     setResultData,
//     setInput,
//     input,
//   } = useContext(Context);

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleChatbot = () => {
//     setIsOpen(!isOpen);
//   };

//   const clearResult = () => {
//     setResultData("");
//   };

//   const { transcript, listening, browserSupportsSpeechRecognition } =
//     useSpeechRecognition({
//       language: "hi-IN",
//     });

//   const handleListen = () => {
//     if (browserSupportsSpeechRecognition) {
//       if (!listening) {
//         SpeechRecognition.startListening({ language: "hi-IN" });
//       } else {
//         SpeechRecognition.stopListening();
//       }
//     } else {
//       console.error("Speech recognition is not supported by your browser.");
//     }
//   };

//   const handleSend = () => {
//     if (listening) {
//       // If currently listening, set input to the transcript and stop listening
//       setInput(transcript); // Set input to the current transcript
//       onSent(); // Perform action on sending
//       SpeechRecognition.stopListening(); // Stop speech recognition
//     } else {
//       // If not listening, directly handle sending
//       onSent(); // Perform action on sending
//       // Add any additional logic here for handling the send action without resetting the transcript
//     }
//   };
  

//   return (
//     <div className="fixed bottom-4 right-5 z-50">
//       {isOpen ? (
//         <div className="bg-white rounded-md p-4 w-96 shadow-lg max-h-[30rem] overflow-y-auto">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold text-emerald-500">
//               ग्रीनी एआई
//             </h3>
//             <button onClick={toggleChatbot} className="text-gray-600">
//               <MdClose />
//             </button>
//           </div>

//           {!showResult ? (
//             <div className="mb-4">
//               <p className="text-sm text-gray-800">
//                 आपकी कैसे सहायता कर सकता हूँ?
//               </p>
//             </div>
//           ) : (
//             <div className="mb-4">
//               <p className="text-gray-800">{recentPrompt}</p>
//             </div>
//           )}

//           <div className="mb-4">
//             {loading ? (
//               <div className="h-16 bg-emerald-50 animate-pulse"></div>
//             ) : (
//               <p
//                 className="text-sm text-gray-800"
//                 dangerouslySetInnerHTML={{ __html: resultData }}
//               ></p>
//             )}
//           </div>

//           <div className="flex items-center justify-between">
//             <input
//               className="flex-1 mr-2 py-1 px-3 border border-gray-300 rounded-md focus:outline-none"
//               onChange={(e) => setInput(e.target.value)}
//               value={listening ? transcript : input}
//               type="text"
//               placeholder="अपना प्रश्न यहां लिखें..."
//             />
//             <div className="flex items-center">
//               {showResult ? (
//                 <>
//                   <button
//                     className=" text-sm bg-red-100 rounded-md p-1"
//                     onClick={clearResult}
//                   >
//                     <MdOutlineUndo size={24} />
//                   </button>
//                   <button
//                     onClick={handleListen}
//                     className={`bg-gray-200 rounded-md p-1.5 ml-2 ${
//                       listening ? "bg-red-200" : ""
//                     }`}
//                   >
//                     <BiSolidMicrophone size={20} />
//                   </button>
//                   <button
//                     className={`${
//                       input
//                         ? "bg-emerald-500 hover:bg-emerald-600"
//                         : "bg-emerald-300 cursor-not-allowed"
//                     } text-white p-2 rounded-md ml-2`}
//                     onClick={handleSend}
//                   >
//                     <FaPaperPlane size={16} />
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={handleListen}
//                     className={`bg-gray-200 rounded-md p-1.5 ml-2 ${
//                       listening ? "bg-red-200" : ""
//                     }`}
//                   >
//                     <BiSolidMicrophone size={20} />
//                   </button>
//                   <button
//                     className={`${
//                       input
//                         ? "bg-emerald-500 hover:bg-emerald-600"
//                         : "bg-emerald-300 cursor-not-allowed"
//                     } text-white p-2 rounded-md ml-2`}
//                     onClick={handleSend}
//                   >
//                     <FaPaperPlane size={16} />
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div
//           className="bg-emerald-500 rounded-full p-2 shadow-xl cursor-pointer"
//           onClick={toggleChatbot}
//         >
//           <FaRobot className="text-white" size={25} />
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useContext, useState } from "react";
import { FaPaperPlane, FaRobot } from "react-icons/fa";
import { MdClose, MdOutlineUndo } from "react-icons/md";
import { Context } from "./Context";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { BiSolidMicrophone } from "react-icons/bi";

export default function Chatbot() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setResultData,
    setInput,
    input,
  } = useContext(Context);

  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const clearResult = () => {
    setResultData("");
  };

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    language: "hi-IN",
  });

  const handleListen = () => {
    if (browserSupportsSpeechRecognition) {
      if (!listening) {
        SpeechRecognition.startListening({ language: "hi-IN" });
      } else {
        SpeechRecognition.stopListening();
      }
    } else {
      console.error("Speech recognition is not supported by your browser.");
    }
  };

  const handleSend = () => {
    if (listening) {
      // If currently listening, set input to the transcript and stop listening
      setInput(transcript); // Set input to the current transcript
      onSent(); // Perform action on sending
      SpeechRecognition.stopListening(); // Stop speech recognition
    } else {
      // If not listening, directly handle sending
      onSent(); // Perform action on sending
      // Add any additional logic here for handling the send action without modifying the input
    }

    // Logic for displaying the result, if applicable
    // setShowResult(true);
  };

  return (
    <div className="fixed bottom-4 right-5 z-50">
      {isOpen ? (
        <div className="bg-white rounded-md p-4 w-96 shadow-lg max-h-[30rem] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-emerald-500">
              ग्रीनी एआई
            </h3>
            <button onClick={toggleChatbot} className="text-gray-600">
              <MdClose />
            </button>
          </div>

          {!showResult ? (
            <div className="mb-4">
              <p className="text-sm text-gray-800">
                आपकी कैसे सहायता कर सकता हूँ?
              </p>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-gray-800">{recentPrompt}</p>
            </div>
          )}

          <div className="mb-4">
            {loading ? (
              <div className="h-16 bg-emerald-50 animate-pulse"></div>
            ) : (
              <p
                className="text-sm text-gray-800"
                dangerouslySetInnerHTML={{ __html: resultData }}
              ></p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <input
              className="flex-1 mr-2 py-1 px-3 border border-gray-300 rounded-md focus:outline-none"
              onChange={(e) => setInput(e.target.value)}
              value={listening ? transcript : input}
              type="text"
              placeholder="अपना प्रश्न यहां लिखें..."
            />
            <div className="flex items-center">
              <button
                className=" text-sm bg-red-100 rounded-md p-1"
                onClick={clearResult}
              >
                <MdOutlineUndo size={24} />
              </button>
              {/* <button
                onClick={handleListen}
                className={`hover:bg-gray-200 rounded-full p-2 ${
                  listening ? "bg-red-200" : ""
                }`}
              >
                <BiSolidMicrophone size={24} />
              </button> */}
              <button
                className={`${
                  input
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-emerald-300 cursor-not-allowed"
                } text-white p-2 rounded-md ml-2`}
                onClick={handleSend}
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="bg-emerald-500 rounded-full p-2 shadow-xl cursor-pointer"
          onClick={toggleChatbot}
        >
          <FaRobot className="text-white" size={25} />
        </div>
      )}
    </div>
  );
}
