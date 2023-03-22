

let j = 0; //Variavel de apoio

function addPersonalizacao(i){
    //btAddPersonalizacao
    document.getElementsByClassName('box-personalizacao')[i].style.display = "flex"
    document.getElementsByClassName('btAddPersonalizacao')[i].style.display = "none"
}

function changeImg(i){
    document.getElementById(`labelInputImg${i}`).style.background = "#38AE00"
    document.getElementById(`labelInputImg${i}`).style.color = "white"
}



function addNewProduct(){
    //btAddProduto

    j++

    let divBaseNewProduto = document.getElementById('divBaseNewProduto')

    divBaseNewProduto.innerHTML += `
    <hr class="hr-divisoria"><div class="form-pedido"><!--FORM PEDIDO-->
    <h2>Pedido ${j + 1}</h2>
    <input type="text" id="pedidoProduto" placeholder="Produto">
    <input type="number" id="pedidoQuantidade" class="pedidoDescricao" placeholder="Quantidade">
    <textarea rows="7" cols="40" placeholder="
    
    
Descrição"></textarea>

    <input type="text" id="pedidoValor" class="pedidoValor" placeholder="Valor do pedido"><br>
    <button id="btAddPersonalizacao" class="btGrey2 btAddPersonalizacao" onclick="addPersonalizacao(${j})">
        Adicionar Personalização
    </button><br>

    <!--PERSONALIZAÇAO-->
    <div class="box-personalizacao" id="box-personalizacao">
        <h2>Personalizacao ${j+1}</h2>
        <div id="personalizacaoCol1">

        <div id="boxInputImg">
            <label for="inputImg" class="labelInputImg" id="labelInputImg${j}">Imagem
            </label>
            <input type="file" class="inputImg" name="imagem${j}" id="inputImg" accept="image/png, imagem/jpg, image/jpeg" onchange="changeImg(${j})">
    
        </div><!--boxInputIMG-->

            <textarea rows="7" cols="40" class="pedidoPersonalizacao" placeholder="
        
        
Personalização"></textarea>

        </div><!--COL 1-->

            <div id="personalizacalCol2">
                <div id="boxValorPersonaliacao">
                    <input type="text" id="valorPersonalizacao" class="valorPersonalizacao" placeholder="valor extra">
                </div><!--BOX VALOR PERSONALIZACAO-->
            </div><!--COL 2-->
        </div><!--BOX PERSONALIZACAO-->
    <!--FIM PERSONALIZAÇAO-->

</div><!--FORM PEDIDO-->
    `;
}


function calcValorTotal(){
    let somaTotal = 0;

    //Calculo dos pedidos
    let auxPedidos;
    let aux_auxPedidos;
    let somaPedidos = 0;

    for(let v = 0; v <= j; v++){
        auxPedidos = document.querySelectorAll('#pedidoValor')[v].value
        aux_auxPedidos = auxPedidos.replace(/R\$\s?|,/g, "");
        if(aux_auxPedidos == ""){
            aux_auxPedidos = 0;
        }
        
        somaPedidos = somaPedidos + parseFloat(aux_auxPedidos)
        
    }
    
    //Calculo das personalizacoes
    let auxPersonalizacao;
    let aux_auxPersonalizacao = 0;
    let somaPersonalizacao = 0;

    for(let v = 0; v <= j; v++){
        auxPersonalizacao = document.querySelectorAll('#valorPersonalizacao')[v].value
        aux_auxPersonalizacao = auxPersonalizacao.replace(/R\$\s?|,/g, "");
        if(aux_auxPersonalizacao == ""){
            aux_auxPersonalizacao = 0;
        } 

        somaPersonalizacao = somaPersonalizacao + parseFloat(aux_auxPersonalizacao)
        
    }


    //Calculo total
    somaTotal = somaPersonalizacao + somaPedidos
    let somaTotalTratada = somaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    //Mostrar valor no final
    document.getElementById('pedidoValorTotal').value = somaTotalTratada

    return somaTotalTratada
}

document.querySelector('#pedidoStatusPagamento').addEventListener('change', calcValorTotal)



