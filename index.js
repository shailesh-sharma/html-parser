const html = require ('./dummy');
var DOMParser = require('xmldom').DOMParser;
const VB = require('./virtualDOM');
var Section = require('./Section')
var container = document.getElementById("container");
var VirtualBox = new VB.VirtualBox(container);
var sections = [];
var currentSection;
createNewSetion();
var doc = new DOMParser().parseFromString(html.html);

(function(){for(var i = 0 ; i < doc.childNodes.length ; i++){
    let currentElement = doc.childNodes[i];
    switch(currentElement.nodeName){
        case "h2" : 
            addHeader(currentElement.textContent);
            break;
        case "p" :
            addParagraph(currentElement.textContent);
    }
}
console.log(sections)}
)()



function addHeader(textContent){
    if(currentSection.cards.length == 1 &&  currentSection.currentCard == ""){
        VirtualBox.addHeader(textContent);
        currentSection.addHeader(textContent);
    }
    else{
        createNewSetion();
        VirtualBox.reset();
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

    addParagraph(addsentences.slice(0 , breakingPoint).join(" "));
    currentSection.createNewCard();
    VirtualBox.reset();
    addParagraph(sentences.slice(breakingPoint + 1 ,sentences.length).join(" "));
}

function createNewSetion(){

   sections.push(new Section.FlashcardSection()); 
   currentSection = sections[sections.length -1 ];
}



