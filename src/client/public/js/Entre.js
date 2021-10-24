let minTaille = 5
let maxTaille = 10

let carteDispo = ["Gaspacho à ma façon", "Roulades de jambon à la macédoine", "Crème de maïs au gouda", "Cake salé : recette de base",
"Carpaccio de dorade à la coriandre","Tartare de saumon","Mousse de truite à l'estragon", "Saumon fumé - asperges","Foie gras aux poires et quatre épices",
"Foie gras aux pruneaux à l'armagnac","Crème d'avocat au thon","Verrines saumon fumé - avocat","Boulettes de thon","Crème de betterave",
"Salade tomates - mozzarella revisitée","Salade de crevettes au curry","Salade aux lardons","Salade de fèves aux petits oignons",
"Salade de cervelas sauce moutarde","Salade de pâtes au surimi","Pamplemousse rôti au sucre","Toasts aux sardines","Petits soufflés potiron-parmesan",
"Soufflés au foie gras : une entrée de fête","Tartelettes caramélisées tomates cerises-mozzarella","Paniers feuilletés thon - épinards légèrement épicés",
"Soupe épicée de poireaux au chorizo","Soupe vitaminée : carotte - orange - panais","Velouté de courge butternut - coco - curry","Soupe de carottes à l'orientale "] 


class Entre {
    constructor() {
      this.taille = this.randomNum(minTaille,maxTaille);
      this.carte = getCarteRandom(this.taille)
      this.carte = largeur;
    }
  }

  function randomNum(min,max ) {
    return Math.floor(min + (Math.random() * (max - min)))
  }

  function getCarteRandom(taille) {
    let carte = []
    while(arrIndex.length < taille){
        var r = Math.floor(Math.random()*10) + 1;
        if(arrIndex.indexOf(r) === -1) {
            arrIndex.push(r);
            carte.push(carteDispo[r]);
        }
    }

      
  }


  



