export class VirtualBox{

    constructor(container){
        this.initBoxes(container);
        this.maxwidth = 315;
        this.maxHeight = 600;
    }

    initBoxes(container){
        this.contentBox = document.createElement('div');
        // this.contentBox.style.position = 'absolute';
        // this.contentBox.style.left = "-1000px";
        // this.contentBox.style.top = "-1000px";
        this.contentBox.style.border = "1px solid black";

        container.appendChild(this.contentBox);
    }

    addHeader(text){
        let headerTemplate = document.createElement('div');
        headerTemplate.style.maxWidth = "315px";
        headerTemplate.style.maxHeight = "600px"
        headerTemplate.style.marginBottom = "20px";

        let header = document.createElement('h2');
        header.style.fontSize = "26px";
        header.style.fontWeight = "500"
        header.style.lineHeight = "1.3";
        header.innerText = text;
        headerTemplate.appendChild(header);
        this.contentBox.appendChild(headerTemplate);
        if(this.contentBox.getClientRects()[0].height <= this.maxHeight ){
            return true;
        }
    }


    addParagraph(text ,insert=true){
        let paragraphTemplate = document.createElement('div');
        paragraphTemplate.style.maxWidth = "315px";
        paragraphTemplate.style.maxHeight = "600px"
        paragraphTemplate.style.marginBottom = "20px";

        let paragraph = document.createElement('p');
        paragraph.style.fontSize = "22px";
        paragraph.style.fontWeight = "400"
        paragraph.style.lineHeight = "1.3";
        paragraph.innerText = text;
        paragraphTemplate.appendChild(paragraph);
        this.contentBox.appendChild(paragraphTemplate);
        if(this.contentBox.getClientRects()[0].height <= this.maxHeight ){
            if(insert === false){
                this.contentBox.removeChild(paragraphTemplate);
            }
            return true;
        }else{
            this.contentBox.removeChild(paragraphTemplate);
            return false;
        }   
    }


    reset(){
        while (this.contentBox.firstChild) {
            this.contentBox.removeChild(this.contentBox.lastChild);
          }
    }
}
