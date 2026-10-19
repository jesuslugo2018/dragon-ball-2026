const DRAGONAPI = 'https://dragonball-api.com/api/characters?limit=30';

const btnDragon = document.getElementById('btn-dragon');
const container = document.getElementById('dragon-ball-container');
const inputSearch = document.getElementById('input-search');

     async function getCharacters() {
        const response = await fetch(DRAGONAPI);
        const dataResponse = await response.json();
        dataResponse.items.forEach( character => {
            const card = document.createElement("div");
            card.classList.add('character-border'); // propiedad classList sirve para agregar o quitar clases CSS de un elemento html
            card.innerHTML =
                `<img id='img-dragon' src= '${character.image}'>
                 <h2>${character.name}</h2>
                 <p>Raza: ${character.race}</p>
                 <p>Ki: ${character.ki}</p> `;
            card.addEventListener('click', () => {
                showDescriptionCharacter(character); // aqui va a ir lo que falta para que muestre la descripcion del personaje
            })    
            container.appendChild(card);
        });
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
                container.innerHTML = ''; // aqui estoy vaciando el contenedor que va a traer las cards
                getCharacters(); // y aqui se llama esta funcion para volver a traer todos los personajes 
            }
            
        })
    }

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
    
    function registerEventsButton() { // Esta es la funcion que registra los eventos.
        const pagesBtn = document.querySelectorAll('.btn-page');
        pagesBtn.forEach( currentBtn =>{
            currentBtn.addEventListener('click', (event)=>{
                const currentEventPage = event.currentTarget.dataset.page;
                changesPages(currentEventPage);
            })
        })
    }

    async function changesPages(currentPageDragon) { // OJO ESTE NUEVA FUNCION ES SOLO UNA PARTE, FALTA CREAR LA FUNCION QUE REGISTRE O TOME LOS EVENTOS DE DAR CLICK AL BOTON DE CAMBIAR PAGINA
        const DRAGONBALLAPI = `https://dragonball-api.com/api/characters?page=${currentPageDragon}&limit=20`;
        const response = await fetch(DRAGONBALLAPI);
        const dataResponseP = await response.json();
        const responsePageItems = dataResponseP.items;
        showResult(responsePageItems);
        
    }

    getCharacters();
    registerEventsButton();

    

