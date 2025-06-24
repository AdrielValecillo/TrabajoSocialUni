"use client"

import type React from "react"
import { useState, useEffect } from "react"

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false) // Nuevo estado para expandir
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

  // Función para limpiar el texto de formato Markdown
  const cleanMarkdownText = (text: string): string => {
    return text
      // Eliminar negritas (**texto**)
      .replace(/\*\*(.*?)\*\*/g, '$1')
      // Eliminar cursivas (*texto*)
      .replace(/\*(.*?)\*/g, '$1')
      // Limpiar listas que empiezan con * 
      .replace(/^\* /gm, '• ')
      // Limpiar múltiples espacios
      .replace(/\s+/g, ' ')
      // Limpiar espacios al inicio y final
      .trim()
  }

  // Función para enviar mensaje al backend
  const sendMessageToBackend = async (userMessage: string) => {
    console.log("Enviando mensaje:", userMessage) // Debug
    
    try {
      setIsTyping(true)
      
      const response = await fetch('https://curious-aliza-adrielvalecillo-1573fc3b.koyeb.app/preguntar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pregunta: userMessage
        })
      })

      console.log("Respuesta recibida:", response) // Debug

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      const data = await response.json()
      console.log("Datos del backend:", data) // Debug
      
      // Obtener la respuesta y limpiarla
      const rawResponse = data.respuesta || data.response || data.mensaje || JSON.stringify(data)
      const cleanResponse = cleanMarkdownText(rawResponse)
      
      console.log("Respuesta original:", rawResponse) // Debug
      console.log("Respuesta limpia:", cleanResponse) // Debug
      
      // Añadir respuesta del bot a los mensajes
      setMessages((prev) => [
        ...prev,
        {
          text: cleanResponse,
          isUser: false,
        },
      ])
    } catch (error) {
      console.error('Error completo:', error)
      
      // Mostrar mensaje de error al usuario
      setMessages((prev) => [
        ...prev,
        {
          text: `Error: ${error instanceof Error ? error.message : 'Problema de conexión'}`,
          isUser: false,
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  // Efecto para guardar los mensajes en sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("chatbot-messages", JSON.stringify(messages))
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isTyping) return

    const userMessage = message.trim()
    
    // Añadir mensaje del usuario
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }])
    setMessage("")
    
    // Enviar mensaje al backend inmediatamente
    await sendMessageToBackend(userMessage)
  }

  // Función para alternar expansión
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
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

  // Nuevo icono para expandir
  const ExpandIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  )

  // Nuevo icono para contraer
  const ContractIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l6 6m0-6l-6 6m2-10V4m0 0H8m3 0l-3 3m8 8v1m0 0h3m-3 0l3-3M4 12H3m1 0l-3-3m3 3l-3 3" />
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
      <div 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        style={{ 
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col items-end">
          {/* Chat window con tamaño condicional */}
          <div
            className={`mb-4 rounded-lg bg-white shadow-2xl transition-all duration-300 ease-in-out ${
              isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"
            } ${
              // Tamaños condicionales - expandido solo en desktop
              isExpanded 
                ? "w-[500px] h-[600px] lg:w-[600px] lg:h-[700px]" // Expandido
                : "w-[320px] sm:w-[350px] max-w-[calc(100vw-2rem)]" // Normal
            }`}
            style={{ 
              transformOrigin: 'bottom right',
              position: 'relative',
              zIndex: 10
            }}
          >
            {/* Chat header con botón de expandir */}
            <div className="flex items-center justify-between rounded-t-lg bg-blue-600 p-4 text-white">
              <div className="flex items-center gap-2">
                <MessageIcon />
                <h3 className="font-medium">Chat de Ayuda</h3>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Botón de expandir - solo visible en desktop */}
                <button 
                  onClick={toggleExpanded}
                  className="hidden md:flex rounded-full p-1 hover:bg-blue-700 transition-colors"
                  type="button"
                  title={isExpanded ? "Contraer" : "Expandir"}
                >
                  {isExpanded ? <ContractIcon /> : <ExpandIcon />}
                </button>
                
                {/* Botón de cerrar */}
                <button 
                  onClick={() => {
                    setIsOpen(false)
                    setIsExpanded(false) // Reset expansión al cerrar
                  }} 
                  className="rounded-full p-1 hover:bg-blue-700 transition-colors"
                  type="button"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {/* Chat messages con altura condicional */}
            <div className={`overflow-y-auto p-4 ${
              isExpanded 
                ? "h-[480px] lg:h-[580px]" // Altura expandida
                : "h-[250px] sm:h-[300px]" // Altura normal
            }`}>
              <div className="flex flex-col gap-3">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      msg.isUser ? "ml-auto bg-blue-600 text-white" : "mr-auto bg-gray-100 text-gray-800"
                    }`}
                    style={{ 
                      whiteSpace: 'pre-wrap',
                      lineHeight: '1.4'
                    }}
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
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!message.trim() || isTyping}
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
            style={{ 
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 20
            }}
            type="button"
          >
            {isOpen ? <CloseIcon /> : <MessageIcon />}
          </button>
        </div>
      </div>
    </>
  )
}