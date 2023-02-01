const memberList = document.getElementById('member-list')
const numberMember = document.getElementById('number-member')

//Loading data
fetch('api/argonaute')
    .then(response => response.json())
    .then((data) =>  {
        if(data) 
        {
            memberList.innerHTML = "";
            numberMember.innerHTML = data.length;
            data.forEach(user => {
                memberList.innerHTML+= '<div class="member-item">'+user.name+'</div>'
            });
        } else 
        {
            memberList.innerHTML = '<div class="errors">Erreur lors de la récupération des données</div>'
        }
           

    });


//When sending Form
const sendingForm = document.getElementById('memberForm');
const token = document.querySelector('input[name="_token"]')
const message = document.getElementById('message');

sendingForm.addEventListener('submit', (e) => {

    e.preventDefault();
    message.className = ""
    const formData = new FormData(sendingForm);
    console.log(JSON.stringify(Object.fromEntries(formData)));

fetch('/api/argonaute', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": token.value
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
            elem.innerHTML = 'L\'Argonaute <b>'+data.name+'</b> a été ajouté';
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

        // Timeout to disappear notification and reset notification
        setTimeout(() => {
            message.classList.add('disappear');
        }, "5000");
        setTimeout(() => {
            message.className = ""
            message.innerHTML = ''
        }, "7000");
        
    });

});