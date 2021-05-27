
const pokiURL = 'https://pokeapi.co/api/v2'
const $search = document.querySelector('.Gsearch')
const $next = document.querySelector('.next')
const $back = document.querySelector('.back')
const $next_back = document.querySelector('.next_back')
$page = document.querySelector('.page')
const limit= 20
const total_pokemons = 1118;
const total_pages = Math.floor(total_pokemons / limit)
let pageCounter = 1;
let offset = 0  ;


const getReq = (url, query, cb) =>{
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `${url}?${query}`)
    xhr.addEventListener('load', () =>{
        const response = JSON.parse(xhr.response)
        cb(response)
    })
    xhr.addEventListener('error', err =>{
        console.log(err);
    })
    xhr.send()
}

const container = document.querySelector('.cardsContainer')
window.addEventListener('load', () =>{
    getReq(`${pokiURL}/pokemon`, `offset=${offset}&limit=${limit}`, res =>{
        temp = res.results.map(item => cardsTodo(item)).join('')
        container.innerHTML = temp
    });
})
$next.addEventListener('click', e =>{
    console.log(offset + limit);
    e.preventDefault()
    $back.removeAttribute('disabled')
    if (pageCounter >= 1 &&  pageCounter <= total_pokemons) {
        if (pageCounter === total_pages){
            $next.setAttribute('disabled', true)
            getReq(`${pokiURL}/pokemon`, `offset=${offset += limit}&limit=${limit}`, res =>{
                pageCounter++
                $page.innerHTML = pageCounter;
                const temp = res.results.map(item => cardsTodo(item)).join('');
                container.innerHTML = temp
            })
        }else{
            getReq(`${pokiURL}/pokemon`, `offset=${offset += limit}&limit=${limit}`, res =>{
                pageCounter++
                $page.innerHTML = pageCounter;
                const temp = res.results.map(item => cardsTodo(item)).join('');
                container.innerHTML = temp
            })

        }
    }
})

$back.setAttribute('disabled', true)
$back.addEventListener('click', e => {
    e.preventDefault()
    pageCounter--;
    if (pageCounter == 0) {
        pageCounter++
    }
    console.log(pageCounter);
    if (pageCounter >= 1){
        if (pageCounter === 1){
            $back.setAttribute('disabled', true)
            offset = 0;
            getReq(`${pokiURL}/pokemon`, `offset=${offset}&limit=${limit}`, res =>{
                $page.innerHTML = pageCounter;
                const temp = res.results.map(item => cardsTodo(item)).join('');
                container.innerHTML = temp
                console.log(res);
            })
        }else{
            $next.removeAttribute('disabled')
            getReq(`${pokiURL}/pokemon`, `offset=${offset -= limit}&limit=${limit}`, res =>{
                $page.innerHTML = pageCounter;
                const temp = res.results.map(item => cardsTodo(item)).join('');
                container.innerHTML = temp
                console.log(res);
            })
        }
    }
})
function cardsTodo(item){
    const name = item.name.toUpperCase()
    return`
        <div class="pokemon_GG_cont" >
            <button onclick="linkPokemon('${item.url}')" class="pok_name">${name}</button>
        </div>
    `
}
function linkPokemon(url){
    getReq (url, '', res =>{
        const type = res.types.map(item => {
            return`
                <p>${item.type.name}</p>
            `
        })
        console.log(res);
        $next_back.innerHTML = `
            <div class="next_back">
                <div>
                    <button style="color="rgb(8, 20, 78)" onclick="backSite()">Back</button>
                </div>
            </div>
        `
        console.log(url);
        container.innerHTML = `
            <div class="cont_GG_card">
                <div class="GG_card">
                    <div class="img_card">
                        <img style="width: 70%;" src="${res.sprites.other.dream_world.front_default}" alt="">
                    </div>
                    <div class="all_skil">
                        <div class="pokemon_name">
                            <h1 style="margin: auto;">${res.name}</h1>
                        </div>
                        <div class="skil_head">
                            <div class="type">
                                <div>
                                    ${type}
                                </div>
                                Type
                            </div>
                            <div class="special">
                                <div>
                                    <p>${res.stats[3].base_stat}/</p>
                                    <p>${res.stats[4].base_stat}</p>
                                </div>
                                special attack / defense
                            </div>
                            <div class="height">
                                <div>
                                    <p>${res.height}0 сm</p>
                                </div>
                                height
                            </div>
                        </div>
                        <div class="skil_body">
                            <h2>Basic stats</h2>
                            <div class="skil">
                                <p>Health</p>
                                <p>${res.stats[0].base_stat} hp</p>
                            </div>
                            <div class="skil">
                                <p>Force</p>
                                <p>${res.stats[5].base_stat} atk</p>
                            </div>
                            <div class="skil">
                                <p>defense</p>
                                <p>${res.stats[2].base_stat} def</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            `
        })
}
function backSite(){
    window.location.reload()
}
// 
// hp
// attack
// defense
// special-attack
// special-defense
// speed

// const xhr = new XMLHttpRequest
// xhr.open('GET', `${pokiURL}`)
// const response = JSON.parse(xhr.response)
//  const cb =(response)
// console.log(cb);
// console.log(xhr);