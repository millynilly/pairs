const grid = document.querySelector('.grid')
const flipped = document.querySelector('#flipped')
const matched = document.querySelector('#matched')
const path = './images/'
const cards = []
const names = ['kodak', 'tesla', 'ferrari', 'mini', 'vw', 'adobe',
    'spotify', 'chanel', 'apple', 'unsplash', 'bmw', 'starbucks']

let chosen = []
let won = []
let flips


/*Card constructor*/
function Card(name) {
    this.name = name
    this.image = path + name + '.jpg'
}

/*Create card array*/
names.forEach( name => cards.push(new Card(name)))

/*Replicate so there are 2 of each card*/
cards.push(...cards)


function createGrid() {

    let id = 0

    /*Reset score*/
    flips = 0
    flipped.textContent = 0
    matched.textContent = 0

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
        /*Check same card not chosen twice*/
        if (chosen[0].id === chosen[1].id) {
            chosen.pop()
            return
        }
        flips += 1
        flipped.textContent = flips
        setTimeout(checkMatch, 800)
    }
}


function checkMatch() {

    const tiles = document.querySelectorAll('img')
    
    /*If matched set to white image, otherwise set to blank ie. flip back over*/
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
    matched.textContent = won.length

    /*Check for win game*/
    if (won.length === cards.length/2) {
        matched.textContent = 'Win!'
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


/*Event listener for New Game button*/
document.querySelector('#new-game').addEventListener('click', () => {
    grid.innerHTML = ''
    createGrid()
})

/*Event listener for Reveal button*/
document.querySelector('#reveal').addEventListener('click', flipAllCards)



createGrid()