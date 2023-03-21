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
                    <img class="img-pedido" id="img-pedido" src=${pedido.Imagens[i]}>
                    <input type="text" id="editarPedido${i}" value="${pedido.Pedido[i]}">
                    <input type="text" id="editarDataEntrega" value="${pedido.DataEntrega}">
                    <br>
                    <textarea id="editarDescricao${i}" value='${pedido.Descricao[i]}'></textarea>
                    <br>
                    <input type="text" id="editarValorPedido${i}" value="${pedido.ValorPedido[i]}">

                    <hr class="hr-divisoria"> 

                    <h2>Personalização</h2>
                    <br>
                    <textarea id="editarPersonalizacao${i}" value="${pedido.Personalizacoes[i]}">
                    <br>
                    <input type="text" id="editarValorPedido${i}" value="${pedido.ValorExtra[i]}">
                    <!--Repetir quantos pedidos forem necessario antes das info do cliente-->

                    <hr class="hr-divisoria">
                    
                 `
            }else if (pedido.Personalizacoes[i] == "" && pedido.Imagens[i] != "") {
                //Sem personalizacao e Com imagem
                boxDetalhes.innerHTML += `
                    <img class="img-pedido" id="img-pedido" src=${pedido.Imagens[i]}>
                    <input type="text" id="editarPedido${i}" value="${pedido.Pedido[i]}">
                    <input type="text" id="editarDataEntrega" value="${pedido.DataEntrega}">
                    <br>
                    <textarea id="editarDescricao${i}" value='${pedido.Descricao[i]}'></textarea>
                    <br>
                    <input type="text" id="editarValorPedido${i}" value="${pedido.ValorPedido[i]}">


                    <hr class="hr-divisoria"> 
                    <!--Repetir quantos pedidos forem necessario antes das info do cliente-->
                    
                 `
            } else if(pedido.Personalizacoes[i] != "" && pedido.Imagens[i] == "" ){
                //Com personalizacao e sem imagem
                console.log(pedido.Personalizacoes[i])
                boxDetalhes.innerHTML += `
                
                    <input type="text" id="editarPedido${i}" value="${pedido.Pedido[i]}">
                    <input type="text" id="editarDataEntrega" value="${pedido.DataEntrega}">
                    <br>
                    <textarea id="editarDescricao${i}" value='${pedido.Descricao[i]}'></textarea>
                    <br>
                    <input type="text" id="editarValorPedido${i}" value="${pedido.ValorPedido[i]}">


                    <hr class="hr-divisoria"> 

                    <h2>Personalização</h2>
                    <br>
                    <textarea id="editarPersonalizacao${i}" value="${pedido.Personalizacoes[i]}" placeholder="${pedido.Personalizacoes[i]}"></textarea>
                    <br>
                    <input type="text" id="editarValorPedido${i}" value="${pedido.ValorExtra[i]}">
                    <!--Repetir quantos pedidos forem necessario antes das info do cliente-->

                    <hr class="hr-divisoria">
                 `

            } else if(pedido.Personalizacoes[i] == "" && pedido.Imagens[i] == ""){
                //Sem personalizacao e sem imagem
                boxDetalhes.innerHTML += `
                
                    <input type="text" id="editarPedido${i}" value="${pedido.Pedido[i]}">
                    <input type="text" id="editarDataEntrega" value="${pedido.DataEntrega}">
                    <br>
                    <textarea id="editarDescricao${i}" value='${pedido.Descricao[i]}'></textarea>
                    <br>
                    <input type="text" id="editarValorPedido${i}" value="${pedido.ValorPedido[i]}">

                    <hr class="hr-divisoria"> 
                    
                    <!--Repetir quantos pedidos forem necessario antes das info do cliente-->
                 `
            }
            
        }
        boxDetalhes.innerHTML += `
           
            <h3>Valor Total: </h3>
            <input type="text" id="EditarValorTotal" value="${pedido.ValorTotal}">
            <hr class="hr-divisoria">
            <h2>Informações do Cliente</h2>
            <br>
            <h5>Nome: </h5>
            <input type="text" id="EditarNomeCliente" value="${pedido.NomeCliente}">
            <br>
            <h5>Contato: </h5>
            <input type="text" id="EditarContatoCliente" value="${pedido.ContatoCliente}">
      
            <br>
            <h5>Endereço de Entrega: </h5>
            <input type="text" id="EditarEnderecoEntrega" value="${pedido.EnderecoEntrega}">
            


            <div id="opcoes">
                <button class="btGrey2">Salvar</button>
                <button class="btGrey2" onclick="btVoltar()">Voltar</button>
            </div> 
        
        `
        //console.log(userId)
        //console.log(pedidoId)
        //console.log(pedido)
        // atualiza o conteúdo da página com as informações do pedido
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



  