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
gameGrid.sort(() => 0.5 - Math.random())
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
    count = 0
    var guesses = document.querySelectorAll('.selected');
    guesses.forEach( (card) => card.classList.remove('selected'));
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
  
    
    var counter = document.querySelector('.counter')
    counter.innerHTML = 'Current Count: ' + clicks

    if (count < 2) {
        count++
        if (count === 1) {
            clickOne = clicked.parentNode.dataset.name;
            console.log(clickOne)
            clicked.parentNode.classList.add('selected');
        } else{
            clickTwo = clicked.parentNode.dataset.name;
            console.log(clickTwo)
            clicked.parentNode.classList.add('selected')
        }
      }

    if (clickOne && clickTwo){
        if(clickOne === clickTwo){
            match();
        }
        setTimeout(resetGuess, 1000);
    }
    previousClick = clicked
  }


grid.addEventListener('click', gamePlay)

//handling button click below

var button = document.querySelector('.button')
    button.addEventListener('click', resetIt)

function resetIt (){
    gameGrid.sort(() => 0.5 - Math.random())
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