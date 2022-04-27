const grid = document.querySelector('.grid')
const flipped = document.querySelector('#flipped')
const matched = document.querySelector('#matched')
const path = './images/'
const blank = 'blank-3.jpg'
const cards = []
const credits = []
const names = ['kodak', 'tesla', 'ferrari', 'mini', 'vw', 'adobe',
    'spotify', 'chanel', 'apple', 'unsplash', 'bmw', 'starbucks']
// const authors = ['Adam Birkett', 'Priscilla Du Preez', 'okeykat', 'James Lee', 'Moritz Mentges', '', '', '', '', 'Javier Esteban', '', '']
// const linksImage = ['GD7VU0daiaQ', 'jRjHSce08Os','jpnAjN5j0Ro', 'msFTpW3g9CA', '5MlBMYDsGBY', '', '', '', '', '8At6XBgVyyY', '', '']
// const linksAuthor = ['abirkett', 'priscilladupreez', 'okeykat', 'picsbyjameslee', 'mphotographym', '', '', '', '', 'javiestebaan', '', '']

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

/*Replicate cards so there are 2 of each*/
cards.push(...cards)

/*Credit constructor*/
function Credit(name, linkI, linkA) {
    this.name = name
    this.linkA = 'https://unsplash.com/@' + linkA
    this.linkI = 'https://unsplash.com/photos/' + linkI
    this.img = ''
}

/*Create image credits array*/
credits.push(new Credit('Adam Birkett', 'GD7VU0daiaQ', 'abirkett'))
credits.push(new Credit('Priscilla Du Preez', 'jRjHSce08Os', 'priscilladupreez'))
credits.push(new Credit('okeykat', 'jpnAjN5j0Ro', 'okeykat'))
credits.push(new Credit('James Lee', 'msFTpW3g9CA', 'picsbyjameslee'))
credits.push(new Credit('Moritz Mentges', '5MlBMYDsGBY', 'mphotographym'))
credits.push(new Credit('Rubaitul Azad', 'gDXPCmktFdY', 'rubaitulazad'))
credits.push(new Credit('Rubaitul Azad', 'istJD3vU4zI', 'rubaitulazad'))
credits.push(new Credit('Laura Chouette', '5fWfcnBoNeY', 'laurachouette'))
credits.push(new Credit('Alex Kalinin', '6xtlCkulGXA', 'loaldesign'))
credits.push(new Credit('Javier Esteban', '8At6XBgVyyY', 'javiestebaan'))
credits.push(new Credit('Julian Hochgesang', 'wHS333BqBkI', 'julianhochgesang'))
credits.push(new Credit('Khadeeja Yasser', '3U9L9Chc3is', 'k_yasser'))


for (let i = 0; i < names.length; i++) {
    credits[i].img = cards[i].image
    console.log(credits[i])
}


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
        card.setAttribute('src', path + blank)
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
            tiles[tile.id].setAttribute('src', path + blank)
        })
    }

    /*Clear chosen pair*/
    chosen = []

    /*Update score*/
    matched.textContent = won.length

    /*Check for win game*/
    if (won.length === cards.length/2) {
        matched.textContent = 'all of them. Win!'
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


/*Event listeners for buttons*/
document.querySelector('#new-game').addEventListener('click', () => {
    grid.innerHTML = ''
    createGrid()
})

document.querySelector('#reveal').addEventListener('click', flipAllCards)



/*Credits section*/
function createCredits() {

    credits.forEach( (c) => {
        let credit = document.createElement('div')
        let linkI = document.createElement('a')
        let img = document.createElement('img')
        let linkT = document.createElement('a')

        img.setAttribute('src', c.img)
        linkI.setAttribute('href', c.linkI)
        linkI.setAttribute('target', '_blank')
        linkI.appendChild(img)

        linkT.setAttribute('href', c.linkA)
        linkT.setAttribute('target', '_blank')
        linkT.textContent = c.name

        credit.classList.add('credit')
        credit.appendChild(linkI)
        credit.appendChild(linkT)
        document.querySelector('#credits').appendChild(credit)
    })
    
}



createGrid()
createCredits()