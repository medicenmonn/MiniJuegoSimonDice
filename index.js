

const verde = document.getElementById('verde')
const violeta = document.getElementById('violeta')
const azul = document.getElementById('azul')
const amarillo = document.getElementById('amarillo')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 12


class Juego {
constructor() {
    
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)
}  

inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.colores = {
        verde,
        violeta,
        azul,
        amarillo
    }
}

toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains('hide')) {
        btnEmpezar.classList.remove('hide')
    } else {
        btnEmpezar.classList.add('hide')
    }
}

generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
}

siguienteNivel() {
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
    
}

transformarNumeroAColor(num) {
    switch (num) {
        case 0:
            return 'verde'
        case 1:
            return 'violeta'
        case 2: 
            return 'azul'
        case 3:
            return 'amarillo'
    }
}

transformarColorANumero(color) {
    switch (color) {
        case 'verde':
            return 0
        case 'violeta':
            return 1
        case 'azul': 
            return 2
        case 'amarillo':
            return 3
    }
}

iluminarSecuencia() {
    for (var i = 0; i < this.nivel; i++) {
        const color = this.transformarNumeroAColor(this.secuencia[i])
        setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
}

iluminarColor(color) {
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
}

apagarColor(color) {
    this.colores[color].classList.remove('light')
}

agregarEventosClick() {
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.azul.addEventListener('click', this.elegirColor)
    this.colores.amarillo.addEventListener('click', this.elegirColor)
}

eliminarEventosClick() {
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.azul.removeEventListener('click', this.elegirColor)
    this.colores.amarillo.removeEventListener('click', this.elegirColor) 
}

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
            if (this.nivel === (ULTIMO_NIVEL + 1)) {
                this.ganoElJuego()
            } else {
                setTimeout(this.siguienteNivel, 1500)
            }

            }
        } else {
            this.perdioElJuego()
        }
    }

    ganoElJuego() {
        swal('Mini Game','Felicitaciones.. Ganaste!', 'success')
        .then(this.inicializar())
    }

    perdioElJuego() {
        swal('MiniGame','Whoops, perdiste :(', 'error')
        .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
        })
    }
}

function empezarJuego() {
  window.juego = new Juego()
}
