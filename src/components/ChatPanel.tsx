import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, MicOff, MessageSquare, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your virtual colleague. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListeningPaused, setIsListeningPaused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      const newUserMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newUserMessage]);
      setInputValue('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "I understand. How else can I support you today?",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const enterVoiceMode = () => {
    setIsVoiceMode(true);
    setIsListening(false);
    setIsListeningPaused(true);
  };

  const exitVoiceMode = () => {
    setIsVoiceMode(false);
    setIsListening(false);
    setIsListeningPaused(false);
  };

  const toggleListeningInVoiceMode = () => {
    setIsListeningPaused(!isListeningPaused);
    setIsListening(!isListeningPaused);
  };

  const simulateVoiceRecognition = () => {
    if (isListening && !isListeningPaused) {
      // Simulate speech recognition
      setTimeout(() => {
        const userMessage = "I need help with my vacation balance.";
        addMessage(userMessage, 'user');
        
        setTimeout(() => {
          const botResponse = "I can help with that. Your current vacation balance is 15 days.";
          addMessage(botResponse, 'bot');
          // No longer automatically exit voice mode
          setIsListening(false);
          setIsListeningPaused(true);
        }, 1500);
      }, 3000);
    }
  };

  // Start voice recognition simulation when listening state changes
  useEffect(() => {
    if (isListening && !isListeningPaused) {
      simulateVoiceRecognition();
    }
  }, [isListening, isListeningPaused]);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence mode="wait">
        {isVoiceMode ? (
          // Voice Interface Mode
          <motion.div 
            key="voice-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/90 flex flex-col items-center justify-center z-50"
          >
            <motion.div 
              className="w-32 h-32 sm:w-48 sm:h-48 rounded-full"
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: isListening && !isListeningPaused ? [1, 1.05, 1] : 1 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: isListening && !isListeningPaused ? Infinity : 0, 
                repeatType: "reverse" 
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden">
                <div 
                  className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600"
                  style={{
                    opacity: isListening && !isListeningPaused ? 1 : 0.6,
                  }}
                />
              </div>
            </motion.div>

            <div className="mt-8 text-center">
              <p className="text-white text-lg sm:text-xl mb-2">
                {isListening && !isListeningPaused 
                  ? "Listening..." 
                  : "Paused. Tap mic to resume."}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className={`w-16 h-16 rounded-full border-2 ${
                  isListeningPaused
                    ? 'border-gray-400 text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    : 'border-red-500 text-red-500 hover:text-red-400 hover:border-red-400'
                }`}
                onClick={toggleListeningInVoiceMode}
              >
                {isListeningPaused ? <Mic size={28} /> : <MicOff size={28} />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="w-16 h-16 rounded-full border-2 border-gray-400 text-gray-400 hover:text-gray-300 hover:border-gray-300"
                onClick={exitVoiceMode}
              >
                <X size={28} />
              </Button>
            </div>
          </motion.div>
        ) : (
          // Normal Chat Panel
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full w-full"
          >
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center">
                <MessageSquare className="mr-2 text-blue-600" size={isMobile ? 20 : 24} />
                Chat Session
              </h2>
            </div>

            {/* Messages Area */}
            <div 
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4"
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} rounded-full bg-gradient-blue shadow-glow-blue-sm hover:shadow-glow-blue mr-2 flex-shrink-0 flex items-center justify-center`}>
                      <MessageSquare size={isMobile ? 14 : 16} />
                    </div>
                  )}
                  <div
                    className={`${isMobile ? 'max-w-[90%] px-3 py-2 text-sm' : 'max-w-[85%] px-4 py-3'} rounded-lg break-words overflow-hidden ${
                      msg.sender === 'user'
                        ? 'bg-pink-600/30 text-pink-50 border border-pink-500/30'
                        : 'bg-[rgb(25,53,97)] text-blue-50 border border-blue-500/30'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && (
                    <div className={`${isMobile ? 'h-7 w-7' : 'h-9 w-9'} rounded-full bg-pink-800 ml-2 flex-shrink-0 flex items-center justify-center`}>
                      <span className="text-xs font-bold">You</span>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 border-t border-gray-800">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size={isMobile ? "icon-sm" : "icon"}
                  className="mr-2 text-pink-400 hover:text-pink-300 hover:bg-pink-500/20"
                  onClick={enterVoiceMode}
                >
                  <Mic size={isMobile ? 18 : 20} />
                </Button>
                
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800/50 border-gray-700 text-sm sm:text-base"
                />
                
                <Button
                  variant="ghost"
                  size={isMobile ? "icon-sm" : "icon"}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="ml-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 disabled:opacity-50"
                >
                  <Send size={isMobile ? 18 : 20} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatPanel;