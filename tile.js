//Objeto carta que recibe una posicion x,y y una imagen de como se vera la carta arriba------------
class Tile {

  constructor(x, y, img, pair,id) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.selectedimg = selectedimg
    this.matchedimg = matchedimg
    this.img = img
    this.isSelected = false
    this.isMatched = false
    this.pair = pair
    this.id=id
  }

  render(ratio) {

    this.width = 696.22 * ratio
    this.height = 843.54 * ratio

    imageMode(CENTER)
    image(this.img, this.x, this.y, this.width, this.height)

    if (this.isSelected) {
      image(this.selectedimg, this.x - 5, this.y - 3, this.width * 1.02, this.height * 1.02)
    }
    if (this.isMatched) {
      image(this.matchedimg, this.x, this.y, this.width, this.height)
    }

    imageMode(CORNER)

  }

  setIsSelected(isSelected) {
    this.isSelected = isSelected
  }

  getIsSelected() {
    return this.isSelected
  }

  setIsMatched(isMatched) {
   // this.setIsSelected(false)
    this.isMatched = isMatched
  }

  getIsMatched() {
    return this.isMatched
  }

  getPair() {
    return this.pair
  }

  getPosX() {
    return this.x
  }

  getPosY() {
    return this.y
  }

  getId() {
    return this.id;
  }
}