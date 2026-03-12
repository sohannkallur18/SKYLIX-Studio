import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ChatContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || '';

export const useChat = () => {
    return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('support');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([]);
    const sessionRef = useRef(Date.now().toString(36));

    const openChat = useCallback((tab = 'support') => {
        setActiveTab(tab);
        setIsOpen(true);
    }, []);

    const closeChat = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleChat = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const addMessage = useCallback((msg) => {
        setMessages(prev => [...prev, {
            id: Date.now() + Math.random(),
            timestamp: new Date(),
            ...msg
        }]);
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([]);
        sessionRef.current = Date.now().toString(36);
    }, []);

    // Save chat session to backend (fire-and-forget)
    const saveSession = useCallback(async (currentMessages, currentTab) => {
        const msgs = currentMessages || [];
        if (msgs.length === 0) return;

        try {
            await fetch(`${API_URL}/api/chatbot/session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: sessionRef.current,
                    messages: msgs.map(m => ({
                        sender: m.sender,
                        text: m.text,
                        timestamp: m.timestamp
                    })),
                    activeTab: currentTab || 'support'
                })
            });
        } catch (err) {
            console.error('[CHAT] Failed to save session:', err.message);
        }
    }, []);

    const value = {
        isOpen,
        activeTab,
        isTyping,
        messages,
        sessionId: sessionRef.current,
        openChat,
        closeChat,
        toggleChat,
        setActiveTab,
        setIsTyping,
        addMessage,
        clearMessages,
        setMessages,
        saveSession
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};
