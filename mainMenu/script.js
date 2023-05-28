






function startNewGame(){
    var mainMenu = document.getElementById('mainMenu');
    var GameMenu = document.getElementById('game');

    mainMenu.style.display = 'none';
    GameMenu.style.display = 'block';

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
function continueGame(){
    var mainMenu = document.getElementById('mainMenu');
    var GameMenu = document.getElementById('game');

    mainMenu.style.display = 'none';
    GameMenu.style.display = 'block';

        updateStats();
}