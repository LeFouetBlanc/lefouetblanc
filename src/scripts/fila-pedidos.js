import {logOut} from './auth.js';

let fila = document.getElementById('fila')

lerPedidos()

document.getElementById('btLogout').addEventListener('click', logOut)
 
//Lendo pedidos na tela de fila
function lerPedidos(){
    let userId = localStorage.getItem('UserId')
    let pedidosRef = firebase.database().ref('formulario-np/' + userId)
  
    pedidosRef.orderByChild("DataEntregaInversa").on("value", (snapshot) => {
      console.log("Dados lidos com sucesso.")
        
      fila.innerHTML = ""
  
      snapshot.forEach((childSnapshot) => {
        var pedido = childSnapshot.val()
        if (pedido.Concluido == false) {
          fila.innerHTML += `
            <div class="box-pedido"id="boxPedido" data-pedido-id="${childSnapshot.key}">
              <h2>${pedido.Pedido[0].slice(0, 30)}</h2>
              <div id="box-infos">
                <h4>${pedido.DataEntrega}</h4>
                <p>${pedido.Descricao[0].slice(0, 60)}...</p>
              </div>
              
              <button class="btGrey2 btSobre" id="btConcluido" data-pedido-id="${childSnapshot.key}">Concluir</button>
            </div>
          `     
        }
      })
            
                // adiciona evento de clique para o botão "btConcluido"
                const btConcluido = document.querySelectorAll("#btConcluido");
                btConcluido.forEach((button) => {
                button.addEventListener("click", function() {
                    const pedidoId = this.getAttribute("data-pedido-id");
                    concluirPedido(pedidoId);
                    
                })
            })

      
                const boxPedido = document.querySelectorAll("#boxPedido");
                boxPedido.forEach((button) => {
                button.addEventListener("click", function() {
                const pedidoId = this.getAttribute("data-pedido-id");
                sobrePedido(pedidoId)
            })
        })
    })
}
  
  function concluirPedido(pedidoId) {
    let userId = localStorage.getItem('UserId')
    let pedidosRef = firebase.database().ref('formulario-np/' + userId + '/' + pedidoId)


    // atualiza o valor de "Concluido" para true
    pedidosRef.update({Concluido: true}).then(() => {
      console.log("Pedido concluído com sucesso.")
    }).catch((error) => {
      console.log("Erro ao concluir pedido: ", error)
    });

  }
  

  function sobrePedido(pedidoId) {
    if (event.target.id == "btConcluido") {
      // se foi, não executa a função
      return;
    }
    // armazena o pedidoId no localStorage para ser acessado pela página sobre.html
    localStorage.setItem('pedidoId', pedidoId);
    console.log(localStorage.getItem('pedidoId'))
    // redireciona para a página sobre.html
    window.location.href = "../pages/sobre-pedido.html";
    //
  }

window.onload = () => {
  if(localStorage.getItem('pedidoId')){
    localStorage.removeItem('pedidoId')
  }
}

function goToTodosPedidos(){
  window.location.href = "../pages/todos-pedidos.html"
}

document.getElementById('goToTodosPedidos').addEventListener('click', goToTodosPedidos)