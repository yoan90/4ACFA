Vue.prototype.$http = axios
const app = new Vue({
  el: '#app',
  data: {
    currentPage: 'connexion',
    currentPage2: 'non_connecte',
    currentPage3: 'Homme',

    produit: [{
      name:'woman Shoes',
      prix: 300,
      src: '/stylesheets/anniv1.jpg',
      stock:10,
      type: 'Femme'
    },{
      name:'woman Shoes',
      prix: 300,
      src: '/stylesheets/anniv2.jpg',
      stock:10,
      type: 'Femme'
    },{
      name:'woman Shoes',
      prix: 300,
      src: '/stylesheets/anniv3.jpg',
      stock:10,
      type: 'Femme'
    },{
      name:'child Shoes',
      prix: 300,
      src: '/stylesheets/conf1.jpg',
      stock:10,
      type: 'Enfant'
    },{
      name:'child Shoes',
      prix: 300,
      src: '/stylesheets/conf2.jpg',
      stock:10,
      type: 'Enfant'
    },{
      name:'child Shoes',
      prix: 300,
      src: '/stylesheets/conf3.jpg',
      stock:10,
      type: 'Enfant'
    },
    {
      name:'Man Shoes',
      prix: 300,
      src: '/stylesheets/nikeh3.jpg',
      stock:10,
      type: 'Homme'
    },{
      name:'Man Shoes',
      prix: 300,
      src: '/stylesheets/nikeh2.jpg',
      stock:10,
      type: 'Homme'
    },{
      name:'Man Shoes',
      prix: 300,
      src: '/stylesheets/nikeh1.jpg',
      stock:10,
      type: 'Homme'
    }


  ],
  myList: [],
  email: '',
  password:'',
  password2:'',
  date:'',
  quantité:'',

  paniers: [],
},
created () {
  this.$http.get('/user')
  .then((user) => {
    console.log('affichage de mon user', user)
    this.myList = user.data
  })
  .catch(function (err) {
    console.log('error', err)
  })

  this.$http.get('/panier')
  .then((panier) => {
    this.paniers = panier.data
    console.log(this.paniers[0].nomProduit);

    //  console.log(this.paniers);
    //console.log(this.paniers[0]);
    /*for (var i = 0; i < panier.data.length; i++) {
    this.paniers[i].nomProduit= panier.data[i].nomProduit;
    this.paniers[i].prixProduit= panier.data[i].prixProduit;
    this.paniers[i].dateReservation= panier.data[i].dateReservation;
    this.paniers[i].idUser=panier.data[i].idUser;

  }*/


})
.catch(function (err) {
  console.log('error', err)
})

},
methods: {
  ajouterPanier: function (index,quantité) {
    console.log(this.email);
    console.log(index);
    console.log(quantité);
    if (quantité!='') {


      this.$http.post('/panier', {
        nomProduit:this.produit[index].name,
        prixProduit:this.produit[index].prix,
        quantity: quantité,
        idUser:this.email
      })
      .then(() => {
        this.myList.push({
          nomProduit:this.produit[index].name,
          prixProduit:this.produit[index].prix,
          quantity:quantité,
          idUser:this.email
        })
      })

    }else {
      document.getElementById('no_date').innerHTML = "<p>choisissez une date</p>";
    }
    this.$http.get('/panier')
    .then((panier) => {
      this.paniers = panier.data
      console.log(this.paniers[0].nomProduit);




    })
    .catch(function (err) {
      console.log('error', err)
    })




  },

  payer: function(){
    confirm('vous avez payé merci')
  },

  supprimer: function(index) {

    console.log("dans la fonction suppr");
    this.$http.delete('/panier',index)
    .then((panier)=> {

      console.log('coucou');
      this.paniers.splice(index,1)

    }).catch(function (err) {
      console.log('error', err)
    })

  },
  f_inscription: function(){
    console.log("ok");
    console.log(this.email);
    console.log(this.password);
    console.log(this.date);
    if (this.email != '' && this.password !='' && this.date != '') {

      this.$http.get('/user')
      .then((user) => {
        var exist;
        exist = 0;
        for (var i = 0; i < user.data.length; i++) {
          if(this.email == user.data[i].email){
            exist = 1;

          }
        }
        if (exist != 1) {
          this.$http.post('/user', {
            email: this.email,
            password: this.password,
            date: this.date
          })
          .then(() => {
            this.myList.push({
              email: this.email,
              password: this.password,
              date: this.date
            })
          })
          this.currentPage='connexion';
        }else {
          document.getElementById('incorrect-inscri').innerHTML = "<p>Email deja utilisé</p>";
        }
      })

    }else{
      document.getElementById('incorrect-inscri').innerHTML = "<p>Veuiller remplir tous les champs</p>";
    }

  },
  verifPassword: function(){
    //console.log(this.myList);



    this.$http.get('/user')
    .then((user) => {

      console.log(user.data.length)
      console.log(user.data[0].password)

      for (var i = 0; i < user.data.length; i++) {

        if (this.email==user.data[i].email && this.password==user.data[i].password) {
          console.log('connecte');
          this.currentPage2='connecte';



        }else {
          console.log('mauvais password');

          document.getElementById('incorrect-pwd').innerHTML = "<p>email ou password invalide</p>";
        }
      }

    })
    .catch(function (err) {
      console.log('error', err)
    })

  },
  deconnection: function(){
    this.currentPage2 = 'non_connecte'
  }


}


})