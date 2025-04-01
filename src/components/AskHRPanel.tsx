import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, PlusCircle, Bot, Lightbulb } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const AskHRPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your HR assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const { toast } = useToast();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const suggestedQuestions = [
    {
      id: 1,
      question: "How many leaves more can I take?",
    },
    {
      id: 2,
      question: "How much reward points do I have?",
    },
    {
      id: 3,
      question: "My Working Hour Tracker.",
    },
    {
      id: 4,
      question: "Is participating in opensource worth it?",
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSuggestedQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      if (apiKey) {
        // Call Perplexity API
        const response = await fetchPerplexityResponse(text);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Simulate bot response with predefined answers
        setTimeout(() => {
          let responseText = "I'll look into that for you.";

          if (text.toLowerCase().includes("leave")) {
            responseText = "You have 15 days of leave remaining for this year.";
          } else if (
            text.toLowerCase().includes("reward") ||
            text.toLowerCase().includes("point")
          ) {
            responseText =
              "You currently have 2500 reward points. You can redeem them in the rewards portal.";
          } else if (
            text.toLowerCase().includes("working hour") ||
            text.toLowerCase().includes("tracker")
          ) {
            responseText =
              "Your working hours for this month: 142/160. You're on track!";
          } else if (text.toLowerCase().includes("opensource")) {
            responseText =
              "Yes! Contributing to open source projects is valuable for skill development and can increase your visibility within Deloitte's innovation community.";
          }

          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: responseText,
            sender: "bot",
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, botMessage]);
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const fetchPerplexityResponse = async (message: string): Promise<string> => {
    try {
      const response = await fetch(
        "https://api.perplexity.ai/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-sonar-small-128k-online",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful HR assistant at Deloitte. Be professional, concise, and helpful. Focus on employee benefits, company policies, and workplace wellbeing.",
              },
              {
                role: "user",
                content: message,
              },
            ],
            temperature: 0.2,
            max_tokens: 500,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setIsLoading(false);
      return data.choices[0].message.content;
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching from Perplexity:", error);
      return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  const toggleApiKeyInput = () => {
    setShowApiKeyInput(!showApiKeyInput);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full "
    >
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center">
            <Bot className="mr-2 text-green-600" size={24} />
            AskHR
          </h2>
        </div>

        {showApiKeyInput && (
          <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
            <p className="text-xs text-gray-400 mb-2">
              Enter your Perplexity API key for more intelligent responses:
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Perplexity API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="text-sm bg-gray-900"
              />
              <Button
                size="sm"
                onClick={() => {
                  toast({
                    title: apiKey ? "API Key Saved" : "API Key Removed",
                    description: apiKey
                      ? "Your Perplexity API key has been saved for this session."
                      : "API key has been removed.",
                  });
                  setShowApiKeyInput(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: "calc(100vh - 240px)" }}
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <div className="h-8 w-8 rounded-full bg-green-700 flex items-center justify-center mr-2 flex-shrink-0">
                <Bot size={16} />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-lg px-4 py-3 break-words overflow-hidden ${
                msg.sender === "user"
                  ? "bg-[rgb(25,53,97)] text-blue-50 border border-blue-500/30"
                  : "bg-[rgb(20,54,46)] text-gray-100 border border-[rgb(38,104,70)]"
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && (
              <div className="h-9 w-9 rounded-full bg-gradient-blue shadow-glow-blue-sm hover:shadow-glow-blue  ml-2 flex-shrink-0 flex items-center justify-center">
                <span className="text-xs font-bold">You</span>
              </div>
            )}
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center mr-2 flex-shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-gray-800 text-gray-100 rounded-lg px-4 py-2 border border-gray-700">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {messages.length <= 2 && (
        <div className="px-4 pb-4">
          <div className="mb-2 flex items-center">
            <Lightbulb size={16} className="text-yellow-400 mr-2" />
            <span className="text-sm text-gray-400">Suggested questions:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQuestions.map((q) => (
              <motion.div
                key={q.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * q.id }}
                className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
                onClick={() => handleSuggestedQuestionClick(q.question)}
              >
                {q.question}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
            className="flex-1 bg-gray-800/50 border-gray-700"
            disabled={isLoading}
          />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isLoading}
            className="ml-2 text-gray-400 hover:text-white disabled:opacity-50"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AskHRPanel;