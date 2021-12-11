window.addEventListener('load', ()=>{
    let name = document.querySelector('#validationName')
    let lastName = document.querySelector('#validationLastName')
    let inputName = document.querySelector('#nameRegister')
    let inputLastName = document.querySelector('#lastNameRegister')

    inputName.addEventListener('click',()=>{
        name.innerHTML = "Debes introducir al menos 2 caracteres"
        name.style.color= "#FF2119"
        inputName.style.border = "solid 2px #FF2119"
    })

    inputLastName.addEventListener('click',()=>{
        lastName.innerHTML = "Debes introducir al menos 2 caracteres"
        lastName.style.color= "#FF2119"
        inputLastName.style.border = "solid 2px #FF2119"
    })

    if(inputName.value > 2){
        inputName.addEventListener('change', ()=>{
            
        })
    }else{
        Event.preventDefault()
    }

})