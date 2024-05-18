export const chanceCards = [
    { description: "Dostałeś zwrot podatku $100", effect: (player) => player.money += 100 },
    { description: "Musisz zapłacić za pobyt w szpitalu $300", effect: (player) => player.money -= 300 },
    { description: "Przejdź na Start", effect: (player) => { player.position = 1; player.money += 200; }},
    { description: "Cofnij się o 5 pól", effect: (player) => player.position = Math.max(1, player.position - 3) },
    { description: "Czynsz -$500 ", effect: (player) => player.money -= 500 },
    { description: "Wygrałeś turniej strzelecki, pobierz $100", effect: (player) => player.money += 100 },

];

