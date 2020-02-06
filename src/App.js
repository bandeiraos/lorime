import React, { useState, useEffect } from 'react';
import WORDS from './words'
import './style.css'

import Logo from './assets/Lorime.svg'
import DorimeMp3 from './assets/dorime.mp3'
import Rat1 from './assets/rato_1.png'

function App() {

  const [parAmnt, setParAmnt] = useState(5)
  const [text, setText] = useState('')
  const [holding, setHolding] = useState(false)
  const [onDorime, setOnDorime] = useState(false)

  useEffect(() => {
    lorime()
  }, [parAmnt])

  function lorime() {
    let full = ''
    for (let i = 0; i < parAmnt; i++) {
      full = full + getParagraph() + '\n\n'
    }
    setText(full.trim())
  }

  function getParagraph() {
    const random = Math.floor(Math.random() * 3)
    const phrAmnt = random >= 1 ? 5 : 7;
    let par = ''
    for (let i = 0; i < phrAmnt; i++) {
      let phr = getPhrase(!random >= 1 ? 9 : 13)
      par = par + phr + ' '
    }

    return par.trim()
  }

  function getPhrase(phrLen) {
    let phr = '';
    let _words = WORDS;

    for (let i = 0; i < phrLen; i++) {
      const word = _words[Math.floor(Math.random() * _words.length)];
      phr = phr + word + ' '
      _words = _words.filter(a => word !== a)
    }

    phr = firstUpper(phr)
    phr = decideComma(phr)

    return phr + '.'
  }

  function firstUpper(phr) {
    return phr[0].toUpperCase() + phr.slice(1).trim()
  }

  function decideComma(phr) {
    let random = Math.floor(Math.random() * 3);
    let putComma = random >= 1 // 66% chance to insert comma
    if (putComma) {
      let arr = phr.split(" ")
      let posWordToComma = random === 1 ? 3 : 4 // "randomic"(3rd or 4th word) comma position
      arr[posWordToComma] = arr[posWordToComma] + ','
      phr = arr.join(' ');
    }
    return phr
  }

  function handleMouseMove() {
    if (holding) {
      console.log('xxxxxxxxx')

    }
  }

  function handleCopiare() {
    const right = document.getElementById('right')
    const copiare = document.getElementById('copiare')
    const audio = document.getElementById('audio')
    const rato = document.getElementById('rato1')
    const btnUp = document.getElementById('btn-up')
  
    
    setOnDorime(true)
    audio.play()
    right.select()
    document.execCommand('copy')
    btnUp.focus()
    copiare.innerHTML = 'Lorime!'
    rato.classList.add('rato-ativo')
    setTimeout(() => {
      rato.classList.remove('rato-ativo')
      copiare.disabled = false
      copiare.innerHTML = 'Copiare emulari'
      copiare.focus()
      setOnDorime(false)
    }, 3000)
  }

  return (
    <div className="app" onMouseMove={() => handleMouseMove()}
      onMouseDown={() => setHolding(true)}
      onMouseUp={() => setHolding(false)}
    >
      <div className='logo' id='logo'>
        <img src={Logo} alt='lorime' />
      </div>
      <div className='left'>
        <div className='counter'>
          <span>
            {parAmnt}
          </span>
          <div className='btns'>
            <button id='btn-up' onClick={() => setParAmnt(parAmnt + 1)}>
              <div />
            </button>
            <button onClick={parAmnt === 1 ? null : () => setParAmnt(parAmnt - 1)}>
              <div />
            </button>
          </div>
        </div>

        <div className='bottom-wrpr'>
          <p>
            Proudly created <br />and developed by <br />
            <a href='http://vitorscarpato.com'>Vitor Scarpato</a>,<br />
            <a href='https://www.instagram.com/thales.muniz/'>Thales Muniz</a> &<br />
            <a href='https://www.instagram.com/bandeiraos/'>Pedro Bandeira</a><br />
          </p>

          <button 
          disabled={onDorime}
          onClick={() => handleCopiare()} id='copiare'>Copiare emulari</button>
        </div>
      </div>

      <textarea className='right' id='right' readOnly value={text} />

      <audio id='audio'>
        <source src={DorimeMp3} type="audio/mpeg" />
      </audio>

      <img id='rato1' src={Rat1} alt='lorime' />
    </div>
  );
}

export default App;
