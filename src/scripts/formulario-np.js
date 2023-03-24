

let j = 0; //Variavel de apoio
let divBaseNewProduto = document.getElementById('divBaseNewProduto')

function changeImg(i){
    console.log(i);
    document.getElementById(`labelInputImg${i}`).style.background = "#38AE00"
    document.getElementById(`labelInputImg${i}`).style.color = "white"
}

document.querySelectorAll(`.inputImg`)[j].addEventListener('change', () => {
  changeImg(j)
})

function addPersonalizacao(i){
    //btAddPersonalizacao
    document.getElementsByClassName('box-personalizacao')[i].style.display = "flex"
    document.querySelectorAll('#btRemovePersonalizacao')[i].style.display = "inline-block"
    document.querySelectorAll('#btAddPersonalizacao')[i].style.display = "none"
}

function removePersonalizacao(i){
    document.getElementsByClassName('box-personalizacao')[i].style.display = "none"
    document.querySelectorAll('#btRemovePersonalizacao')[i].style.display = "none"
    document.querySelectorAll('#btAddPersonalizacao')[i].style.display = "inline-block"

    //definir values = 0
    document.querySelectorAll('#inputImg')[i].value = "";document.querySelectorAll('.pedidoPersonalizacao')[i].value = "";
    document.querySelectorAll('#valorPersonalizacao')[i].value = "";

    //estou corrigindo esse bug
}





function addNewProduct(){
    //btAddProduto
    j++

    divBaseNewProduto.innerHTML += `
    <hr class="hr-divisoria"><div class="form-pedido"><!--FORM PEDIDO-->
    <h2>Pedido ${j + 1}</h2>
    <input type="text" id="pedidoProduto" placeholder="Produto">
    <input type="number" id="pedidoQuantidade" class="pedidoDescricao" placeholder="Quantidade">
    <textarea rows="7" cols="40" placeholder="
    
    
Descrição"></textarea>

    <input type="text" id="pedidoValor" class="pedidoValor" onkeyup="calcValorTotal()" placeholder="Valor do pedido"><br>
    <button class="btGrey2 btAddPersonalizacao" id="btAddPersonalizacao" onclick="addPersonalizacao(${j})">
                Adicionar Personalização
            </button>
    <button id="btRemovePersonalizacao" class="btGrey2 btAddPersonalizacao" style="display: none;" onclick="removePersonalizacao(${j})">
    Remover Personalização
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
                    <input type="text" id="valorPersonalizacao" class="valorPersonalizacao" onkeyup="calcValorTotal()" placeholder="valor extra">
                </div><!--BOX VALOR PERSONALIZACAO-->
            </div><!--COL 2-->
        </div><!--BOX PERSONALIZACAO-->
    <!--FIM PERSONALIZAÇAO-->

</div><!--FORM PEDIDO-->
    `;
}


function removeLastProduct() {
    // verifica se há algum produto a ser removido
    if (j > 0) {
      // remove o último elemento adicionado em divBaseNewProduto
      divBaseNewProduto.removeChild(divBaseNewProduto.lastElementChild);
      j--;
  
      // recalcular o valor total
      calcValorTotal();
    }
  }
  
  function calcValorTotal() {
    let somaTotal = 0;
  
    // Calculo dos pedidos
    let auxPedidos;
    let aux_auxPedidos;
    let somaPedidos = 0;
  
    for (let v = 0; v <= j; v++) {
      auxPedidos = document.querySelectorAll("#pedidoValor")[v].value;
      aux_auxPedidos = auxPedidos.replace(/R\$\s?|,/g, "");
      if (aux_auxPedidos == "") {
        aux_auxPedidos = 0;
      }
  
      somaPedidos = somaPedidos + parseFloat(aux_auxPedidos);
    }
  
    // Calculo das personalizacoes
    let auxPersonalizacao;
    let aux_auxPersonalizacao = 0;
    let somaPersonalizacao = 0;
  
    for (let v = 0; v <= j; v++) {
      auxPersonalizacao = document.querySelectorAll("#valorPersonalizacao")[v].value;
      aux_auxPersonalizacao = auxPersonalizacao.replace(/R\$\s?|,/g, "");
      if (aux_auxPersonalizacao == "") {
        aux_auxPersonalizacao = 0;
      }
  
      somaPersonalizacao = somaPersonalizacao + parseFloat(aux_auxPersonalizacao);
    }
  
    let taxaEntrega = document.getElementById("taxaEntrega").value;
  
    let taxaEntregaTratada = taxaEntrega.replace(/R\$\s?|,/g, "");
  
    // Calculo total
    somaTotal = parseFloat(taxaEntregaTratada) + somaPersonalizacao + somaPedidos;
    let somaTotalTratada = somaTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  
    // Mostrar valor no final
    document.getElementById("pedidoValorTotal").value = somaTotalTratada;
  
    // se não houver pedidos ou personalizações, definir o valor total como zero
    if (j == 0 && document.querySelectorAll(".valorPersonalizacao").length == 0) {
      somaTotal = 0;
    }
  
    return somaTotalTratada;
  }

document.querySelector('.pedidoValor').addEventListener('keyup', calcValorTotal)
document.querySelector('.valorPersonalizacao').addEventListener('keyup', calcValorTotal)
document.querySelector('#taxaEntrega').addEventListener('keyup', calcValorTotal)


