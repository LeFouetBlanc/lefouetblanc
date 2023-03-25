let userId = localStorage.getItem('UserId')
let pedidosRef = firebase.database().ref('formulario-np/' + userId + '/')

function apagarPedidosConcluidos(userId) {
    let resultado;
    resultado = window.confirm("Deseja apagar todos os pedidos concluidos?")

    if(resultado == true){
    pedidosRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        if (childData.Concluido === true) {
          pedidosRef.child(childKey).remove();
        }
      });
    });
  }
}


document.getElementById('btApagar').addEventListener('click', apagarPedidosConcluidos)