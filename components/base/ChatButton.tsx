import { MessageCircleMore } from "lucide-react";
import React from "react";

function ChatButton() {
  return (
    <button className="w-16 aspect-square rounded-full grid place-items-center border shadow-md">
      <MessageCircleMore className="w-8 h-8" />
    </button>
  );
}

export default ChatButton;
