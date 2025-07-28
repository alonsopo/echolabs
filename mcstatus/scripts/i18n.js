// Sistema de internacionalización (i18n)
class I18nManager {
  constructor() {
    this.currentLanguage = localStorage.getItem("language") || "es"
    this.translations = {
      es: {
        title: "EchoStatus",
        subtitle: "Consulta información de servidores de Minecraft",
        inputPlaceholder: "hypixel.net",
        searchButton: "Consultar",
        tryWith: "Prueba con:",
        errorTitle: "No se pudo conectar",
        online: "En línea",
        offline: "Fuera de línea",
        players: "jugadores",
        serverDescription: "Descripción del Servidor",
        connectedPlayers: "Jugadores Conectados",
        serverInfo: "Información del Servidor",
        software: "Software",
        gamemode: "Modo de juego",
        map: "Mapa",
        protocol: "Protocolo",
        ip: "IP",
        port: "Puerto",
        lastQuery: "Última consulta",
        version: "Versión",
        noDescription: "Sin descripción",
        connectionError: "No se pudo conectar al servidor",
        invalidIP: "Formato de IP no válido",
        timeout: "Tiempo de espera agotado. El servidor puede estar offline.",
        enterServer: "Introduce la dirección de un servidor",
      },
      en: {
        title: "EchoStatus",
        subtitle: "Check Minecraft server information",
        inputPlaceholder: "hypixel.net",
        searchButton: "Query",
        tryWith: "Try with:",
        errorTitle: "Could not connect",
        online: "Online",
        offline: "Offline",
        players: "players",
        serverDescription: "Server Description",
        connectedPlayers: "Connected Players",
        serverInfo: "Server Information",
        software: "Software",
        gamemode: "Gamemode",
        map: "Map",
        protocol: "Protocol",
        ip: "IP",
        port: "Port",
        lastQuery: "Last query",
        version: "Version",
        noDescription: "No description",
        connectionError: "Could not connect to server",
        invalidIP: "Invalid IP format",
        timeout: "Request timeout. Server may be offline.",
        enterServer: "Enter a server address",
      },
    }

    this.init()
  }

  init() {
    this.updateLanguageButton()
    this.translatePage()
    this.bindEvents()
  }

  bindEvents() {
    const languageToggle = document.getElementById("languageToggle")
    if (languageToggle) {
      languageToggle.addEventListener("click", () => {
        this.toggleLanguage()
      })
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === "es" ? "en" : "es"
    localStorage.setItem("language", this.currentLanguage)
    this.updateLanguageButton()
    this.translatePage()

    // Actualizar el lang del HTML
    document.documentElement.lang = this.currentLanguage
  }

  updateLanguageButton() {
    const languageToggle = document.getElementById("languageToggle")
    const flag = languageToggle.querySelector(".flag")
    const langText = languageToggle.querySelector(".lang-text")

    if (this.currentLanguage === "es") {
      flag.textContent = "🇪🇸"
      langText.textContent = "ES"
      languageToggle.title = "Cambiar a inglés"
    } else {
      flag.textContent = "🇺🇸"
      langText.textContent = "EN"
      languageToggle.title = "Switch to Spanish"
    }
  }

  translatePage() {
    // Traducir elementos con data-i18n
    const elements = document.querySelectorAll("[data-i18n]")
    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n")
      const translation = this.get(key)
      if (translation) {
        element.textContent = translation
      }
    })

    // Traducir placeholders
    const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]")
    placeholderElements.forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder")
      const translation = this.get(key)
      if (translation) {
        element.placeholder = translation
      }
    })
  }

  get(key) {
    return this.translations[this.currentLanguage]?.[key] || key
  }

  getCurrentLanguage() {
    return this.currentLanguage
  }

  // Método para formatear números según el idioma
  formatNumber(number) {
    return new Intl.NumberFormat(this.currentLanguage === "es" ? "es-ES" : "en-US").format(number)
  }

  // Método para formatear fechas según el idioma
  formatTime(date) {
    return new Intl.DateTimeFormat(this.currentLanguage === "es" ? "es-ES" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }
}

// Instancia global
window.I18nManager = new I18nManager()
