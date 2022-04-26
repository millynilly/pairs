const cards = []
const path = './images/'
let chosen = []
let won = []


function Card(name, image) {
    this.name = name
    this.image = path + image
}


/*Create card array*/
cards.push(new Card('kodak', 'kodak.jpg'))
cards.push(new Card('tesla', 'tesla.jpg'))

/*Replicate so there are 2 of each*/
cards.push(...cards)
console.log(cards)


function createGrid() {

    const grid = document.querySelector('.grid')
    let id = 0

    /*Shuffle the cards*/
    cards.sort( () => .5 - Math.random())
    
    /*Add the cards to the grid*/
    cards.forEach( () => {
        let card = document.createElement('img')
        card.setAttribute('src', 'images/blank.jpg')
        card.setAttribute('data-id', id)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
        id += 1
    })
}


function flipCard() {
    let id = this.getAttribute('data-id')
    let card = {name: cards[id].name, id: id}
console.log(card)
    chosen.push(card)
    this.setAttribute('src', cards[id].image)

    if (chosen.length === 2) {
        setTimeout(checkMatch, 1000)
    }
}


function checkMatch() {

    const cards = document.querySelectorAll('img')
    const score = document.querySelector('#score')

    if (chosen[0].name === chosen[1].name) {
        chosen.forEach( card => {
            cards[card.id].setAttribute('src', path + 'white.png')
        })
        won.push(chosen)
    } else {
        chosen.forEach( card => {
            cards[card.id].setAttribute('src', path + 'blank.jpg')
        })
    }

    /*Clear chosen pair*/
    chosen = []

    /*Update score*/
    score.textContent = won.length

    /*Check for win game*/
    if (won.length === cards.length/2) {
        score.textContent = 'Win!'
        //flipAllCards()

    //    if (prompt('Play again?') !== null) {
    //        won = []
    //        createBoard()
    //    }
    }
}

createGrid()