export class Menu {

    minTaille = 5
    maxTaille = 10
    type = ["Entree","Plat","Dessert"]
    // recette : 
    //http://kandra.over-blog.com/pages/ENTREE_Liste_des_recettes-1643574.html
    carteEntree = ["Gaspacho à ma façon", "Roulades de jambon à la macédoine", "Crème de maïs au gouda", "Cake salé : recette de base",
  "Carpaccio de dorade à la coriandre","Tartare de saumon","Mousse de truite à l'estragon", "Saumon fumé - asperges","Foie gras aux poires et quatre épices",
  "Foie gras aux pruneaux à l'armagnac","Crème d'avocat au thon","Verrines saumon fumé - avocat","Boulettes de thon","Crème de betterave",
  "Salade tomates - mozzarella revisitée","Salade de crevettes au curry","Salade aux lardons","Salade de fèves aux petits oignons",
  "Salade de cervelas sauce moutarde","Salade de pâtes au surimi","Pamplemousse rôti au sucre","Toasts aux sardines","Petits soufflés potiron-parmesan",
  "Soufflés au foie gras : une entrée de fête","Tartelettes caramélisées tomates cerises-mozzarella","Paniers feuilletés thon - épinards légèrement épicés",
  "Soupe épicée de poireaux au chorizo","Soupe vitaminée : carotte - orange - panais","Velouté de courge butternut - coco - curry","Soupe de carottes à l'orientale"] 
    
  // recette : 
  //http://kandra.over-blog.com/pages/PLAT_PRINCIPAL_Liste_des_recettes-1643556.html
  cartePlat = ["Le ch'ti steak au maroilles","Rôti de porc à la sauge et au citron","Porc au caramel facile","Agneau au miel et aux herbes","Tajine de boulettes kefta",
  "Hamburger maison, comme aux USA","Meat Pie (tourte au boeuf)","Poulet au cidre","Blancs de poulet gratinés au four","Farce pour volaille ",
  "Lapin au thym","Purée Chipolatas","Bien cuire un rôti - les astuces","Truite aux câpres","Pavé de saumon en croûte de sel","Sauce express pour poisson blanc : moutarde-basilic",
  "Toasts aux sardines","Pétoncles sauce curry","Tajine de sardines au citron confit","Boulettes de thon","Poisson au chorizo","Poêlée de pétoncles aux champignons",
  "Risotto : recette de base ","Risotto de poulet au cidre","Courgettes poêlées aux herbes","Crème de maïs au gouda","Potatoes à l'américaine","Poêlée de blé aux petits légumes façon risotto",
  "Tartiflette normande","Soupe de carottes à l'orientale","Quiche - recette de base","Galette complète bretonne"]

  // recette : 
  //http://kandra.over-blog.com/pages/DESSERT_Liste_des_recettes-1643609.html
  carteDessert = ["Tartelettes express aux prunes Reine-Claude","Tarte aux abricots et frangipane de pistaches","Lemon pie : la tartelette au citron express",
"Lemon pie : la tartelette au citron express","Frangipane pour tarte et galette des rois","Gâteau rapide à l'ananas",
"Tiramisu - la recette originale","Cake chocolat-pimendou","Pudding aux groseilles","Gâteau de riz au caramel",
"Clafoutis léger aux mûres","Cannelés bordelais","Le gâteau papillon : un décor facile et rapide","CheeseCake à la framboise",
"Bredele en étoiles à la cannelle : Zimtsterne","Biscuits moelleux au citron et gingembre","Confiture d'orange au whiskey",
"Pâte à tartiner noisettes chocolat","Pamplemousse rôti","Mousse de framboise","Verrine de fraises au mascarpone","Crêpes minutes"]
    entree = null;
    plat = null;
    dessert = null;

    constructor() {
      this.entree = this.getCarteRandom(this.type[0]);
      this.plat = this.getCarteRandom(this.type[1]);
      this.dessert = this.getCarteRandom(this.type[2]);
    }
  
  randomNum(min,max) {
    return Math.floor(min + (Math.random() * (max - min)))
  }

  getCarteRandom(typeSelect) {
    let taille = this.randomNum(this.minTaille,this.maxTaille);
    let carte = []
    let arrIndex = []
    while(arrIndex.length < taille){
        var r = this.randomNum(0,this.getLength(typeSelect))
        if(arrIndex.indexOf(r) === -1) {
            arrIndex.push(r);
        }
    }  
    arrIndex.forEach(indexe => {
      let elem = this.getElem(indexe,typeSelect);
      carte.push(elem);
    });    

    return carte;
  }

  getLength(typeSelect) {
    if(typeSelect == this.type[0]) {
      return this.carteEntree.length;
    }
    if(typeSelect == this.type[1]) {
      return this.cartePlat.length
    }
    if(typeSelect == this.type[2]) {
      return this.carteDessert.length
    }
  }

  getElem(indexe,typeSelect) {
    if(typeSelect == this.type[0]) {
      return this.carteEntree[indexe]
    }
    if(typeSelect == this.type[1]) {
      return this.cartePlat[indexe]
    }
    if(typeSelect == this.type[2]) {
      return this.carteDessert[indexe]
    }
  }

  getEntree() {
    return this.entree;
  }

  getPlat() {
    return this.plat;
  }

  getDessert() {
    return this.dessert;
  }

  getmin() {
    return this.minTaille;
  }
}

 