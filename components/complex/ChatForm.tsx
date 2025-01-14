"use client";

import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

function ChatForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleMessageSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/send-message", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    console.log(res);
    if (res.status !== 200) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: data.error,
      });
      setLoading(false);
      return;
    }

    setMessage("");
    toast({
      title: "Message sent!",
      description:
        "Your message has been successfully sent. Someone will contact you soon.",
    });
    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-4xl font-bold">Welcome to Chat</h2>

      <p className="my-4 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <form onSubmit={handleMessageSubmit}>
        <div className="my-6">
          <label htmlFor="message" className="text-slate-700 mb-2 inline-block">
            Message<span className="text-red-600">*</span>
          </label>
          <textarea
            className="w-full border resize-none p-2 rounded shadow"
            id="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            rows={7}
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 min-h-[52px] text-lg text-white rounded-lg flex items-center gap-2 justify-center"
        >
          {loading ? (
            <div className="loader" />
          ) : (
            <>
              <Send /> Send
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

export default ChatForm;
