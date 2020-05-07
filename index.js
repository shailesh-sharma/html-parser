const html = require ('./dummy');
var DOMParser = require('xmldom').DOMParser;
const VB = require('./virtualDOM');
var Section = require('./Section')
var container;
var VirtualBox;
var sections = [];
var currentSection;
createNewSetion();
var doc = new DOMParser().parseFromString(html.html);


export var onClickHandler =  function(){
    container = document.getElementById("preview");
    VirtualBox = new VB.VirtualBox(container);
    for(var i = 0 ; i < doc.childNodes.length ; i++){
        let currentElement = doc.childNodes[i];
        switch(currentElement.nodeName){
            case "h2" : 
                addHeader(currentElement.textContent);
                break;
            case "p" :
                addParagraph(currentElement.textContent);
        }
    drawCard();
    }
}

function drawCard(){  
    for(let i = 0; i<sections.length; i++  ){
        for(let j = 0 ; j< sections[i].cards.length ; j++){
            let VBOX = new VB.VirtualBox(container);
            let document = new DOMParser().parseFromString(sections[i].cards[j].cardData)
            for(let m = 0 ; m < document.childNodes.length ;m++ ){
                let currentElement = document.childNodes[m];
                switch(currentElement.nodeName){
                    case "h2" : 
                        VBOX.addHeader(currentElement.textContent);
                        break;
                    case "p" :
                        VBOX.addParagraph(currentElement.textContent);
                }
            }
        }
    }
}



function addHeader(textContent){
    if(currentSection.cards.length == 1 &&  currentSection.currentCard.cardData == ""){
        VirtualBox.addHeader(textContent);
        currentSection.addHeader(textContent);
    }
    else{
        createNewSetion();
        VirtualBox.reset();
        currentSection.addHeader(textContent);
    }
}


function addParagraph(textContent){
    if(VirtualBox.addParagraph(textContent)){
        currentSection.addParagraph(textContent)
    }else{
        breakContent(textContent)
    }
}


function breakContent(text){
    var sentences = text.match(/\S.*?\."?(?=\s|$)/g);
    let breakingPoint = 0;
    while(breakingPoint < sentences.length ){
        if(VirtualBox.addParagraph(sentences.slice(0 , breakingPoint + 1) , false)){
            breakingPoint++;
        }
        else{
            break
        }

    } 

    addParagraph(sentences.slice(0 , breakingPoint).join(" "));
    currentSection.createNewCard();
    VirtualBox.reset();
    addParagraph(sentences.slice(breakingPoint ,sentences.length).join(" "));
}

function createNewSetion(){

   sections.push(new Section.FlashcardSection()); 
   currentSection = sections[sections.length -1 ];
}



