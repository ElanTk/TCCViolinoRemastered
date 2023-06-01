
var playerBlock;
var playerFinalDamage;
var enemyFinalDamage;
var enemyCharged = 0;

var attack_stat;
var defense_stat;
var staminaMax_stat;
var staminaCurrent;
var hpMax_stat;
var hpCurrent;
var critMult_stat;
var critChance_stat;

var inBattle = 0;

var enemyName;
var enemyMaxHp;
var enemyHp;
var enemyAttack;
var enemyDefense;
var enemyChargeMultiplier;
var enemyGold;

function go(location){

    var fightNavbar = document.getElementById('fightNavbar');
    var nonFightNavbar = document.getElementById('nonFightNavbar');
    var battlefieldShop = document.getElementById('battlefieldShop');
    var battlefield1 = document.getElementById('battlefield1');
    var shopMenu1 = document.getElementById('shopMenu1');
    var fightingMenu1 = document.getElementById('fightingMenu1');
    

    if(location == 'loja'){
        fightNavbar.style.display = 'none';
        nonFightNavbar.style.display = 'block';
        battlefield1.style.display = 'none';
        battlefieldShop.style.display = 'block';
        shopMenu1.style.display = 'block';
        fightingMenu1.style.display = 'none';
    }
    else if(location == 'torre'){
        fightNavbar.style.display = 'none';
        nonFightNavbar.style.display = 'block';
        battlefield1.style.display = 'block';
        battlefieldShop.style.display = 'none';
        shopMenu1.style.display = 'none';
        fightingMenu1.style.display = 'block';
    }

    updateStats();
}
function RestablishStats(){
        localStorage.setItem('attack_stat', 3);
        localStorage.setItem('defense_stat', 1);
        localStorage.setItem('staminaMax_stat', 100);
        localStorage.setItem('staminaCurrent', 100);
        localStorage.setItem('hpMax_stat', 10);
        localStorage.setItem('hpCurrent', 10);
        localStorage.setItem('critMult_stat', 1);
        localStorage.setItem('critChance_stat', 3);
        localStorage.setItem('gold', 20);
        localStorage.setItem('andarTorre', 1);

        updateStats();
}

function startFight(){
    inBattle = 1;

    attack_stat = localStorage.getItem('attack_stat');
    defense_stat = localStorage.getItem('defense_stat');
    staminaMax_stat = localStorage.getItem('staminaMax_stat');
    staminaCurrent = localStorage.getItem('staminaCurrent');
    hpMax_stat = localStorage.getItem('hpMax_stat');
    hpCurrent = localStorage.getItem('hpCurrent');
    critMult_stat = localStorage.getItem('critMult_stat');
    critChance_stat = localStorage.getItem('critChance_stat');

    var enemySprite = document.getElementById('enemySprite');
        log.innerHTML = '';

    var fightNavbar = document.getElementById('fightNavbar');
    var nonFightNavbar = document.getElementById('nonFightNavbar');

    fightNavbar.style.display = 'block';
    nonFightNavbar.style.display = 'none';

        

        /* somente pra testar a batalha*/

        enemyName = 'Marquinhos, o boneco de testes';
        enemyMaxHp = 10;
        enemyHp = 10;
        enemyAttack = 2;
        enemyDefense = 1;
        enemyChargeMultiplier = 2;
        enemyGold = 14;

        updateStats();

    enemyStats.innerHTML = enemyName + '<br>HP:' + enemyHp + '/' + enemyMaxHp + ' Ataque:' + enemyAttack + ' Defesa:' + enemyDefense;
    if(enemyHp <= 0){
        log.innerHTML += '<br>O teu inimigo aí morreu mano ;)';
        log.scrollTop = log.scrollHeight;
    }

    }
function atacar(){
    if(enemyHp > 0){
    var log = document.getElementById('log');
    var critVar = Math.floor(Math.random() * 100);
    if(staminaCurrent < 100){
        log.innerHTML += '<br>Mesmo cansado, você ergue sua lâmina com toda força que você consegue colocar!';
        playerFinalDamage = (attack_stat * staminaCurrent / 100) - enemyDefense;
        staminaCurrent = 0;
    }
    else{
        playerFinalDamage = attack_stat - enemyDefense;
        staminaCurrent = staminaCurrent - 100;
    }
    if(critChance_stat >= critVar && playerFinalDamage > 0){
        log.innerHTML += '<br>CRÍTICO! CARAMBA!';
    }
    if(playerFinalDamage <= 0){
        log.innerHTML += '<br>Você acerta o inimigo, porém seus ataques não parecem causar nenhum dano.';
    }
    else{
    log.innerHTML += '<br>Você ataca o inimigo, causando ' + playerFinalDamage + ' de dano.';
    enemyHp = enemyHp - playerFinalDamage;
    }
    playerBlock = defense_stat;
    log.innerHTML += '<br>Você recupera ' + staminaMax_stat * 0.1 + ' de stamina.';
    staminaCurrent = staminaCurrent + staminaMax_stat * 0.1;
    if(staminaCurrent > staminaMax_stat){
        staminaCurrent = staminaMax_stat;
    }
    if(enemyHp <= 0){
        var enemySprite = document.getElementById('enemySprite');
        localStorage.setItem('hpCurrent', hpCurrent);
        log.innerHTML += '<br>O teu inimigo aí morreu mano ;)';
        localStorage.setItem('gold', Number(localStorage.getItem('gold')) + enemyGold);
        log.innerHTML += '<br>Após procurar o corpo, você acha ' + enemyGold + ' dinheiros';
        inBattle = 0;
        
        fightNavbar.style.display = 'none';
        nonFightNavbar.style.display = 'block';
    }
    else{
        enemyAction();
    }
    }
    else{
        log.innerHTML += '<br>O teu inimigo já morreu po.';
    }
    updateStats();
    log.scrollTop = log.scrollHeight;
}
function defender(){
    var log = document.getElementById('log');
    log.innerHTML += '<br>Você ergue seu escudo, e efetivamente defende o dobro de sua defesa neste turno.';
    playerBlock = 2 * defense_stat;
    log.innerHTML += '<br>Você recupera ' + staminaMax_stat * 0.3 + ' de stamina.';
    staminaCurrent = staminaCurrent + staminaMax_stat * 0.3;
    if(staminaCurrent > staminaMax_stat){
        staminaCurrent = staminaMax_stat;
    }
    if(enemyHp <= 0){
        var enemySprite = document.getElementById('enemySprite');
        enemySprite.style.backgroundColor = '#555555';
        log.innerHTML += '<br>O teu inimigo aí morreu mano, ele não consegue fazer nada ;)';
    }
    else{
        enemyAction();
    }
    updateStats()
    log.scrollTop = log.scrollHeight;
}
function enemyAction(){
    
    var enemySprite = document.getElementById('enemySprite');
    var enemyAction = Math.floor(Math.random() * 3);
    if(enemyCharged == 1){
        log.innerHTML += '<br>Marquinhos avança rapidamente os dois braços em sua direção!';
        enemyFinalDamage = (enemyAttack * enemyChargeMultiplier) - playerBlock;
        if(enemyFinalDamage > 0){
        hpCurrent = hpCurrent - enemyFinalDamage;
        log.innerHTML += '<br>Você leva ' + enemyFinalDamage + ' de dano!';
        }
        else{
            log.innerHTML += '<Você bloqueia o ataque de Marquinhos.';
        }
        enemyCharged = 0;
        enemySprite.style.backgroundImage = "url(testdummy_passive.png)";
    }
    else if(enemyAction == 0){
        log.innerHTML += '<br>Marquinhos te ataca!';
        enemyFinalDamage = enemyAttack - playerBlock;
        if(enemyFinalDamage > 0){
            hpCurrent = hpCurrent - enemyFinalDamage;
            log.innerHTML += '<br>Você leva ' + enemyFinalDamage + ' de dano!';
            }
            else{
                log.innerHTML += '<Você bloqueia o ataque de Marquinhos.';
            }
    }
    else if(enemyAction == 1){
        log.innerHTML += '<br>Marquinhos estica seus braços de madeira para trás, preparando um ataque!';
        enemySprite.style.backgroundImage = "url(testdummy_charge.png)";
        enemyCharged = 1;
    }
    else if(enemyAction == 2){
        log.innerHTML += '<br>Marquinhos não mexe nem um músculo.';
    }
    else{
        print("ENEMY ACTION ERROR");
    }

    if(hpCurrent <= 0){
        log.innerHTML += '<br>Parece que o senhor morreu nessa, viu? Se quiser continuar, porém, já que é só um teste, pode continuar ae.';
    }

}
function updateStats(){
    if(document.getElementById('playerStatsShop')){
        var playerStats = document.getElementById('playerStatsShop');
    
        playerStats.innerHTML = 'HP:' + localStorage.getItem('hpCurrent') + '/' + localStorage.getItem('hpMax_stat') + ' Stamina:' + 
        localStorage.getItem('staminaCurrent') + '/' + localStorage.getItem('staminaMax_stat') + ' Ataque:' + 
        localStorage.getItem('attack_stat') + ' Defesa:' + localStorage.getItem('defense_stat') + ' crit: ' + 
        localStorage.getItem('critChance_stat') + '%, ' + localStorage.getItem('critMult_stat') + 'x';
        }
    
    if(document.getElementById('playerStatsText') && document.getElementById('playerHP') && document.getElementById('playerHPBackground')){
    var playerStats = document.getElementById('playerStatsText');
    var playerHP = document.getElementById('playerHP');
    var playerHPBackground = document.getElementById('playerHPBackground');

    if(inBattle == 1){
        hpBarWidth = (hpCurrent / hpMax_stat) * 100;
        var backgroundHpBar = 100 - hpBarWidth;
        if(hpBarWidth < 0){ hpBarWidth = 0; }
        if(backgroundHpBar > 100){ backgroundHpBar = 100; }
        backgroundHpBar = backgroundHpBar + '%';
        hpBarWidth = hpBarWidth + '%';
        playerHP.style.width = hpBarWidth;
        playerHPBackground.style.width = backgroundHpBar;
        playerHPBackground.innerHTML = 'HP:' + hpCurrent + '/' + hpMax_stat;
        playerHP.innerHTML = 'HP:' + hpCurrent + '/' + hpMax_stat;
        playerStats.innerHTML =  ' Stamina:' + 
    staminaCurrent + '/' + staminaMax_stat + ' Ataque:' + 
    attack_stat + ' Defesa:' + defense_stat + ' crit: ' + 
    critChance_stat + '%, ' + critMult_stat + 'x';
    }
    else{
        hpBarWidth = (hpCurrent / hpMax_stat) * 100;
        var backgroundHpBar = 100 - hpBarWidth;
        if(hpBarWidth < 0){ hpBarWidth = 0; }
        if(backgroundHpBar > 100){ backgroundHpBar = 100; }
        backgroundHpBar = backgroundHpBar + '%';
        hpBarWidth = hpBarWidth + '%';
        playerHP.style.width = hpBarWidth;
        playerHPBackground.style.width = backgroundHpBar;
    playerHP.innerHTML = 'HP:' + localStorage.getItem('hpCurrent') + '/' + localStorage.getItem('hpMax_stat');
    playerHPBackground.innerHTML = 'HP:' + localStorage.getItem('hpCurrent') + '/' + localStorage.getItem('hpMax_stat');
    playerStats.innerHTML = ' Stamina:' + 
    localStorage.getItem('staminaCurrent') + '/' + localStorage.getItem('staminaMax_stat') + ' Ataque:' + 
    localStorage.getItem('attack_stat') + ' Defesa:' + localStorage.getItem('defense_stat') + ' crit: ' + 
    localStorage.getItem('critChance_stat') + '%, ' + localStorage.getItem('critMult_stat') + 'x';
    }
    }

    if(document.getElementById('enemyStats')){
    var enemyStats = document.getElementById('enemyStats');

    enemyStats.innerHTML = enemyName + '<br>HP:' + enemyHp + '/' + enemyMaxHp + ' Ataque:' + enemyAttack + ' Defesa:' + enemyDefense;
    }
    setTimeout(updateStats, 500);
}
function buy(item){
    if(item == 'attack'){
        logShop.innerHTML += '<br>A mulher pega sua espada, esquenta, adiciona um pouco de metal, e após umas marteladas, está pronto!';
        logShop.innerHTML += '<br>Seu ataque aumentou em 1!';
        localStorage.setItem('attack_stat', Number(localStorage.getItem('attack_stat')) + 1);
        
    }
    else if(item == 'defense'){
        logShop.innerHTML += '<br>A mulher, após analizar sua armadura, adiciona alguns metais em algumas partes e troca outras.';
        logShop.innerHTML += '<br>Sua defesa aumentou em 1!';
        localStorage.setItem('defense_stat', Number(localStorage.getItem('defense_stat')) + 1);
    }
    else if(item == 'stamina'){
        logShop.innerHTML += '<br>Você é convidado para uma sessão intensa de cardio, correndo em uma esteira até não aguentar mais e coisas assim.';
        logShop.innerHTML += '<br>Sua stamina aumentou em 10!';
        localStorage.setItem('staminaMax_stat', Number(localStorage.getItem('staminaMax_stat')) + 10);
        localStorage.setItem('staminaCurrent', Number(localStorage.getItem('staminaMax_stat')));
    }
    else if(item == 'critChance'){
        logShop.innerHTML += '<br>Você pega a pedra de amolar e a gasta toda em sua espada, a deixando mais afiada, e assim mais fácil de achar a marca certa em um ataque.';
        logShop.innerHTML += '<br>Sua chance de crítico aumentou em 1%!';
        localStorage.setItem('critChance_stat', Number(localStorage.getItem('critChance_stat')) + 1);
    }
    updateStats();
    logShop.scrollTop = logShop.scrollHeight;
}