function modals(){
    class CardModel{
        constructor(src, altimg, title, price, discPrice, parentSelector){
            this.src = src,
            this.altimg = altimg,
            this.title = title,
            this.price = price,
            this.discPrice = discPrice,
            this.parent = document.querySelector(parentSelector);
        }

        markup(){
            const element = document.createElement('div');
            element.classList.add('models__column')
            element.innerHTML = `
                <a class="models__item" href="">
                    <img class="models__img" src="${this.src}" alt="${this.altimg}">
                    <div class="models__info">
                        <h3 class="models__info-title">${this.title}</h3>
                        <div class="models__buy">
                            <div class="models__prices">
                                ${(this.discPrice) ? `<div class="models__discount">${this.discPrice}</div>` : ''}  
                                <div class="models__price">${this.price}</div>
                            </div>
                            <div class="models__buy-add">
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.693359 10.5008H20.3078M10.5006 0.693359V20.3078" stroke="#99CB38" stroke-width="2" stroke-miterlimit="10"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </a>
            `
            this.parent.append(element);
        }
        
    }

    const fetchCards = async () => {
        try{
            const response = await fetch('http://localhost:3000/models');
            const data = await response.json();

            renderPopularCards(data, 6);
        }catch(err){
            console.log(err)
        }       
    }


    const renderPopularCards = (data, numberCards) => {
        const filteredCardsPopular = data.filter(card => card.popular).slice(0, numberCards);

        filteredCardsPopular.forEach(({img, altimg, title, price, discountedPrice, popular}) => {
                if(popular){
                    new CardModel(img, altimg, title, price, discountedPrice, '.models__inner').markup()
                };
        });
    }

    fetchCards()
}

export default modals;