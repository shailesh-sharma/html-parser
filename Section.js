export class FlashcardSection{


    constructor(){
        this.cards = [];
        this.createNewCard();
    }

    createNewCard(){
        this.cards.push({
            cardData : ""
        })

        this.currentCard = this.cards[this.cards.length - 1];
    }


    addHeader(headerText){
        this.currentCard.cardData =  this.currentCard.cardData +  "<h2>" + headerText + "</h2>";
    }


    addParagraph(paragraphText){
        this.currentCard.cardData = this.currentCard.cardData + "<p>" + paragraphText + "</p>";
    }

}


