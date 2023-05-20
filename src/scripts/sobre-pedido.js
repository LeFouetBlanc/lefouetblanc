let boxMaior = document.getElementById('boxMaior')

function carregarPedido() {
    let userId = localStorage.getItem('UserId');
    let pedidoId = localStorage.getItem('pedidoId');
    let pedidoRef = firebase.database().ref('formulario-np/' + userId + '/' + pedidoId);

    
    pedidoRef.on("value", (snapshot) => {
        let pedido = snapshot.val();
        console.log(pedido)

        for(let i = 0; i < pedido.Pedido.length; i++){

            if(!(pedido.Personalizacoes) && !(pedido.Imagens)){

                boxMaior.innerHTML += `
            <div class="boxPedido">
            <div class="boxPedido">
            <div class="col1" id="boxImg">
            <img src="../../assets/2.png" class="imgPedido">

            </div>

           
            <div class="col2" id="boxInfos">
                <h2 id="tituloPedido">${pedido.Pedido[i]}</h2>
                <h4 id="quantidadePedido">Quantidade: ${pedido.Quantidades[i]}</h4>
                <br>
                
                <p id="descricaoPedido">
                    ${pedido.Descricao[i]}
                </p>
                <br>
                
            </div><!--INFORMACOES DO PEDIDO-->
        </div><!--BOX PEDIDO-->
                
            `;
        
        } else if(pedido.Personalizacoes[i] != "" && (!(pedido.Imagens) || pedido.Imagens[pedido.Imagens.length - 1][i] == "" || pedido.Imagens[pedido.Imagens.length-1][i] == undefined)){
            boxMaior.innerHTML += `
            <div class="boxPedido">
            <div class="boxPedido">
            <div class="col1" id="boxImg">
            <img src="../../assets/2.png" class="imgPedido">

            </div>

           
            <div class="col2" id="boxInfos">
                <h2 id="tituloPedido">${pedido.Pedido[i]}</h2>
                <h4 id="quantidadePedido">Quantidade: ${pedido.Quantidades[i]}</h4>
                <br>
                
                <p id="descricaoPedido">
                    ${pedido.Descricao[i]}
                </p>
                <br>
                
            </div><!--INFORMACOES DO PEDIDO-->
        </div><!--BOX PEDIDO-->
                
            `;

        }else if(pedido.Personalizacoes[i] == "" && (!(pedido.Imagens) || pedido.Imagens[pedido.Imagens.length - 1][i] == "" || pedido.Imagens[pedido.Imagens.length-1][i] == undefined)){
            //Sem personalizacao e sem imagem

            boxMaior.innerHTML += `
            <div class="boxPedido">
            <div class="boxPedido">
            <div class="col1" id="boxImg">
            <img src="../../assets/2.png" class="imgPedido">

            </div>

           
            <div class="col2" id="boxInfos">
                <h2 id="tituloPedido">${pedido.Pedido[i]}</h2>
                <h4 id="quantidadePedido">Quantidade: ${pedido.Quantidades[i]}</h4>
                <br>
                
                <p id="descricaoPedido">
                    ${pedido.Descricao[i]}
                </p>
                <br>
                
            </div><!--INFORMACOES DO PEDIDO-->
        </div><!--BOX PEDIDO-->
                
            `;
        } else if(pedido.Personalizacoes[i] != "" && (!(pedido.Imagens) || pedido.Imagens[pedido.Imagens.length - 1][i] == "" || pedido.Imagens[pedido.Imagens.length-1][i] == undefined)){
            //Com personalizacao e sem imagem
            boxMaior.innerHTML += `
            <div class="boxPedido">
            <div class="col1" id="boxImg">
            <img src="../../assets/2.png" class="imgPedido">

            </div>

            <div class="col2" id="boxInfos">
                <h2 id="tituloPedido">${pedido.Pedido[i]}</h2>
                <h4 id="quantidadePedido">Quantidade: ${pedido.Quantidades[i]}</h4>
                <br>
                
                <p id="descricaoPedido">
                    ${pedido.Descricao[i]}
                </p>
                <br>
                
                <p id="personalizacaoPedido">
                    ${pedido.Personalizacoes[i]}
                </p>

            </div><!--INFORMACOES DO PEDIDO-->
        </div><!--BOX PEDIDO--></div>
            `;
        } else if(pedido.Personalizacoes[i] == "" && pedido.Imagens[pedido.Imagens.length - 1][i] != ""){
            //Sem personalizacao e com imagem
            boxMaior.innerHTML += `

            <div class="boxPedido">
            <div class="col1" id="boxImg">
                    <img src="${pedido.Imagens[pedido.Imagens.length - 1][i]}" class="imgPedido">

            </div>

            <div class="col2" id="boxInfos">
                <h2 id="tituloPedido">${pedido.Pedido[i]}</h2>
                <h4 id="quantidadePedido">Quantidade: ${pedido.Quantidades[i]}</h4>
                <br>
                
                <p id="descricaoPedido">
                    ${pedido.Descricao[i]}
                </p>
                <br>
                
            </div><!--INFORMACOES DO PEDIDO-->
        </div><!--BOX PEDIDO-->
            
            `;
        } else {
            //Completo
            boxMaior.innerHTML += `
        <div class="boxPedido">
            <div class="col1" id="boxImg">
                    <img src="${pedido.Imagens[pedido.Imagens.length - 1][i]}" class="imgPedido">

            </div>

            <div class="col2" id="boxInfos">
                <h2 id="tituloPedido">${pedido.Pedido[i]}</h2>
                <h4 id="quantidadePedido">Quantidade: ${pedido.Quantidades[i]}</h4>
                <br>
                
                <p id="descricaoPedido">
                    ${pedido.Descricao[i]}
                </p>
                <br>
                
                <p id="personalizacaoPedido">
                    ${pedido.Personalizacoes[i]}
                </p>

            </div><!--INFORMACOES DO PEDIDO-->
        </div><!--BOX PEDIDO-->

        <hr class="hr-divisoria">
        `;
            }
        }

        boxMaior.innerHTML += `
    
        <div class="boxCliente">
        <div class="col ind">
            <h3>Cliente</h3>
            <h2 id="clienteNome">${pedido.NomeCliente}</h2>
            
            <h3>Contato</h3>
            <h2 id="clienteContato">${pedido.ContatoCliente}</h2>
        </div>

        <div class="col ind">
            <h4 id="dataEntregaPedido">Entrega em ${pedido.DataEntrega}</h4>
            <br>
            <h3>Endereço de Entrega</h3>
            <p id="enderecoEntrega">
                ${pedido.EnderecoEntrega}
            </p>
            
        </div>

        <div class="col ind" id="boxValorTotal">
            <h3>Valor Total</h3>
            <h2 id="valorTotal">${pedido.ValorTotal}</h2>
        </div>

    </div><!--INFORMAÇOES DO CLIENTE-->
    
    <div id="opcoes">
        <button class="btGrey2" id="btEditar" onclick="editarPedido()">Editar</button>
        <button class="btGrey2" id="btVoltar" onclick="btVoltar()">Voltar</button>
    </div> 

        `;
    })
}
function btVoltar(){
    window.location.href = "../pages/fila-pedidos.html"
}
  
window.onload = () => {
    carregarPedido();
}



  
function editarPedido() { 
    // redireciona para a página editar-pedido.html
    window.location.href = "../pages/editar-pedido.html";
  }

  