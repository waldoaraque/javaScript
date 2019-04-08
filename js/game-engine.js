const lightblue = document.getElementById('lightblue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const btnInit = document.getElementById('btnInit')
const LAST_LEVEL = 10

class Game {
  constructor() {
    this.init = this.init.bind(this)
    this.init()
    this.generateSequence()
    setTimeout( () => this.nextLevel(), 500)
  }

  init() {
    this.nextLevel = this.nextLevel.bind(this)
    this.selectColor = this.selectColor.bind(this)
    this.toggleBtnInit()
    this.level = 1
    this.colors = {
      lightblue,
      violet,
      orange,
      green
    }
  }

  toggleBtnInit() {
    if (btnInit.classList.contains('hide')) {
      btnInit.classList.remove('hide')
    } else {
      btnInit.classList.add('hide')
    }
  }

  generateSequence() {
    //       Math.random value 0 and 1
    this.sequence = new Array(LAST_LEVEL).fill(0).map( n => Math.floor(Math.random() * 4) )
  }

  nextLevel() {
    this.sublevel = 0
    this.illuminateSequence()
    this.addClickEvent()
  }

  numberTocolor(num) {
    switch (num) {
      case 0:
        return 'lightblue'
      case 1:
        return 'violet'
      case 2:
        return 'orange'
      case 3:
        return 'green'
    }
  }

  colorTonumber(color) {
    switch (color) {
      case 'lightblue':
        return 0
      case 'violet':
        return 1
      case 'orange':
        return 2
      case 'green':
        return 3
    }
  }

  illuminateSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.numberTocolor(this.sequence[i])
      setTimeout(() => {
        this.illuminateColor(color)
        //console.log(color)
      }, 1000 * i)
    }
  }

  illuminateColor(color) {
    this.colors[color].classList.add('light')
    setTimeout(() => this.colorOff(color), 350)
  }

  colorOff(color) {
    this.colors[color].classList.remove('light')
  }

  addClickEvent() {
    this.colors.lightblue.addEventListener('click', this.selectColor)
    this.colors.green.addEventListener('click', this.selectColor)
    this.colors.violet.addEventListener('click', this.selectColor)
    this.colors.orange.addEventListener('click', this.selectColor)
  }

  deleteClickEvent() {
    this.colors.lightblue.removeEventListener('click', this.selectColor)
    this.colors.green.removeEventListener('click', this.selectColor)
    this.colors.violet.removeEventListener('click', this.selectColor)
    this.colors.orange.removeEventListener('click', this.selectColor)
  }

  selectColor(ev) {
    const nameColor = ev.target.dataset.color
    //console.log(nameColor)
    const nroColor = this.colorTonumber(nameColor)
    this.illuminateColor(nameColor)
    if (nroColor === this.sequence[this.sublevel]) {
      this.sublevel++
      if (this.sublevel === this.level) {
        this.level++
        swal('GOOD!', `You past the level ${this.level}`, 'success')
        .then( () => {
          console.log('Level passed')
        })
        .catch( (err) => {
          console.log(err)
        })
        console.log(`Game Level: ${this.level}`)
        if (this.level === (LAST_LEVEL + 1)) {
          // GANÓ
          this.winGame()
          console.log('Winner!!')
        } else {
          setTimeout(() => this.nextLevel(), 2500)
        }
      }
    } else {
      //PERDIÓ
      this.lostGame()
      console.log('Losser!!')
    }
  }

  winGame() {
    swal('CONGRATULATIONS', 'You win the game!', 'success')
      .then( () => {
        this.init()
      })
      .catch( (err) => {
        console.log(err)
      })
  }

  lostGame() {
    swal('SORRY x.X', 'You lost the game!', 'error')
      .then( () => {
        this.deleteClickEvent()
        this.init()
      })
      .catch( (err) => {
        console.log(err)
      })
  }

}

function initGame() {
  window.game = new Game()

}
