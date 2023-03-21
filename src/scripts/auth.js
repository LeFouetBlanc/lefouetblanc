
export function authLogin(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in
        verifyUidUser()
        
        
        window.location.href = './src/pages/fila-pedidos.html'
    
        } else {
          // User is signed out
          console.log('Usuario off')
        }
    });
}

export function login(){
    firebase.auth().signInWithEmailAndPassword(inputLogin.value, inputPassword.value).then((response)=>{
        
        console.log("Success: ", response)
        
        window.location.href = "./src/pages/fila-pedidos.html"

        verifyUidUser()

    }).catch(error => {
        alert(getErrorMessage(error))
    })

}

function getErrorMessage(error){
    if (error.code == "auth/user-not-found"){
        return "Usuário não encontrado."
    }

    return error.message
}

export function logOut(){
    firebase.auth().signOut().then(response => {
        console.log(response, 'deslogado')
        localStorage.setItem("UserId", "")
        window.location.href = '../../'
    }).catch(error => {
        console.log('erro: ', error)
    })
    
}


//Verificar usuario conectado
export function verifyUidUser(){
    const usuario = firebase.auth().onAuthStateChanged((user) => {
        // const usuario = firebase.auth().currentUser;
        var uid = user.uid
        localStorage.setItem("UserId", uid)
        
    });

}