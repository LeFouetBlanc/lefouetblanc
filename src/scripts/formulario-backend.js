function toFilaPedidos(){
    window.location.href = '../pages/fila-pedidos.html';
}

let userId = localStorage.getItem('UserId')
const storageRef = firebase.storage().ref();
const databaseRef = firebase.database().ref('formulario-np/' + userId);


let imgs = []
let listaImgs = []


var data = new Date();
var dia = String(data.getDate()).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();
let dataAtual = dia + '/' + mes + '/' + ano;
console.log(dataAtual)

function uploadImg(file) {
    return new Promise((resolve, reject) => {
        let storageRef = firebase.storage().ref('imagens/' + file.name);
        let task = storageRef.put(file);
        task.on('state_changed', 
            function progress(snapshot){
                let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + percent + '% done');
            }, 
            function error(err){
                console.log('Erro ao fazer upload da imagem: ', err);
                reject(err);
            },
            function complete(){
                console.log('Upload da imagem completo');
                storageRef.getDownloadURL().then(url => resolve(url));
            }
        );
    });
}



export function savingImgs(){

    for (let i = 0; i < document.querySelectorAll('#pedidoProduto').length; i++){
    let file = document.querySelectorAll(`.inputImg`)[i].files[0];
            if(file) {
                imgs.push(uploadImg(file))
            } else {
                imgs.push(uploadImg('../../assets/3'))
            }   
    }
        Promise.all(imgs).then((urlImgs) => { 
            listaImgs.push(urlImgs)
                
        }).catch((err) => {
            console.log('Erro ao salvar imagens: ', err);
        })

}


document.querySelector('#btAddProduto').addEventListener('click', savingImgs)
document.querySelector('.inputImg').addEventListener('change', savingImgs)



export function sendOrder(){
    for(let x = 0; x < listaImgs.length; x++){
         console.log("Imagens: ", listaImgs[x])
     }
    
    //endereço do banco de dados
    let formDataRef = firebase.database().ref('formulario-np/' + userId)

    //Cliente
    let nomeCliente = document.getElementById('nomeCliente').value
    let contatoCliente = document.getElementById('contatoCliente').value
    let dataAniversario = document.getElementById('dataAniversario').value

    let dataEntrega = document.getElementById('dataEntrega').value
    let enderecoEntrega = document.getElementById('enderecoEntrega').value

    let taxaEntrega = document.getElementById('taxaEntrega').value

    let StatusAndamento = "Novo Pedido";
    //Novo pedido, Preparando, Aguardando Envio, Concluido
    //Laranja, Amarelo, Verde, Preto

    //PEDIDO
    let pedidos = [];
    let quantidades = []
    let descricoes = []
    let valorPedidos = []
    
    let personalizacoes = []
    let valoresExtra = []

    let valorTotal = calcValorTotal();
    let statusPgto = document.getElementById('pedidoStatusPagamento').value;
  
    for(let i = 0; i < document.querySelectorAll('#pedidoProduto').length; i++){
        pedidos.push(document.querySelectorAll(`#pedidoProduto`)[i].value)

        quantidades.push(document.querySelectorAll(`#pedidoQuantidade`)[i].value)

        if(document.getElementsByClassName('pedidoDescricao')[i].value
        == ""){
            descricoes.push(" ")
        } else {
            descricoes.push(document.getElementsByClassName('pedidoDescricao')[i].value
            )
        }

        valorPedidos.push(document.querySelectorAll(`#pedidoValor`)[i].value)
          
        personalizacoes.push(document.getElementsByClassName("pedidoPersonalizacao")[i].value);
        
        
        if(document.getElementsByClassName('valorPersonalizacao')[i].value == ""){
            valoresExtra.push(0)
        } else {
            valoresExtra.push(document.getElementsByClassName('valorPersonalizacao')[i].value)
        }
        

    }

    let partes = dataEntrega.split('/')

    let dataEntregaInversa = partes[2] + "/" + partes[1] + "/" + partes[0];
   

    //fazer verificações
    if(!(nomeCliente != "" && contatoCliente != "" && dataEntrega != "" && enderecoEntrega != "")){
        alert("Preencha as informações do cliente.")
    } else if(!(pedidos != "" && quantidades != "" && valorPedidos != "")){
        alert("Preencha as informações do pedido.")
    } else if(statusPgto != "pago" && statusPgto != "naoPago"){
        alert("Selecione uma opção para o status do pedido.")
    } else {
        //caso as verificações sejam validadas
            let formPedido = {
                NomeCliente: nomeCliente,
                ContatoCliente: contatoCliente,
                DataAniversario: dataAniversario,
                Pedido: pedidos,
                Quantidades: quantidades,
                Descricao: descricoes,
                ValorPedido: valorPedidos,
                Personalizacoes: personalizacoes,
                Imagens: listaImgs,
                ValorExtra: valoresExtra,
                DataEntrega: dataEntrega,
                DataEntregaInversa: dataEntregaInversa,
                EnderecoEntrega: enderecoEntrega,
                TaxaEntrega: taxaEntrega,
                ValorTotal: valorTotal,
                StatusPagamento: statusPgto,
                StatusAndamento: StatusAndamento,
                Concluido: false,
                DataPedido: dataAtual
                }

                formDataRef.push(formPedido)
                alert("Pedido enviado com sucesso!")
               window.location.href = '../pages/fila-pedidos.html';
               
            
        }
    }



document.getElementById('btEnviarPedido').addEventListener('click', sendOrder)