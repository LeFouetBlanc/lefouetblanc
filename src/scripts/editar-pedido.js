let boxDetalhes = document.getElementById('box-detalhes')

console.log(localStorage.getItem('pedidoId'))


function calcValorTotal(){
    let somaTotal = 0;
  
    // Calculo dos pedidos
    let auxPedidos = document.querySelectorAll(`#editarValorPedido`)
    let aux_auxPedidos;
    let somaPedidos = 0;

    let tamanho = document.querySelectorAll(`#editarValorPedido`).length
  
    for (let i = 0; i < tamanho; i++) {

     aux_auxPedidos = auxPedidos[i].value.replace(/R\$\s?|,/g, "")
    
     if (aux_auxPedidos == "") {
        aux_auxPedidos = 0;
    }

    somaPedidos = somaPedidos + parseFloat(aux_auxPedidos);
    }
    
    // Calculo das personalizacoes
    let auxPersonalizacao;
    let aux_auxPersonalizacao = 0;
    let somaPersonalizacao = 0;
  
    for (let v = 0; v < tamanho; v++) {
      auxPersonalizacao = document.querySelectorAll("#editarValorExtra")[v].value;

      aux_auxPersonalizacao = auxPersonalizacao.replace(/R\$\s?|,/g, "");

      if (aux_auxPersonalizacao == "") {
        aux_auxPersonalizacao = 0;
      }
  
      somaPersonalizacao = somaPersonalizacao + parseFloat(aux_auxPersonalizacao);
    }

    if(document.getElementById('TaxaEntrega').value){
        taxaEntrega = document.getElementById('TaxaEntrega').value
      
      } else {
        taxaEntrega = "0"
      
      }
    
      let taxaEntregaTratada = taxaEntrega.replace(/R\$\s?|,/g, "");
    
      // Calculo total
      somaTotal = parseFloat(taxaEntregaTratada) + somaPersonalizacao + somaPedidos;
      let somaTotalTratada = somaTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    
      // Mostrar valor no final
      document.getElementById("EditarValorTotal").value = somaTotalTratada;
    
      // se não houver pedidos ou personalizações, definir o valor total como zero
      if (tamanho == 0 && document.querySelectorAll(".editarValorExtra").length == 0) {
        somaTotal = 0;
      }
    
      console.log(somaTotalTratada);
      document.getElementById(`EditarValorTotal`).value = somaTotalTratada
  }
    
     
    

   
   

    



function carregarPedido() {
    let userId = localStorage.getItem('UserId');
    let pedidoId = localStorage.getItem('pedidoId');
    let pedidoRef = firebase.database().ref('formulario-np/' + userId + '/' + pedidoId);

    
    pedidoRef.on("value", (snapshot) => {
        let pedido = snapshot.val();

        
        
        for(let i = 0; i < pedido.Pedido.length; i++){

            if(!(pedido.Personalizacoes) && !(pedido.Imagens)){
                //sem personalizacao e sem imagem
                boxDetalhes.innerHTML += `
            <br>
    <h3>Pedido ${i+1}</h3>
    <input type="text" id="editarPedido" value="${pedido.Pedido[i]}">

                    <br>
    <h5>Descrição</h5>
    <textarea id="editarDescricao" value='${pedido.Descricao[i]}'rows="7">${pedido.Descricao[i]}</textarea>
                    <br>
    <h5>Valor do pedido</h5>
    <input type="text" id="editarValorPedido" class="editarValorPedido" value="${pedido.ValorPedido[i]}onkeyup="calcValorTotal()">
 
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
                    <br>
    <h5>Descrição</h5>
    <textarea id="editarDescricao" value='${pedido.Descricao[i]}'rows="7">${pedido.Descricao[i]}</textarea>
                    <br>
    <h5>Valor do pedido</h5>
    <input type="text" id="editarValorPedido" class="editarValorPedido" value="${pedido.ValorPedido[i]}" onkeyup="calcValorTotal()" >

                    <hr class="hr-divisoria"> 

                    <h3>Personalização ${[i+1]}</h3>
                    <br>
    <textarea id="editarPersonalizacao" value="${pedido.Personalizacoes[i]}" rows="7">${pedido.Personalizacoes[i]}</textarea>
    <input type="text" id="editarValorExtra" value="${pedido.ValorExtra[i]}" onkeyup="calcValorTotal()" >
                
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
                    <br>
    <h5>Descrição</h5>
    <textarea id="editarDescricao" value='${pedido.Descricao[i]}'rows="7">${pedido.Descricao[i]}</textarea>
                    <br>
    <h5>Valor do pedido</h5>
    <input type="text" id="editarValorPedido" id="editarValorPedido" value="${pedido.ValorPedido[i]}" onkeyup="calcValorTotal()" >

                    <br>                
                    <hr class="hr-divisoria"> 
                    <!--FIM PEDIDO-->
                 `;

            } else {
                //completo

                boxDetalhes.innerHTML += `
    
            <br>
    <h3>Pedido ${i+1}</h3>
    <input type="text" id="editarPedido" value="${pedido.Pedido[i]}" onkeyup="calcValorTotal()" >

    
                    <br>
    <h5>Descrição</h5>
    <textarea id="editarDescricao" value='${pedido.Descricao[i]}'rows="7">${pedido.Descricao[i]}</textarea>
                    <br>
    <h5>Valor do pedido</h5>
    <input type="text" id="editarValorPedido" id="editarValorPedido" value="${pedido.ValorPedido[i]}" onkeyup="calcValorTotal()" >

                    <hr class="hr-divisoria"> 

                    <h3>Personalização ${[i+1]}</h3>
                    <br>
    <textarea id="editarPersonalizacao" value="${pedido.Personalizacoes[i]}" rows="7">${pedido.Personalizacoes[i]}</textarea>
    <input type="text" id="editarValorExtra" value="${pedido.ValorExtra[i]}" onkeyup="calcValorTotal()" >
                
                    <hr class="hr-divisoria"> 
                    <!--FIM PEDIDO-->
                 `;
            }            
        }
            
        boxDetalhes.innerHTML += `
           
            
            <br>
            <h1>Informações do Cliente</h1>
            <br>
            <h5>Nome: </h5>
            <input type="text" class="inputCliente" id="EditarNomeCliente" value="${pedido.NomeCliente}">
            <br>
            <h5>Contato: </h5>
            <input type="text"  class="inputCliente" id="EditarContatoCliente" value="${pedido.ContatoCliente}">
            <br>
            <h5>Data de aniversário: </h5>
            <input type="text" class="inputCliente" id="DataAniversario" value="${pedido.DataAniversario}">
      
            <br>
            <h5>Data de entrega</h5>
            <input type="text" id="editarDataEntrega" value="${pedido.DataEntrega}">

            <br>
            <h5>Endereço de Entrega: </h5>
            <input type="text" id="EditarEnderecoEntrega" class="inputCliente" value="${pedido.EnderecoEntrega}">
            
            <br>
            <h3>Taxa de Entrega: </h3>
            <input type="text" id="TaxaEntrega" value="${pedido.TaxaEntrega}" onkeyup="calcValorTotal()" >
            <hr class="hr-divisoria">
            
            <br>
            <h3>Valor Total: </h3>
            <input type="text" id="EditarValorTotal" placeholder="${pedido.ValorTotal}" disabled>
            <hr class="hr-divisoria">
            


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
            $('#TaxaEntrega').maskMoney({
                prefix:'R$ ',
                allowNegative: true,
                thousands:',', decimal:'.',
                affixesStay: true
            });
            
        })
        
        $("#editarDataEntrega").mask("99/99/9999");
        $('#EditarContatoCliente').mask('(99) 99999-9999')


        let nomeCliente = document.querySelector(`#EditarNomeCliente`)

        let contatoCliente = document.querySelector(`#EditarContatoCliente`)

        let enderecoEntrega = document.querySelector(`#EditarEnderecoEntrega`)

        let valorTotal = document.querySelector(`#EditarValorTotal`)

        let dataEntrega = document.querySelector(`#editarDataEntrega`)

        let dataAniversario = document.querySelector(`#DataAniversario`)

        let TaxaEntrega = document.querySelector(`#TaxaEntrega`)

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

                if(document.querySelectorAll(`#editarPersonalizacao`)[j]){                 
                    personalizacoes.push(personalizacaoPedido[j].value)
                }

                if(document.querySelectorAll(`#editarValorExtra`)[j]){
                    valorExtras.push(valorPersonalizacao[j].value)
                }

            }

            

            let partes = dataEntrega.value.split('/')

            let dataEntregaInversa = partes[2] + "/" + partes[1] + "/" + partes[0];

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
                EnderecoEntrega: enderecoEntrega.value,
                DataAniversario: dataAniversario.value,
                TaxaEntrega: TaxaEntrega.value,
                DataEntregaInversa: dataEntregaInversa

        
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

let taxaDeEntregaAux;





//pedidoValor editarValorPedido
//valorExtra editarValorExtra
//TaxaEntrega TaxaEntrega
//document.querySelector('#editarValorPedido').addEventListener('keyup', calcValorTotal)
//document.querySelector('#editarValorExtra').addEventListener('keyup', calcValorTotal)
//document.querySelector('#TaxaEntrega').addEventListener('keyup', calcValorTotal)


// function calcValorTotal(){
//     let somaTotal = 0;
//     let auxPedidos;
//     let aux_auxPedidos;
//     let somaPedidos;

//     let elementos = document.querySelectorAll('#editarValorPedido');

//     for(let i = 0; i <= 10; i ++){
//         auxPedidos = elementos.value
        
//         aux_auxPedidos = auxPedidos.replace(/R\$\s?|,/g, "");
//       if (aux_auxPedidos == "") {
//         aux_auxPedidos = 0;
//       }
//       if(aux_auxPedidos == ""){
//         aux_auxPedidos = 0;
//       }

//       somaPedidos = somaPedidos + parseFloat(aux_auxPedidos)
//     }

//     let auxPersonalizacao;
//     let aux_auxPersonalizacao = 0;
//     let somaPersonalizacao = 0;

//     for(let i = 0; i < 10; i++){
//         auxPersonalizacao = document.querySelectorAll("#editarValorExtra")[i].value;
//       aux_auxPersonalizacao = auxPersonalizacao.replace(/R\$\s?|,/g, "");
//       if (aux_auxPersonalizacao == "") {
//         aux_auxPersonalizacao = 0;
//       }
  
//       somaPersonalizacao = somaPersonalizacao + parseFloat(aux_auxPersonalizacao);
//     }

//     if(document.getElementById('TaxaEntrega').value){
//         taxaDeEntregaAux = document.getElementById('TaxaEntrega').value
      
//       } else {
//         taxaDeEntregaAux = "0"
      
//       }

//       let taxaEntregaTratada = taxaDeEntregaAux.replace(/R\$\s?|,/g, "");

//       somaTotal = parseFloat(taxaEntregaTratada) + somaPersonalizacao + somaPedidos;

//       let somaTotalTratada = somaTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

//       document.getElementById("EditarValorTotal").value = somaTotalTratada;

//       if (j == 0 && document.querySelectorAll("#editarValorExtra").length == 0) {
//         somaTotal = 0;
//       }
    
//       return somaTotalTratada; 
// }

const inputEditarValorTotal = document.querySelector('#EditarValorTotal');



window.onload = () => {
    
     carregarPedido();
   
     

     setTimeout(() => {
        // console.log(calcValorTotal());
        // document.querySelector('#EditarValorTotal').value = calcValorTotal();
   
     }, 2000)
     
}




