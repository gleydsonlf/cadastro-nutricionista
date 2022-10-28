var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", (event)=>{
  event.preventDefault();

  var form = document.querySelector("#form-adiciona");  
  var paciente = obtemPacienteDoFormulario(form);

  var erros = validaPaciente(paciente)
  
  if(erros.length > 0){
    exibeMensagemDeErro(erros);
    return ;
  }
  
  adicionaPacienteNaTabela(paciente);

  form.reset();
  document.querySelector("#mensagens-erro").innerHTML="";
  // document.querySelector("#mensagens-erro").textContent=""; >>>> Pode ser assim também <<<<

});

function adicionaPacienteNaTabela(paciente) {
  var pacienteTr = montaTr(paciente);
  var tabela = document.querySelector("#tabela-pacientes");
  tabela.appendChild(pacienteTr);
}


function exibeMensagemDeErro(erros) {

    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML="";

    erros.forEach(function(erro){
      var li = document.createElement("li");
      li.textContent = erro;
      ul.appendChild(li);
    });

    // for(var i = 0; i<erros.length; i++ ){
    //   var erro = erros[i]
    // }
}


function obtemPacienteDoFormulario (form) {
  var paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value)
  }

  return paciente;
}


function montaTr (paciente) {
  var pacienteTr = document.createElement("tr");
  pacienteTr.classList.add("paciente")

  pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
  pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
  pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
  pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
  pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

  return pacienteTr;
}

function montaTd (dado,classe) {
  var td = document.createElement("td");
  td.textContent = dado;
  td.classList.add(classe);
  
  return td
}

function validaPaciente(paciente) {
  var erros = [];

  if(paciente.nome == "") erros.push("Nome inválido");
  if(!validaPeso(paciente.peso) || paciente.peso=="") erros.push("Peso é inválido");
  if(!validaAltura(paciente.altura) || paciente.altura=="") erros.push("Altura é inválida");
  if(paciente.gordura =="") erros.push("Gordura inválida")
  return erros;
}

