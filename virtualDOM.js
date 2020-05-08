export class VirtualBox{

    constructor(container , hidden=false){
        this.initBoxes(container , hidden);
        this.maxwidth = 311;
        this.maxHeight = 600;
    }

    initBoxes(container , hidden){
        this.contentBox = document.createElement('div');


        let baseContainer = document.createElement('div');
        baseContainer.style.height = '640px';
        baseContainer.style.width = "355px";
        baseContainer.style.padding = "20px";
        baseContainer.style.border = "1px solid #9E9E8E";
        baseContainer.style.borderRadius = "6px";
        baseContainer.style.boxShadow ="1px 0 1px 1px #b9b9b9"
        baseContainer.style.boxSizing = "border-box"
        baseContainer.appendChild(this.contentBox);
        if(hidden){
            baseContainer.style.position = 'absolute';
            baseContainer.style.left = "-1000px";
            baseContainer.style.top = "-1000px";
        }
        container.appendChild(baseContainer);
    }

    addHeader(text){
        let headerTemplate = document.createElement('div');
        headerTemplate.style.maxWidth = "313px";
        headerTemplate.style.maxHeight = "600px"
        headerTemplate.style.marginBottom = "20px";

        let header = document.createElement('h2');
        header.style.fontSize = "25.6px";
        header.style.fontFamily = "Roboto, Helvetica, Arial, sans-serif";
        header.style.fontWeight = "500";
        header.style.lineHeight = "1.3";
        header.style.margin = "0px";
        header.style.color = "#6B7000"
        header.innerText = text;
        headerTemplate.appendChild(header);
        this.contentBox.appendChild(headerTemplate);
        if(this.contentBox.getClientRects()[0].height <= this.maxHeight ){
            return true;
        }
    }


    addParagraph(text ,insert=true){
        let paragraphTemplate = document.createElement('div');
        paragraphTemplate.style.maxWidth = "313px";
        paragraphTemplate.style.marginBottom = "20px";

        let paragraph = document.createElement('p');
        paragraph.style.fontSize = "24px";
        paragraph.style.fontFamily = "Roboto, Helvetica, Arial, sans-serif"
        paragraph.style.fontWeight = "400";
        paragraph.style.lineHeight = "1.3";
        paragraph.style.margin = "0px";
        paragraph.style.color ="#212121";
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

    addImage(src){
        let imageTemplate = document.createElement('div');
        imageTemplate.style.maxWidth = "313px";
        imageTemplate.style.marginBottom = "20px";
        imageTemplate.style.display = "flex";
        imageTemplate.style.justifyContent = "center";

        let image = document.createElement('img');
        image.style.width = "width";
        image.src = src;  
        imageTemplate.appendChild(image);
        this.contentBox.appendChild(imageTemplate);
        if(this.contentBox.getClientRects()[0].height <= this.maxHeight ){

            return true;
        }
        else{
            this.contentBox.removeChild(image);
            return false;
        }
    }


    reset(){
        while (this.contentBox.firstChild) {
            this.contentBox.removeChild(this.contentBox.lastChild);
          }
    }
}
