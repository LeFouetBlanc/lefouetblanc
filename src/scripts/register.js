
let password = document.getElementById('inputPassword')
let confirmPassword = document.getElementById('confirmPassword')


let email = document.getElementById('inputEmail')


function verifyPassword(){
    if(password.value == confirmPassword.value){
        register()
    } else {
        alert("As senhas devem ser iguais.")
    }
}


function register(){    
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(() => {
        const usuario = firebase.auth().onAuthStateChanged((user) => {
            // const usuario = firebase.auth().currentUser;
            var uid = user.uid
            localStorage.setItem("UserId", uid)    
        });
        
        window.location.href = "/src/pages/fila-pedidos.html"
        
    }).catch(error => {
        alert(getErrorMessage(error))
    })
}

function getErrorMessage(error){
    if (error.code == "auth/email-already-in-use"){
        return "Email já está em uso."
    }

    if (password.value.length < 6){
        return "A senha deve conter 6 ou mais caracteres."
    }

    if(error.code == "auth/invalid-email"){
        return "Email formatado de forma incorreta. Verifique por favor."
    }

    return error.message
}