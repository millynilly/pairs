const grid = document.querySelector('.grid')
const cards = []
const path = './images/'
let chosen = []
let won = []


function Card(name) {
    this.name = name
    this.image = path + name + '.jpg'
}


/*Create card array*/
cards.push(new Card('kodak'))
cards.push(new Card('tesla'))

/*Replicate so there are 2 of each*/
cards.push(...cards)
console.log(cards)


function createGrid() {

    let id = 0

    /*Shuffle the cards*/
    cards.sort( () => .5 - Math.random())
    
    /*Add the cards face down to the grid*/
    cards.forEach( () => {
        let card = document.createElement('img')
        card.setAttribute('src', path + 'blank.jpg')
        card.setAttribute('data-id', id)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
        id += 1
    })
}


function flipCard() {
    let id = this.getAttribute('data-id')
    let card = {name: cards[id].name, id: id}

    chosen.push(card)

    /*Flip the card*/
    this.setAttribute('src', cards[id].image)

    /*If 2 cards have been flipped, check for a match*/
    if (chosen.length === 2) {
        setTimeout(checkMatch, 1000)
    }
}


function checkMatch() {

    const tiles = document.querySelectorAll('img')
    const score = document.querySelector('#score')

    if (chosen[0].name === chosen[1].name) {
        chosen.forEach( tile => {
            tiles[tile.id].setAttribute('src', path + 'white.png')
        })
        won.push(chosen)
    } else {
        chosen.forEach( tile => {
            tiles[tile.id].setAttribute('src', path + 'blank.jpg')
        })
    }

    /*Clear chosen pair*/
    chosen = []

    /*Update score*/
    score.textContent = won.length

    /*Check for win game*/
    if (won.length === cards.length/2) {
        score.textContent = 'Win!'
        won = []
        setTimeout(flipAllCards, 1000)
    }
}

function flipAllCards() {
    const tiles = document.querySelectorAll('img')
    let i = 0

    tiles.forEach( tile => {
        tile.setAttribute('src', cards[i].image)
        i += 1
    })
}

document.querySelector('button').addEventListener('click', () => {
    grid.innerHTML = ''
    createGrid()
})


createGrid()