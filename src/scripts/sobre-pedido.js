let boxDetalhes = document.getElementById('box-detalhes')

function carregarPedido() {
    let userId = localStorage.getItem('UserId');
    let pedidoId = localStorage.getItem('pedidoId');
    let pedidoRef = firebase.database().ref('formulario-np/' + userId + '/' + pedidoId);

    
    pedidoRef.on("value", (snapshot) => {
        let pedido = snapshot.val();
        
        for(let i = 0; i < pedido.Pedido.length; i++){
            
            //console.log(i)
            if(pedido.Personalizacoes[i] != "" && pedido.Imagens[i] != ""){
                //Com personalizacao e Com Imagem
                boxDetalhes.innerHTML += `
                    <img class="img-pedido" id="img-pedido" src=${pedido.Imagens[pedido.Imagens.length - 1][i]}>
                    <h2>${pedido.Pedido[i]}</h2>
                    <h3>${pedido.DataEntrega}</h3>
                    <br>
                    <p>${pedido.Descricao[i]}</p>
                    <br>
                    <h3>${pedido.ValorPedido[i]}</h3>

                    <hr class="hr-divisoria"> 

                    <h2>Personalização</h2>
                    <br>
                    <p>${pedido.Personalizacoes[i]}</p>
                    <br>
                    <h3>${pedido.ValorExtra[i]}</h3>
                    <!--Repetir quantos pedidos forem necessario antes das info do cliente-->

                    <hr class="hr-divisoria">
                    
                 `
            }else if (pedido.Personalizacoes[i] == "" && pedido.Imagens[i] != "") {
                //Sem personalizacao e Com imagem
                boxDetalhes.innerHTML += `
                    <img class="img-pedido" id="img-pedido" src=${pedido.Imagens[pedido.Imagens.length - 1][i]}}>
                    <h2>${pedido.Pedido[i]}</h2>
                    <h3>${pedido.DataEntrega}</h3>
                    <br>
                    <p>${pedido.Descricao[i]}</p>
                    <br>
                    <h3>${pedido.ValorPedido[i]}</h3>

                    <hr class="hr-divisoria"> 
                    <!--Repetir quantos pedidos forem necessario antes das info do cliente-->
                    
                 `
            } else if(pedido.Personalizacoes[i] != "" && pedido.Imagens[i] == "" ){
                //Com personalizacao e sem imagem
                boxDetalhes.innerHTML += `
                
                    <h2>${pedido.Pedido[i]}</h2>
                    <h3>${pedido.DataEntrega}</h3>
                    <br>
                    <p>${pedido.Descricao[i]}</p>
                    <br>
                    <h3>${pedido.ValorPedido[i]}</h3>

                    <hr class="hr-divisoria"> 

                    <h2>Personalização</h2>
                    <br>
                    <p>${pedido.Personalizacoes[i]}</p>
                    <br>
                    <h3>${pedido.ValorExtra[i]}</h3>
                    <!--Repetir quantos pedidos forem necessario antes das info do cliente-->

                    <hr class="hr-divisoria">
                 `

            } else if(pedido.Personalizacoes[i] == "" && pedido.Imagens[i] == ""){
                //Sem personalizacao e sem imagem
                boxDetalhes.innerHTML += `
                
                    <h2>${pedido.Pedido[i]}</h2>
                    <h3>${pedido.DataEntrega}</h3>
                    <br>
                    <p>${pedido.Descricao[i]}</p>
                    <br>
                    <h3>${pedido.ValorPedido[i]}</h3>

                    <hr class="hr-divisoria"> 
                    
                    <!--Repetir quantos pedidos forem necessario antes das info do cliente-->
                 `
            }
            
        }
        boxDetalhes.innerHTML += `
           
            <h3>Valor Total: </h3>
            <h2 id="ValorTotal">${pedido.ValorTotal}</h2>
            <hr class="hr-divisoria">
            <h2>Informações do Cliente</h2>
            <br>
            <h5>Nome: </h5>
            <h3>${pedido.NomeCliente}</h3>
            <br>
            <h5>Contato: </h5>
            <h3>${pedido.ContatoCliente}</h3>
            <br>
            <h5>Endereço de Entrega: </h5>
            <p>${pedido.EnderecoEntrega}</p>


            <div id="opcoes">
                <button class="btGrey2" id="btEditar">Editar</button>
                <button class="btGrey2" onclick="btVoltar()">Voltar</button>
            </div> 
        
        `
        //console.log(userId)
        //console.log(pedidoId)
        //console.log(pedido)
        // atualiza o conteúdo da página com as informações do pedido
        console.log("Data do pedido: " + pedido.DataPedido)
        const btEditar = document.querySelectorAll("#btEditar");
                btEditar.forEach((button) => {
                button.addEventListener("click", function() {
                editarPedido(pedidoId)
            })
        })
    })       
}      

function btVoltar(){
    window.location.href = "../pages/fila-pedidos.html"
}
  
window.onload = () => {
    carregarPedido();
}



  
function editarPedido(pedidoId) {
    // armazena o pedidoId no localStorage para ser acessado pela página editar-pedido.html
    localStorage.setItem('pedidoId', pedidoId);
    
    // redireciona para a página editar-pedido.html
    window.location.href = "../pages/editar-pedido.html";
  }