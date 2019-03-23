const pasterArray = [
	{name: 'cannelloni', img: 'pastas/cannelloni.png',},
	{name: 'farfalle', img: 'pastas/farfalle.png',},
	{name: 'fettuccini', img: 'pastas/fettuccini.png',},
	{name: 'fusilli', img: 'pastas/fusilli.png',},
	{name: 'penne', img: 'pastas/penne.png',},
	{name: 'riccioli', img: 'pastas/riccioli.png',},
	{name: 'tagliatelle', img: 'pastas/tagliatelle.png',},
    {name: 'tortellini', img:'pastas/tortellini.png',},
    {name: 'pici', img: 'pastas/pici.png'},
    {name: 'lasagne', img: 'pastas/lasagne.png'},
    {name: 'croxetti', img: 'pastas/croxetti.png'},
    {name: 'fiori', img: 'pastas/fiori.png'}
]
let clicks = 0
let count = 0
let clickOne = ''
let clickTwo = ''
let previousClick = null

// building game grid below

const gameGrid = pasterArray.concat(pasterArray)
const game = document.getElementById('game')
const grid = document.createElement('section')
grid.className = 'grid'
game.appendChild(grid)

gameGrid.forEach( paster => {
    
    const card = document.createElement('div')
    card.className = 'card'
    card.dataset.name = paster.name

    const front = document.createElement('div')
    front.className = 'front'
    front.style.backgroundImage = 'url(pastas/pot.png)'

    const back = document.createElement('div')
    back.className = 'back'
    back.style.backgroundImage = `url(${paster.img})`
    
    grid.appendChild(card)
    card.appendChild(front)
    card.appendChild(back)

})

// handling gameplay below

function match (){
    let selected = document.querySelectorAll('.selected')
    selected.forEach( (card) => card.classList.add('match'))
}

function resetGuess (){
    clickOne = ''
    clickTwo = ''
    previousClick = null
}

function gamePlay(event){

    clicks ++
    let clicked = event.target

    if (clicked.nodeName === 'SECTION' ||
        clicked === previousClick ||
        clicked.parentNode.classList.contains('selected') ||
        clicked.parentNode.classList.contains('match')) {
      return
    }
  
    clicked.classList.add('selected')
    var counter = document.querySelector('.counter')
    counter.innerHTML = 'Current Count: ' + clicks

    if (count < 2) {
        count++
        clicked.parentNode.classList.add('selected');
      }
  }


grid.addEventListener('click', gamePlay) 

//handling button click below

var button = document.querySelector('.button')
    button.addEventListener('click', randomIze)
    button.addEventListener('click', resetIt)

function randomIze(){
    gameGrid.sort(() => 0.5 - Math.random())
  }

function resetIt (){
    clicks = 0
    clickOne = ''
    clickTwo = ''
    previousClick = null
    var counter = document.querySelector('.counter')
    counter.innerHTML = 'Current Count: 0' 
    var select = document.querySelectorAll('.selected')
    select.forEach( (card) => card.classList.remove('selected'))
    var match = document.querySelectorAll('.match')
    match.forEach( (card) => card.classList.remove('match'))
}