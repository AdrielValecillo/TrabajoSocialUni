"use client"

import type React from "react"
import { useState, useEffect } from "react"

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(() => {
    // Leer historial de sessionStorage si existe
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("chatbot-messages")
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch {
          // Si hay error, usar mensaje por defecto
        }
      }
    }
    return [{ text: "¡Hola! ¿En qué puedo ayudarte hoy?", isUser: false }]
  })
  const [isTyping, setIsTyping] = useState(false)

  // Efecto para simular respuesta del bot
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.isUser) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Gracias por tu mensaje. Este es un componente de demostración. En el futuro, aquí se conectará un backend real.",
            isUser: false,
          },
        ])
        setIsTyping(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [messages])

  // Efecto para guardar los mensajes en sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("chatbot-messages", JSON.stringify(messages))
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setMessages((prev) => [...prev, { text: message, isUser: true }])
    setMessage("")
  }

  // Iconos SVG
  const MessageIcon = () => (
    <img src="/chat-bot.svg" alt="Chatbot" width={35} height={35} />
  )

  const CloseIcon = () => (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )

  const SendIcon = () => (
    <img src="/send.svg" alt="Send" width={20} height={20} className="svg-white" />
  )

  const LoaderIcon = () => (
    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )

  return (
    <>
      {/* Contenedor principal del chatbot */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-end" >
        {/* Chat window */}
        <div
          className={`mb-4 w-[320px] sm:w-[350px] max-w-[calc(100vw-2rem)] rounded-lg bg-white shadow-2xl transition-all duration-300 ease-in-out ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
          }`}
          style={{ zIndex: 999999 }}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between rounded-t-lg bg-blue-600 p-4 text-white">
            <div className="flex items-center gap-2">
              <MessageIcon />
              <h3 className="font-medium">Chat de Ayuda</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-1 hover:bg-blue-700 transition-colors">
              <CloseIcon />
            </button>
          </div>

          {/* Chat messages */}
          <div className="h-[250px] sm:h-[300px] overflow-y-auto p-4">
            <div className="flex flex-col gap-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] rounded-lg p-3 text-sm ${
                    msg.isUser ? "ml-auto bg-blue-600 text-white" : "mr-auto bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="mr-auto flex items-center gap-2 rounded-lg bg-gray-100 p-3 text-gray-800">
                  <LoaderIcon />
                  <span className="text-sm">Escribiendo...</span>
                </div>
              )}
            </div>
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </div>

        {/* Floating button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
            isOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
          style={{ zIndex: 999999 }}
        >
          {isOpen ? <CloseIcon /> : <MessageIcon />}
        </button>
      </div>
    </>
  )
}
