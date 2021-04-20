'use strict'

//Estas son las variables que uso en el programa
let tilesN1 = []

const filasN1 = 2
const columnasN1 = 3

let selectedimg, matchedimg

//arreglos de cartas
let cartasN1 = [], cartasN2 = [], cartasN3 = []

//let imagesDeck = []
let cartasSeleccionadas = []
//let delayStartFC = null

//numero de intentos que hago
let numeroIntentos = 0
//fondos
let iniciobg, inst1, inst2, inst3, nivel1bg, nivel2bg, nivel3bg
//feedback match
let correcto, incorrecto
let isCorrecto = false, isIncorrecto = false
//botones
let jugarOff, jugarOn, iniciarOff, iniciarOn, siguienteOff, siguienteOn
//gif
let instGif
//cartas variables
let carta1N1, carta2N1, carta3N1, carta4N1, carta5N1, carta6N1
let carta1N2, carta2N2, carta3N2, carta4N2, carta5N2, carta6N2

//cartas imagenes
let carta1N1img, carta2N1img, carta3N1img, carta4N1img, carta5N1img, carta6N1img

//modal
let modal

let pantalla = 0
let nivel1, nivel2, nivel3
let pairsMatched = 0

//contador
let contadorOn = false
let segundos = 59
let minutos = 4

//fuentes
let regularfont

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

  //niveles
  nivel1bg = loadImage("../assets/nivel1.jpg")
  nivel2bg = loadImage("../assets/nivel2.jpg")
  nivel3bg = loadImage("../assets/nivel3.jpg")

  //feedback match
  incorrecto = loadImage("../assets/incorrecto.png")
  correcto = loadImage("../assets/correcto.png")

  //modal
  modal = loadImage("../assets/modal.png")

  // gif
  instGif = loadGif("../assets/3D-Match.gif")

  regularfont = loadFont('../assets/fonts/NeueMachina-Regular.otf')

  createTilesN1()
  preload()
}

function preload() {
  //cartas
  cartasN1 = [
    carta1N1img = loadImage("assets/Nivel1/1-1.png"),
    carta2N1img = loadImage("assets/Nivel1/2-1.png"),
    carta3N1img = loadImage("assets/Nivel1/3-2.png"),
    carta4N1img = loadImage("assets/Nivel1/4-2.png"),
    carta5N1img = loadImage("assets/Nivel1/5.png"),
    carta6N1img = loadImage("assets/Nivel1/6.png")
  ]
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
      renderTiles(tilesN1, 0.3)
      checkLevelCompletion(2)
      counter()
      break;

    case 5:
      image(nivel2bg, -25, 0, 1135, 720)
      break;

    case 6:
      image(nivel3bg, -25, 0, 1135, 720)
      break;
  }

  if (isCorrecto) {
    matchFeedback(correcto)
  }
  if (isIncorrecto) {
    matchFeedback(incorrecto)
  }

  
  // console.log(pairsMatched)

}

function checkLevelCompletion(pairsToMatch) {

  if (pairsMatched === pairsToMatch) {
    isIncorrecto = false
    isCorrecto = false

    makeModal()
    //pantalla += 1
  }

}

function buttonSystem() {

  buttonClicked(540, 630, 0)
  buttonClicked(530, 500, 1)
  buttonClicked(540, 610, 2)
  buttonClicked(840, 610, 3)

}

function matchFeedback(type) {

  imageMode(CENTER)
  image(type, 540, 30, 144 * 1.4, 56 * 1.4)
  imageMode(CORNER)

}

function makeModal(){

  imageMode(CENTER)
  image(modal, 540, 360, 1148, 318)
  imageMode(CORNER)

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
  let paddingX = 100

  carta1N1 = new Tile(1 * x + paddingX, 1 * y, carta1N1img, 1, 1)
  carta2N1 = new Tile(2 * x + paddingX, 1 * y, carta2N1img, 1, 2)
  carta3N1 = new Tile(3 * x + paddingX, 1 * y, carta3N1img, 2, 3)
  carta4N1 = new Tile(1 * x + paddingX, 2 * y, carta4N1img, 2, 4)
  carta5N1 = new Tile(2 * x + paddingX, 2 * y, carta5N1img, 6, 5)
  carta6N1 = new Tile(3 * x + paddingX, 2 * y, carta6N1img, 9, 6)

  tilesN1.push(carta1N1, carta2N1, carta3N1, carta4N1, carta5N1, carta6N1)

}

function renderTiles(cardDeck, ratio) {

  for (let i = 0; i < cardDeck.length; i++) {
    cardDeck[i].render(ratio)
  }
}

function counter() {

  if (frameCount % 45 === 0) {
    segundos -= 1
  }

  if (segundos < 0) {
    minutos -= 1
    segundos = 59
  }

  textSize(20)
  fill(255)
  textFont(regularfont)
  text("Tiempo " + minutos + ":" + segundos, 915, 50)
}

//mouseclicked para cada vez que clickeo sobre una carta
function mouseClicked() {

  buttonSystem()

  if (pantalla === 4) {
    checkSelected(tilesN1)
  }
}

function checkSelected(cardDeck) {

  var pairsMatched = 0

  for (let i = 0; i < cardDeck.length; i++) {
    const card = cardDeck[i];
    if (dist(mouseX, mouseY, card.getPosX(), card.getPosY()) < 80) {
      if (cartasSeleccionadas.length < 2 && !card.isSelected) {
        cartasSeleccionadas.push(cardDeck[i])
        card.setIsSelected(true)
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
      isIncorrecto = true
      isCorrecto = false
      console.log("No son iguales")
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

/*
let encontroPareja = false;
let cardArrayMap = new Map();

for (let i = 0; i < cardDeck.length; i++) {
  const card = cardDeck[i];
  if (dist(mouseX, mouseY, card.getPosX(), card.getPosY()) < 80) {
    if (cartasSeleccionadas.length < 2 && !card.isSelected) {
      cartasSeleccionadas.push(cardDeck[i])
      card.setIsSelected(true)
    }
  }

  if (cardArrayMap.get(card.getPair()) === undefined) {
    cardArrayMap.set(card.getPair(), [])
  }
  cardArrayMap.get(card.getPair()).push(card.getPair(), card.isSelected)
  console.log(cardArrayMap)
}

cardArrayMap.forEach((cards, key) => {
  let found = false;
  let counter = 0;
  cards.forEach(estado => {
    if (estado === true) {
      counter++;
    }
  })
  if (counter === 2) {
    encontroPareja = true;
  }
})

if (encontroPareja) {
  //card.isMatched
  console.log("Match")
} else {

}*/









