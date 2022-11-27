// alert();
class PaginaHerois {
  constructor (seletorContainer, heroes) {
    let _self = this;
    this.container = document.querySelector(seletorContainer);//container = todo o body da página.
    this.btnFilter = this.container.querySelector("#filter"); 
    this.heroesList= this.container.querySelector(".grid-container");
    modal= this.container.querySelector('#modal');
    overlay= this.container.querySelector('#overlay');
    test= _sel.container.querySelector("body");


    //event listener para acionar o filtro
    _self.btnFilter.onclick = function (event) {
      event.preventDefault(); 
      _self.applyFilterHeroes();
    } 

    _self.modal.onclick= function(){
      modal.classList.add('active');
      overlay.classList.add('active');
    };

    _self.overlay.onclick= function(){
      modal.classList.remove('active');
      overlay.classList.remove('active');
    }

   
    
    

    //preencher a pagina inicial
    _self.setHeroes(heroes);
  }

//preencher a home    
setHeroes(_heroes) {
    _heroes.forEach((hero)=>{
        let html= this.heroTemplate(hero);
        this.heroesList.insertAdjacentHTML('beforeend', html);
    })     
}
        
//aplicar filtros de busca
applyFilterHeroes() {  
    console.log("start filter");
    this.clearPage();

    let heroNameField= this.container.querySelector("#fname");
    let heroName= heroNameField.value.toLowerCase();
    let attribute= this.container.querySelector("#attribute").value;
    let comparison= this.container.querySelector("#compare").value;
    let attrValue= Number(this.container.querySelector("#fvalue").value);
    let filteredHeroes= [];
    
    if(heroName && attrValue){
      
      switch(comparison){
        case '===':
          filteredHeroes= heroes.filter((_hero)=>{
            return _hero.friendly === heroName && _hero[attribute] === attrValue;
          });
        break;
        
        case '>':
          filteredHeroes= heroes.filter((_hero)=>{
            return _hero.friendly === heroName && _hero[attribute] > attrValue;
          });
        break;
        
        case '<':
          filteredHeroes= heroes.filter((_hero)=>{
            return _hero.friendly === heroName && _hero[attribute] < attrValue;
          });
        break;
      }

      //this.setHeroes(filteredHeroes);
      
    }else if(heroName){
      filteredHeroes = [];
      console.log("por nome");
      filteredHeroes= heroes.filter((_hero)=>{
        return _hero.friendly === heroName;
      });

    }else if(attrValue){
      switch(comparison){
        case '===':
          filteredHeroes= heroes.filter((_hero)=>{
            return _hero[attribute] === attrValue;
          });
        break;
        
        case '>':
          filteredHeroes= heroes.filter((_hero)=>{
            return _hero[attribute] > attrValue;
          });
        break;
        
        case '<':
          filteredHeroes= heroes.filter((_hero)=>{
            return _hero[attribute] < attrValue;
          });
        break;
      }
      
    }else{
      this.setHeroes(heroes);
    }

    heroNameField.value= "";
    this.setHeroes(filteredHeroes);
    
}    

//limpar a pagina
clearPage(){
  let cards= this.container.querySelectorAll(".grid-item");
  cards.forEach((card)=>{
    card.remove();
  })
}

//criar os cards
heroTemplate (hero) {
    return `
    <div class="card grid-item">
    <img class="card-image" src="../img/heroes/${hero.friendly}.jpg"/>
    <table class="card-table">
        <th colspan="2">${hero.name}</th>
        <tr>
            <td>Inteligência</td>
            <td>${hero.intelligence}</td>
          </tr>

          <tr>
            <td>Força</td>
            <td>${hero.strength}</td>
          </tr>

          <tr>
            <td>Velocidade</td>
            <td>${hero.speed}</td>
          </tr>

          <tr>
            <td>Resistência</td>
            <td>${hero.durability}</td>
          </tr>

          <tr>
            <td>Genero</td>
            <td>${hero.gender}</td>
          </tr>

          <tr>
            <td>Altura</td>
            <td>${hero.height}</td>
          </tr>

          <tr>
            <td>Peso</td>
            <td>${hero.weight}</td>
          </tr>
    </table>
</div>
`;
}

}

// console.log(heroes);
console.log("START");
var myPage = new PaginaHerois("body", heroes);
    