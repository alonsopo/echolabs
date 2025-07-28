// UI Manager mejorado con banner MOTD estilo Minecraft e i18n
class UIManager {
  constructor() {
    this.elements = {
      form: document.getElementById("serverForm"),
      input: document.getElementById("serverInput"),
      searchBtn: document.getElementById("searchBtn"),
      btnText: document.querySelector(".btn-text"),
      btnLoading: document.querySelector(".btn-loading"),
      resultsSection: document.getElementById("resultsSection"),
      errorSection: document.getElementById("errorSection"),
      serverOverview: document.getElementById("serverOverview"),
      serverDetails: document.getElementById("serverDetails"),
      errorMessage: document.getElementById("errorMessage"),
    }

    this.isLoading = false
    this.colorParser = window.MinecraftColorParser
    this.i18n = window.I18nManager
  }

  showLoading() {
    this.isLoading = true
    this.elements.searchBtn.disabled = true
    this.hideResults()
    this.hideError()
  }

  hideLoading() {
    this.isLoading = false
    this.elements.searchBtn.disabled = false
  }

  showResults(serverData) {
    this.hideError()
    this.renderServerOverview(serverData)
    this.renderServerDetails(serverData)
    this.elements.resultsSection.style.display = "block"

    setTimeout(() => {
      this.elements.resultsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  hideResults() {
    this.elements.resultsSection.style.display = "none"
  }

  showError(message) {
    this.hideResults()
    this.elements.errorMessage.textContent = message
    this.elements.errorSection.style.display = "block"

    setTimeout(() => {
      this.elements.errorSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  hideError() {
    this.elements.errorSection.style.display = "none"
  }

  renderServerOverview(data) {
    const status = window.MinecraftAPI.getServerStatus(data.online)
    const address = data.port === 25565 ? data.hostname : `${data.hostname}:${data.port}`

    this.elements.serverOverview.innerHTML = `
            ${data.icon ? `<img src="${data.icon}" alt="Server Icon" class="server-icon">` : ""}
            
            <div class="server-status ${status.class}">
                <span>${status.icon}</span>
                <span>${status.text}</span>
            </div>
            
            <div class="server-address">${this.escapeHTML(address)}</div>
            <div class="server-version">${this.escapeHTML(data.version)}</div>
            
            <div class="players-info">
                <div class="players-count">
                    <span>👥</span>
                    <span class="players-number">${this.i18n.formatNumber(data.players.online)}</span>
                    <span>/</span>
                    <span class="players-number">${this.i18n.formatNumber(data.players.max)}</span>
                    <span>${this.i18n.get("players")}</span>
                </div>
            </div>
        `
  }

  renderServerDetails(data) {
    const cards = []

    // MOTD Banner Card - Ancho completo y prominente
    if (data.motd.raw && data.motd.raw.length > 0) {
      const motdHTML = this.colorParser.parseMOTD(data.motd.raw)
      cards.push(`
                <div class="detail-card motd-card">
                    <div class="card-header">
                        <span class="card-icon">💬</span>
                        <h3 class="card-title">${this.i18n.get("serverDescription")}</h3>
                    </div>
                    <div class="card-content">
                        <div class="motd-banner">
                            <div class="motd-container">
                                ${motdHTML}
                            </div>
                        </div>
                    </div>
                </div>
            `)
    }

    // Players Card
    if (data.players.list && data.players.list.length > 0) {
      const playersHTML = this.renderPlayersList(data.players.list)
      cards.push(`
                <div class="detail-card">
                    <div class="card-header">
                        <span class="card-icon">👥</span>
                        <h3 class="card-title">${this.i18n.get("connectedPlayers")}</h3>
                    </div>
                    <div class="card-content">
                        <div class="players-grid">
                            ${playersHTML}
                        </div>
                    </div>
                </div>
            `)
    }

    // Server Info Card
    const serverInfo = this.getServerInfoItems(data)
    if (serverInfo.length > 0) {
      cards.push(`
                <div class="detail-card">
                    <div class="card-header">
                        <span class="card-icon">⚙️</span>
                        <h3 class="card-title">${this.i18n.get("serverInfo")}</h3>
                    </div>
                    <div class="card-content">
                        <div class="info-grid">
                            ${serverInfo.join("")}
                        </div>
                    </div>
                </div>
            `)
    }

    this.elements.serverDetails.innerHTML = cards.join("")
  }

  renderPlayersList(players) {
    return players
      .slice(0, 50)
      .map((player) => {
        const name = player.name || player
        return `<div class="player-item">${this.escapeHTML(name)}</div>`
      })
      .join("")
  }

  getServerInfoItems(data) {
    const items = []

    if (data.software) {
      items.push(`
                <div class="info-item">
                    <span class="info-label">${this.i18n.get("software")}</span>
                    <span class="info-value">${this.escapeHTML(data.software)}</span>
                </div>
            `)
    }

    if (data.version) {
      items.push(`
                <div class="info-item">
                    <span class="info-label">${this.i18n.get("version")}</span>
                    <span class="info-value">${this.escapeHTML(data.version)}</span>
                </div>
            `)
    }

    if (data.gamemode) {
      items.push(`
                <div class="info-item">
                    <span class="info-label">${this.i18n.get("gamemode")}</span>
                    <span class="info-value">${this.escapeHTML(data.gamemode)}</span>
                </div>
            `)
    }

    if (data.map) {
      items.push(`
                <div class="info-item">
                    <span class="info-label">${this.i18n.get("map")}</span>
                    <span class="info-value">${this.escapeHTML(data.map)}</span>
                </div>
            `)
    }

    if (data.protocol !== "N/A") {
      items.push(`
                <div class="info-item">
                    <span class="info-label">${this.i18n.get("protocol")}</span>
                    <span class="info-value">${data.protocol}</span>
                </div>
            `)
    }

    if (data.ip !== data.hostname) {
      items.push(`
                <div class="info-item">
                    <span class="info-label">${this.i18n.get("ip")}</span>
                    <span class="info-value">${this.escapeHTML(data.ip)}</span>
                </div>
            `)
    }

    items.push(`
            <div class="info-item">
                <span class="info-label">${this.i18n.get("port")}</span>
                <span class="info-value">${data.port}</span>
            </div>
        `)

    items.push(`
            <div class="info-item">
                <span class="info-label">${this.i18n.get("lastQuery")}</span>
                <span class="info-value">${this.i18n.formatTime(new Date(data.retrieved_at))}</span>
            </div>
        `)

    return items
  }

  escapeHTML(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  getServerInput() {
    return this.elements.input.value.trim()
  }

  focusServerInput() {
    this.elements.input.focus()
  }
}

window.UIManager = new UIManager()
