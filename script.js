let titre = document.getElementById('titre')
        let note = document.getElementById('note')
        let enregistre = document.querySelector('.valide')
        let activation = document.querySelector('.second_input')

        let contentBloc = document.querySelector('.contenu')
        let tab = JSON.parse(localStorage.getItem('montab')) || []

        titre.addEventListener('click', affichage)

        function affichage(){
            activation.classList.add('active')
        }

        enregistre.addEventListener('click', ajoutbloc)

        function ajoutbloc(){
            if(activation.classList.contains('active')){
                activation.classList.remove('active')
            }

            let infor = {
                titreSaisi : titre.value,
                noteSaisi : note.value
            }

            if (infor.titreSaisi === '' || infor.noteSaisi === '') {
                return
            }

            creationdiv(infor)
            tab.push(infor)
            console.log(tab)

            sauvegarde(tab)

            titre.value = ''
            note.value = ''
        }

        function creationdiv(e){
            if(e.titreSaisi === '' || e.noteSaisi === ''){
                return
            }
            let cree = document.createElement('div')
            cree.classList.add('carte')
            cree.innerHTML = `
                                    <h5>${e.titreSaisi}</h5>
                                    <p class="paragraphe">${e.noteSaisi}</p>
                                    <div class="barre">
                                        <div class="couleurs">
                                            <i class="fa-solid fa-palette palette"></i>
                                            <div class="les_couleurs">
                                                <span class="neutre"><i class="fa-solid fa-droplet-slash"></i></span>
                                                <span class="vert"></span>
                                                <span class="jaune"></span>
                                                <span class="rouge"></span>
                                            </div>
                                        </div>
                                        <p class="heur"></p>
                                        <p class="supprime">X</p>
                                    </div>
                                `
            contentBloc.appendChild(cree)

            afficheur(cree)
            changeurCouleur(cree)
            heure(cree)

            let supprime = cree.querySelector('.supprime')
            supprime.addEventListener('click', () => {
                let mytitre = cree.querySelector('h5').textContent
                let mynote = cree.querySelector('.paragraphe').textContent
                let enleve = tab.findIndex((el) => el.titreSaisi === mytitre && el.noteSaisi === mynote)
                if(enleve !== -1){
                    tab.splice(enleve, 1)
                }
                console.log(tab)
                cree.remove()
                sauvegarde(tab)
            })
            sauvegarde(tab)
        }

        function afficheur(e){
            let barreCouleur = e.querySelector('.les_couleurs')
            let afichecouleur = e.querySelector('.palette')
            afichecouleur.addEventListener('click', () => {
                barreCouleur.classList.toggle('active')
            })
        }

        function changeurCouleur(e){
            let neutre = e.querySelector('.neutre')
            let vert = e.querySelector('.vert')
            let jaune = e.querySelector('.jaune')
            let rouge = e.querySelector('.rouge')

            
            neutre.addEventListener('click', () => {
                e.style.backgroundColor = '#212121'
            })
            vert.addEventListener('click', () => {
                e.style.backgroundColor = 'rgb(0, 82, 0)'
            })
            jaune.addEventListener('click', () => {
                e.style.backgroundColor = 'rgb(107, 104, 0)'
            })
            rouge.addEventListener('click', () => {
                e.style.backgroundColor = 'rgb(88, 0, 0)'
            })
        }

        function heure(e){
            let aficheHeur = e.querySelector('.heur')
            let lesjours = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']
            let lesMois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']

            let date = new Date()

            let lheure = date.getHours()
            let lmois = date.getMonth()
            let ljour = date.getDay()
            let jour = date.getDate()
            let lminute = date.getMinutes()
            let lsecond = date.getSeconds()
            let lanne = date.getFullYear()

            aficheHeur.innerText = `${lesjours[ljour]} ${jour} ${lesMois[lmois]} ${lanne} - ${lheure}:${lminute}:${lsecond}`
        }

        function sauvegarde(letab){
            localStorage.setItem('montab', JSON.stringify(letab))
        }

        function recupere(){
            let recupere = localStorage.getItem('montab') || '[]';
            let conver = JSON.parse(recupere)
            if(conver.length){
                conver.forEach((element) => {
                    creationdiv(element)
                });
            }
        }
        
        recupere()