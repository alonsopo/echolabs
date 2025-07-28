// Minecraft color and formatting parser mejorado con soporte para &
class MinecraftColorParser {
  constructor() {
    this.colorCodes = {
      0: "#000000", // Black
      1: "#0000aa", // Dark Blue
      2: "#00aa00", // Dark Green
      3: "#00aaaa", // Dark Aqua
      4: "#aa0000", // Dark Red
      5: "#aa00aa", // Dark Purple
      6: "#ffaa00", // Gold
      7: "#aaaaaa", // Gray
      8: "#555555", // Dark Gray
      9: "#5555ff", // Blue
      a: "#55ff55", // Green
      b: "#55ffff", // Aqua
      c: "#ff5555", // Red
      d: "#ff55ff", // Light Purple
      e: "#ffff55", // Yellow
      f: "#ffffff", // White
    }

    this.formatCodes = {
      l: "font-weight: bold;", // Bold
      m: "text-decoration: line-through;", // Strikethrough
      n: "text-decoration: underline;", // Underline
      o: "font-style: italic;", // Italic
      k: "animation: obfuscated 0.1s infinite;", // Obfuscated
      r: "reset", // Reset
    }
  }

  /**
   * Parsea texto con códigos de color usando & (incluyendo hex) y devuelve HTML
   * @param {string} text - Texto con códigos de color
   * @returns {string} - HTML con colores aplicados
   */
  parseToHTML(text) {
    if (!text || typeof text !== "string") {
      return ""
    }

    let result = ""
    let currentStyles = []
    let i = 0

    while (i < text.length) {
      if (text[i] === "&" && i + 1 < text.length) {
        // Verificar si es un código hexadecimal (&x&R&R&G&G&B&B)
        if (text[i + 1] === "x" && i + 13 < text.length) {
          // Formato: &x&R&R&G&G&B&B (14 caracteres total)
          const hexPattern = text.substring(i, i + 14)
          if (this.isValidHexPattern(hexPattern)) {
            const hexColor = this.extractHexFromPattern(hexPattern)
            // Cerrar span anterior si existe
            if (currentStyles.length > 0) {
              result += "</span>"
            }
            // Aplicar color hexadecimal
            currentStyles = [`color: #${hexColor};`]
            result += `<span style="${currentStyles.join(" ")}">`
            i += 14 // Saltar &x&R&R&G&G&B&B
            continue
          }
        }

        // Verificar formato hexadecimal alternativo (&#RRGGBB)
        else if (text[i + 1] === "#" && i + 7 < text.length) {
          const hexColor = text.substring(i + 2, i + 8)
          if (this.isValidHex(hexColor)) {
            // Cerrar span anterior si existe
            if (currentStyles.length > 0) {
              result += "</span>"
            }
            // Aplicar color hexadecimal
            currentStyles = [`color: #${hexColor};`]
            result += `<span style="${currentStyles.join(" ")}">`
            i += 8 // Saltar &#RRGGBB
            continue
          }
        }

        const code = text[i + 1].toLowerCase()

        if (this.colorCodes[code]) {
          // Cerrar span anterior si existe
          if (currentStyles.length > 0) {
            result += "</span>"
          }
          // Aplicar color tradicional
          currentStyles = [`color: ${this.colorCodes[code]};`]
          result += `<span style="${currentStyles.join(" ")}">`
        } else if (this.formatCodes[code]) {
          if (code === "r") {
            // Reset - cerrar todos los spans
            if (currentStyles.length > 0) {
              result += "</span>"
              currentStyles = []
            }
          } else {
            // Agregar formato
            const formatStyle = this.formatCodes[code]
            if (!currentStyles.includes(formatStyle)) {
              currentStyles.push(formatStyle)
              if (currentStyles.length === 1) {
                result += `<span style="${currentStyles.join(" ")}">`
              } else {
                result += `</span><span style="${currentStyles.join(" ")}">`
              }
            }
          }
        } else {
          // Código no reconocido, agregar como texto normal
          result += text[i] + text[i + 1]
        }
        i += 2
      }
      // También mantener soporte para § por compatibilidad
      else if (text[i] === "§" && i + 1 < text.length) {
        // Verificar si es un código hexadecimal (§#RRGGBB)
        if (text[i + 1] === "#" && i + 7 < text.length) {
          const hexColor = text.substring(i + 2, i + 8)
          if (this.isValidHex(hexColor)) {
            // Cerrar span anterior si existe
            if (currentStyles.length > 0) {
              result += "</span>"
            }
            // Aplicar color hexadecimal
            currentStyles = [`color: #${hexColor};`]
            result += `<span style="${currentStyles.join(" ")}">`
            i += 8 // Saltar §#RRGGBB
            continue
          }
        }

        const code = text[i + 1].toLowerCase()

        if (this.colorCodes[code]) {
          // Cerrar span anterior si existe
          if (currentStyles.length > 0) {
            result += "</span>"
          }
          // Aplicar color tradicional
          currentStyles = [`color: ${this.colorCodes[code]};`]
          result += `<span style="${currentStyles.join(" ")}">`
        } else if (this.formatCodes[code]) {
          if (code === "r") {
            // Reset - cerrar todos los spans
            if (currentStyles.length > 0) {
              result += "</span>"
              currentStyles = []
            }
          } else {
            // Agregar formato
            const formatStyle = this.formatCodes[code]
            if (!currentStyles.includes(formatStyle)) {
              currentStyles.push(formatStyle)
              if (currentStyles.length === 1) {
                result += `<span style="${currentStyles.join(" ")}">`
              } else {
                result += `</span><span style="${currentStyles.join(" ")}">`
              }
            }
          }
        } else {
          // Código no reconocido, agregar como texto normal
          result += text[i] + text[i + 1]
        }
        i += 2
      } else {
        // Filtrar símbolos decorativos no deseados pero mantener algunos útiles
        const char = text[i]
        if (this.shouldIncludeCharacter(char)) {
          result += char
        }
        i++
      }
    }

    // Cerrar span final si existe
    if (currentStyles.length > 0) {
      result += "</span>"
    }

    return result
  }

  /**
   * Verifica si un patrón hexadecimal &x&R&R&G&G&B&B es válido
   * @param {string} pattern - Patrón a verificar
   * @returns {boolean} - True si es válido
   */
  isValidHexPattern(pattern) {
    // Debe ser exactamente: &x&R&R&G&G&B&B
    const regex = /^&x&[0-9A-Fa-f]&[0-9A-Fa-f]&[0-9A-Fa-f]&[0-9A-Fa-f]&[0-9A-Fa-f]&[0-9A-Fa-f]$/
    return regex.test(pattern)
  }

  /**
   * Extrae el color hexadecimal del patrón &x&R&R&G&G&B&B
   * @param {string} pattern - Patrón hexadecimal
   * @returns {string} - Color hexadecimal sin #
   */
  extractHexFromPattern(pattern) {
    // Extraer los caracteres hexadecimales del patrón &x&R&R&G&G&B&B
    const hex = pattern.replace(/&[x]/g, "").replace(/&/g, "")
    return hex
  }

  /**
   * Verifica si un código hexadecimal es válido
   * @param {string} hex - Código hexadecimal sin #
   * @returns {boolean} - True si es válido
   */
  isValidHex(hex) {
    return /^[0-9A-Fa-f]{6}$/.test(hex)
  }

  /**
   * Determina si un carácter debe incluirse en el resultado final
   * @param {string} char - Carácter a evaluar
   * @returns {boolean} - True si debe incluirse
   */
  shouldIncludeCharacter(char) {
    // Lista de símbolos decorativos que queremos filtrar
    const decorativeSymbols = ["❖", "⏩", "⏪"]

    // Mantener caracteres normales, espacios, números, letras y algunos símbolos útiles
    if (/[a-zA-Z0-9\s[\](){}.,!?:;|/\\-_+=<>]/.test(char)) {
      return true
    }

    // Filtrar símbolos decorativos específicos
    if (decorativeSymbols.includes(char)) {
      return false
    }

    // Mantener otros símbolos que puedan ser útiles
    return true
  }

  /**
   * Limpia todos los códigos de color de un texto
   * @param {string} text - Texto con códigos de color
   * @returns {string} - Texto limpio
   */
  stripColors(text) {
    if (!text || typeof text !== "string") {
      return ""
    }

    // Remover códigos hexadecimales con &x
    let cleaned = text.replace(/&x&[0-9A-Fa-f]&[0-9A-Fa-f]&[0-9A-Fa-f]&[0-9A-Fa-f]&[0-9A-Fa-f]&[0-9A-Fa-f]/g, "")

    // Remover códigos hexadecimales con &#
    cleaned = cleaned.replace(/&#[0-9A-Fa-f]{6}/g, "")

    // Remover códigos hexadecimales con §#
    cleaned = cleaned.replace(/§#[0-9A-Fa-f]{6}/g, "")

    // Remover códigos tradicionales con &
    cleaned = cleaned.replace(/&[0-9a-fk-or]/gi, "")

    // Remover códigos tradicionales con §
    cleaned = cleaned.replace(/§[0-9a-fk-or]/gi, "")

    // Remover símbolos decorativos
    cleaned = cleaned.replace(/[❖⏩⏪]/g, "")

    return cleaned.trim()
  }

  /**
   * Parsea un array de líneas MOTD
   * @param {Array} motdLines - Array de líneas del MOTD
   * @returns {string} - HTML del MOTD parseado
   */
  parseMOTD(motdLines) {
    if (!Array.isArray(motdLines)) {
      return '<div class="motd-line">Sin descripción</div>'
    }

    return motdLines
      .map((line) => {
        const parsedLine = this.parseToHTML(line)
        return `<div class="motd-line">${parsedLine}</div>`
      })
      .join("")
  }

  /**
   * Procesa texto MOTD para vista previa (sin colores)
   * @param {Array} motdLines - Array de líneas del MOTD
   * @returns {string} - Texto limpio para preview
   */
  getCleanMOTD(motdLines) {
    if (!Array.isArray(motdLines)) {
      return "Sin descripción"
    }

    return (
      motdLines
        .map((line) => this.stripColors(line))
        .join(" ")
        .trim() || "Sin descripción"
    )
  }

  /**
   * Convierte códigos § a códigos &
   * @param {string} text - Texto con códigos §
   * @returns {string} - Texto con códigos &
   */
  convertToAmpersand(text) {
    if (!text || typeof text !== "string") {
      return ""
    }
    return text.replace(/§/g, "&")
  }

  /**
   * Convierte códigos & a códigos §
   * @param {string} text - Texto con códigos &
   * @returns {string} - Texto con códigos §
   */
  convertToSection(text) {
    if (!text || typeof text !== "string") {
      return ""
    }
    return text.replace(/&/g, "§")
  }
}

// Exportar instancia global
window.MinecraftColorParser = new MinecraftColorParser()
