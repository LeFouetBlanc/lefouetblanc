let boxDetalhes = document.getElementById('box-detalhes')

console.log(localStorage.getItem('pedidoId'))

function carregarPedido() {
    let userId = localStorage.getItem('UserId');
    let pedidoId = localStorage.getItem('pedidoId');
    let pedidoRef = firebase.database().ref('formulario-np/' + userId + '/' + pedidoId);

    
    pedidoRef.on("value", (snapshot) => {
        let pedido = snapshot.val();
        
        for(let i = 0; i < pedido.Pedido.length; i++){

            if(pedido.Personalizacoes[i] == "" && !(pedido.Imagens)){
                //sem personalizacao e sem imagem
                boxDetalhes.innerHTML += `
            <br>
    <h3>Pedido ${i+1}</h3>
    <input type="text" id="editarPedido${i}" value="${pedido.Pedido[i]}">

    <h5>Data de entrega</h5>
    <input type="text" id="editarDataEntrega" value="${pedido.DataEntrega}">
                    <br>
    <h5>Descrição</h5>
    <textarea id="editarDescricao${i}" value='${pedido.Descricao[i]}'rows="7">
        ${pedido.Descricao[i]}
    </textarea>
                    <br>
    <h5>Valor do pedido</h5>
    <input type="text" id="editarValorPedido${i}" value="${pedido.ValorPedido[i]}">

                    <hr class="hr-divisoria"> 

                    <h3>Personalização ${[i+1]}</h3>
                    <br>                
                    <hr class="hr-divisoria"> 
                    <!--FIM PEDIDO-->
                 `;


            } else if(pedido.Personalizacoes[i] != "" && !(pedido.Imagens)){
                //com personalizacao e sem imagem
                boxDetalhes.innerHTML += `
            <br>
    <h3>Pedido ${i+1}</h3>
    <input type="text" id="editarPedido${i}" value="${pedido.Pedido[i]}">

    <h5>Data de entrega</h5>
    <input type="text" id="editarDataEntrega" value="${pedido.DataEntrega}">
                    <br>
    <h5>Descrição</h5>
    <textarea id="editarDescricao${i}" value='${pedido.Descricao[i]}'rows="7">
        ${pedido.Descricao[i]}
    </textarea>
                    <br>
    <h5>Valor do pedido</h5>
    <input type="text" id="editarValorPedido${i}" value="${pedido.ValorPedido[i]}">

                    <hr class="hr-divisoria"> 

                    <h3>Personalização ${[i+1]}</h3>
                    <br>
    <textarea id="editarPersonalizacao${i}" value="${pedido.Personalizacoes[i]}" rows="7">
        ${pedido.Personalizacoes[i]}
                    </textarea>
    <input type="text" id="editarValorPedido${i}" value="${pedido.ValorExtra[i]}">
                
                    <hr class="hr-divisoria"> 
                    <!--FIM PEDIDO-->
                 `;


            } else if(pedido.Personalizacoes[i] == "" && pedido.Imagens){
                //sem personalizacao e com imagem

                boxDetalhes.innerHTML += `
    <img class="img-pedido" id="img-pedido" src=${pedido.Imagens[pedido.Imagens.length - 1][i]}>
            <br>
    <h3>Pedido ${i+1}</h3>
    <input type="text" id="editarPedido${i}" value="${pedido.Pedido[i]}">

    <h5>Data de entrega</h5>
    <input type="text" id="editarDataEntrega" value="${pedido.DataEntrega}">
                    <br>
    <h5>Descrição</h5>
    <textarea id="editarDescricao${i}" value='${pedido.Descricao[i]}'rows="7">
        ${pedido.Descricao[i]}
    </textarea>
                    <br>
    <h5>Valor do pedido</h5>
    <input type="text" id="editarValorPedido${i}" value="${pedido.ValorPedido[i]}">

                    <br>                
                    <hr class="hr-divisoria"> 
                    <!--FIM PEDIDO-->
                 `;


            } else {
                //completo

                boxDetalhes.innerHTML += `
    <img class="img-pedido" id="img-pedido" src=${pedido.Imagens[pedido.Imagens.length - 1][i]}>
            <br>
    <h3>Pedido ${i+1}</h3>
    <input type="text" id="editarPedido${i}" value="${pedido.Pedido[i]}">

    <h5>Data de entrega</h5>
    <input type="text" id="editarDataEntrega" value="${pedido.DataEntrega}">
                    <br>
    <h5>Descrição</h5>
    <textarea id="editarDescricao${i}" value='${pedido.Descricao[i]}'rows="7">
        ${pedido.Descricao[i]}
    </textarea>
                    <br>
    <h5>Valor do pedido</h5>
    <input type="text" id="editarValorPedido${i}" value="${pedido.ValorPedido[i]}">

                    <hr class="hr-divisoria"> 

                    <h3>Personalização ${[i+1]}</h3>
                    <br>
    <textarea id="editarPersonalizacao${i}" value="${pedido.Personalizacoes[i]}" rows="7">
        ${pedido.Personalizacoes[i]}
                    </textarea>
    <input type="text" id="editarValorPedido${i}" value="${pedido.ValorExtra[i]}">
                
                    <hr class="hr-divisoria"> 
                    <!--FIM PEDIDO-->
                 `;
            }            
        }
            
        boxDetalhes.innerHTML += `
           
            <h3>Valor Total: </h3>
            <input type="text" id="EditarValorTotal" value="${pedido.ValorTotal}">
            <hr class="hr-divisoria">
            <h2>Informações do Cliente</h2>
            <br>
            <h5>Nome: </h5>
            <input type="text" class="inputCliente" id="EditarNomeCliente" value="${pedido.NomeCliente}">
            <br>
            <h5>Contato: </h5>
            <input type="text"  class="inputCliente" id="EditarContatoCliente" value="${pedido.ContatoCliente}">
      
            <br>
            <h5>Endereço de Entrega: </h5>
            <input type="text" id="EditarEnderecoEntrega" class="inputCliente" value="${pedido.EnderecoEntrega}">
            


            <div id="opcoes">
                
                <button class="btGrey2" onclick="btVoltar()">Voltar</button>
                <button class="btGrey2">Salvar</button>
            </div> 
        
        `;
    })       
}      

function btVoltar(){
    window.location.href = '../pages/sobre-pedido.html';
}

function editarPedido(){
    
}
  
window.onload = () => {
     carregarPedido();
}



  