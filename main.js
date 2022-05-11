"use strict";

let calc = {
    counter,
    num: null,

    init() {
        this.setEventHandlers();
    },

    setEventHandlers() {
        document.querySelector('#main button').onclick =  function () {
            calc.setfields();
            calc.startCountHandler(calc.num)
        };
        document.querySelector('#main input').addEventListener('keydown', function(event) {
            if (event.code == 'Enter') {
                calc.setfields();
                calc.startCountHandler(calc.num)
            }
        });
        document.getElementById('resetButton').addEventListener('click', () => this.reset());
    },

    setfields () {
        this.num = document.querySelector('#main input').value;
    },

    startCountHandler(expr) {
        this.counter.startCount(expr);
    },

    reset() {
        document.querySelector('#main input').value = "";
        document.getElementById('result').innerText = "";
    }

};

window.onload = function () {
    calc.init();
};
