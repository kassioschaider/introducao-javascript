var pacientes = document.querySelectorAll(".paciente");
var form = document.querySelector("#form-adiciona");

for(var i = 0; i < pacientes.length ; i++){
    var paciente = pacientes[i];

    var tdPeso = paciente.querySelector(".info-peso");
    var tdAltura = paciente.querySelector(".info-altura");
    var tdImc = paciente.querySelector(".info-imc");
    var tdClassificacao = paciente.querySelector(".info-classificacao");

    var peso = tdPeso.textContent;
    var altura = tdAltura.textContent;

    var alturaEhValida = validaAltura(altura);
    var pesoEhValido = validaPeso(peso);

    if(!pesoEhValido){
        console.log("Peso inválido");
        tdImc.textContent = "Peso inválido!";
        pesoEhValido = false;
        paciente.classList.add("paciente-invalido");
    }

    if(!alturaEhValida){
        console.log("Altura inválida");
        tdImc.textContent = "Altura inválida!";
        alturaEhValida = false;
        paciente.classList.add("paciente-invalido");
    }

    if(pesoEhValido && alturaEhValida){
        imc = calculaImc(peso,altura);
        tdImc.textContent = imc;
        tdClassificacao.textContent = calculaClassificacao(imc);
    }
}

var botaoAdicionar = document.querySelector("#adicionar-paciente");
    botaoAdicionar.addEventListener("click", function(event) {
        event.preventDefault();

        var form = document.querySelector("#form-adiciona");
        var paciente = obtemPacienteDoFormulario(form);

        var erros = validaPaciente(paciente);

        if(erros.length > 0){
            exibeMensagensDeErro(erros);
            return;
        }

        var pacienteTr = montaTr(paciente);
        var tabela = document.querySelector("#tabela-pacientes");
        tabela.appendChild(pacienteTr);
        form.reset();

        var mensagensErro = document.querySelector("#mensagens-erro");
        mensagensErro.innerHTML = "";
});

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form) {
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value),
        classificacao: calculaClassificacao(calculaImc(form.peso.value, form.altura.value))
    }

    return paciente;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;

    return td;
}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
    pacienteTr.appendChild(montaTd(paciente.classificacao, "info-classificacao"));

    return pacienteTr;  
}

function validaPeso(peso) {
    if (peso > 0 && peso < 1000) {
        return true;
    } else {
        return false;
    }
}

function validaAltura(altura) {
    if (altura > 0 && altura <= 3.00) {
        return true;
    } else {
        return false;
    }
}

function validaPaciente(paciente) {

    var erros = [];

    if (paciente.nome.length == 0) {
        erros.push("O nome não pode ser em branco");
    }

    if (paciente.gordura.length == 0) {
        erros.push("A gordura não pode ser em branco");
    }

    if (paciente.peso.length == 0) {
        erros.push("O peso não pode ser em branco");
    }

    if (paciente.altura.length == 0) {
        erros.push("A altura não pode ser em branco");
    }

    if (!validaPeso(paciente.peso)) {
        erros.push("Peso é inválido");
    }

    if (!validaAltura(paciente.altura)) {
        erros.push("Altura é inválida");
    }

    return erros;
}

function calculaClassificacao(imc){
    var classificacao;

    if (imc < 16){
        classificacao = "DESNUTRIDO";
    } 
    if (imc >= 16 && imc <= 17){
        classificacao = "MAGREZA"
    } 
    if (imc > 17 && imc <= 18.5){
        classificacao = "MAGRO LEVE"
    } 
    if (imc > 18.5 && imc <= 25){
        classificacao = "SAUDÁVEL"
    } 
    if (imc > 25 && imc <= 30){
        classificacao = "SOBREPESO"
    } 
    if (imc > 30 && imc <= 35){
        classificacao = "OBESIDADE"
    } 
    if (imc > 35 && imc <= 40){
        classificacao = "GORDÃO"
    } 
    if (imc > 40){
        classificacao = "GORDALHAÇO"
    }

    return classificacao;
}
