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
    <input type="text" id="editarPedido" value="${pedido.Pedido[i]}">

    <h5>Data de entrega</h5>
    <input type="text" id="editarDataEntrega" value="${pedido.DataEntrega}">
                    <br>
    <h5>Descrição</h5>
    <textarea id="editarDescricao" value='${pedido.Descricao[i]}'rows="7">
        ${pedido.Descricao[i]}
    </textarea>
                    <br>
    <h5>Valor do pedido</h5>
    <input type="text" id="editarValorPedido" value="${pedido.ValorPedido[i]}">
 
                    <br>                
                    <hr class="hr-divisoria"> 
                    <!--FIM PEDIDO-->
                 `;

            } else if(pedido.Personalizacoes[i] != "" && !(pedido.Imagens)){
                //com personalizacao e sem imagem
                boxDetalhes.innerHTML += `
            <br>
    <h3>Pedido ${i+1}</h3>
    <input type="text" id="editarPedido" value="${pedido.Pedido[i]}">

    <h5>Data de entrega</h5>
    <input type="text" id="editarDataEntrega" value="${pedido.DataEntrega}">
                    <br>
    <h5>Descrição</h5>
    <textarea id="editarDescricao" value='${pedido.Descricao[i]}'rows="7">
        ${pedido.Descricao[i]}
    </textarea>
                    <br>
    <h5>Valor do pedido</h5>
    <input type="text" id="editarValorPedido" value="${pedido.ValorPedido[i]}">

                    <hr class="hr-divisoria"> 

                    <h3>Personalização ${[i+1]}</h3>
                    <br>
    <textarea id="editarPersonalizacao" value="${pedido.Personalizacoes[i]}" rows="7">
        ${pedido.Personalizacoes[i]}
                    </textarea>
    <input type="text" id="editarValorExtra" value="${pedido.ValorExtra[i]}">
                
                    <hr class="hr-divisoria"> 
                    <!--FIM PEDIDO-->
                 `;               

            } else if(pedido.Personalizacoes[i] == "" && pedido.Imagens){
                //sem personalizacao e com imagem

                boxDetalhes.innerHTML += `
    <img class="img-pedido" id="img-pedido" src=${pedido.Imagens[pedido.Imagens.length - 1][i]}>
            <br>
    <h3>Pedido ${i+1}</h3>
    <input type="text" id="editarPedido" value="${pedido.Pedido[i]}">

    <h5>Data de entrega</h5>
    <input type="text" id="editarDataEntrega" value="${pedido.DataEntrega}">
                    <br>
    <h5>Descrição</h5>
    <textarea id="editarDescricao" value='${pedido.Descricao[i]}'rows="7">
        ${pedido.Descricao[i]}
    </textarea>
                    <br>
    <h5>Valor do pedido</h5>
    <input type="text" id="editarValorPedido" value="${pedido.ValorPedido[i]}">

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
    <input type="text" id="editarPedido" value="${pedido.Pedido[i]}">

    <h5>Data de entrega</h5>
    <input type="text" id="editarDataEntrega" value="${pedido.DataEntrega}">
                    <br>
    <h5>Descrição</h5>
    <textarea id="editarDescricao" value='${pedido.Descricao[i]}'rows="7">
        ${pedido.Descricao[i]}
    </textarea>
                    <br>
    <h5>Valor do pedido</h5>
    <input type="text" id="editarValorPedido" value="${pedido.ValorPedido[i]}">

                    <hr class="hr-divisoria"> 

                    <h3>Personalização ${[i+1]}</h3>
                    <br>
    <textarea id="editarPersonalizacao" value="${pedido.Personalizacoes[i]}" rows="7">
        ${pedido.Personalizacoes[i]}
                    </textarea>
    <input type="text" id="editarValorExtra" value="${pedido.ValorExtra[i]}">
                
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
                <button class="btGrey2" id="btSalvar">Salvar</button>
            </div> 
        `;
        
        $(function(){
            $('#EditarValorTotal').maskMoney({
                prefix:'R$ ',
                allowNegative: true,
                thousands:',', decimal:'.',
                affixesStay: true
            });
            $('#editarValorPedido').maskMoney({
                prefix:'R$ ',
                allowNegative: true,
                thousands:',', decimal:'.',
                affixesStay: true
            });
            $('#editarValorExtra').maskMoney({
                prefix:'R$ ',
                allowNegative: true,
                thousands:',', decimal:'.',
                affixesStay: true
            });
        })
        
        $("#editarDataEntrega").mask("99/99/9999");


        let nomeCliente = document.querySelector(`#EditarNomeCliente`)

        let contatoCliente = document.querySelector(`#EditarContatoCliente`)

        let enderecoEntrega = document.querySelector(`#EditarEnderecoEntrega`)

        let valorTotal = document.querySelector(`#EditarValorTotal`)

        let dataEntrega = document.querySelector(`#editarDataEntrega`)

        //objetos que sao em listas

        let pedidoTitulo = document.querySelectorAll(`#editarPedido`)

        let descricaoPedido = document.querySelectorAll(`#editarDescricao`)

        let pedidoValor = document.querySelectorAll(`#editarValorPedido`)

        let personalizacaoPedido = document.querySelectorAll(`#editarPersonalizacao`)

        let valorPersonalizacao = document.querySelectorAll(`#editarValorExtra`)

        const btSalvar = document.getElementById('btSalvar')

        btSalvar.addEventListener('click', ()=>{

            for(let j = 0; j < pedido.Pedido.length; j++){
                pedidos.push(pedidoTitulo[j].value)

                descricoes.push(descricaoPedido[j].value)

                valorPedidos.push(pedidoValor[j].value)

                personalizacoes.push(personalizacaoPedido[j].value)

                valorExtras.push(valorPersonalizacao[j].value)
            }

            pedidoRef.update({
                Pedido: pedidos,
                DataEntrega: dataEntrega.value,
                Descricao: descricoes,
                ValorPedido: valorPedidos,
                Personalizacoes: personalizacoes,
                ValorExtra: valorExtras,
                ValorTotal: valorTotal.value,
                NomeCliente: nomeCliente.value,
                ContatoCliente: contatoCliente.value,
                EnderecoEntrega: enderecoEntrega.value
        
            }).then(()=>{
                console.log("Pedido atualizado com sucesso!")
            }).catch((error)=>{
                console.log('Erro: ', error)
            })

            window.location.href = "../pages/sobre-pedido.html"

        })
        
    })       
}      

function btVoltar(){
    window.location.href = '../pages/sobre-pedido.html';
}



//listas necessarias
let pedidos = []
let descricoes = []
let personalizacoes = []
let valorPedidos = []
let valorExtras = []


  
window.onload = () => {
     carregarPedido();

     
}




