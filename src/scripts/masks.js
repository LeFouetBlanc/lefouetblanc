
//CLIENTE
$('.contatoCliente').mask('(99) 99999-9999');
$(".dataEntrega").mask("99/99/9999");
$('.dataAniversario').mask('99/99/9999');



//PEDIDO
$(function(){
    $('#taxaEntrega').maskMoney({
        prefix:'R$ ',
        allowNegative: true,
        thousands:',', decimal:'.',
        affixesStay: true
    });

    $('.pedidoValor').maskMoney({
        prefix:'R$ ',
        allowNegative: true,
        thousands:',', decimal:'.',
        affixesStay: true
    });

    $('#pedidoValorTotal').maskMoney({
        prefix: 'R$ ',
        allowNegative: true,
        thousands: ',', decimal: '.',
        affixesStay: true
    });

    $('.valorPersonalizacao').maskMoney({
        prefix: 'R$ ',
        allowNegative: true,
        thousands: ',',
        decimal: '.',
        affixesStay: true
    });

    $('.ValorTotal').maskMoney({
        prefix: 'R$ ',
        allowNegative: true,
        thousands: ',', decimal: '.',
        affixesStay: true
    })
})


document.getElementById('btAddProduto').addEventListener('click', ()=>{
    $('.pedidoValor').maskMoney({
        prefix:'R$ ',
        allowNegative: true,
        thousands:',', decimal:'.',
        affixesStay: true
    });

    $('#pedidoValorTotal').maskMoney({
        prefix: 'R$ ',
        allowNegative: true,
        thousands: ',', decimal: '.',
        affixesStay: true
    });

    $('.valorPersonalizacao').maskMoney({
        prefix: 'R$ ',
        allowNegative: true,
        thousands: ',',
        decimal: '.',
        affixesStay: true
    })
    
})

document.getElementById('pedidoValorTotal').addEventListener('change', ()=>{
    $('#pedidoValorTotal').maskMoney({
        prefix: 'R$ ',
        allowNegative: true,
        thousands: ',', decimal: '.',
        affixesStay: true
    });
})


   
