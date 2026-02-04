<<<<<<< HEAD
import { useEffect, useRef } from "react";
=======
import { useEffect, useRef, useState } from "react";
>>>>>>> 28ea21b (first commit)
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

<<<<<<< HEAD
=======
const REPORT_REASONS = [
  "Harassment",
  "Bullying",
  "Hate Speech",
  "Sexual Abuse",
  "Spam / Scam",
];

>>>>>>> 28ea21b (first commit)
function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
<<<<<<< HEAD
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {/* 👇 scroll target */}
=======

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [reportMessageId, setReportMessageId] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submitReport = () => {
    console.log({
      messageId: reportMessageId,
      reason: selectedReason,
    });

    setReportMessageId(null);
    setSelectedReason("");
    setReportSuccess(true);

    setTimeout(() => setReportSuccess(false), 3000);
  };

  return (
    <>
      <ChatHeader />

      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => {
              const isOwnMessage = msg.senderId === authUser._id;
              const isMenuOpen = openMenuId === msg._id;

              return (
                <div
                  key={msg._id}
                  className={`chat ${
                    isOwnMessage ? "chat-end" : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble relative ${
                      isOwnMessage
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {!isOwnMessage && (
                      <button
                        onClick={() =>
                          setOpenMenuId(isMenuOpen ? null : msg._id)
                        }
                        className="absolute top-2 right-2 text-slate-400 hover:text-white"
                      >
                        ⋮
                      </button>
                    )}

                    {!isOwnMessage && isMenuOpen && (
                      <div className="absolute top-8 right-2 z-40 w-28 rounded-md bg-slate-900 border border-slate-700 shadow-lg">
                        <button
                          onClick={() => {
                            setReportMessageId(msg._id);
                            setOpenMenuId(null);
                          }}
                          className="block w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-slate-800 rounded-md"
                        >
                          Report
                        </button>
                      </div>
                    )}

                    {msg.text && <p>{msg.text}</p>}

                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="rounded-lg h-48 object-cover mt-2"
                      />
                    )}

                    <p className="text-xs mt-1 opacity-60">
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}

>>>>>>> 28ea21b (first commit)
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
<<<<<<< HEAD
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
=======
          <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
>>>>>>> 28ea21b (first commit)
        )}
      </div>

      <MessageInput />
<<<<<<< HEAD
=======

      {/* REPORT MODAL */}
      {reportMessageId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-lg bg-slate-900 p-6 border border-slate-700">
            <h2 className="text-lg font-semibold mb-4">
              Report this message
            </h2>

            <div className="space-y-3">
              {REPORT_REASONS.map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="accent-red-500"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setReportMessageId(null);
                  setSelectedReason("");
                }}
                className="px-4 py-2 text-sm rounded-md bg-slate-700 hover:bg-slate-600"
              >
                Cancel
              </button>

              <button
                disabled={!selectedReason}
                onClick={submitReport}
                className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-700 disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS TOAST */}
      {reportSuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="px-4 py-2 rounded-md bg-green-600 text-white shadow-lg text-sm">
            Report submitted successfully
          </div>
        </div>
      )}
>>>>>>> 28ea21b (first commit)
    </>
  );
}

export default ChatContainer;
