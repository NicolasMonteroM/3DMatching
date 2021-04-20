'use strict'

//Estas son las variables que uso en el programa
let tilesN1 = [], tilesN2 = [], tilesN3 = []

const filasN1 = 2
const columnasN1 = 3

let selectedimg, matchedimg
//arreglos de cartas
let cartasN1 = [], cartasN2 = [], cartasN3 = []

//let imagesDeck = []
let cartasSeleccionadas = []
//let delayStartFC = null

//numero de errores que hago
let numeroErrores = 0
//fondos
let nivelesbg = []
let iniciobg, inst1, inst2, inst3, nivel1bg, nivel2bg, nivel3bg
//feedback match
let correcto, incorrecto
let isCorrecto = false, isIncorrecto = false
//botones
let jugarOff, jugarOn, iniciarOff, iniciarOn, siguienteOff, siguienteOn, finalizarOff, finalizarOn
//gif
let instGif

//cartas variables
let carta1N1, carta2N1, carta3N1, carta4N1, carta5N1, carta6N1
let carta1N2, carta2N2, carta3N2, carta4N2, carta5N2, carta6N2
let carta1N3, carta2N3, carta3N3, carta4N3, carta5N3, carta6N3, carta7N3, carta8N3, carta9N3, carta10N3, carta11N3, carta12N3, carta13N3, carta14N3, carta15N3

//cartas imagenes
let carta1N1img, carta2N1img, carta3N1img, carta4N1img, carta5N1img, carta6N1img
let carta1N2img, carta2N2img, carta3N2img, carta4N2img, carta5N2img, carta6N2img
let carta1N3img, carta2N3img, carta3N3img, carta4N3img, carta5N3img, carta6N3img, carta7N3img, carta8N3img, carta9N3img, carta10N3img, carta11N3img, carta12N3img, carta13N3img, carta14N3img, carta15N3img

//modal
let modal

let showFeedback = false
let pantalla = 0
let nivel1, nivel2, nivel3
let pairsMatched = 0

//contador
let contadorOn = false, showContador = false
let segundos = 59, minutos = 4

//fuentes
let regularfont, boldfont

function setup() {
  createCanvas(1080, 720)

  selectedimg = loadImage("../assets/selected.png")
  matchedimg = loadImage("../assets/matched.png")

  //fondos
  iniciobg = loadImage("../assets/inicioBg.jpg")
  inst1 = loadImage("../assets/inst1.jpg")
  inst2 = loadImage("../assets/inst2.jpg")
  inst3 = loadImage("../assets/inst3.jpg")

  //botones
  iniciarOff = loadImage("../assets/iniciarOff.png")
  iniciarOn = loadImage("../assets/iniciarOn.png")
  jugarOff = loadImage("../assets/jugarOff.png")
  jugarOn = loadImage("../assets/jugarOn.png")
  siguienteOff = loadImage("../assets/siguienteOff.png")
  siguienteOn = loadImage("../assets/siguienteOn.png")
  finalizarOff = loadImage("../assets/finalizarOff.png")
  finalizarOn = loadImage("../assets/finalizarOn.png")

  //niveles
  nivelesbg = [nivel1bg = loadImage("../assets/nivel1.jpg"), nivel2bg = loadImage("../assets/nivel2.jpg"), nivel3bg = loadImage("../assets/nivel3.jpg")]

  //feedback match
  incorrecto = loadImage("../assets/incorrecto.png")
  correcto = loadImage("../assets/correcto.png")

  //modal
  modal = loadImage("../assets/modal.png")

  // gif
  instGif = loadGif("../assets/3D-Match.gif")

  regularfont = loadFont('../assets/fonts/NeueMachina-Regular.otf')
  boldfont = loadFont('../assets/fonts/NeueMachina-Ultrabold.otf')

  createTilesN1()
  createTilesN2()
  createTilesN3()
  preload()
}

function preload() {

  //Nivel 1
  cartasN1 = [carta1N1img = loadImage("assets/Nivel1/1-1.png"), carta2N1img = loadImage("assets/Nivel1/2-1.png"), carta3N1img = loadImage("assets/Nivel1/3-2.png"), carta4N1img = loadImage("assets/Nivel1/4-2.png"),
  carta5N1img = loadImage("assets/Nivel1/5.png"), carta6N1img = loadImage("assets/Nivel1/6.png")]

  //Nivel 2
  cartasN2 = [carta1N2img = loadImage("assets/Nivel2/1.png"), carta2N2img = loadImage("assets/Nivel2/2.png"),
  carta3N2img = loadImage("assets/Nivel2/3.png"), carta4N2img = loadImage("assets/Nivel2/4.png"), carta5N2img = loadImage("assets/Nivel2/5.png"), carta6N2img = loadImage("assets/Nivel2/6.png")]

  //Nivel 3
  cartasN3 = [carta1N3img = loadImage("assets/Nivel3/1.png"), carta2N3img = loadImage("assets/Nivel3/2.png"),
  carta3N3img = loadImage("assets/Nivel3/3.png"), carta4N3img = loadImage("assets/Nivel3/4.png"), carta5N3img = loadImage("assets/Nivel3/5.png"), carta6N3img = loadImage("assets/Nivel3/6.png"),
  carta7N3img = loadImage("assets/Nivel3/7.png"), carta8N3img = loadImage("assets/Nivel3/8.png"), carta9N3img = loadImage("assets/Nivel3/9.png"), carta10N3img = loadImage("assets/Nivel3/10.png"),
  carta11N3img = loadImage("assets/Nivel3/11.png"), carta12N3img = loadImage("assets/Nivel3/12.png"), carta13N3img = loadImage("assets/Nivel3/13.png"), carta14N3img = loadImage("assets/Nivel3/14.png"), carta15N3img = loadImage("assets/Nivel3/15.png")]
}

function resizeCards(cardDeck, newWidth) {
  for (let i = 0; i < cardDeck.length; i++) {
    cardDeck[i].resize(newWidth, 0)
  }
}

//en el draw siempre estamos actualizando la logica del juego por si alguna vez cambian las cosas
function draw() {

  resizeCards(cartasN1, 100)
  screenFlow()

}

function screenFlow() {

  switch (pantalla) {
    case 0:
      image(iniciobg, -25, 0, 1135, 720)
      button(540, 630, "iniciar")
      break;

    case 1:
      image(inst1, -25, 0, 1135, 720)
      button(530, 500, "siguiente")
      break;

    case 2:
      image(inst2, -25, 0, 1135, 720)
      imageMode(CENTER)
      image(instGif, 540, 400, 430 * 1.25, 232 * 1.25)
      imageMode(CORNER)
      button(540, 610, "siguiente")
      break;

    case 3:
      image(inst3, -25, 0, 1135, 720)
      button(840, 610, "jugar")
      break;

    case 4:
      image(nivel1bg, -25, 0, 1135, 720)
      renderTiles(tilesN2, 0.3, 1.02)
      checkLevelCompletion(2)
      showFeedback = true
      showContador = true
      contadorOn = true
      if (pantalla === 5) {
        background(32, 25, 52, 140)
        makeModal("small")
        textSize(40)
        fill(255)
        textAlign(CENTER)
        textFont(regularfont)
        text("¡Correcto!", 540, 300)
        textSize(20)
        text("Pulsa siguiente para ir al próximo nivel", 540, 350)
      }
      break;

    case 5:
      contadorOn = false
      button(540, 420, "siguiente")
      break;

    case 6:
      contadorOn = true
      image(nivel2bg, -25, 0, 1135, 720)
      renderTiles(tilesN1, 0.3, 1.02)
      checkLevelCompletion(4)
      if (pantalla === 7) {
        background(32, 25, 52, 140)
        makeModal("small")
        textSize(40)
        fill(255)
        textAlign(CENTER)
        textFont(regularfont)
        text("¡Correcto!", 540, 300)
        textSize(20)
        text("Pulsa siguiente para ir al próximo nivel", 540, 350)
      }
      break;

    case 7:
      contadorOn = false
      button(540, 420, "siguiente")
      break;

    case 8:
      contadorOn = true
      image(nivel3bg, -25, 0, 1135, 720)
      renderTiles(tilesN3, 0.2, 0.95)
      checkLevelCompletion(10)
      break;

    case 9:

      showFeedback = false
      background(32, 25, 52)
      makeModal("big")
      showContador = false
      contadorOn = false
      textSize(35)
      fill(255)
      textAlign(CENTER)
      textFont(regularfont)
      text("Juego terminado", 540, 260)
      textSize(25)
      textFont(boldfont)
      text("Puntaje: " + puntaje() + " / 260", 540, 310)
      textFont(regularfont)
      textSize(18)
      text("Tiempo: " + minutos + ":" + segundos, 540, 350)
      text("Cartas emparejadas: " + pairsMatched + " / 10", 540, 380)
      text("Número de errores: " + numeroErrores, 540, 410)
      button(540, 470, "finalizar")
      break;

    case 10:

  }

  if (showFeedback) {
    if (isCorrecto) {
      matchFeedback(correcto)
    }
    if (isIncorrecto) {
      matchFeedback(incorrecto)
    }
  }

  counter()
  gameOver()
}

function puntaje() {

  // el puntaje se medirá de 0-260

  var score = 0

  // a medida que aumenta el nivel, hacer las parejas dará mas puntos
  if (pairsMatched < 3) {
    score += pairsMatched * 15
  }
  if (pairsMatched > 2 && pairsMatched < 5) {
    score += 30 + ((pairsMatched - 2) * 25)
  }
  if (pairsMatched > 4 && pairsMatched < 11) {
    score += 80 + ((pairsMatched - 4) * 30)
  }

  return score -= numeroErrores * 15 //se le restan los errores al puntaje final
}

function checkLevelCompletion(pairsToMatch) {

  if (pairsMatched === pairsToMatch) {
    isIncorrecto = false
    isCorrecto = false

    pantalla += 1
  }
}

function gameOver() {

  if (minutos === 0 && segundos === 0) {
    contadorOn = false
    pantalla = 9
  }
}

function makeModal(size) {

  imageMode(CENTER)
  if (size === "small") {
    image(modal, 540, 360, 1148, 318)
  }
  if (size === "big") {
    image(modal, 540, 360, 1148 * 1.2, 318 * 1.2)
  }
  imageMode(CORNER)
}



function buttonSystem() {

  buttonClicked(540, 630, 0)
  buttonClicked(530, 500, 1)
  buttonClicked(540, 610, 2)
  buttonClicked(840, 610, 3)
  buttonClicked(540, 420, 5)
  buttonClicked(540, 420, 7)
  buttonClicked(540, 470, 9)

}

function matchFeedback(type) {

  if (showFeedback) {
    imageMode(CENTER)
    image(type, 540, 30, 144 * 1.4, 56 * 1.4)
    imageMode(CORNER)
  }
}

function button(x, y, type) {

  let btnNameOn, btnNameOff

  if (type === "iniciar") {
    btnNameOn = iniciarOn
    btnNameOff = iniciarOff
  }

  if (type === "jugar") {
    btnNameOn = jugarOn
    btnNameOff = jugarOff
  }

  if (type === "siguiente") {
    btnNameOn = siguienteOn
    btnNameOff = siguienteOff
  }

  if (type === "finalizar") {
    btnNameOn = finalizarOn
    btnNameOff = finalizarOff
  }

  imageMode(CENTER)
  if (mouseX < x + (183 / 2) && mouseX > x - (183 / 2) && mouseY < y + (60 / 2) && mouseY > y - (60 / 2)) {
    image(btnNameOn, x, y, 183, 60)
  } else {
    image(btnNameOff, x, y, 183, 60)
  }
  imageMode(CORNER)
}

function buttonClicked(x, y, screen) {
  if (mouseX < x + (183 / 2) && mouseX > x - (183 / 2) && mouseY < y + (60 / 2) && mouseY > y - (60 / 2)) {
    if (pantalla === screen) {
      pantalla += 1
    }
  }
}

//Esto crea cada una de las cartas
function createTilesN1() {

  let x = 230
  let y = 260
  let paddingX = 85

  carta4N1 = new Tile(1 * x + paddingX, 1 * y, carta4N1img, 2, 4)
  carta1N1 = new Tile(2 * x + paddingX, 1 * y, carta1N1img, 1, 1)
  carta3N1 = new Tile(3 * x + paddingX, 1 * y, carta3N1img, 2, 3)
  carta2N1 = new Tile(1 * x + paddingX, 2 * y, carta2N1img, 1, 2)
  carta6N1 = new Tile(2 * x + paddingX, 2 * y, carta6N1img, 9, 6)
  carta5N1 = new Tile(3 * x + paddingX, 2 * y, carta5N1img, 6, 5)

  tilesN1.push(carta1N1, carta2N1, carta3N1, carta4N1, carta5N1, carta6N1)

}

function createTilesN2() {

  let x = 230
  let y = 260
  let paddingX = 85

  carta1N2 = new Tile(1 * x + paddingX, 1 * y, carta1N2img, 1, 1)
  carta2N2 = new Tile(2 * x + paddingX, 1 * y, carta2N2img, 6, 2)
  carta3N2 = new Tile(3 * x + paddingX, 1 * y, carta3N2img, 9, 3)
  carta4N2 = new Tile(1 * x + paddingX, 2 * y, carta4N2img, 1, 4)
  carta5N2 = new Tile(2 * x + paddingX, 2 * y, carta5N2img, 2, 5)
  carta6N2 = new Tile(3 * x + paddingX, 2 * y, carta6N2img, 2, 6)

  tilesN2.push(carta1N2, carta2N2, carta3N2, carta4N2, carta5N2, carta6N2)

}

function createTilesN3() {

  let x = 165
  let y = 190
  let paddingX = 50

  carta1N3 = new Tile(1 * x + paddingX, 1 * y, carta1N3img, 20, 1)
  carta2N3 = new Tile(2 * x + paddingX, 1 * y, carta2N3img, 1, 2)
  carta3N3 = new Tile(3 * x + paddingX, 1 * y, carta3N3img, 2, 3)
  carta4N3 = new Tile(4 * x + paddingX, 1 * y, carta4N3img, 21, 4)
  carta5N3 = new Tile(5 * x + paddingX, 1 * y, carta5N3img, 3, 5)

  carta6N3 = new Tile(1 * x + paddingX, 2 * y, carta6N3img, 4, 6)
  carta7N3 = new Tile(2 * x + paddingX, 2 * y, carta7N3img, 5, 7)
  carta8N3 = new Tile(3 * x + paddingX, 2 * y, carta8N3img, 1, 8)
  carta9N3 = new Tile(4 * x + paddingX, 2 * y, carta9N3img, 24, 9)
  carta10N3 = new Tile(5 * x + paddingX, 2 * y, carta10N3img, 6, 10)

  carta11N3 = new Tile(1 * x + paddingX, 3 * y, carta11N3img, 5, 11)
  carta12N3 = new Tile(2 * x + paddingX, 3 * y, carta12N3img, 4, 12)
  carta13N3 = new Tile(3 * x + paddingX, 3 * y, carta13N3img, 6, 13)
  carta14N3 = new Tile(4 * x + paddingX, 3 * y, carta14N3img, 3, 14)
  carta15N3 = new Tile(5 * x + paddingX, 3 * y, carta15N3img, 2, 15)

  tilesN3.push(carta1N3, carta2N3, carta3N3, carta4N3, carta5N3, carta6N3, carta7N3, carta8N3, carta9N3, carta10N3, carta11N3, carta12N3, carta13N3, carta14N3, carta15N3)

}

function renderTiles(cardDeck, ratio, ratio2) {

  for (let i = 0; i < cardDeck.length; i++) {
    cardDeck[i].render(ratio, ratio2)
  }
}

function counter() {

  if (contadorOn) {
    if (frameCount % 45 === 0) {
      segundos -= 1
    }

    if (segundos < 0) {
      minutos -= 1
      segundos = 59
    }
  }

  if (showContador) {
    textSize(20)
    fill(255)
    textFont(regularfont)
    text("Tiempo " + minutos + ":" + segundos, 915, 50)
  }
}

//mouseclicked para cada vez que clickeo sobre una carta
function mouseClicked() {

  buttonSystem()

  if (pantalla === 6) {
    checkSelected(tilesN1)
  }

  if (pantalla === 4) {
    checkSelected(tilesN2)
  }

  if (pantalla === 8) {
    checkSelected(tilesN3)
  }
}

function checkSelected(cardDeck) {

  for (let i = 0; i < cardDeck.length; i++) {
    const card = cardDeck[i];
    if (dist(mouseX, mouseY, card.getPosX(), card.getPosY()) < 80) {
      if (cartasSeleccionadas.length < 2 && !card.isSelected) {
        cartasSeleccionadas.push(cardDeck[i])
        card.setIsSelected(true)
      } else if (card.isSelected) {
        cartasSeleccionadas.splice(cardDeck[i])
        card.setIsSelected(false)
      }
    }
  }

  if (cartasSeleccionadas.length === 2) {

    var carta1 = cartasSeleccionadas[0];
    var carta2 = cartasSeleccionadas[1];

    console.log("Carta1 - " + carta1.getPair())
    console.log("Carta2 -" + carta2.getPair())

    if (carta1.getPair() === carta2.getPair()) {
      console.log("Son Iguales")
      isCorrecto = true
      isIncorrecto = false
      isMatched(cardDeck, carta1, carta2)
      clearDeck(cardDeck, cartasSeleccionadas, carta1, carta2)

    } else {
      numeroErrores += 1
      isIncorrecto = true
      isCorrecto = false
      console.log("No son iguales")
      console.log(numeroErrores)
      clearDeck(cardDeck, cartasSeleccionadas, carta1, carta2)

    }
  }
}

function isMatched(cardDeck, carta1, carta2) {

  pairsMatched += 1
  for (let i = 0; i < cardDeck.length; i++) {
    var cartaTmp = cardDeck[i];
    if (cartaTmp.getId() === carta1.getId()) {
      cardDeck[i].setIsMatched(true);
    } else {
      if (cartaTmp.getId() === carta2.getId()) {
        cardDeck[i].setIsMatched(true);
      }
    }
  }
}

function clearDeck(cardDeck, selectedCardDeck, carta1, carta2) {

  while (selectedCardDeck.length > 0) {
    selectedCardDeck.pop()
  }

  for (let i = 0; i < cardDeck.length; i++) {
    var cartaTmp = cardDeck[i];
    if (cartaTmp.getId() === carta1.getId()) {
      cardDeck[i].setIsSelected(false)
    } else {
      if (cartaTmp.getId() === carta2.getId()) {
        cardDeck[i].setIsSelected(false)
      }
    }
  }
}