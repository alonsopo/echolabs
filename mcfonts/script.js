let currentPage = "gradient-generator"
let isDarkMode = true
const recentEmojis = []
let copiedTimeout
let savedColors = ["C00BD6", "FD2177"]
const formats = {
  default: {
    name: "Default &#rrggbb",
    template: "&#$1$2$3$4$5$6$f$c",
    formatChar: "&",
    maxLength: 256,
  },
  chat: {
    name: "Chat <#rrggbb>",
    template: "<#$1$2$3$4$5$6>$f$c",
    formatChar: "&",
  },
  legacy: {
    name: "Legacy &x&r&r&g&g&b&b",
    template: "&x&$1&$2&$3&$4&$5&$6$f$c",
    formatChar: "&",
  },
  console: {
    name: "Console §x§r§r§g§g§b&b",
    template: "§x§$1§$2§$3§$4§$5§$6$f$c",
    formatChar: "§",
  },
  motd: {
    name: "MOTD (\\u00A7x)",
    template: "\\u00A7x\\u00A7$1\\u00A7$2\\u00A7$3\\u00A7$4\\u00A7$5\\u00A7$6$f$c",
    formatChar: "\\u00A7",
  },
  iridium: {
    name: "Iridium <GRADIENT>",
    iridiumGradient: true,
  },
  adventure: {
    name: "Adventure <gradient>",
    adventureGradient: true,
  },
}
const presets = {
  rainbow: ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "9400D3"],
  fire: ["A10100", "DA3604", "FE650D", "FFC11F", "FFF75D"],
  water: ["0A2463", "3E92CC", "FFFAFF", "1E1B18"],
  forest: ["1B512D", "2A7F62", "9AE19D", "CBEAED", "FDFFFC"],
  sunset: ["FF512F", "DD2476", "9A4EAE", "432371"],
  neon: ["FE00FE", "0000FF", "00FF00", "FFFF00", "FF7F00", "FE0000"],
}
const smallCapsMap = {
  a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ғ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ", 0: "₀", 1: "₁", 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆", 7: "₇", 8: "₈", 9: "₉", "-": "₋", "+": "₊",
}
const emojiArray = [
  "☠","☮","☯","♠","Ω","♤","♣","♧","♥","♡","♦","♢","♔","♕","♚","♛","★","☆","✮","✯","☄","☾","☽","☼","☀","☁","☂","☃","☻","☺","۞","۩","♬","✄","✂","✆","✉","✦","✧","∞","♂","♀","☿","❤","❥","❦","❧","®","©","✗","✘","▢","▲","△","▼","▽","◆","◇","○","◎","●","◯","Δ","◕","◔","ʊ","ღ","₪","✓","✔","✕","✖","☢","☣","☤","✙","✞","✠","✰","❇","❈","❅","❄","❆","╰","╮","❃","❀","✿","❁","✾","❂","⋆","✢","✣","✤","✥","✩","✪","✫","✬","✭","✵","✴","✳","✲","✱","✶","✷","✸","✹","✺","✻","✼","✽","✡","❋","❊","❉","✌","⚔","⛏","🔥","🎣","🏹","🔔","🔱","🗡","🛡","🪓","⚒","🧪","🔮","🧙","🧝","🧟","🐉","🐲","🏰","🌋","⚡","➣","➢","⬇","⬆","⬅","➡","✈","➤","➥","➦","➧","➨","➚","➘","➙","➛","➶","➵","➴","➳","➲","➸","➞","➝","➜","⚜","∑","+","-","×","÷","=","<",">","≤","≥","≠","≈","∞","√","∫","∂","∇","∆","∏","∑","ಠ_ಠ","(╯°□°）╯︵ ┻━┻","┬─┬ノ( º _ ºノ)","(⌐■_■)","¯\\_(ツ)_/¯","(͡° ͜ʖ ͡°)","(づ｡◕‿‿◕｡)づ","(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧","♪","♩","♫","≫","UwU","¦","©","®","°","҂","؎","؏","۞","۩","♛","♕","♔","♖","♗","♘","♙","♚","♜","♝","♞","♟","♠","♥","♦","♣","♤","♡","♢","♧","₿","€","£","¥","$","¢","₽","₹","«","»","‹","›","『","』","〖","〗","【","】","〔","〕","《","》","〈","〉","「","」","↑","↓","←","→","↔","↕","↖","↗","↘","↙","↚","↛","↜","↝","↞","↟","↠","↡","↢","↣","↤","↥","↦","↧","↨","↩","↪","█","▓","▒","░","▄","▀","■","□","▪","▫","▬","▭","▮","▯","▰","▱","▲","△","▴","▵","▶","▷","▸","▹","►","▻","▼","▽","▾","▿","◀","◁","◂","◃","◄","◅","☀","☁","☂","☃","☄","★","☆","☇","☈","☉","☊","☋","☌","☍","☎","☏","☐","☑","☒","☓","☔","☕","☖","☗","☘","☙","☚","☛","☜","☝","☞","☟","♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","⚳","⚴","⚵","⚶","⚷","⚸","⚹","⚺","⚻","⚼","♩","♪","♫","♬","♭","♮","♯","½","⅓","⅔","¼","¾","⅕","⅖","⅗","⅘","⅙","⅚","⅛","⅜","⅝","⅞","α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω","Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω",
]

document.addEventListener("DOMContentLoaded", () => {
  initNavigation()

  initTheme()

  initFormats()

  initColors()

  initEmojis()

  initEvents()

  updateGradientPreview()
  updateSmallCapsPreview()

  document.getElementById("current-year").textContent = new Date().getFullYear().toString()
})

function initNavigation() {
  const navItems = document.querySelectorAll(".sidebar-nav li")

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((navItem) => navItem.classList.remove("active"))

      item.classList.add("active")

      const pageId = item.getAttribute("data-page")
      changePage(pageId)
    })
  })
}

function changePage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active")
  })

  document.getElementById(pageId).classList.add("active")

  currentPage = pageId
}

function initTheme() {
  const themeToggle = document.getElementById("theme-toggle")

  themeToggle.addEventListener("click", () => {
    isDarkMode = !isDarkMode

    if (isDarkMode) {
      document.body.classList.add("dark")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>'
    } else {
      document.body.classList.remove("dark")
      themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Modo Oscuro</span>'
    }
  })
}

function initFormats() {
  const formatSelect = document.getElementById("output-format")

  formatSelect.innerHTML = ""

  for (const [key, format] of Object.entries(formats)) {
    const option = document.createElement("option")
    option.value = key
    option.textContent = format.name
    formatSelect.appendChild(option)
  }

  formatSelect.value = "default"

  formatSelect.addEventListener("change", updateGradientPreview)
}

function initColors() {
  const numColors = document.getElementById("num-colors")
  numColors.addEventListener("change", () => {
    const count = Number.parseInt(numColors.value)
    updateColorList(count)
  })

  const addColorBtn = document.getElementById("add-color")
  addColorBtn.addEventListener("click", () => {
    const count = Number.parseInt(numColors.value) + 1
    numColors.value = count
    updateColorList(count)
  })

  const presetBtns = document.querySelectorAll(".preset-btn")
  presetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const presetName = btn.getAttribute("data-preset")
      applyPreset(presetName)
    })
  })

  updateColorList(2)
}

function updateColorList(count) {
  const colorList = document.getElementById("color-list");

  while (savedColors.length < count) {
    savedColors.push(getRandomHexColor());
  }

  colorList.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const colorItem = document.createElement("div");
    colorItem.className = "color-item";

    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.setAttribute("data-index", i.toString());
    colorBox.style.backgroundColor = "#" + savedColors[i];
    colorBox.style.width = "100%";
    colorBox.style.height = "40px";
    colorBox.style.borderRadius = "var(--radius-sm)";
    colorBox.style.cursor = "pointer";
    colorBox.style.border = "1px solid var(--border)";
    colorBox.style.boxShadow = "inset 0 0 3px rgba(0,0,0,0.3)";

    const colorInput = document.createElement("input");
    colorInput.type = "text";
    colorInput.className = "jscolor-input";
    colorInput.value = savedColors[i];
    colorInput.style.display = "none";

    const jscolorInstance = new jscolor(colorInput, {
      value: savedColors[i],
      position: 'bottom',
      positionElement: colorBox,
      onInput: function () {
        const index = Number.parseInt(colorBox.getAttribute("data-index"));
        const newColor = this.toHEXString().substring(1).toUpperCase();
        savedColors[index] = newColor;

        colorBox.style.backgroundColor = "#" + newColor;

        const colorHexInputs = document.querySelectorAll(".color-hex-input");
        if (colorHexInputs[index]) {
          colorHexInputs[index].value = "#" + newColor;
        }

        updateGradientPreview();
      }
    });

    colorBox.addEventListener("click", function () {
      jscolorInstance.show();
    });

    const colorHexInput = document.createElement("input");
    colorHexInput.type = "text";
    colorHexInput.className = "color-hex-input";
    colorHexInput.value = "#" + savedColors[i];
    colorHexInput.setAttribute("data-index", i.toString());

    colorHexInput.addEventListener("input", (e) => {
      const input = e.target;
      const value = input.value;
      const index = Number.parseInt(input.getAttribute("data-index"));

      if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        const hexColor = value.substring(1).toUpperCase();
        savedColors[index] = hexColor;

        const colorBox = document.querySelector(`.color-box[data-index="${index}"]`);
        if (colorBox) {
          colorBox.style.backgroundColor = value;
        }

        const jscolorInput = document.querySelectorAll(".jscolor-input")[index];
        if (jscolorInput && jscolorInput.jscolor) {
          jscolorInput.jscolor.fromString(hexColor);
        }

        updateGradientPreview();
      }
    });

    colorHexInput.addEventListener("blur", (e) => {
      const input = e.target;
      let value = input.value;
      const index = Number.parseInt(input.getAttribute("data-index"));

      if (!value.startsWith("#")) {
        value = "#" + value;
        input.value = value;
      }

      if (!/^#[0-9A-Fa-f]{6}$/.test(value)) {
        input.value = "#" + savedColors[index];
      } else {
        const hexColor = value.substring(1).toUpperCase();
        savedColors[index] = hexColor;

        const colorBox = document.querySelector(`.color-box[data-index="${index}"]`);
        if (colorBox) {
          colorBox.style.backgroundColor = value;
        }

        const jscolorInput = document.querySelectorAll(".jscolor-input")[index];
        if (jscolorInput && jscolorInput.jscolor) {
          jscolorInput.jscolor.fromString(hexColor);
        }

        updateGradientPreview();
      }
    });

    const colorActions = document.createElement("div");
    colorActions.className = "color-actions";

    if (count > 2) {
      const removeBtn = document.createElement("button");
      removeBtn.className = "color-action";
      removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
      removeBtn.setAttribute("data-index", i.toString());
      removeBtn.addEventListener("click", removeColor);
      colorActions.appendChild(removeBtn);
    }

    if (i > 0) {
      const upBtn = document.createElement("button");
      upBtn.className = "color-action";
      upBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
      upBtn.setAttribute("data-index", i.toString());
      upBtn.addEventListener("click", () => moveColor(i, "up"));
      colorActions.appendChild(upBtn);
    }

    if (i < count - 1) {
      const downBtn = document.createElement("button");
      downBtn.className = "color-action";
      downBtn.innerHTML = '<i class="fas fa-arrow-down"></i>';
      downBtn.setAttribute("data-index", i.toString());
      downBtn.addEventListener("click", () => moveColor(i, "down"));
      colorActions.appendChild(downBtn);
    }

    colorItem.appendChild(colorBox);
    colorItem.appendChild(colorInput); 
    colorItem.appendChild(colorHexInput);
    colorItem.appendChild(colorActions);
    colorList.appendChild(colorItem)
  }

  updateGradientPreview()
}

function removeColor(event) {
  const index = Number.parseInt(event.currentTarget.getAttribute("data-index"))
  const numColors = document.getElementById("num-colors")
  const count = Number.parseInt(numColors.value)

  if (count > 2) {
    savedColors.splice(index, 1)
    numColors.value = count - 1
    updateColorList(count - 1)
  }
}

function moveColor(index, direction) {
  if (direction === "up" && index > 0) {
    const temp = savedColors[index]
    savedColors[index] = savedColors[index - 1]
    savedColors[index - 1] = temp
  } else if (direction === "down" && index < savedColors.length - 1) {
    const temp = savedColors[index]
    savedColors[index] = savedColors[index + 1]
    savedColors[index + 1] = temp
  }

  updateColorList(savedColors.length)
}

function applyPreset(presetName) {
  if (presets[presetName]) {
    savedColors = [...presets[presetName]]
    const numColors = document.getElementById("num-colors")
    numColors.value = savedColors.length
    updateColorList(savedColors.length)
  }
}

function initEmojis() {
  const emojiGrid = document.getElementById("emoji-grid")
  const recentEmojiGrid = document.getElementById("recent-emoji-grid")
  const loadingText = document.getElementById("loading-text")

  if (loadingText) {
    loadingText.style.display = "none"
  }

  emojiGrid.innerHTML = ""
  recentEmojiGrid.innerHTML = ""

  emojiArray.forEach((emoji) => {
    const emojiBtn = document.createElement("button")
    emojiBtn.className = "emoji-btn"
    emojiBtn.textContent = emoji
    emojiBtn.addEventListener("click", () => {
      copyToClipboard(emoji)
      addToRecentEmojis(emoji)
    })

    emojiGrid.appendChild(emojiBtn)
  })
}

function addToRecentEmojis(emoji) {
  if (!recentEmojis.includes(emoji)) {
    recentEmojis.unshift(emoji)

    if (recentEmojis.length > 10) {
      recentEmojis.pop()
    }

    updateRecentEmojis()
  }
}

function updateRecentEmojis() {
  const recentEmojiGrid = document.getElementById("recent-emoji-grid")

  recentEmojiGrid.innerHTML = ""

  recentEmojis.forEach((emoji) => {
    const emojiBtn = document.createElement("button")
    emojiBtn.className = "emoji-btn"
    emojiBtn.textContent = emoji
    emojiBtn.addEventListener("click", () => {
      copyToClipboard(emoji)
      addToRecentEmojis(emoji)
    })

    recentEmojiGrid.appendChild(emojiBtn)
  })
}

function initEvents() {
  document.getElementById("gradient-text").addEventListener("input", updateGradientPreview)
  document.getElementById("bold").addEventListener("change", updateGradientPreview)
  document.getElementById("italic").addEventListener("change", updateGradientPreview)
  document.getElementById("underline").addEventListener("change", updateGradientPreview)
  document.getElementById("strike").addEventListener("change", updateGradientPreview)
  document.getElementById("output-format").addEventListener("change", updateGradientPreview)
  document.getElementById("copy-button").addEventListener("click", () => {
    copyToClipboard(document.getElementById("output-text").value)
  })

  document.getElementById("small-caps-input").addEventListener("input", updateSmallCapsPreview)
  document.getElementById("small-caps-copy").addEventListener("click", () => {
    copyToClipboard(document.getElementById("small-caps-output").value)
  })
}

function updateGradientPreview() {
  const text = document.getElementById("gradient-text").value || "Minecraft"
  const formatKey = document.getElementById("output-format").value
  const format = formats[formatKey] || formats.default
  const bold = document.getElementById("bold").checked
  const italic = document.getElementById("italic").checked
  const underline = document.getElementById("underline").checked
  const strike = document.getElementById("strike").checked

  const rgbColors = savedColors.map((color) => convertToRGB(color))

  const gradient = new Gradient(rgbColors, text.length)

  const preview = document.getElementById("gradient-preview")
  preview.innerHTML = ""
  preview.className = "preview-box minecraft-text"

  if (bold) preview.classList.add("bold")
  if (italic) preview.classList.add("italic")
  if (underline) preview.classList.add("underline")
  if (strike) preview.classList.add("strike")

  let output = format.outputPrefix || ""
  const charColors = []

  let startIridium
  let endIridium

  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i)

    if (char === " ") {
      output += char

      const span = document.createElement("span")
      span.innerHTML = "&nbsp;"
      preview.appendChild(span)

      continue
    }

    const rgb = gradient.next()
    const hex = convertToHex(rgb)
    charColors.push(hex)

    const span = document.createElement("span")
    span.style.color = "#" + hex
    span.textContent = char
    preview.appendChild(span)

    let hexOutput = format.template

    if (hexOutput) {
      for (let n = 1; n <= 6; n++) {
        hexOutput = hexOutput.replace(`$${n}`, hex.charAt(n - 1))
      }

      let formatCodes = ""
      if (format.formatChar != null) {
        if (bold) formatCodes += format.formatChar + "l"
        if (italic) formatCodes += format.formatChar + "o"
        if (underline) formatCodes += format.formatChar + "n"
        if (strike) formatCodes += format.formatChar + "m"
      }

      hexOutput = hexOutput.replace("$f", formatCodes)
      hexOutput = hexOutput.replace("$c", char)

      if (i === 0) {
        startIridium = hex
      } else if (i === text.length - 1) {
        endIridium = hex
      }

      output += hexOutput
    }
  }

  const outputText = document.getElementById("output-text")

  if (format.iridiumGradient) {
    outputText.value = `<GRADIENT:${startIridium}>${text}</GRADIENT:${endIridium}>`
  } else if (format.adventureGradient) {
    let effects = ""
    if (bold) effects += "<b>"
    if (italic) effects += "<i>"
    if (underline) effects += "<u>"
    if (strike) effects += "<st>"

    if (rgbColors.length === 1) {
      outputText.value = `<${convertToHex(rgbColors[0])}>${effects}${text}`
    } else {
      outputText.value = `<gradient:${rgbColors.map((c) => `#${convertToHex(c)}`).join(":")}>${effects}${text}</gradient>`
    }
  } else {
    outputText.value = output
  }

  const errorMessage = document.getElementById("error-message")
  if (format.maxLength && output.length > format.maxLength) {
    errorMessage.style.display = "block"
  } else {
    errorMessage.style.display = "none"
  }
}

function updateSmallCapsPreview() {
  const input = document.getElementById("small-caps-input").value || "Minecraft"
  const output = document.getElementById("small-caps-output")

  let result = ""
  const lowerInput = input.toLowerCase()

  for (let i = 0; i < lowerInput.length; i++) {
    const char = lowerInput.charAt(i)
    result += smallCapsMap[char] || char
  }

  output.value = result
}

class Gradient {
  constructor(colors, numSteps) {
    this.colors = colors
    this.gradients = []
    this.steps = numSteps - 1
    this.step = 0

    const increment = this.steps / (colors.length - 1)
    for (let i = 0; i < colors.length - 1; i++) {
      this.gradients.push(new TwoStopGradient(colors[i], colors[i + 1], increment * i, increment * (i + 1)))
    }
  }

  next() {
    if (this.steps < 1) {
      return this.colors[0]
    }

    if (this.steps < this.colors.length) {
      const tColor = this.colors[this.step]
      this.step++
      return tColor
    }

    const adjustedStep = Math.round(
      Math.abs(((2 * Math.asin(Math.sin(this.step * (Math.PI / (2 * this.steps))))) / Math.PI) * this.steps),
    )
    let color

    if (this.gradients.length < 2) {
      color = this.gradients[0].colorAt(adjustedStep)
    } else {
      const segment = this.steps / this.gradients.length
      const index = Math.min(Math.floor(adjustedStep / segment), this.gradients.length - 1)
      color = this.gradients[index].colorAt(adjustedStep)
    }

    this.step++
    return color
  }
}

class TwoStopGradient {
  constructor(startColor, endColor, lowerRange, upperRange) {
    this.startColor = startColor
    this.endColor = endColor
    this.lowerRange = lowerRange
    this.upperRange = upperRange
  }

  colorAt(step) {
    return [
      this.calculateHexPiece(step, this.startColor[0], this.endColor[0]),
      this.calculateHexPiece(step, this.startColor[1], this.endColor[1]),
      this.calculateHexPiece(step, this.startColor[2], this.endColor[2]),
    ]
  }

  calculateHexPiece(step, channelStart, channelEnd) {
    const range = this.upperRange - this.lowerRange
    const interval = (channelEnd - channelStart) / range
    return Math.round(interval * (step - this.lowerRange) + channelStart)
  }
}

function getRandomHexColor() {
  return Math.floor(Math.random() * 16777215)
    .toString(16)
    .toUpperCase()
    .padStart(6, "0")
}

function hex(c) {
  const s = "0123456789abcdef"
  const i = Number.parseInt(c)
  if (i === 0 || isNaN(c)) return "00"
  const clampedI = Math.round(Math.min(Math.max(0, i), 255))
  return s.charAt((clampedI - (clampedI % 16)) / 16) + s.charAt(clampedI % 16)
}

function convertToHex(rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2])
}

function convertToRGB(hex) {
  const color = []
  color[0] = Number.parseInt(hex.substring(0, 2), 16)
  color[1] = Number.parseInt(hex.substring(2, 4), 16)
  color[2] = Number.parseInt(hex.substring(4, 6), 16)
  return color
}

function copyToClipboard(text) {
  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.style.position = "fixed"
  textarea.style.opacity = 0

  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  document.body.removeChild(textarea)

  showToast()
}

function showToast() {
  const toast = document.getElementById("toast")

  if (copiedTimeout) {
    clearTimeout(copiedTimeout)
  }

  toast.classList.add("show")

  copiedTimeout = setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}
