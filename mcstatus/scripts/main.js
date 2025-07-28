// Aplicación principal mejorada con i18n
class MinecraftServerApp {
  constructor() {
    this.api = window.MinecraftAPI
    this.ui = window.UIManager
    this.i18n = window.I18nManager
    this.init()
  }

  init() {
    this.bindEvents()
    this.loadFromURL()
    this.ui.focusServerInput()
  }

  bindEvents() {
    // Form submission
    this.ui.elements.form.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleServerQuery()
    })

    // Input events
    this.ui.elements.input.addEventListener("input", () => {
      this.ui.hideError()
    })

    // Example servers
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("example-server")) {
        const serverIP = e.target.dataset.server
        this.ui.elements.input.value = serverIP
        this.handleServerQuery()
      }
    })

    // URL changes
    window.addEventListener("popstate", () => {
      this.loadFromURL()
    })
  }

  async handleServerQuery() {
    const serverIP = this.ui.getServerInput()

    if (!serverIP) {
      this.ui.showError(this.i18n.get("enterServer"))
      this.ui.focusServerInput()
      return
    }

    try {
      this.ui.showLoading()
      this.updateURL(serverIP)

      const serverData = await this.api.getServerInfo(serverIP)

      this.ui.hideLoading()
      this.ui.showResults(serverData)
    } catch (error) {
      this.ui.hideLoading()
      this.ui.showError(error.message)
      console.error("Error:", error)
    }
  }

  updateURL(serverIP) {
    const url = new URL(window.location)
    url.searchParams.set("server", serverIP)
    window.history.pushState({ server: serverIP }, "", url)
  }

  loadFromURL() {
    const urlParams = new URLSearchParams(window.location.search)
    const serverFromURL = urlParams.get("server")

    if (serverFromURL) {
      this.ui.elements.input.value = serverFromURL
      setTimeout(() => this.handleServerQuery(), 300)
    }
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  try {
    window.MinecraftServerApp = new MinecraftServerApp()
  } catch (error) {
    console.error("Error initializing app:", error)
  }
})
