const $search = document.querySelector('.Gsearch')
const container = document.querySelector('.cardsContainer')
const pokiURL = 'https://pokeapi.co/api/v2'
const $back = document.querySelector('.next_back')


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

window.addEventListener('load', () =>{
    getReq(`${pokiURL}/pokemon`, `offset=0&limit=9999`, res =>{
        temp = res.results.map(item => cardsTodo(item)).join('')
        container.innerHTML = temp
    });
})

function cardsTodo(item){
    const name = item.name.toUpperCase()
    return`
        <div class="pokemon_GG_cont" >
            <button onclick="linkPokemon('${item.url}')" class="pok_name">${name}</button>
        </div>
    `
}

$search.addEventListener('input', e => {
    const value = e.target.value.toUpperCase()
    console.log(value);
    if (!value) {
        window.location.reload()
    }else{
        getReq(`${pokiURL}/pokemon`, 'offset=0&limit=9999', res =>{
            const filtereName = res.results.filter(({name}) =>{ 
                if (name.toUpperCase().includes(value)) {
                    return` `
                }
                
            })
            console.log(filtereName);
            getReq(`${pokiURL}/pokemon`, 'offset=0&limit=20', res =>{
                const temp = filtereName.map(item => cardsTodo(item)).join('')
                container.innerHTML = temp
            });
        })
    }
})
function linkPokemon(url){
    $back.innerHTML = `
    <div>
        <button style="color="rgb(8, 20, 78)" onclick="backSite()">Back</button>
    </div>
`
    getReq (url, '', res =>{
        const type = res.types.map(item => {
            return`
                <p>${item.type.name}</p>
            `
        })
        // console.log(url);
        console.log(res);

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
                                <p>Type</p>
                            <div class="type">
                                <div>
                                    ${type}
                                </div>
                            </div>
                            <div class="special">
                            <p>special attack / defense</p> 
                                <div>
                                    <p>${res.stats[3].base_stat}/</p>
                                    <p>${res.stats[4].base_stat}</p>
                                </div>
                                
                            </div>
                            <div class="height">
                            <p>Height</p>
                                <div>
                                    <p>${res.height}0 сm</p>
                                </div>
                                
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
    window.location.reload( )
}