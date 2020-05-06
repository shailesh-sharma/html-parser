export class FlashcardSection{


    FlashcardSection(){
        this.createNewCard();
    }

    createNewCard(){
        this.cards.push({
            cardData : ""
        })

        this.currentCard = this.card[this.card.length - 1];
    }


    addHeader(headerText){
        this.currentCard.cardData =  this.currentCard.cardData +  "<h1>" + headerText + "</h1>";
    }


    addParagraph(paragraphText){
        this.currentCard.cardData = this.currentCard.cardData + "<p>" + paragraphText + "</p>";
    }

}


