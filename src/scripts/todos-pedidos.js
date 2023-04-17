window.onload = () => {
    filtroTodos()
}

var data = new Date();
var dia = String(data.getDate()).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();
let dataAtual = dia + '/' + mes + '/' + ano;
console.log(dataAtual)

let userId = localStorage.getItem('UserId')
let pedidosRef = firebase.database().ref('formulario-np/' + userId + '/')
let listaStatusAndamento = ["Novo Pedido", "Preparando", "Aguardando Envio", "Concluido"];





function filtroHoje(){
    //select pedidosHoje
    pedidosRef.on('value', (snapshot) => {
        const pedidos = snapshot.val();
        const tbody = document.querySelector('#tabela-pedidos tbody');
    
    
        // Limpando o corpo da tabela antes de preencher com novos dados
        tbody.innerHTML = '';
    
        // Iterando sobre os pedidos e adicionando na tabela
        for (let key in pedidos) {
            const pedido = pedidos[key];

            if(pedido.DataPedido == dataAtual){
              const andamentoPedido = pedido.StatusAndamento;
              let aux_andamentoPedido = '';
        
              if (andamentoPedido == 'Novo Pedido') {
                aux_andamentoPedido = '#ffa500';
              } else if (andamentoPedido == 'Preparando') {
                aux_andamentoPedido = '#ffff00';
              } else if (andamentoPedido == 'Aguardando Envio') {
                aux_andamentoPedido = '#000000';
              } else if (andamentoPedido == 'Concluido') {
                aux_andamentoPedido = '#008000';
              }
        
              if (key < pedido) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                  <td>${pedido.ContatoCliente}</td>
                  <td>${pedido.NomeCliente}</td>
                  <td>${pedido.Pedido}</td>
                  <td>${pedido.ValorTotal}</td>
                  <td>${pedido.DataEntrega}</td>
                  <td>${pedido.DataAniversario}</td>
                  <td>${pedido.StatusPagamento}</td>
                  <td>
                    <input type="color" list="presetColors" id="inputColor" value="${aux_andamentoPedido}">
                    <datalist id="presetColors" disabled>
                      <option id="novoPedido">#ffa500</option>
                      <option id="preparando">#ffff00</option>
                      <option id="aguardandoEnvio">#000000</option>
                      <option id="concluido">#008000</option>
                    </datalist>
                  </td>
                  <td><span id="btApagarPedido">X</span></td>
                `; 
      
               
               // document.querySelectorAll('#btApagarPedido')[key].addEventListener('click', ()=>{
                 // apagarPedido(key)
               // })
      
                const inputColor = tr.querySelector('#inputColor');
                const pedidosRefIn = firebase.database().ref('formulario-np/' + userId + '/' + key);
      
               
                
      
                const selectedColor = inputColor;

          inputColor.addEventListener('change', function () {
            
             
            if(selectedColor.value == '#008000'){
              pedidosRefIn.update({Concluido: true, StatusAndamento: listaStatusAndamento[3]})
              console.log(listaStatusAndamento[3])

            } else if(selectedColor.value == '#000000'){
              pedidosRefIn.update({Concluido: false, StatusAndamento: listaStatusAndamento[2]})
              console.log(listaStatusAndamento[2])

            } else if(selectedColor.value == '#ffff00'){
              pedidosRefIn.update({Concluido: false, StatusAndamento: listaStatusAndamento[1]})
              console.log(listaStatusAndamento[1])
            } else if(selectedColor.value == '#ffa500'){
              pedidosRefIn.update({Concluido: false, StatusAndamento: listaStatusAndamento[0]})
              console.log(listaStatusAndamento[0])
            }

            
            
                         
          });
        
                tbody.appendChild(tr);
              }
            }
          }
      });
    }
        

function parseData(dataString) {
    if (!dataString) {
      return null;
    }
    const [dia, mes, ano] = dataString.split('/');
    const data = new Date(`${ano}-${mes}-${dia}T00:00:00.000Z`);
    return data;
  }

  function filtroSemana(){
    //select pedidosSemana
    pedidosRef.on('value', (snapshot) => {
        const pedidos = snapshot.val();
        const tbody = document.querySelector('#tabela-pedidos tbody');

        // Limpando o corpo da tabela antes de preencher com novos dados
        tbody.innerHTML = '';

        // Data atual e data de 7 dias atrás
        const dataAtual = new Date();
        const dataAnterior = new Date();
        dataAnterior.setDate(dataAnterior.getDate() - 7);

        // Iterando sobre os pedidos e adicionando na tabela
        for (let key in pedidos) {
            const pedido = pedidos[key];

            const dataPedido = parseData(pedido.DataPedido);
            if(dataPedido >= dataAnterior && dataPedido <= dataAtual){
              const andamentoPedido = pedido.StatusAndamento;
              let aux_andamentoPedido = '';
        
              if (andamentoPedido == 'Novo Pedido') {
                aux_andamentoPedido = '#ffa500';
              } else if (andamentoPedido == 'Preparando') {
                aux_andamentoPedido = '#ffff00';
              } else if (andamentoPedido == 'Aguardando Envio') {
                aux_andamentoPedido = '#000000';
              } else if (andamentoPedido == 'Concluido') {
                aux_andamentoPedido = '#008000';
              }
        
              if (key < pedido) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                  <td>${pedido.ContatoCliente}</td>
                  <td>${pedido.NomeCliente}</td>
                  <td>${pedido.Pedido}</td>
                  <td>${pedido.ValorTotal}</td>
                  <td>${pedido.DataEntrega}</td>
                  <td>${pedido.DataAniversario}</td>
                  <td>${pedido.StatusPagamento}</td>
                  <td>
                    <input type="color" list="presetColors" id="inputColor" value="${aux_andamentoPedido}">
                    <datalist id="presetColors" disabled>
                      <option id="novoPedido">#ffa500</option>
                      <option id="preparando">#ffff00</option>
                      <option id="aguardandoEnvio">#000000</option>
                      <option id="concluido">#008000</option>
                    </datalist>
                  </td>
                  <td><span id="btApagarPedido">X</span></td>
                `; 
      
      
                const inputColor = tr.querySelector('#inputColor');
                const pedidosRefIn = firebase.database().ref('formulario-np/' + userId + '/' + key);
      
                const selectedColor = inputColor;

          inputColor.addEventListener('change', function () {
            
             
            if(selectedColor.value == '#008000'){
              pedidosRefIn.update({Concluido: true, StatusAndamento: listaStatusAndamento[3]})
              console.log(listaStatusAndamento[3])

            } else if(selectedColor.value == '#000000'){
              pedidosRefIn.update({Concluido: false, StatusAndamento: listaStatusAndamento[2]})
              console.log(listaStatusAndamento[2])

            } else if(selectedColor.value == '#ffff00'){
              pedidosRefIn.update({Concluido: false, StatusAndamento: listaStatusAndamento[1]})
              console.log(listaStatusAndamento[1])
            } else if(selectedColor.value == '#ffa500'){
              pedidosRefIn.update({Concluido: false, StatusAndamento: listaStatusAndamento[0]})
              console.log(listaStatusAndamento[0])
            }

            
            
                         
          });            
              
        
                tbody.appendChild(tr);
              }
            }
          }
      });
  }
        

function filtroMes() {
    //select pedidosHoje
    pedidosRef.on('value', (snapshot) => {
      const pedidos = snapshot.val();
      const tbody = document.querySelector('#tabela-pedidos tbody');
  
      // Limpando o corpo da tabela antes de preencher com novos dados
      tbody.innerHTML = '';
  
      // Iterando sobre os pedidos e adicionando na tabela
      for (let key in pedidos) {
        const pedido = pedidos[key];
  
        // Verificando se o pedido está dentro do mês atual
        const dataPedido = parseData(pedido.DataPedido);
        if (dataPedido === null) {
          continue; // pulando para o próximo pedido
        }
        const mesAtual = new Date().getMonth() + 1;
        const anoAtual = new Date().getFullYear();
  
        if (
          dataPedido.getMonth() + 1 === mesAtual &&
          dataPedido.getFullYear() === anoAtual &&
          dataPedido.getDate() >= 1 &&
          dataPedido.getDate() <= 30
        ) {
          const andamentoPedido = pedido.StatusAndamento;
        let aux_andamentoPedido = '';
  
        if (andamentoPedido == 'Novo Pedido') {
          aux_andamentoPedido = '#ffa500';
        } else if (andamentoPedido == 'Preparando') {
          aux_andamentoPedido = '#ffff00';
        } else if (andamentoPedido == 'Aguardando Envio') {
          aux_andamentoPedido = '#000000';
        } else if (andamentoPedido == 'Concluido') {
          aux_andamentoPedido = '#008000';
        }
  
        if (key < pedido) {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${pedido.ContatoCliente}</td>
            <td>${pedido.NomeCliente}</td>
            <td>${pedido.Pedido}</td>
            <td>${pedido.ValorTotal}</td>
            <td>${pedido.DataEntrega}</td>
            <td>${pedido.DataAniversario}</td>
            <td>${pedido.StatusPagamento}</td>
            <td>
              <input type="color" list="presetColors" id="inputColor" value="${aux_andamentoPedido}">
              <datalist id="presetColors" disabled>
                <option id="novoPedido">#ffa500</option>
                <option id="preparando">#ffff00</option>
                <option id="aguardandoEnvio">#000000</option>
                <option id="concluido">#008000</option>
              </datalist>
            </td>
            <td><span id="btApagarPedido">X</span></td>
          `; 

        

          const inputColor = tr.querySelector('#inputColor');
          const pedidosRefIn = firebase.database().ref('formulario-np/' + userId + '/' + key);

          const selectedColor = inputColor;

          inputColor.addEventListener('change', function () {
            
             
            if(selectedColor.value == '#008000'){
              pedidosRefIn.update({Concluido: true, StatusAndamento: listaStatusAndamento[3]})
              console.log(listaStatusAndamento[3])

            } else if(selectedColor.value == '#000000'){
              pedidosRefIn.update({Concluido: false, StatusAndamento: listaStatusAndamento[2]})
              console.log(listaStatusAndamento[2])

            } else if(selectedColor.value == '#ffff00'){
              pedidosRefIn.update({Concluido: false, StatusAndamento: listaStatusAndamento[1]})
              console.log(listaStatusAndamento[1])
            } else if(selectedColor.value == '#ffa500'){
              pedidosRefIn.update({Concluido: false, StatusAndamento: listaStatusAndamento[0]})
              console.log(listaStatusAndamento[0])
            }
             
          });
  
          tbody.appendChild(tr);
        }
      }
    }    
  });
  }


function filtroTodos() {
    //select pedidosTodos
    pedidosRef.on('value', (snapshot) => {
      const pedidos = snapshot.val();
      const tbody = document.querySelector('#tabela-pedidos tbody');
  
      // Limpando o corpo da tabela antes de preencher com novos dados
      tbody.innerHTML = '';
  
      // Iterando sobre os pedidos e adicionando na tabela
      for (let key in pedidos) {
        const pedido = pedidos[key];
  
        const andamentoPedido = pedido.StatusAndamento;
        let aux_andamentoPedido = '#aaaaaa';
    
  
        if (andamentoPedido == 'Novo Pedido') {
          aux_andamentoPedido = '#ffa500';
        } else if (andamentoPedido == 'Preparando') {
          aux_andamentoPedido = '#ffff00';

        } else if (andamentoPedido == 'Aguardando Envio') {
          aux_andamentoPedido = '#000000';
     
        } else if (andamentoPedido == 'Concluido') {
          aux_andamentoPedido = '#008000';
        }
        
        

        if (key < pedido) { 
          

          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${pedido.ContatoCliente}</td>
            <td>${pedido.NomeCliente}</td>
            <td>${pedido.Pedido}</td>
            <td>${pedido.ValorTotal}</td>
            <td>${pedido.DataEntrega}</td>
            <td>${pedido.DataAniversario}</td>
            <td>${pedido.StatusPagamento}</td>
            <td>
              <input type="color" list="presetColors" id="inputColor" value="${aux_andamentoPedido}">
              <datalist id="presetColors" disabled>
                <option id="novoPedido">#ffa500</option>
                <option id="preparando">#ffff00</option>
                <option id="aguardandoEnvio">#000000</option>
                <option id="concluido">#008000</option>
              </datalist>
            </td>
            <td><span id="btApagarPedido" data-pedido-id="${key}">X</span></td>
          `; 

          if(pedido.Concluido == true){
            document.getElementById('concluido') //to aqui
            
          }

          const btApagar = tr.querySelector('#btApagarPedido')

          const inputColor = tr.querySelector('#inputColor');
          const pedidosRefIn = firebase.database().ref('formulario-np/' + userId + '/' + key);

          
          

          btApagar.addEventListener('click', function(){
            let resultado;

            resultado = window.confirm("Deseja apagar esse pedido?")

            if(resultado == true){
              pedidosRefIn.remove()
                            .then(() => {
                        console.log('Pedido: ' + pedido.Pedido + ' removido com sucesso.');
                    })
                            .catch((error) => {
                        console.log('Erro ao remover pedido: ', error);
                  });
            }

                
          })

          
          const selectedColor = inputColor;

          inputColor.addEventListener('change', function () {
            
             
            if(selectedColor.value == '#008000'){
              pedidosRefIn.update({StatusAndamento: listaStatusAndamento[3]})
              console.log(listaStatusAndamento[3])

            } else if(selectedColor.value == '#000000'){
              pedidosRefIn.update({StatusAndamento: listaStatusAndamento[2]})
              console.log(listaStatusAndamento[2])

            } else if(selectedColor.value == '#ffff00'){
              pedidosRefIn.update({StatusAndamento: listaStatusAndamento[1]})
              console.log(listaStatusAndamento[1])
            } else if(selectedColor.value == '#ffa500'){
              pedidosRefIn.update({StatusAndamento: listaStatusAndamento[0]})
              console.log(listaStatusAndamento[0])
            }

            
            
                         
          });
          

          tbody.appendChild(tr);
        }
      }
    });
  }
  

document.getElementById('select-filtro').addEventListener('change', ()=>{
    if(document.getElementById('select-filtro').value == 'pedidosHoje'){
        filtroHoje()
    } else if(document.getElementById('select-filtro').value == 'pedidosSemana'){
        filtroSemana()
    } else if(document.getElementById('select-filtro').value == 'pedidosMes'){
        filtroMes()
    } else {
        filtroTodos()
    }
})


//Apagar pedido unico
function apagarPedido(key) {
  const pedidosRefIn = firebase.database().ref('formulario-np/' + userId + '/' + key);
  pedidosRefIn.remove()
    .then(() => {
      console.log('Pedido: ' + pedido.Pedido + 'removido com sucesso.');
    })
    .catch((error) => {
      console.log('Erro ao remover pedido: ', error);
    });
} 



//FILTRO POR TELEFONE
$(document).ready(function(){
    $('#input-filtro').mask('(99) 99999-9999');
    $('#input-filtro').on('input', function() {
        var filtro = $(this).val().replace(/[^\d]/g, ''); // remove os caracteres que não são dígitos
        $('#tabela-pedidos tbody tr').hide(); // esconde todas as linhas da tabela
        $('#tabela-pedidos tbody tr').each(function() { // percorre todas as linhas da tabela
            var telefone = $(this).find('td:first-child').text().replace(/[^\d]/g, ''); // extrai apenas os dígitos do primeiro TD de cada linha
            if (telefone.indexOf(filtro) !== -1) { // se o filtro corresponder ao número de telefone
                $(this).show(); // mostra a linha correspondente
            }
        });
    });
});



//redirect to fila de pedidos
function goToFilaPedidos(){
    window.location.href = "../pages/fila-pedidos.html"
}

document.getElementById('goToFila').addEventListener('click', goToFilaPedidos)

let filtroData = document.getElementById('select-filtro')

//Exportando para excel
function exportarParaExcel() {
    // Selecionando a tabela
    const tabela = document.querySelector('#tabela-pedidos');
  
    // Criando uma nova planilha do Excel
    const workbook = XLSX.utils.book_new();
  
    // Definindo o nome da planilha
    const sheetName = 'Pedidos';
  
    // Selecionando os dados da tabela
    const tableData = XLSX.utils.table_to_sheet(tabela);
  
    // Adicionando a planilha ao livro de trabalho
    XLSX.utils.book_append_sheet(workbook, tableData, sheetName);
  
    // Salvando o arquivo de acordo com o filtro de data
    let filename = 'Pedidos';
  
    const filtro = document.querySelector('#select-filtro').value;
    if (filtro == 'pedidosHoje') {
      filename += '_hoje.xlsx';
    } else if (filtro == 'pedidosSemana') {
      filename += '_semana.xlsx';
    } else if (filtro == 'pedidosMes') {
      filename += '_mes.xlsx';
    } else if(filtro == 'pedidosTodos') {
        filename += '_todosPedidos.xlsx'
    }
  
    // Salvando o arquivo
    XLSX.writeFile(workbook, filename);
  }
  

document.getElementById('btExportar').addEventListener('click', exportarParaExcel)


