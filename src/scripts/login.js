import {authLogin} from './auth.js';
import {login} from './auth.js'

document.getElementById('btLogin').addEventListener('click', login)


window.onload = () => {
    authLogin()
}




  