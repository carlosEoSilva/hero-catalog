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
    this.inputAttrNumber= this.container.querySelector("#fvalue");
    //-armazenar o retorno da API.
	  this.heroArray= [];
    this.modalPosition;

    //-evento de clique no botão FILTRAR
    this.btnFilter.onclick = function (event) {
      event.preventDefault(); 
      _self.clearPage();
      _self.applyFilterHeroes();
    } 

    //evento de clique no botão ADICIONAR
    this.btnAdd.onclick= function(event){
      event.preventDefault();
      _self.clearPage();
      _self.heroCall(url);
    }

    window.addEventListener("scroll", function(event) {
      _self.modalPosition = this.scrollY +50;
      _self.modal.close();
    });

    //evento para abrir o modal
    this.heroesList.onclick= function(event){
      _self.modal.style.top = _self.modalPosition;
      _self.modal.show();
      console.log(event);
    }

    //evento para fechar o modal
    this.btnCloseModal.onclick= function(){
      _self.modal.close();
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

//aplicar filtros de busca
applyFilterHeroes() {  
    let filteredHeroes= []; 
    let attrValue= Number(this.inputAttrNumber.value);
    let heroName= this.heroNameField.value.toLowerCase();
    let attribute= this.container.querySelector("#attribute").value;
    let comparison= this.container.querySelector("#compare").value;

    if(heroName && attrValue){
      switch(comparison){
        case '===':
          filteredHeroes= heroes.filter((_hero)=>{
            return _hero.name.toLowerCase() === heroName && _hero.powerstats[attribute] === attrValue;
          });
        break;
        
        case '>':
          filteredHeroes= heroes.filter((_hero)=>{
            _hero.name= _hero.name.toLowerCase();
            return _hero.name.toLowerCase() === heroName && _hero.powerstats[attribute] > attrValue;
          });
        break;
        
        case '<':
          filteredHeroes= heroes.filter((_hero)=>{
            return  _hero.name.toLowerCase() === heroName && _hero.powerstats[attribute] < attrValue;
          });
        break;
      }

      //this.setHeroes(filteredHeroes);
      
    }
    else if(heroName){
        filteredHeroes= this.heroArray.filter((_hero)=>{
        return _hero.name.toLowerCase() === heroName;
      });

    }
    else if(attrValue){
      switch(comparison){
        case '===':
          filteredHeroes= this.heroArray.filter((_hero)=>{
            return _hero.powerstats[attribute] === attrValue;
          });
        break;
        
        case '>':
          filteredHeroes= this.heroArray.filter((_hero)=>{
            return _hero.powerstats[attribute] > attrValue;
          });
        break;
        
        case '<':
          filteredHeroes= this.heroArray.filter((_hero)=>{
            return  _hero.powerstats[attribute] < attrValue;
          });
        break;
      }
    }
    else{
      this.setHeroes(this.heroArray);
    }

    this.heroNameField.value= "";
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
    return `
    <div id=${hero.id} class="card grid-item">
    <img class="card-image" src="${hero.images.sm}"/>
    <table class="card-table">
        <th colspan="2">${hero.name}</th>
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

}

const url= "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";
var myPage = new PaginaHerois("body", url);
    