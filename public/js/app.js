const memberList = document.getElementById('member-list')
const numberMember = document.getElementById('number-member')
const pagination = document.querySelector('.pagination')

//Function to load the list of Argonautes
function getData(url = 'api/argonaute') {

    //Image loading css
    memberList.innerHTML = '<div class="loading-spinner-rolling"><div class="loading-spinner"><div></div>';

    fetch(url)
    .then(response => response.json())
    .then((data) =>  {
        
        if(data) 
        {
            //Reset the div
            memberList.innerHTML = "";
            pagination.innerHTML = '';

            //If data Display members
            numberMember.innerHTML = data.total;
            data.data.forEach(user => {
                memberList.innerHTML+= '<div class="member-item">'+user.name+'</div>'
            });

            //Display pagination
            if(data.links) {
                
                data.links.forEach(page => {
                    var actuel = page.active ? 'active' : ''; // Is the active page ? add class active

                    // Traduction Prévious and Next in french
                    if(page.label == '&laquo; Previous') 
                        label = '< Précedent';
                    else if(page.label == 'Next &raquo;')
                        label = 'Suivant >';
                    else 
                        label = page.label

                    pagination.innerHTML += '<li><a class="page-item '+actuel+'" href="'+page.url+'">'+label+'</a></li>';
                })

                //Select all page items
                const pageItem = document.querySelectorAll('.page-item')
                
                //For each item of page, add listener
                pageItem.forEach((elem) => {
                    
                    elem.addEventListener('click', (e) => {
                        e.preventDefault(); 
                        getData(elem.href); //We load the fetch
                    }
                    );
                });

            }
        } else 
        {
            // If no data display an error message
            memberList.innerHTML = "";
            memberList.innerHTML = '<div class="errors">Erreur lors de la récupération des données</div><br />'
        }
           
    })

}

//Loading data when open the page
getData();


const sendingForm = document.getElementById('memberForm');
const message = document.getElementById('message');

// -- When sending Form --
sendingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Reset the div and the class for notification message
    message.className = ""
    message.innerHTML = ''

    const formData = new FormData(sendingForm);

    //Send with method post to execute store method in laravel
    fetch('/api/argonaute', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            },
        body: JSON.stringify(Object.fromEntries(formData))
    })
        .then(response => response.json())
        .then((data) => {
            
            if(data.errors) 
            {
                //Error notification
                let elem = document.createElement("div");
                elem.classList.add('errors');

                elem.innerHTML = data.message
                message.append(elem);

            } else 
            {
                
                //Succès notification
                let elem = document.createElement("div");
                elem.classList.add('valide');

                elem.innerHTML = 'L\'Argonaute <b>'+data.name+'</b> a été ajouté à la liste';
                message.append(elem);

                sendingForm.name.value = ''; //Reset name form

                //Update number of members
                let number = parseInt(numberMember.innerHTML) //Convert string to int
                numberMember.innerHTML = ++number;

                //Append argonaute name in list
                var create = document.createElement('div');
                create.classList.add('member-item', 'new-member-item')

                create.innerHTML = data.name;
                memberList.prepend(create)

            }
            
        })

});