import {logOut} from './auth.js';

let fila = document.getElementById('fila')

lerPedidos()



document.getElementById('btLogout').addEventListener('click', logOut)
 
//Lendo pedidos na tela de fila
function lerPedidos(){
    let userId = localStorage.getItem('UserId')
    let pedidosRef = firebase.database().ref('formulario-np/' + userId)
    
    let pedidos = []

    pedidosRef.on("value", (snapshot) => {
      console.log("Dados lidos com sucesso.")


      fila.innerHTML = ""
  
      snapshot.forEach((childSnapshot) => {
        var pedido = childSnapshot.val()
        pedidos.push(pedido)
        
        if (pedido.Concluido == false || pedido.Concluido == true) {
          
          // Definir o tamanho máximo de caracteres permitidos para a descrição
          const maxDescricaoLength = 200;
        
          // Obter o tamanho disponível para a descrição com base no tamanho do título
          const tituloLength = pedido.NomeCliente.length;
          const maxDescricaoSize = 80 - tituloLength;
        
          // Limitar o número de caracteres da descrição com base no espaço disponível
          let descricao = pedido.Descricao[0].substring(0, maxDescricaoSize);
          if (pedido.Descricao[0].length > maxDescricaoSize) {
            descricao += '...';
          }

          fila.innerHTML += `
            <div class="box-pedido" id="boxPedido" data-pedido-id="${childSnapshot.key}" name="boxPedido${pedidos.length}">
            
              <h2>${pedido.NumeroPedido} - ${pedido.NomeCliente}</h2>
              <h4 style="margin-bottom: 10px;">${pedido.DataEntrega}</h4>
              <p class="descricao">${descricao}</p>
        
              
              <div id="boxStatusAndamento" class="boxStatusAndamento" value='${pedido.StatusAndamento}'></div>
              <button class="btGrey2 btSobre" id="btConcluido" data-pedido-id="${childSnapshot.key}">Concluir</button>
              
            </div>
          `;
          if(pedido.StatusAndamento == 'Concluido'){
            document.querySelector(`[data-pedido-id='${childSnapshot.key}']`).style.display = "none"
          }
          
        }
      })
      console.log(pedidos)

      for(let i = 0; i <= pedidos.length; i++){ 
        if(document.querySelectorAll('.boxStatusAndamento')[i]){
         
          switch(pedidos[i].StatusAndamento){
            case "Novo Pedido":
              document.querySelectorAll('.boxStatusAndamento')[i].style.backgroundColor = '#ffa500';
              break;
            
              case "Preparando":
                document.querySelectorAll('.boxStatusAndamento')[i].style.backgroundColor = '#ffff00';
                break;
  
              case "Aguardando Envio":
                document.querySelectorAll('.boxStatusAndamento')[i].style.backgroundColor = '#000000';
                break;
  
              case "Concluido":
                document.querySelectorAll('.boxStatusAndamento')[i].style.backgroundColor = '#008000';
                break;
            
          }
        }
      }
                
                const btConcluido = document.querySelectorAll("#btConcluido");
                btConcluido.forEach((button) => {
                  button.addEventListener("click", function() {
                    let confirmar = confirm("Deseja concluir esse pedido?")
                    if (confirmar == true) {
                      const pedidoId = this.getAttribute("data-pedido-id");
                      concluirPedido(pedidoId);

                      // atualiza o índice do for para i-1
                      for (let i = 0; i < pedidos.length; i++) {
                        
                        if (pedidos[i].Id == pedidoId) {
                          i--;
                          break;
                        }
                      }           
                    }
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
    pedidosRef.update({StatusAndamento: 'Concluido'}).then(() => {
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