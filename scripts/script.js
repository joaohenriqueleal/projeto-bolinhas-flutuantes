"use strict"

const palco = document.getElementById('palco')
const num_objetos = document.getElementById('num_objetos')
const txt_qtde = document.getElementById('txt_qtde')
const btn_add = document.getElementById('btn_add')
const btn_remover = document.getElementById('btn_remover')

let largura_palco = palco.offsetWidth
let altura_palco = palco.offsetHeight

let bolas = []
let numero_bolas = 0

class Bola {
    constructor(array_bolas, palco) {
        this.tamanho = Math.floor(Math.random() * 15) + 10
        this.r = Math.floor(Math.random() * 255)
        this.g = Math.floor(Math.random() * 255)
        this.b = Math.floor(Math.random() * 255)
        this.pX = Math.floor(Math.random() * (largura_palco - this.tamanho))
        this.pY = this.px = Math.floor(Math.random() * (altura_palco - this.tamanho))
        this.velX = Math.floor(Math.random() * 2) + 0.5
        this.velY = Math.floor(Math.random() * 2) + 0.5
        this.dirX = (Math.random() * 10) > 5 ? 1 : -1
        this.dirY = (Math.random() * 10) > 5 ? 1 : -1
        this.palco = palco
        this.array_bolas = array_bolas
        this.id = Date.now() + "_" + Math.floor(Math.random() * 100000000000)
        this.draw_ball()
        this.controle = setInterval(() => this.control_ball(), 10)
        this.eu = document.getElementById(this.id)
        numero_bolas++
        num_objetos.innerHTML = numero_bolas
    }

    my_position = () => { return this.array_bolas.indexOf(this) }

    remove_ball = () => {
        clearInterval(this.controle)
        this.eu.remove()
        let pos = this.array_bolas.indexOf(this)
        if (pos !== -1) {
            this.array_bolas.splice(pos, 1)
        }
        numero_bolas--
        num_objetos.innerHTML = numero_bolas
    } 

    draw_ball = () => {
        const div = document.createElement('div')
        div.setAttribute("id", this.id)
        div.setAttribute("class", 'bola')
        div.setAttribute("style", `left: ${this.pX}px; top: ${this.pY}px; width: ${this.tamanho}px; height: ${this.tamanho}px; background-color: rgb(${this.r}, ${this.g}, ${this.b});`)
        this.palco.appendChild(div)
    }

    colision_with_boards = () => {
        if (this.pX + this.tamanho >= largura_palco) {
            this.dirX = -1
        }
        else if (this.pX <= 0) {
            this.dirX = 1
        }
        if (this.pY + this.tamanho >= altura_palco) {
            this.dirY = -1
        }
        else if (this.pY <= 0) {
            this.dirY = 1
        }
    }

    control_ball = () => {
        this.colision_with_boards()
        this.pX += this.dirX * this.velX
        this.pY += this.dirY * this.velY
        this.eu.setAttribute("style", `left: ${this.pX}px; top: ${this.pY}px; width: ${this.tamanho}px; height: ${this.tamanho}px; background-color: rgb(${this.r}, ${this.g}, ${this.b});`)
    }

}

window.addEventListener('resize', (event) => {
    largura_palco = palco.offsetWidth
    altura_palco = palco.offsetHeight
})

btn_add.addEventListener('click', (event) => {
    const qtde = txt_qtde.value
    for (let i=0; i<qtde; ++i) {
        bolas.push(new Bola(bolas, palco))
    }
})

btn_remover.addEventListener('click', (event) => {
    for (let i = bolas.length - 1; i >= 0; i--) {
        bolas[i].remove_ball()
    }
})
