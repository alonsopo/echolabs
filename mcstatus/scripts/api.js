// API module mejorado para manejar las consultas a servidores de Minecraft
class MinecraftAPI {
  constructor() {
    this.baseURL = "https://api.mcsrvstat.us/3/"
    this.timeout = 8000
    this.i18n = window.I18nManager
  }

  async getServerInfo(serverIP) {
    if (!serverIP || typeof serverIP !== "string") {
      throw new Error(this.i18n.get("invalidIP"))
    }

    const cleanIP = serverIP.trim()
    if (!this.isValidServerIP(cleanIP)) {
      throw new Error(this.i18n.get("invalidIP"))
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeout)

      const response = await fetch(`${this.baseURL}${encodeURIComponent(cleanIP)}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`)
      }

      const data = await response.json()
      return this.processServerData(data)
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error(this.i18n.get("timeout"))
      }
      throw new Error(`${this.i18n.get("connectionError")}: ${error.message}`)
    }
  }

  isValidServerIP(ip) {
    const ipRegex = /^[a-zA-Z0-9.-]+(:[0-9]+)?$/
    return ipRegex.test(ip) && ip.length > 0 && ip.length < 256
  }

  processServerData(rawData) {
    return {
      online: rawData.online || false,
      ip: rawData.ip || "N/A",
      port: rawData.port || 25565,
      hostname: rawData.hostname || "N/A",
      version: rawData.version || this.i18n.get("version"),
      protocol: rawData.protocol || "N/A",
      players: {
        online: rawData.players?.online || 0,
        max: rawData.players?.max || 0,
        list: rawData.players?.list || [],
      },
      motd: {
        raw: rawData.motd?.raw || [this.i18n.get("noDescription")],
        clean: rawData.motd?.clean || [this.i18n.get("noDescription")],
        html: rawData.motd?.html || [this.i18n.get("noDescription")],
      },
      icon: rawData.icon || null,
      software: rawData.software || null,
      map: rawData.map || null,
      gamemode: rawData.gamemode || null,
      serverid: rawData.serverid || null,
      eula_blocked: rawData.eula_blocked || false,
      retrieved_at: new Date().toISOString(),
      debug: rawData.debug || {},
    }
  }

  getServerStatus(online) {
    return {
      text: online ? this.i18n.get("online") : this.i18n.get("offline"),
      class: online ? "status-online" : "status-offline",
      icon: online ? "●" : "●",
    }
  }
}

window.MinecraftAPI = new MinecraftAPI()
