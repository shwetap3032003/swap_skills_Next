"use client";

import { useState } from "react";

export default function ChatUI() {
  const [selectedChat, setSelectedChat] = useState(0);

  const chats = [
    {
      name: "Alex Rivera",
      message: "Saturday 10am works perf...",
      time: "10:11 AM",
      initials: "AR",
      color: "bg-red-400",
    },
    {
      name: "Maya Chen",
      message: "Absolutely! I'd love to lea...",
      time: "Yesterday",
      initials: "MC",
      color: "bg-blue-900",
    },
    {
      name: "Jordan Kim",
      message: "Start a conversation...",
      initials: "JK",
      color: "bg-purple-600",
    },
    {
      name: "Sam Torres",
      message: "Start a conversation...",
      initials: "ST",
      color: "bg-green-500",
    },
  ];

  const messages = [
    { from: "other", text: "Hey! Saw you want to learn guitar." },
    { from: "me", text: "That's great! I can teach React in exchange." },
    { from: "other", text: "Perfect deal! When are you free?" },
    { from: "me", text: "Saturday morning works!" },
    { from: "other", text: "10am works perfectly!" },
    { from: "other", text: "Hey! Saw you want to learn guitar." },
    { from: "me", text: "That's great! I can teach React in exchange." },
    { from: "other", text: "Perfect deal! When are you free?" },
    { from: "me", text: "Saturday morning works!" },
    { from: "other", text: "10am works perfectly!" },
  ];

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-gray-100">
      <div className="flex h-full">

        {/* Sidebar */}
        <div
          className={`
            ${selectedChat !== null ? "hidden md:flex" : "flex"}
            md:w-80 w-full bg-white border-r flex flex-col h-full
          `}
        >
          <div className="p-4 shrink-0">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-4 py-2 border rounded-lg outline-none"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat, i) => (
              <div
                key={i}
                onClick={() => setSelectedChat(i)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                  selectedChat === i ? "bg-gray-100" : ""
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${chat.color}`}>
                  {chat.initials}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{chat.name}</p>
                    <span className="text-xs text-gray-400">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{chat.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div
          className={`
            ${selectedChat === null ? "hidden md:flex" : "flex"}
            flex-1 flex-col h-full
          `}
        >
          {/* Header (fixed) */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedChat(null)}
                className="md:hidden"
              >
                ←
              </button>

              <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center">
                {chats[selectedChat]?.initials}
              </div>

              <div>
                <p className="text-sm font-medium">
                  {chats[selectedChat]?.name}
                </p>
                <p className="text-xs text-green-500">● Online</p>
              </div>
            </div>
          </div>

          {/* Messages (ONLY SCROLLABLE) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 text-sm rounded-2xl ${
                    msg.from === "me"
                      ? "bg-red-400 text-white rounded-br-none"
                      : "bg-white border text-gray-700 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input (fixed) */}
          <div className="p-3 bg-white border-t flex gap-2 shrink-0">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-full outline-none text-sm"
            />
            <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}