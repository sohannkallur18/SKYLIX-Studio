import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import { processMessage, getWelcomeMessage } from './chatEngine';

const ChatWidget = () => {
    const {
        isOpen, closeChat, activeTab, setActiveTab, toggleChat,
        isTyping, setIsTyping, messages, addMessage, setMessages, saveSession
    } = useChat();

    const [input, setInput] = useState('');
    const [hasInitialized, setHasInitialized] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Send welcome message when first opened
    useEffect(() => {
        if (isOpen && !hasInitialized) {
            setHasInitialized(true);
            const welcome = getWelcomeMessage(activeTab);
            addMessage({
                text: welcome.text,
                sender: 'bot',
                quickReplies: welcome.quickReplies
            });
        }
    }, [isOpen, hasInitialized, activeTab, addMessage]);

    // Tab switch — reset conversation
    const handleTabSwitch = useCallback((tab) => {
        if (tab === activeTab) return;
        setActiveTab(tab);
        setMessages([]);
        setHasInitialized(false);
        setTimeout(() => {
            const welcome = getWelcomeMessage(tab);
            addMessage({
                text: welcome.text,
                sender: 'bot',
                quickReplies: welcome.quickReplies
            });
            setHasInitialized(true);
        }, 100);
    }, [activeTab, setActiveTab, setMessages, addMessage]);

    // Send user message and get bot response
    const sendMessage = useCallback((text) => {
        if (!text.trim()) return;

        // Add user message
        addMessage({ text: text.trim(), sender: 'user' });
        setInput('');

        // Simulate typing
        setIsTyping(true);

        const typingDelay = Math.min(600 + text.length * 15, 1800);

        setTimeout(() => {
            setIsTyping(false);
            const response = processMessage(text, activeTab);
            addMessage({
                text: response.text,
                sender: 'bot',
                quickReplies: response.quickReplies,
                link: response.link
            });
        }, typingDelay);
    }, [addMessage, setIsTyping, activeTab]);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleQuickReply = (reply) => {
        sendMessage(reply);
    };

    // ── Render helpers ────────────────────────────────────

    const renderMessageText = (text) => {
        // Simple markdown-like rendering: **bold** and links
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} style={{ color: '#fff', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
            }
            // Split on newlines
            return part.split('\n').map((line, j) => (
                <React.Fragment key={`${i}-${j}`}>
                    {j > 0 && <br />}
                    {line}
                </React.Fragment>
            ));
        });
    };

    return (
        <>
            {/* ── Launcher ──────────────────────── */}
            {!isOpen && (
                <button
                    className="chat-launcher"
                    onClick={toggleChat}
                    aria-label="Open chat assistant"
                    role="button"
                    tabIndex={0}
                >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                </button>
            )}

            {/* ── Chat Pane ─────────────────────── */}
            {isOpen && (
                <div className="chat-widget-pane" role="dialog" aria-label="Chat with SKYLIX assistant">

                    {/* Header */}
                    <div className="chat-header">
                        <div className="chat-header-left">
                            <div className="chat-avatar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                                    <path d="M19 13l.75 2.25L22 16l-2.25.75L19 19l-.75-2.25L16 16l2.25-.75L19 13z" />
                                </svg>
                            </div>
                            <div className="chat-header-info">
                                <span className="chat-header-name">SKYLIX AI</span>
                                <span className="chat-header-status">
                                    <span className="chat-status-dot"></span>
                                    Online — Ready to help
                                </span>
                            </div>
                        </div>
                        <button className="chat-close-btn" onClick={() => { saveSession(messages, activeTab); closeChat(); }} aria-label="Close chat" tabIndex={0}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="chat-tabs">
                        <button
                            className={`chat-tab${activeTab === 'support' ? ' active' : ''}`}
                            onClick={() => handleTabSwitch('support')}
                            aria-label="Support tab"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                            </svg>
                            Support
                        </button>
                        <button
                            className={`chat-tab${activeTab === 'sales' ? ' active' : ''}`}
                            onClick={() => handleTabSwitch('sales')}
                            aria-label="Sales tab"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                            Sales
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chat-messages" role="log" aria-live="polite">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message-wrapper ${msg.sender === 'user' ? 'me' : 'bot'}`}>
                                <div className={`chat-bubble ${msg.sender === 'user' ? 'me' : 'bot'}`}>
                                    {renderMessageText(msg.text)}

                                    {/* Inline link (e.g. Contact Page) */}
                                    {msg.link && (
                                        <Link
                                            to={msg.link.url}
                                            className="chat-inline-link"
                                            onClick={closeChat}
                                        >
                                            {msg.link.text}
                                        </Link>
                                    )}
                                </div>

                                {/* Quick Replies */}
                                {msg.sender === 'bot' && msg.quickReplies && msg.quickReplies.length > 0 && (
                                    <div className="chat-options">
                                        {msg.quickReplies.map((reply, i) => (
                                            reply === 'Go to Contact Page' ? (
                                                <Link
                                                    key={i}
                                                    to="/contact"
                                                    className="chat-option-btn chat-option-cta"
                                                    onClick={closeChat}
                                                >
                                                    📋 {reply}
                                                </Link>
                                            ) : (
                                                <button
                                                    key={i}
                                                    className="chat-option-btn"
                                                    onClick={() => handleQuickReply(reply)}
                                                >
                                                    {reply}
                                                </button>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="message-wrapper bot">
                                <div className="chat-bubble bot typing">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form className="chat-input-area" onSubmit={handleSubmit}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isTyping ? 'SKYLIX AI is typing...' : 'Type your message...'}
                            disabled={isTyping}
                            aria-label="Type your message"
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="send-btn"
                            disabled={!input.trim() || isTyping}
                            aria-label="Send message"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </form>

                    {/* Footer Branding */}
                    <div className="chat-footer-brand">
                        <span>Powered by SKYLIX AI</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWidget;
