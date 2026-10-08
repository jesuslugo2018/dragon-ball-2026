const API = 'https://pokeapi.co/api/v2/pokemon/ditto';
const APIRICK = 'https://rickandmortyapi.com/api/character';
const DRAGONAPI = 'https://dragonball-api.com/api/characters';


async function fetchData() {

    try {
        const pokemonName = document.getElementById("pokemonName").value;
        console.log(pokemonName);
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            
            throw new Error('Could not fetch resource');
        }

        const data = await response.json();
        console.log(data);
        const pokemonImgData = data.sprites.other.home.front_default;
        const pokeImg = document.getElementById('pokemon-picture');
        pokeImg.src = pokemonImgData;
        
    } 
    catch(errr) {
        console.error(errr);
    }
    
}

async function fetchDataRick() {
        const characterImg = document.getElementById('img-rick');
        const characterName = document.getElementById('character-name');
        const response = await fetch(APIRICK);
        if(!response.ok) {
           throw new Error('Could not fetch resource');
        }
        const dataResponse = await response.json();
        //console.log('Esto trae la respuesta -->', dataResponse.results[0].name );
        characterName.textContent =  dataResponse.results[1].name;
        characterImg.src = dataResponse.results[1].image; 

        
    }


    const btnDragon = document.getElementById('btn-dragon');
    const container = document.getElementById('dragon-ball-container');
    const inputSearch = document.getElementById('input-search');

    btnDragon.addEventListener('click', async () => {
        const response = await fetch(DRAGONAPI);
        const dataResponse = await response.json();
        dataResponse.items.forEach(character => {
            const card = document.createElement("div");
            card.classList.add('character-border'); // propiedad classList sirve para agregar o quitar clases CSS de un elemento html
            card.innerHTML =
                `<img id='img-dragon' src= '${character.image}'>
                 <h2>${character.name}</h2>
                 <p>Raza: ${character.race}</p>
                 <p>Ki: ${character.ki}</p> `
                ;
            container.appendChild(card); // permite crear un nuevo elemento o nodo a la lista, es decir es el que va a hacer que las tarjetas se ordenen en forma de lista
        });
    })

     function showResult(results){
        console.log('esto trae el results ==>', results);
        container.innerHTML = "";
        results.forEach( characterFilter => {
            const card = document.createElement("div");
            card.classList.add('character-border');
            card.innerHTML = `
                 <img id='img-dragon' src= '${characterFilter.image}'>
                 <h2>${characterFilter.name}</h2>
                 <p>Raza: ${characterFilter.race}</p>
                 <p>Ki: ${characterFilter.ki}</p>`;
            card.addEventListener('click', () => {
                showDescriptionCharacter(characterFilter);
            })
            container.appendChild(card);     
        }) 
    }

    async function filterCharacter(){
        const inputSearch = document.getElementById('input-search');
        inputSearch.addEventListener('input',async (evento) => {
            //const card = document.createElement("div");
            const response = await fetch(DRAGONAPI);
            const dataResponse = await response.json();
            const dataResponseArray = dataResponse.items;
            const textUser = evento.target.value.toLowerCase();
            if (!textUser == '') {
                const resultFilter = dataResponseArray.filter( items => items.name.toLowerCase().includes(textUser));
                 showResult(resultFilter);
            } else {
                console.log('entra al else');
                const arrayVacio = [];
                
                showResult(arrayVacio);
            }
            
        })
    }


    function showDescriptionCharacter(value){
        const containerModal = document.getElementById('main-modal');
        const descriptionText = document.getElementById('description-character');
        const closeModalButton = document.getElementById('close-modal');
        containerModal.style.display = "block";
        descriptionText.innerText = value.description;
        closeModalButton.addEventListener('click' , ()=> {
            containerModal.style.display = 'none';
        })  
    }

    

