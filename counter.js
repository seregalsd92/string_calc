"use strict";
let counter = {
    // Запуск расчетов и вывод результата.
    startCount(expr) {
        let workStr = expr.replace(/\s/g, '');
        let place = this.bracketsParser(workStr);
        let result = document.getElementById('result');
        result.innerText = 'Результат: ' + place;
    },
    // Рекурсивно парсит скобки от первой правой ')' до ближайшей левой '(' слева и вызывает executor для выражения в скобках
    bracketsParser(workStr) {
        let step1 = workStr.match(/\)/);
        if (step1 != null) {
            let res = null;
            let endRightPos = step1.index;
            let startLeftPos = step1.index;
            do {
                startLeftPos--;
            } while (!/\(/.test(workStr[startLeftPos]));
            res = this.executor(workStr.slice(startLeftPos+1,endRightPos));
            return this.bracketsParser(workStr.slice(0,startLeftPos)+res+workStr.slice(endRightPos+1));
        }
        return this.executor(workStr);
    },
    // Ищет слева на право сперва символы * и /, после + и - и выполняет операцию над ближайшим левым и правым числом. Вызывается рекурсивно, пока не останется одно число.
    executor(workStr) {
        let step2 = workStr.match(/[*/]/);
        if (step2 != null) {
            let res = null;
            let nums = this.getNumsAndPoses(step2);
            if (step2[0] == '*') {
                res = nums.leftNum * nums.rightNum;
            }
            if (step2[0] == '/') {
                res = nums.leftNum / nums.rightNum;
            }
            return this.executor(workStr.slice(0,nums.startPosLeftNum)+res+workStr.slice(nums.endPosRightNum+1));
        }
        let step3 = workStr.match(/[+-]/);
        if (step3 != null) {
            if (workStr.startsWith('--')) {
                return this.executor(workStr.slice(2))
            } else if (step3.index == 0 && step3[0] == '-') {
                let regexp = /[+-]/g;
                regexp.lastIndex = 1;
                step3 = regexp.exec(workStr);
                if (step3 != null) {
                    let res = null;
                    let nums = this.getNumsAndPoses(step3, true);
                    if (step3[0] == '+') {
                        res = nums.leftNum + nums.rightNum;
                    }
                    if (step3[0] == '-') {
                        res = nums.leftNum - nums.rightNum;
                    }
                    return this.executor(workStr.slice(0,nums.startPosLeftNum)+res+workStr.slice(nums.endPosRightNum+1));
                } else {
                    return Number(workStr);
                }
            } else {
                let res = null;
                let nums = this.getNumsAndPoses(step3);
                if (step3[0] == '+') {
                    res = nums.leftNum + nums.rightNum;
                }
                if (step3[0] == '-') {
                    res = nums.leftNum - nums.rightNum;
                }
                return this.executor(workStr.slice(0,nums.startPosLeftNum)+res+workStr.slice(nums.endPosRightNum+1));
            }     
        }
        return Number(workStr);
    },
    // Возвращает ближайшее к математическому знаку левое и правое числа, а так же крайнюю левую и правую их позиции для дальнейшей обрезки строки.
    getNumsAndPoses(step, minusFlag) {
        let startLeftNumPos = step.index;
        let endRightNumPos = step.index;
        while (/[\d.]/.test(step.input[startLeftNumPos-1])) {
            startLeftNumPos--;
        }
        if (minusFlag == true) {
            startLeftNumPos -= 1;
        }
        if (step.input[step.index+1] == '-') {
            endRightNumPos = step.index+1;
        }
        while (/[\d.]/.test(step.input[endRightNumPos+1])) {
            endRightNumPos++;
        }
        let num1 = Number(step.input.substring(startLeftNumPos,step.index));
        let num2 = Number(step.input.substring(step.index+1,endRightNumPos+1));
        return {
            leftNum: num1,
            rightNum: num2,
            startPosLeftNum: startLeftNumPos,
            endPosRightNum: endRightNumPos
        };
    }
};