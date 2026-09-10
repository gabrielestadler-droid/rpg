const readline = require("readline");

// ============================================================
// CONFIGURAÇÃO DO TERMINAL
// ============================================================

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(texto) {
    return new Promise(resolve => {
        rl.question(texto, resposta => {
            resolve(resposta.trim());
        });
    });
}

function limpar() {
    console.clear();
}

async function pausa() {
    await perguntar("\nPressione ENTER para continuar...");
}

// ============================================================
// JOGADOR
// ============================================================

const jogador = {
    nome: "",
    classe: "",

    nivel: 1,
    xp: 0,
    xpProximoNivel: 100,

    vida: 100,
    vidaMax: 100,

    mana: 50,
    manaMax: 50,

    ataque: 10,
    defesa: 5,

    habilidade: "",
    danoHabilidade: 30,

    pocoes: 3,

    ouro: 0,

    inimigosDerrotados: 0,
    chefesDerrotados: 0
};

// ============================================================
// CLASSES
// ============================================================

const classes = {
    guerreiro: {
        nome: "GUERREIRO",
        vida: 150,
        mana: 40,
        ataque: 18,
        defesa: 12,
        habilidade: "GOLPE DEVASTADOR",
        dano: 40
    },

    mago: {
        nome: "MAGO",
        vida: 90,
        mana: 100,
        ataque: 25,
        defesa: 5,
        habilidade: "METEORO",
        dano: 55
    },

    ladrao: {
        nome: "LADINO",
        vida: 110,
        mana: 70,
        ataque: 22,
        defesa: 7,
        habilidade: "ATAQUE FURTIVO",
        dano: 45
    },

    paladino: {
        nome: "PALADINO",
        vida: 140,
        mana: 60,
        ataque: 16,
        defesa: 15,
        habilidade: "LUZ SAGRADA",
        dano: 35
    }
};

// ============================================================
// INIMIGOS
// ============================================================

const inimigos = [
    {
        nome: "SLIME VERDE",
        vida: 45,
        ataque: 9,
        defesa: 2,
        xp: 30,
        ouro: 15
    },

    {
        nome: "GOBLIN",
        vida: 65,
        ataque: 13,
        defesa: 4,
        xp: 45,
        ouro: 25
    },

    {
        nome: "ORC",
        vida: 90,
        ataque: 17,
        defesa: 7,
        xp: 65,
        ouro: 40
    },

    {
        nome: "MAGO SOMBRIO",
        vida: 80,
        ataque: 21,
        defesa: 5,
        xp: 80,
        ouro: 50
    }
];

// ============================================================
// CHEFES
// ============================================================

const chefes = [
    {
        nome: "REI GOBLIN",
        vida: 160,
        ataque: 23,
        defesa: 9,
        xp: 150,
        ouro: 100
    },

    {
        nome: "DRAGAO DAS TREVAS",
        vida: 280,
        ataque: 30,
        defesa: 13,
        xp: 300,
        ouro: 250
    }
];

// ============================================================
// BARRA
// ============================================================

function barra(atual, maximo, tamanho = 20) {

    let quantidade = Math.round(
        (atual / maximo) * tamanho
    );

    quantidade = Math.max(
        0,
        Math.min(tamanho, quantidade)
    );

    return (
        "█".repeat(quantidade) +
        "░".repeat(tamanho - quantidade)
    );
}

// ============================================================
// CABEÇALHO
// ============================================================

function cabecalho(titulo) {

    console.log(`
============================================================
                    ${titulo}
============================================================
`);
}

// ============================================================
// TELA INICIAL
// ============================================================

async function inicio() {

    limpar();

    console.log(`
============================================================
                       CODE LEGENDS
                    RPG DE TERMINAL
============================================================

              Uma aventura começa...

Você é um aventureiro que recebeu uma missão:

        DERROTE O DRAGÃO DAS TREVAS

Para chegar até ele, você precisará atravessar
florestas, cavernas e derrotar vários inimigos.

============================================================
`);

    jogador.nome = await perguntar("Digite o nome do seu personagem: ");

    if (!jogador.nome) {
        jogador.nome = "Aventureiro";
    }
}

// ============================================================
// ESCOLHA DE CLASSE
// ============================================================

async function escolherClasse() {

    while (true) {

        limpar();

        cabecalho("ESCOLHA SUA CLASSE");

        console.log(`
1 - GUERREIRO

   ❤️ Vida: 150
   ⚔️ Ataque: 18
   🛡️ Defesa: 12
   🔥 Golpe Devastador


2 - MAGO

   ❤️ Vida: 90
   🔵 Mana: 100
   ⚔️ Ataque: 25
   🔥 Meteoro


3 - LADINO

   ❤️ Vida: 110
   ⚔️ Ataque: 22
   🛡️ Defesa: 7
   🔥 Ataque Furtivo


4 - PALADINO

   ❤️ Vida: 140
   ⚔️ Ataque: 16
   🛡️ Defesa: 15
   🔥 Luz Sagrada

============================================================
`);

        const escolha = await perguntar("Escolha sua classe: ");

        let classe;

        if (escolha === "1") {
            classe = classes.guerreiro;
        } else if (escolha === "2") {
            classe = classes.mago;
        } else if (escolha === "3") {
            classe = classes.ladrao;
        } else if (escolha === "4") {
            classe = classes.paladino;
        } else {
            console.log("\nOpção inválida.");
            await pausa();
            continue;
        }

        jogador.classe = classe.nome;

        jogador.vida = classe.vida;
        jogador.vidaMax = classe.vida;

        jogador.mana = classe.mana;
        jogador.manaMax = classe.mana;

        jogador.ataque = classe.ataque;
        jogador.defesa = classe.defesa;

        jogador.habilidade = classe.habilidade;
        jogador.danoHabilidade = classe.dano;

        limpar();

        cabecalho("PERSONAGEM CRIADO");

        console.log(`
👤 Nome: ${jogador.nome}
⚔️ Classe: ${jogador.classe}

❤️ Vida: ${jogador.vida}
🔵 Mana: ${jogador.mana}
⚔️ Ataque: ${jogador.ataque}
🛡️ Defesa: ${jogador.defesa}

🔥 Habilidade:
${jogador.habilidade}

💥 Dano:
${jogador.danoHabilidade}
`);

        await pausa();

        return;
    }
}

// ============================================================
// STATUS
// ============================================================

function mostrarStatus() {

    limpar();

    cabecalho("STATUS DO PERSONAGEM");

    console.log(`
👤 ${jogador.nome}
⚔️ ${jogador.classe}

------------------------------------------------------------

⭐ Nível: ${jogador.nivel}

XP:
${jogador.xp}/${jogador.xpProximoNivel}

------------------------------------------------------------

❤️ VIDA
${jogador.vida}/${jogador.vidaMax}

${barra(jogador.vida, jogador.vidaMax)}

🔵 MANA
${jogador.mana}/${jogador.manaMax}

${barra(jogador.mana, jogador.manaMax)}

------------------------------------------------------------

⚔️ Ataque: ${jogador.ataque}
🛡️ Defesa: ${jogador.defesa}

🧪 Poções: ${jogador.pocoes}
💰 Ouro: ${jogador.ouro}

👾 Inimigos derrotados:
${jogador.inimigosDerrotados}

👑 Chefes derrotados:
${jogador.chefesDerrotados}

------------------------------------------------------------
`);
}

// ============================================================
// GANHAR XP
// ============================================================

function ganharXP(valor) {

    jogador.xp += valor;

    console.log(`
⭐ Você ganhou ${valor} XP!
`);

    while (
        jogador.xp >= jogador.xpProximoNivel
    ) {

        jogador.xp -= jogador.xpProximoNivel;

        jogador.nivel++;

        jogador.xpProximoNivel =
            Math.floor(
                jogador.xpProximoNivel * 1.4
            );

        jogador.vidaMax += 15;
        jogador.manaMax += 10;
        jogador.ataque += 3;
        jogador.defesa += 2;

        jogador.vida = jogador.vidaMax;
        jogador.mana = jogador.manaMax;

        console.log(`
============================================================
                    🎉 LEVEL UP!
============================================================

Você chegou ao nível ${jogador.nivel}!

❤️ Vida máxima +15
🔵 Mana máxima +10
⚔️ Ataque +3
🛡️ Defesa +2

Sua vida e mana foram completamente restauradas!

============================================================
`);
    }
}

// ============================================================
// ATAQUE NORMAL
// ============================================================

function atacar(inimigo) {

    let dano =
        jogador.ataque +
        Math.floor(Math.random() * 8);

    // LADINO
    if (
        jogador.classe === "LADINO" &&
        Math.random() < 0.25
    ) {

        dano *= 2;

        console.log(`
🗡️ ATAQUE CRÍTICO!

O Ladino atacou pelas costas!
`);
    }

    dano -= inimigo.defesa;

    if (dano < 1) {
        dano = 1;
    }

    inimigo.vida -= dano;

    if (inimigo.vida < 0) {
        inimigo.vida = 0;
    }

    console.log(`
⚔️ Você atacou!

💥 Dano causado: ${dano}
`);
}

// ============================================================
// HABILIDADE
// ============================================================

function usarHabilidade(inimigo) {

    if (jogador.mana < 20) {

        console.log(`
❌ Mana insuficiente!

Você precisa de 20 de mana.
`);

        return false;
    }

    jogador.mana -= 20;

    let dano = jogador.danoHabilidade;

    // MAGO
    if (jogador.classe === "MAGO") {

        if (Math.random() < 0.30) {

            dano += 30;

            console.log(`
☄️ METEORO CRÍTICO!

Um meteoro gigantesco caiu no inimigo!
`);
        }
    }

    // PALADINO
    if (jogador.classe === "PALADINO") {

        const cura = 20;

        jogador.vida += cura;

        if (jogador.vida > jogador.vidaMax) {
            jogador.vida = jogador.vidaMax;
        }

        console.log(`
✨ LUZ SAGRADA!

Você recuperou ${cura} de vida.
`);
    }

    // GUERREIRO
    if (jogador.classe === "GUERREIRO") {

        dano += Math.floor(
            jogador.defesa / 2
        );
    }

    dano -= Math.floor(
        inimigo.defesa / 2
    );

    if (dano < 1) {
        dano = 1;
    }

    inimigo.vida -= dano;

    if (inimigo.vida < 0) {
        inimigo.vida = 0;
    }

    console.log(`
🔥 ${jogador.habilidade}

💥 Dano causado: ${dano}
`);

    return true;
}

// ============================================================
// POÇÃO
// ============================================================

function usarPocao() {

    if (jogador.pocoes <= 0) {

        console.log(`
❌ Você não possui poções.
`);

        return false;
    }

    if (jogador.vida === jogador.vidaMax) {

        console.log(`
❤️ Sua vida já está cheia.
`);

        return false;
    }

    jogador.pocoes--;

    const antes = jogador.vida;

    jogador.vida += 50;

    if (jogador.vida > jogador.vidaMax) {
        jogador.vida = jogador.vidaMax;
    }

    console.log(`
🧪 POÇÃO!

❤️ Você recuperou ${jogador.vida - antes} de vida.

Poções restantes: ${jogador.pocoes}
`);

    return true;
}

// ============================================================
// ATAQUE DO INIMIGO
// ============================================================

function ataqueInimigo(inimigo) {

    let dano =
        inimigo.ataque -
        jogador.defesa;

    if (dano < 1) {
        dano = 1;
    }

    // Chance de bloqueio
    if (
        jogador.classe === "GUERREIRO" &&
        Math.random() < 0.20
    ) {

        console.log(`
🛡️ BLOQUEIO!

O Guerreiro bloqueou o ataque!
`);

        return;
    }

    jogador.vida -= dano;

    if (jogador.vida < 0) {
        jogador.vida = 0;
    }

    console.log(`
👾 ${inimigo.nome} atacou!

💥 Você recebeu ${dano} de dano.
`);
}

// ============================================================
// COMBATE
// ============================================================

async function combate(inimigoBase, chefe = false) {

    const inimigo = {
        ...inimigoBase
    };

    while (
        jogador.vida > 0 &&
        inimigo.vida > 0
    ) {

        limpar();

        cabecalho(
            chefe
                ? "⚠️ BATALHA CONTRA CHEFE"
                : "⚔️ BATALHA"
        );

        console.log(`
👤 ${jogador.nome}
❤️ Vida: ${jogador.vida}/${jogador.vidaMax}

${barra(jogador.vida, jogador.vidaMax)}

🔵 Mana: ${jogador.mana}/${jogador.manaMax}

------------------------------------------------------------

👾 ${inimigo.nome}

❤️ Vida: ${inimigo.vida}/${inimigoBase.vida}

${barra(inimigo.vida, inimigoBase.vida)}

============================================================

1 - ⚔️ Atacar
2 - 🔥 Habilidade
3 - 🧪 Poção
4 - 📊 Status

============================================================
`);

        const escolha =
            await perguntar("Escolha uma ação: ");

        let realizouAcao = false;

        if (escolha === "1") {

            atacar(inimigo);

            realizouAcao = true;

        } else if (escolha === "2") {

            realizouAcao =
                usarHabilidade(inimigo);

        } else if (escolha === "3") {

            realizouAcao =
                usarPocao();

        } else if (escolha === "4") {

            mostrarStatus();

            await pausa();

            continue;

        } else {

            console.log(`
❌ Opção inválida.
`);

            await pausa();

            continue;
        }

        // Inimigo ataca
        if (
            realizouAcao &&
            inimigo.vida > 0
        ) {

            ataqueInimigo(inimigo);
        }

        await pausa();
    }

    // ========================================================
    // DERROTA
    // ========================================================

    if (jogador.vida <= 0) {

        limpar();

        console.log(`
============================================================
                       💀 GAME OVER
============================================================

                     VOCÊ MORREU!

============================================================

O inimigo:

${inimigo.nome}

foi forte demais.

============================================================
`);

        return false;
    }

    // ========================================================
    // VITÓRIA
    // ========================================================

    jogador.inimigosDerrotados++;

    if (chefe) {
        jogador.chefesDerrotados++;
    }

    jogador.ouro += inimigo.ouro;

    limpar();

    console.log(`
============================================================
                     🏆 VITÓRIA!
============================================================

Você derrotou:

${inimigo.nome}

------------------------------------------------------------

⭐ XP: +${inimigo.xp}
💰 Ouro: +${inimigo.ouro}

============================================================
`);

    ganharXP(inimigo.xp);

    await pausa();

    return true;
}

// ============================================================
// CURA ENTRE FASES
// ============================================================

function descanso() {

    jogador.vida += 25;

    if (jogador.vida > jogador.vidaMax) {
        jogador.vida = jogador.vidaMax;
    }

    jogador.mana += 20;

    if (jogador.mana > jogador.manaMax) {
        jogador.mana = jogador.manaMax;
    }

    console.log(`
============================================================
                       🏕️ DESCANSO
============================================================

Você encontrou um lugar seguro.

❤️ +25 Vida
🔵 +20 Mana

============================================================
`);
}

// ============================================================
// FASE
// ============================================================

async function fase(numero) {

    limpar();

    cabecalho(`FASE ${numero}`);

    console.log(`
Um inimigo apareceu no caminho!

Prepare-se para a batalha.
`);

    await pausa();

    const indice =
        Math.floor(
            Math.random() * inimigos.length
        );

    const inimigo =
        inimigos[indice];

    const venceu =
        await combate(inimigo);

    if (!venceu) {
        return false;
    }

    descanso();

    await pausa();

    return true;
}

// ============================================================
// MINI BOSS
// ============================================================

async function batalhaReiGoblin() {

    limpar();

    cabecalho("👑 MINI CHEFE");

    console.log(`
                    REI GOBLIN

O líder dos goblins apareceu!

Ele não permitirá que você avance.

============================================================

❤️ Vida: ${miniBoss.vida}
⚔️ Ataque: ${miniBoss.ataque}
🛡️ Defesa: ${miniBoss.defesa}

============================================================
`);

    await pausa();

    const venceu =
        await combate(miniBoss, true);

    if (!venceu) {
        return false;
    }

    descanso();

    await pausa();

    return true;
}

// ============================================================
// BOSS FINAL
// ============================================================

async function batalhaDragao() {

    limpar();

    cabecalho("🐉 BATALHA FINAL");

    console.log(`
                         DRAGÃO DAS TREVAS

Você finalmente chegou ao castelo.

As portas se abriram...

E uma criatura gigantesca apareceu.

============================================================

                "VOCÊ NÃO DEVERIA TER
                  CHEGADO ATÉ AQUI."

============================================================

❤️ Vida: ${boss.vida}
⚔️ Ataque: ${boss.ataque}
🛡️ Defesa: ${boss.defesa}

============================================================
`);

    await pausa();

    return await combate(
        boss,
        true
    );
}

// ============================================================
// FINAL
// ============================================================

function final() {

    limpar();

    const pontuacao =
        jogador.nivel * 100 +
        jogador.ouro +
        jogador.inimigosDerrotados * 50 +
        jogador.chefesDerrotados * 200;

    console.log(`
============================================================
                     🏆 VITÓRIA!
============================================================

                 DRAGÃO DERROTADO!

============================================================

O reino está salvo!

As pessoas finalmente podem viver em paz.

============================================================

👤 HERÓI:
${jogador.nome}

⚔️ CLASSE:
${jogador.classe}

⭐ NÍVEL:
${jogador.nivel}

👾 INIMIGOS DERROTADOS:
${jogador.inimigosDerrotados}

👑 CHEFES DERROTADOS:
${jogador.chefesDerrotados}

💰 OURO:
${jogador.ouro}

============================================================

                 ⭐ PONTUAÇÃO FINAL ⭐

                       ${pontuacao}

============================================================

              PARABÉNS, ${jogador.nome}!

              VOCÊ É UM VERDADEIRO HERÓI!

============================================================
`);
}

// ============================================================
// JOGO PRINCIPAL
// ============================================================

async function jogo() {

    await inicio();

    await escolherClasse();

    limpar();

    console.log(`
============================================================
                    AVENTURA INICIADA
============================================================

${jogador.nome}, sua jornada começa agora.

Você precisa atravessar o reino e chegar
até o Dragão das Trevas.

Boa sorte!

============================================================
`);

    await pausa();

    // FASE 1
    let venceu =
        await fase(1);

    if (!venceu) {
        return;
    }

    // FASE 2
    venceu =
        await fase(2);

    if (!venceu) {
        return;
    }

    // MINI BOSS
    venceu =
        await batalhaReiGoblin();

    if (!venceu) {
        return;
    }

    // FASE 3
    venceu =
        await fase(3);

    if (!venceu) {
        return;
    }

    // BOSS FINAL
    venceu =
        await batalhaDragao();

    if (!venceu) {
        return;
    }

    // FINAL
    final();
}

// ============================================================
// INICIAR
// ============================================================

jogo()
    .catch(erro => {

        console.error(
            "\nOcorreu um erro:",
            erro
        );

    })
    .finally(() => {

        rl.close();

    });
