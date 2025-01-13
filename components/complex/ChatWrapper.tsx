import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ChatButton from "../base/ChatButton";
import ChatForm from "./ChatForm";

function ChatWrapper() {
  return (
    <div className="fixed bottom-8 right-6">
      <Popover>
        <PopoverTrigger asChild>
          <ChatButton />
        </PopoverTrigger>
        <PopoverContent className="mr-4 w-[460px] mb-4 py-8 px-6 ">
          <ChatForm />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ChatWrapper;
