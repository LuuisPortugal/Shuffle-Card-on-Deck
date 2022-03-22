export default {
    async load(baralho) {
        const URL_CARDS = `https://deckofcardsapi.com/api/deck/${baralho}/draw/?count=9`;

        try {
            const res = await fetch(URL_CARDS);
            let {cards, success, error} = await res.json();

            if(!success) {
                alert(error);
            }

            return cards;
        } catch (message) {
            return console.error(message);
        }
    }
}