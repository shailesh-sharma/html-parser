const html = require ('./dummy');
var DOMParser = require('xmldom').DOMParser;
const VB = require('./virtualDOM');
var Section = require('./Section')
var container;
var VirtualBox;
var sections ;
var currentSection;

var doc;


export var onClickHandler =  function(){
    sections = [];
    createNewSetion();
    container = document.getElementById("preview");
    let textArea = document.getElementById('editor');
    doc = new DOMParser().parseFromString(textArea.value)
    VirtualBox = new VB.VirtualBox(container , true);
    for(var i = 0 ; i < doc.childNodes.length ; i++){
        let currentElement = doc.childNodes[i];
        switch(currentElement.nodeName){
            case "h2" : 
                addHeader(currentElement.textContent);
                break;
            case "p" :
                addParagraph(currentElement.textContent);
                break;
            case "img":
                addImage(currentElement.getAttribute('src'));
        }
    }

    drawCard();
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
                        break;
                    case "img":
                        VBOX.addImage(currentElement.getAttribute('src'));
                }
            }
        }
        let sectionBreak = document.createElement('div');
        sectionBreak.innerText = "New section"
        sectionBreak.style.width ="100%";
        sectionBreak.style.background = "red";
        container.appendChild(sectionBreak);
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
        VirtualBox.addHeader(textContent);
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

function addImage(src , width="100%"){
    if(VirtualBox.addImage(src)){
        currentSection.addImage(src)
    }
    else{
        currentSection.createNewCard();
        VirtualBox.reset();
        currentSection.addImage(src);
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



