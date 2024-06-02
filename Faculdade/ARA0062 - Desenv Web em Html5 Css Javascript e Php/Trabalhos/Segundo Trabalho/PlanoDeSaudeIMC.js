function main() {
    //Input
    const entrada = recuperarDados();
    // dados.forEach(element => {
    //     validarEntrada(element)
    // });
    const peso = entrada.peso;
    const altura = entrada.altura;
    const idade = entrada.idade;
  
    //IMC+
    // const calculoIMC = calcularIMC(peso,altura);
    // const imc = calculoIMC.imc;
    const imc = calcularIMC(peso,altura)
    const classificacaoComorbidade = calcularClassificacaoComorbidade(imc);
    const classificacao = classificacaoComorbidade.classificacao;
    const comorbidade = classificacaoComorbidade.comorbidade;
  
    //Plano A
    const calculoPlanoA = calcularPlanoA(imc,idade)
    const preco_PlanoA_Basico = calculoPlanoA.preco_PlanoA_Basico;
    const preco_PlanoA_Standard = calculoPlanoA.preco_PlanoA_Standard;
    const preco_PlanoA_Premium = calculoPlanoA.preco_PlanoA_Premium;

    //Plano B
    const calculoPlanoB = calcularPlanoB(imc,classificacao,comorbidade)
    const preco_PlanoB_Basico = calculoPlanoB.preco_PlanoB_Basico;
    const preco_PlanoB_Standard = calculoPlanoB.preco_PlanoB_Standard;
    const preco_PlanoB_Premium = calculoPlanoB.preco_PlanoB_Premium;
  
    //Show
    exibirResultado(imc,classificacao,comorbidade,preco_PlanoA_Basico,preco_PlanoA_Standard,preco_PlanoA_Premium,preco_PlanoB_Basico,preco_PlanoB_Standard,preco_PlanoB_Premium)


    // alert("Peso: " + peso);
    // alert("Altura: " + altura);
    // alert("Seu IMC é " + imc);
    // alert("Sua classificação é " + classificacao);
    // alert("Sua comorbidade é " + comorbidade);


    // const Risco = calcularIMC(peso,altura);
    // alert("Seu IMC é " + imc.imc);

    // const classificacaoOMS = calcularClassificacaoOMS(imc);
    // const riscoComorbidadeOMS = calculaRiscoComorbidadeOMS(imc);
    // calcularPlanoA (imc, idade);
    // calcularPlanoB (imc, idade);
    // exibirResultado (imc);
}
//Funcionalidades
function recuperarDados() {
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const idade = document.getElementById('idade').value;
    return {peso, altura, idade};
}
// function validarEntrada(valor){
//     if (typeof valor === "string"){alert("Insira um Numero")}
//     else {}
// } 

 function exibirResultado(imc,classificacao,comorbidade,preco_PlanoA_Basico,preco_PlanoA_Standard,preco_PlanoA_Premium,preco_PlanoB_Basico,preco_PlanoB_Standard,preco_PlanoB_Premium){
    document.getElementById('imc').innerHTML = "IMC: " + imc
    document.getElementById('classificacao').innerHTML = "Classificação: " + classificacao
    document.getElementById('comorbidade').innerHTML = "Risco de Comorbidade: " + comorbidade
    document.getElementById('precoplanoabasico').innerHTML = "Preco Plano A - Básico: " + preco_PlanoA_Basico
    document.getElementById('precoplanoastandard').innerHTML = "Preco Plano A - Standard: " + preco_PlanoA_Standard
    document.getElementById('precoplanoapremium').innerHTML = "Preco Plano A - Premium: " + preco_PlanoA_Premium
    document.getElementById('precoplanobbasico').innerHTML = "Preco Plano B - Básico: " + preco_PlanoB_Basico
    document.getElementById('precoplanobstandard').innerHTML = "Preco Plano B - Standard: " + preco_PlanoB_Standard
    document.getElementById('precoplanobpremium').innerHTML = "Preco Plano B - Premium: " + preco_PlanoB_Premium
 }
//IMC, Classificacao e Comorbidade
function calcularIMC(peso, altura) {
     const imc = peso / ((altura/100) * (altura/100)); 
     return (imc);
    }
function calcularClassificacaoComorbidade(imc) {
    var classificacao
    var comorbidade
    if (imc < 18.5) {
        classificacao = "Baixo peso";
        comorbidade = "Baixo";  
    } else if (imc >= 18.5 && imc <= 24.9) {
        classificacao = "Normal";
        comorbidade = "Normal";
    } else if (imc >= 25 && imc <= 29.9) {
        classificacao = "Sobrepeso"; 
        comorbidade = "Aumentado";
    } else if (imc >= 30 && imc <= 34.9) {
        classificacao = "Obesidade"; 
        comorbidade = "Moderado";
    } else if (imc >= 35 && imc <= 39.9) {
        classificacao = "Obesidade Mórbida"; 
        comorbidade = "Grave";
    } else if (imc >= 40) {
        classificacao = "Obesidade Mórbida";
        comorbidade = "Muito Grave";
    }
    return {classificacao,comorbidade}
}
//Calcular Valor dos Planos
function calcularPlanoA (imc, idade) {
    // Plano básico: preço é igual a 100 + (idade * 10 * (IMC / 10)).
    // • Plano standard: preço é igual a (150 + (idade * 15)) * (IMC / 10).
    // • Plano premium: preço é igual a (200 - (IMC * 10) + (idade * 20)) * (IMC / 10).
    const preco_PlanoA_Basico = 100 + (idade * 10 * (imc / 10));
    const preco_PlanoA_Standard = (150 + (idade * 15)) * (imc / 10);
    const preco_PlanoA_Premium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);
    return {preco_PlanoA_Basico, preco_PlanoA_Standard, preco_PlanoA_Premium}
}
function calcularPlanoB (imc,classificacao,comorbidade) {
    // alert("calcularPlanoB-imc:" + imc)
    // alert("calcularPlanoB-classificacao:" + classificacao)
    // alert("calcularPlanoB-comorbidade:" + comorbidade)
    const fator = calcularFatorComorbidadePlanoB (classificacao,comorbidade);

    // Preços dos planos:
    // • Plano básico: preço é igual a 100 + (fator de comorbidade * 10 * (IMC / 10)).
    // • Plano standard: preço é igual a (150 + (fator de comorbidade * 15)) * (IMC /
    // 10).
    // • Plano premium: preço é igual a (200 - (IMC * 10) + (fator de comorbidade *
    // 20)) * (IMC / 10).

    const preco_PlanoB_Basico = 100 + (fator * 10 * (imc / 10));
    const preco_PlanoB_Standard = (150 + (fator * 15)) * (imc / 10);
    const preco_PlanoB_Premium = (200 - (imc * 10) + (fator * 20)) * (imc / 10);

    // alert(preco_PlanoB_Basico);
    // alert(preco_PlanoB_Standard);
    // alert(preco_PlanoB_Premium);

    return {preco_PlanoB_Basico, preco_PlanoB_Standard, preco_PlanoB_Premium}
}
function calcularFatorComorbidadePlanoB (classificacao,comorbidade) {
    // alert("calcularFatorComorbidadePlanoB-classificacao:" + classificacao)
    // alert("calcularFatorComorbidadePlanoB-comorbidade:" + comorbidade)
//    Fator de comorbidade:
//     o 10 se IMC for abaixo do peso.
//     o 1 se IMC for normal.
//     o 6 se IMC for sobrepeso.
//     o 10 se IMC for obesidade.
//     o 20 se IMC for obesidade mórbida grave.
//     o 30 se IMC for obesidade mórbida muito grave.
    var fator
    // alert(classificacao + comorbidade)
    if (classificacao == "Baixo peso") {
        fator = 10;
    } else if (classificacao == "Normal") {
        fator = 1;
    } else if (classificacao == "Sobrepeso") {
        fator = 6;
    } else if (classificacao == "Obesidade") {
        fator = 10;
    } else if ((classificacao == "Obesidade Mórbida") && (comorbidade = "Grave")) {
        fator = 20;
    } else if ((classificacao == "Obesidade Mórbida") && (comorbidade = "Muito Grave")) {
        fator = 30;
    }
    // alert(classificacao + fator);
    return (fator);
}