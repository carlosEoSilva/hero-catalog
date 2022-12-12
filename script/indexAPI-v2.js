// alert();
class PaginaHerois {
  constructor (seletorContainer, url) {
    let _self = this;

    //-'container' é todo o body da página.
	  this.container = document.querySelector(seletorContainer);
    this.modal= this.container.querySelector("dialog");
    this.btnMask= this.container.querySelector(".mask");
    this.btnCloseModal= this.container.querySelector(".btn-close-modal");
    this.heroesList= this.container.querySelector(".grid-container");
    this.btnFilter = this.container.querySelector("#filter"); 
    this.btnAdd= this.container.querySelector("#add");
    this.heroNameField= this.container.querySelector("#fname");
    this.heroGender= this.container.querySelector("#fvalue");
    this.modalContainer= '';

    //-armazenar o retorno da API.
	  this.heroArray= [];
    this.modalPosition;

    //-evento de clique no botão FILTRAR
    this.btnFilter.onclick = function (event) {
      event.preventDefault(); 
      _self.clearPage();
      _self.applyFilterHeroes();
    } 

    //evento de clique no botão TODOS
    this.btnAdd.onclick= function(event){
      event.preventDefault();
      _self.clearPage();
      _self.heroCall(url);
    }

    //fechar o modal quando rolar o scroll
    window.addEventListener("scroll", function(event) {
      _self.modalPosition = this.scrollY +50;
      _self.modal.close();
      
    });

    //evento para abrir o modal
    this.heroesList.onclick= function(event){
      _self.modal.style.top = _self.modalPosition;
      event.path[0].id ? _self.modalInfo(event.path[0].id) : _self.modalInfo(event.path[4].id);
      _self.modal.show();
    }

    //preencher a pagina inicial
    _self.heroCall(url);
  }

//chamada da API
heroCall(_url){
  fetch(_url)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      this.heroArray= data;
      this.setHeroes(this.heroArray);
    })
}

//aplicar filtros de busca por sexo
applyFilterHeroes() {  
  let filteredHeroes= []; 
  let heroName= this.heroNameField.value.toLowerCase();
  let gender= this.container.querySelector("#attribute").value;
  
   if(heroName && gender){
    filteredHeroes= this.heroArray.filter((_hero)=>{
      return _hero.appearance.gender === gender && 
             _hero.name.toLowerCase().includes(heroName);
    });
  }
  
  else if(heroName){
      filteredHeroes= this.heroArray.filter((_hero)=>{
      return _hero.name.toLowerCase().includes(heroName);
    });
  }

  else if(gender){
    filteredHeroes= this.heroArray.filter((_hero)=>{
      return _hero.appearance.gender === gender;
    });
  }
  
  else{
    this.setHeroes(this.heroArray);
  }

  this.heroNameField.value= "";
  this.gender= "";
  this.clearPage();
  this.setHeroes(filteredHeroes);
}   

//limpar a pagina
clearPage(){
  let cards= this.container.querySelectorAll(".grid-item");
  cards.forEach((card)=>{
    card.remove();
  })
}

//preencher a home    
setHeroes(_heroes) {
  _heroes.forEach((hero)=>{
      let html= this.heroTemplate(hero);
      this.heroesList.insertAdjacentHTML('beforeend', html);
  })     
}

fsetHeroes(_heroes) {
  _heroes.forEach((hero)=>{
    if(hero.appearance.gender === "Female"){
      let html= this.heroTemplate(hero);
      this.heroesList.insertAdjacentHTML('beforeend', html);
    }
  })     
}

//criar os cards
heroTemplate (hero) {

  let treatedName= hero.name.length >= 15 ? hero.name.slice(0, 14) + "..." : hero.name; 

  return `
    <div id=${hero.id} class="card grid-item">
      <img class="card-image" src="${hero.images.sm}"/>
      <table class="card-table">
        <th colspan="2">${treatedName}</th>
        <tr>
            <td>Inteligência</td>
            <td>${hero.powerstats.intelligence}</td>
          </tr>

          <tr>
            <td>Força</td>
            <td>${hero.powerstats.strength}</td>
          </tr>

          <tr>
            <td>Velocidade</td>
            <td>${hero.powerstats.speed}</td>
          </tr>

          <tr>
            <td>Resistência</td>
            <td>${hero.powerstats.durability}</td>
          </tr>

          <tr>
            <td>Genero</td>
            <td>${hero.appearance.gender}</td>
          </tr>

          <tr>
            <td>Altura</td>
            <td>${hero.appearance.height[1]}</td>
          </tr>

          <tr>
            <td>Peso</td>
            <td>${hero.appearance.weight[1]}</td>
          </tr>
      </table>
</div>
`;
}

modalInfo(heroId){

  if(!heroId) return null;

  //se o modal já existir, então ele será removido da página
  this.modalContainer && this.modalContainer.remove();
  
  let clickedHero= this.heroArray.filter(hero => hero.id === parseInt(heroId));
  let modalHero= clickedHero[0];
  
  let modalHtml= `
    <div class="modal-container">
      
      <img class="modal-image" src="${modalHero.images.lg}" alt="Avatar" class="w3-left w3-circle">
      
      ${this.fillModalBiography(modalHero)}
                
    </div>
       `;
  
  this.modal.insertAdjacentHTML('beforeend', modalHtml);
  this.modalContainer= this.container.querySelector(".modal-container");
}

fillModalBiography(modalHero){

  let fontColor= modalHero.biography.alignment === "good" ? "green" : "red";

  return `
  <div class="modal-content">
    <div class="modal-header">
        <h3>${modalHero.name}</h3>
    </div>

    <div class="modal-body">
        <hr>
        <p style="color: ${fontColor}"><strong>${modalHero.biography.alignment === "good" ? "HERÓI" : "VILÃO"}</strong></p>
        <hr>
        <p><strong>Nome completo:</strong></p>
        <p style="color: ${fontColor}">${modalHero.biography.fullName}</p>
        <hr>
        <p><strong>Primeira aparição:</strong></p>
        <p style="color: ${fontColor}">${modalHero.biography.firstAppearance}</p>
        <hr>
        <p><strong>Editora:</strong></p>
        <p style="color: ${fontColor}">${modalHero.biography.publisher}</p>

        <button class="btn-close-modal w3-button w3-light-green w3-hover-red w3-round-xxlarge" onclick="document.querySelector('dialog').close();">Fechar</button>

    </div>
  </div>
  `;
}

}

const url= "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";
var myPage = new PaginaHerois("body", url);
    