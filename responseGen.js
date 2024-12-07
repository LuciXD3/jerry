/*global chrome*/

function contarPalabrasContenidas(cadenaA, cadenaB) {
    cadenaA = cadenaA.toLowerCase();
    cadenaB = cadenaB.toLowerCase();
    
    const palabrasA = cadenaA.split(/\s+/);
    const palabrasB = cadenaB.split(/\s+/);
    
    let contador = 0;
    
    palabrasA.forEach(palabra => {
        if (palabrasB.includes(palabra)) {
            contador++;
        }
    });
    
    return contador;
}

function obtenerNodosDeTextoRecursivos(elemento) {
    if (!elemento) return [];
    
    return Array.from(elemento.childNodes)
        .flatMap(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                return [node.textContent.trim()];
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                return obtenerNodosDeTextoRecursivos(node);
            } else {
                return [];
            }
        });
}

function elementoConRespuestaCorrecta(arrayElementos, respuesta) {
    let elementoAMarcar;
    let maxPContenidas = 0;
    
    arrayElementos.forEach(elemento => {
        const textoElem = obtenerNodosDeTextoRecursivos(elemento);
        const palCont = contarPalabrasContenidas(respuesta, textoElem.join(' '));
        
        if (palCont >= maxPContenidas) {
            maxPContenidas = palCont;
            elementoAMarcar = elemento;
        }
    });
    
    return elementoAMarcar;
}

function marcarRadioEnPadre(elemento) {
    if (elemento) {
        const radioInput = elemento.parentElement.querySelector('input[type="radio"]');
        if (radioInput) {
            radioInput.checked = true;
        }
    }
}

function inlocuiesteIntrebareaCuRaspuns(event, raspunsGenerat) {
    const intrebareElement = event.target.closest('.qtext');
    if (intrebareElement) {
        const divRaspuns = document.createElement('div');
        divRaspuns.classList.add('animacion-contenedorEXT35', 'aparecer');
        divRaspuns.style.marginRight = '15px';

        const divFlex = document.createElement('div');
        divFlex.style.display = 'flex';

        const imgElement = document.createElement('img');
        imgElement.src = chrome.runtime.getURL('geco2.png');
        imgElement.alt = 'Texto alternativo';
        imgElement.width = 27;
        imgElement.height = 27;
        imgElement.style.marginRight = '10px';

        const divText = document.createElement('div');
        divText.style.marginTop = '4px';
        divText.style.textAlign = 'justify';
        divText.textContent = raspunsGenerat;

        divFlex.appendChild(imgElement);
        divFlex.appendChild(divText);
        divRaspuns.appendChild(divFlex);

        intrebareElement.replaceWith(divRaspuns);
    }
}

const createPopup = () => {
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.style.position = 'fixed';
    popup.style.bottom = '0';
    popup.style.right = '0';
    popup.style.width = '3px';
    popup.style.height = '3px';
    popup.style.backgroundColor = 'black';
    popup.style.zIndex = '1000';
    popup.style.display = 'none';
    document.body.appendChild(popup);
};

const showPopup = (answerText) => {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'block';
        popup.textContent = answerText;
    }
};

chrome.runtime.onMessage.addListener((answer, sender, sendResponse) => {
    if (answer.tipo === "AnswerGen") {
        const divFormsExt = document.getElementsByClassName("formulation clearfix");
        const questionElement = divFormsExt[answer.num];
        questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        inlocuiesteIntrebareaCuRaspuns({ target: questionElement }, answer.data);
        showPopup(answer.data);
    }
});

window.addEventListener('load', () => {
    createPopup();
});
