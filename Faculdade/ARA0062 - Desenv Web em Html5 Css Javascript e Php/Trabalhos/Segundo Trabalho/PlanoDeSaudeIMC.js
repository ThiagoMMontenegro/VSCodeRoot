function main() {
    // Input
    const entrada = recuperarDados();
    const peso = parseFloat(entrada.peso);
    const altura = parseAltura(entrada.altura);
    const idade = parseInt(entrada.idade);

    // IMC
    const imc = calcularIMC(peso, altura);
    const classificacaoComorbidade = calcularClassificacaoComorbidade(imc);
    const classificacao = classificacaoComorbidade.classificacao;
    const comorbidade = classificacaoComorbidade.comorbidade;

    // Plano A
    const calculoPlanoA = calcularPlanoA(imc, idade);
    const preco_PlanoA_Basico = calculoPlanoA.preco_PlanoA_Basico;
    const preco_PlanoA_Standard = calculoPlanoA.preco_PlanoA_Standard;
    const preco_PlanoA_Premium = calculoPlanoA.preco_PlanoA_Premium;

    // Plano B
    const calculoPlanoB = calcularPlanoB(imc, classificacao, comorbidade);
    const preco_PlanoB_Basico = calculoPlanoB.preco_PlanoB_Basico;
    const preco_PlanoB_Standard = calculoPlanoB.preco_PlanoB_Standard;
    const preco_PlanoB_Premium = calculoPlanoB.preco_PlanoB_Premium;

    // Encontrar o plano mais barato
    const planoMaisBarato = encontrarPlanoMaisBarato(
        preco_PlanoA_Basico, preco_PlanoA_Standard, preco_PlanoA_Premium,
        preco_PlanoB_Basico, preco_PlanoB_Standard, preco_PlanoB_Premium
    );

    // Show
    exibirResultado(imc, classificacao, comorbidade, preco_PlanoA_Basico, preco_PlanoA_Standard, preco_PlanoA_Premium, preco_PlanoB_Basico, preco_PlanoB_Standard, preco_PlanoB_Premium, planoMaisBarato);
}

// Funcionalidades
function recuperarDados() {
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const idade = document.getElementById('idade').value;
    return { peso, altura, idade };
}

function parseAltura(altura) {
    altura = altura.replace(',', '.'); // Substitui vírgula por ponto, se houver
    const alturaFloat = parseFloat(altura);
    if (alturaFloat < 10) {
        return alturaFloat * 100; // Assume que a entrada está em metros
    } else {
        return alturaFloat; // Assume que a entrada está em centímetros
    }
}

function exibirResultado(imc, classificacao, comorbidade, preco_PlanoA_Basico, preco_PlanoA_Standard, preco_PlanoA_Premium, preco_PlanoB_Basico, preco_PlanoB_Standard, preco_PlanoB_Premium, planoMaisBarato) {
    document.getElementById('precoplanoabasico').innerHTML = "Básico: R$ " + preco_PlanoA_Basico.toFixed(2);
    document.getElementById('precoplanoastandard').innerHTML = "Standard: R$ " + preco_PlanoA_Standard.toFixed(2);
    document.getElementById('precoplanoapremium').innerHTML = "Premium: R$ " + preco_PlanoA_Premium.toFixed(2);
    document.getElementById('precoplanobbasico').innerHTML = "Básico: R$ " + preco_PlanoB_Basico.toFixed(2);
    document.getElementById('precoplanobstandard').innerHTML = "Standard: R$ " + preco_PlanoB_Standard.toFixed(2);
    document.getElementById('precoplanobpremium').innerHTML = "Premium: R$ " + preco_PlanoB_Premium.toFixed(2);
    document.getElementById('planomaisbarato').innerHTML = "Plano Mais Barato: " + planoMaisBarato.nome + " - R$ " + planoMaisBarato.preco.toFixed(2);
}

function encontrarPlanoMaisBarato(precoA_Basico, precoA_Standard, precoA_Premium, precoB_Basico, precoB_Standard, precoB_Premium) {
    const precos = [
        { nome: 'Plano A - Básico', preco: precoA_Basico },
        { nome: 'Plano A - Standard', preco: precoA_Standard },
        { nome: 'Plano A - Premium', preco: precoA_Premium },
        { nome: 'Plano B - Básico', preco: precoB_Basico },
        { nome: 'Plano B - Standard', preco: precoB_Standard },
        { nome: 'Plano B - Premium', preco: precoB_Premium }
    ];

    let maisBarato = precos[0];
    for (let i = 1; i < precos.length; i++) {
        if (precos[i].preco < maisBarato.preco) {
            maisBarato = precos[i];
        }
    }

    return maisBarato;
}

// IMC, Classificação e Comorbidade
function calcularIMC(peso, altura) {
    const imc = peso / ((altura / 100) * (altura / 100));
    return imc;
}

function calcularClassificacaoComorbidade(imc) {
    let classificacao;
    let comorbidade;
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
    return { classificacao, comorbidade };
}

// Calcular Valor dos Planos
function calcularPlanoA(imc, idade) {
    const preco_PlanoA_Basico = 100 + (idade * 10 * (imc / 10));
    const preco_PlanoA_Standard = (150 + (idade * 15)) * (imc / 10);
    const preco_PlanoA_Premium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);
    return { preco_PlanoA_Basico, preco_PlanoA_Standard, preco_PlanoA_Premium };
}

function calcularPlanoB(imc, classificacao, comorbidade) {
    const fator = calcularFatorComorbidadePlanoB(classificacao, comorbidade);

    const preco_PlanoB_Basico = 100 + (fator * 10 * (imc / 10));
    const preco_PlanoB_Standard = (150 + (fator * 15)) * (imc / 10);
    const preco_PlanoB_Premium = (200 - (imc * 10) + (fator * 20)) * (imc / 10);

    return { preco_PlanoB_Basico, preco_PlanoB_Standard, preco_PlanoB_Premium };
}

function calcularFatorComorbidadePlanoB(classificacao, comorbidade) {
    let fator;
    if (classificacao == "Baixo peso") {
        fator = 10;
    } else if (classificacao == "Normal") {
        fator = 1;
    } else if (classificacao == "Sobrepeso") {
        fator = 6;
    } else if (classificacao == "Obesidade") {
        fator = 10;
    } else if ((classificacao == "Obesidade Mórbida") && (comorbidade == "Grave")) {
        fator = 20;
    } else if ((classificacao == "Obesidade Mórbida") && (comorbidade == "Muito Grave")) {
        fator = 30;
    }
    return fator;
}
