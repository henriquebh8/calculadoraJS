// calculadora usando factory function

function criaCalculadora() {
  return {
    display: document.querySelector(".display"),
    btnClear: document.querySelector(".btn-clear"),

    inicia() {
      this.cliqueBotoes(); // inicia as funções criadas pelo factory function   -> o this serve para referenciar o objeto
      this.pressionaEnter();
    },

    pressionaEnter() {
      this.display.addEventListener("keyup", e => {
        if (e.keyCode === 13) {
          //para evitar problema de referenciação no this quando se possui addEvent
          this.realizaConta(); // fazer atraves de arrow function, pois o this fica referido somente nesta função
        }
      });
    },

    deleteOne() {
      this.display.value = this.display.value.slice(0, -1);
    },
    realizaConta() {
      let conta = this.display.value;
      try {
        conta = eval(conta); // função Eval avalia o expressão de cadeia de caracteres e retorna seu valor.

        if (!conta) {
          alert("conta invalida");
          return;
        }
        this.display.value = conta;
      } catch (e) {
        alert("conta invalida");
        return;
      }
    },

    clearDisplay() {
      this.display.value = "";
    },

    cliqueBotoes() {
      // botoes serão enviados para o display para fazer operações
      document.addEventListener("click", e => {
        const el = e.target;
        if (el.classList.contains("btn-num")) {
          this.btnParaDisplay(el.innerText);
        }
        if (el.classList.contains("btn-clear")) {
          this.clearDisplay();
        }
        if (el.classList.contains("btn-del")) {
          this.deleteOne();
        }
        if (el.classList.contains("btn-eq")) {
          this.realizaConta();
        }
        this.display.focus(); // o focus vai para cada botao pressionado, podendo dar enter para efetuar a operação
      });
    },

    btnParaDisplay(valor) {
      // todos valores são recebidos pelo display
      this.display.value += valor;
    },
  };
}
const calculadora = criaCalculadora();
calculadora.inicia();

// calculadora com função construtora refatorado

/*function Calculadora() {
  this.display = document.querySelector('.display');

  this.inicia = () => {
    this.capturaCliques();
    this.capturaEnter();
  };

  this.capturaEnter = () => {
    document.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        this.realizaConta();
      }
    });
  };

  this.capturaCliques = () => {
    document.addEventListener('click', event => {
      const el = event.target;
      if (el.classList.contains('btn-num')) this.addNumDisplay(el);
      if (el.classList.contains('btn-clear')) this.clear();
      if (el.classList.contains('btn-del')) this.del();
      if (el.classList.contains('btn-eq')) this.realizaConta();
    });
  };

  this.realizaConta = () => {
    try {
      const conta = eval(this.display.value);

      if(!conta) {
        alert('Conta inválida');
        return;
      }

      this.display.value = conta;
    } catch(e) {
      alert('Conta inválida');
      return;
    }
  };

  this.addNumDisplay = el => {
    this.display.value += el.innerText;
    this.display.focus();
  };

  this.clear = () => this.display.value = '';
  this.del = () => this.display.value = this.display.value.slice(0, -1);
}

const calculadora = new Calculadora();
calculadora.inicia();
*/
