'use strict'

//Estas son las variables que uso en el programa
let tiles = []

const filas = 3
const columnas = 4

let cartaAbajo
let cartasArriba

let imagesDeck = []
let cartasVolteadas = []
let delayStartFC = null

//numero de intentos que hago
let numeroIntentos = 0

//Objeto carta que recibe una posicion x,y y una imagen de como se vera la carta arriba------------
class Tile {
  constructor(x, y, cartaArriba) {
    this.x = x
    this.y = y
    this.width = 250
    this.cartaAbajo = cartaAbajo
    this.cartaArriba = cartaArriba
    this.isFaceUp = false
  }

  //el metodo render lo usamos principalmente como un draw que luego llamaremos en un draw general
  render() {
    fill(0, 0, 0)
    stroke(255, 255, 255)
    strokeWeight(4)
    rect(this.x, this.y, this.width, this.width)


    //esto me dice que si clickee mi carta, entonces que cambie la imagen 
    if (this.isFaceUp === true) {
      image(this.cartaArriba, this.x, this.y, this.width, this.width)
    } else {
      image(this.cartaAbajo, this.x + 40, this.y + 40, 20, 20)
    }
  }

  //esto pregunta si mi carta esta arriba, para poder anadirla a un array de cartas arriba, ese array luego lo usamos para poder comparar las 2 cartas que estan arriba
  setIsFaceUp(isFaceUp) {
    this.isFaceUp = isFaceUp
  }

  //esto pregunta si mi mouse esta por encima de tal carta para asi voltear esa y no otra 
  isUnderMouse(x, y) {
    return x >= this.x && x <= this.x + this.width  &&
      y >= this.y && y <= this.y + this.width
  }
}

//Esto crea cada una de las cartas
function createTiles() {
  for (let i = 0; i < columnas; i++) {
    for (let j = 0; j < filas; j++) {
      tiles.push(new Tile(i * 280 + 40, j * 280 + 40, imagesDeck.pop()))
    }
  }
}


//esto es para actualizar la posicion de las cartas si encuentro un match y sino para que las voltee again

function updateGameLogic() {
  if (delayStartFC && (frameCount - delayStartFC) > 30) {
    for (let i = 0 ;i < tiles.length; i++) {
      if (!tiles[i].isMatch && tiles[i].isFaceUp) {
        tiles[i].setIsFaceUp(false)
      }
    }
    cartasVolteadas = []
    delayStartFC = null
  }
}

//Aqui ponemos las cartas
function loadcartasArriba() {
  cartasArriba = [
    loadImage("assets/azul.png"),
    loadImage("assets/cafe.png"),
    loadImage("assets/colorPiel.png"),
    loadImage("assets/oro.png"),
    loadImage("assets/rojoRoa.png"),
    loadImage("assets/verdeOscuro.png"),
  ]
}

//esto es para crear todas las plataformas para mis cartas, en donde van a estar
function createImagesDeck(images) {
  for (let i = 0; i < cartasArriba.length; i++) {
    imagesDeck.push(images[i])
    imagesDeck.push(images[i])
  }

  imagesDeck.sort(function() {
    return 0.5 - random()
  })
}

//esto es el metodo que se activa cuando gano
function drawScoringMessage() {
  let foundAllMatches = true

  for (let i = 0 ;i < tiles.length; i++) {
    foundAllMatches = foundAllMatches && tiles[i].isMatch
  }

  if (foundAllMatches) {
    fill(0, 0, 0)
    text("Ganaste ", 20, 360)
  }
}

function setup() {
  createCanvas(1352, 1352)

  //aqui cargas como se veria tu carta boca abajo
  cartaAbajo = loadImage("../assets/cartaAbajo.png")
  loadcartasArriba();

  createImagesDeck(cartasArriba);
  createTiles();
}

//en el draw siempre estamos actualizando la logica del juego por si alguna vez cambian las cosas
function draw() {
  updateGameLogic()

  //pinto todas mis cartas
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].render();
  }
//pregunto si gane
  drawScoringMessage();
}

//mouseclicked para cada vez que clickeo sobre una carta
function mouseClicked() {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].isUnderMouse(mouseX, mouseY)) {
      if (cartasVolteadas.length < 2 && !tiles[i].isFaceUp) {
        tiles[i].setIsFaceUp(true)
        cartasVolteadas.push(tiles[i])
        if (cartasVolteadas.length === 2) {
          numeroIntentos++
          if (cartasVolteadas[0].cartaArriba === cartasVolteadas[1].cartaArriba) {
            cartasVolteadas[0].isMatch = true
            cartasVolteadas[1].isMatch = true
          }
          delayStartFC = frameCount;
        }
      }
    }
  }
}
