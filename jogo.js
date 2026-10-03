var velocidade = 1;
var jogando = false;
var recorde = localStorage.getItem("recordePokemon") || 0;

const cenario = {

    left: 0,

    jogo: document.querySelector("#jogo"),

    movimentar() {

        this.left = this.left - velocidade;

        this.jogo.style.backgroundPositionX = this.left + "px";

    },

    atualizarCenario(pontos) {

        var novoFundo = "";

        if (pontos < 50) {

            novoFundo = "url('assets/img/cenario.png')";

        } else if (pontos < 100) {

            novoFundo = "url('assets/img/cenario2.jpg')";

        } else if (pontos < 150) {

            novoFundo = "url('assets/img/cenario3.jpg')";

        } else {

            novoFundo = "url('assets/img/cenario4.jpg')";

        }

        if (this.jogo.style.backgroundImage != novoFundo) {

            this.jogo.style.backgroundImage = novoFundo;

        }

    },

    verificarGameOver() {

        if (personagem.vidas <= 0) {

            if (personagem.pontos > recorde) {

                recorde = personagem.pontos;

                localStorage.setItem("recordePokemon", recorde);

            }

            document.querySelector("#recorde").innerHTML = recorde;

            jogando = false;

            document.querySelector("#mensagemGameOver").innerHTML =
                "Você fez " + personagem.pontos + " pontos!";

            document.querySelector("#gameOver").classList.remove("escondido");

        }

    }

};


const vilao = {

    right: -153,

    item: document.querySelector("#vilao1"),

    item2: document.querySelector("#vilao2"),

    movimentar() {

        this.right = this.right + velocidade;

        this.item.style.left = this.right + "px";

        this.item2.style.left = this.right + "px";

        var larguraJogo = cenario.jogo.offsetWidth;

        if (larguraJogo < this.right) {

            this.right = -153;

            personagem.pontos = personagem.pontos + 10;

            if (personagem.pontos % 50 === 0) {

                velocidade = velocidade + 0.5;

            }

            document.querySelector("#pontos").innerHTML = personagem.pontos;

            if (personagem.pontos % 100 === 0) {

                this.mudar();

            }

        }

    },

    mudar() {

        if (personagem.pontos % 200 < 100) {

            this.item.classList.remove("escondido");

            this.item2.classList.add("escondido");

        } else {

            this.item.classList.add("escondido");

            this.item2.classList.remove("escondido");

        }

    },

    colisao() {

        var posJogador = personagem.item.getBoundingClientRect();

        var vilaoAtual;

        if (this.item.classList.contains("escondido")) {

            vilaoAtual = this.item2;

        } else {

            vilaoAtual = this.item;

        }

        var posVilao = vilaoAtual.getBoundingClientRect();

        if (
            posJogador.right > posVilao.left &&
            posJogador.left < posVilao.right &&
            posJogador.bottom > posVilao.top &&
            posJogador.top < posVilao.bottom
        ) {

            personagem.vidas = personagem.vidas - 1;

            this.right = -153;

            personagem.bottom = 70;

            personagem.item.style.bottom = "70px";

            personagem.pular = false;

            if (personagem.vidas === 2) {

                document.querySelector("#vida3").style.opacity = "0.25";

            } else if (personagem.vidas === 1) {

                document.querySelector("#vida2").style.opacity = "0.25";

            } else if (personagem.vidas === 0) {

                document.querySelector("#vida1").style.opacity = "0.25";

            }

        }

    }

};


const personagem = {

    pontos: 0,

    vidas: 3,

    bottom: 70,

    left: 120,

    pular: false,

    item: document.querySelector("#personagem"),

    movimentar() {

        if (teclaEsquerda === true) {

            this.left = this.left - 5;

        }

        if (teclaDireita === true) {

            this.left = this.left + 5;

        }

        if (this.left < 0) {

            this.left = 0;

        }

        if (this.left > cenario.jogo.offsetWidth - 153) {

            this.left = cenario.jogo.offsetWidth - 153;

        }

        this.item.style.left = this.left + "px";

        if (this.pular === true) {

            if (this.bottom < 280) {

                this.subir();

            } else {

                this.pular = false;

            }

        } else {

            if (this.bottom > 70) {

                this.descer();

            }

        }

    },

    subir() {

        this.bottom = this.bottom + velocidade;

        this.item.style.bottom = this.bottom + "px";

    },

    descer() {

        this.bottom = this.bottom - velocidade;

        this.item.style.bottom = this.bottom + "px";

    }

};


const pokebola = {

    left: -100,

    item: document.querySelector("#pokebola"),

    movimentar() {

        this.left = this.left + velocidade;

        this.item.style.left = this.left + "px";

        if (this.left > cenario.jogo.offsetWidth) {

            this.left = -100;

        }

    },

    colisao() {

        var posJogador = personagem.item.getBoundingClientRect();

        var posPokebola = this.item.getBoundingClientRect();

        if (
            posJogador.right > posPokebola.left &&
            posJogador.left < posPokebola.right &&
            posJogador.bottom > posPokebola.top &&
            posJogador.top < posPokebola.bottom
        ) {

            personagem.pontos = personagem.pontos + 20;

            document.querySelector("#pontos").innerHTML = personagem.pontos;

            this.left = -100;

        }

    }

};


var teclaEsquerda = false;
var teclaDireita = false;


setInterval(function() {

    if (jogando === true) {

        cenario.movimentar();

        vilao.movimentar();

        personagem.movimentar();

        pokebola.movimentar();

        vilao.colisao();

        pokebola.colisao();

        cenario.verificarGameOver();

        cenario.atualizarCenario(personagem.pontos);

        document.querySelector("#recorde").innerHTML = recorde;

    }

}, 10);


document.addEventListener("keydown", function(event) {

    if (jogando === true) {

        if (event.code === "Space") {

            personagem.pular = true;

        }

        if (
            event.code === "ArrowLeft" ||
            event.code === "KeyA"
        ) {

            teclaEsquerda = true;

        }

        if (
            event.code === "ArrowRight" ||
            event.code === "KeyD"
        ) {

            teclaDireita = true;

        }

    }

});


document.addEventListener("keyup", function(event) {

    if (
        event.code === "ArrowLeft" ||
        event.code === "KeyA"
    ) {

        teclaEsquerda = false;

    }

    if (
        event.code === "ArrowRight" ||
        event.code === "KeyD"
    ) {

        teclaDireita = false;

    }

});


document.querySelector("#botaoJogar").addEventListener("click", function() {

    document.querySelector("#inicio").style.display = "none";

    document.querySelector("#jogo").style.display = "block";

    document.querySelector("#gameOver").classList.add("escondido");

    personagem.pontos = 0;

    personagem.vidas = 3;

    personagem.left = 120;

    personagem.bottom = 70;

    velocidade = 1;

    vilao.right = -153;

    pokebola.left = -100;

    document.querySelector("#pontos").innerHTML = 0;

    document.querySelector("#vida1").style.opacity = "1";
    document.querySelector("#vida2").style.opacity = "1";
    document.querySelector("#vida3").style.opacity = "1";

    vilao.item.classList.remove("escondido");
    vilao.item2.classList.add("escondido");

    jogando = true;

});


document.querySelector("#botaoReiniciar").addEventListener("click", function() {

    document.querySelector("#gameOver").classList.add("escondido");

    document.querySelector("#inicio").style.display = "none";

    document.querySelector("#jogo").style.display = "block";

    personagem.pontos = 0;

    personagem.vidas = 3;

    personagem.left = 120;

    personagem.bottom = 70;

    velocidade = 1;

    vilao.right = -153;

    pokebola.left = -100;

    document.querySelector("#pontos").innerHTML = 0;

    document.querySelector("#vida1").style.opacity = "1";
    document.querySelector("#vida2").style.opacity = "1";
    document.querySelector("#vida3").style.opacity = "1";

    vilao.item.classList.remove("escondido");
    vilao.item2.classList.add("escondido");

    jogando = true;

});