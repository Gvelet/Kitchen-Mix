import {store} from "./storeQuiz.js";

const wrapperQuiz = document.querySelector('.questions');

const startTemplate = () => {       
    wrapperQuiz.innerHTML = `
        <div class="questions__inner questions__inner-start">
            <img src="img/content/quiz-bg.png" alt="quiz" class="questions__img">
            <div class="questions__about">
                <div class="questions__about-counter"><span>0</span>/${store.lengthQuestion}</div>
                <div class="questions__about-inner">
                    <h3 class="questions__about-title">Ответьте на 5 вопросов и получите дизайн проект и расчет стоимость кухни</h3>
                    <h4 class="questions__about-subtitle"><span>+</span> гарантированый подарок при заказе кухни!</h4>
                </div>
                <button class="questions__about-btn">Узнать стоимость</button>
            </div>
        </div>
    `
}

const formTemplate = () => {
    wrapperQuiz.innerHTML = `
        <div class="question__inner">                  
                <div class="question__about-counter"><span>${store.lengthQuestion}</span>/${store.lengthQuestion}</div>            
                <form action="" class="quiz__form">
                <img src="img/content/quiz/quiz-form-bg.png" alt="" class="quiz__form-img">
                <div class="quiz__form-inner">
                    <h3 class="quiz__form-title">осталось только узнать, как нам с вами связаться</h3>
                    <div class="quiz__form-form">
                        <div class="quiz__form-inputs">
                            <input class="quiz__form-input" required placeholder="E-mail" name="email" type="email">
                            <input class="quiz__form-input" required placeholder="Имя" name="name" type="text">
                            <input class="quiz__form-input" required placeholder="+7(_ _ _) _ _ _-_ _ - _ _ " name="phone" type="phone">
                        </div>

                        <div class="quiz__form-send">
                            <button class="quiz__form-submit" type="submit">Получить рассчет</button>
                            <span class="quiz__form-agreement">
                                Нажимая кнопку “Получить рассчет”, вы соглашаетесь с условиями Политики конфиденциальности
                            </span>
                        </div>
                    </div>
                </div>
            </form>                           
        </div> 
    `;
}

const markupTemplate = (data) => {
    return `
        <div class="question__inner">
            <div class="question__about">
                <h4 class="question__title title">${store.title}</h4>
                <div class="question__about-counter"><span>${store.numberQuestions}</span>/${store.lengthQuestion}</div>
                <form action="" class="question__form question__form-inner">
                    ${markup(data)}
                </form>
            </div>
            <div class="question__buttons">
                <button class="question__btn-prev">←</button>
                <button class="question__btn-next">Далее →</button>
            </div>
        </div>     
    `       
};

const markup = (data) => {
    let id = 0;
     
    if(data.type === 'radio-img'){
         return store.answers.map(item => {
            id++
            return `
                <div class="question__radio">
                    <input type="radio" name="location-kitchen" value="${item.answer}" id="radio-${id}">
                    <label for="radio-${id}">
                        <div class="question__radio__container data-side='${item.side}'">
                            <h4 class="question__radio-title">${item.answer}</h4>
                            <img src="${item.img}">
                            <div class="question__checkmark"></div>
                        </div>                                                   
                    </label>
                </div>
            `
        }).join('')
    }else if(data.type === 'slider-сontrols'){
        return `
        <img src="img/content/quiz/range__u-shaped.png" alt="">
        <div class="question__range-inner">
            ${store.answers.map(item => {
                id++
                const nameSize = ['A', 'B', 'C'];
                return `
                <div class="question__range-item">
                    <div class="question__range-info">
                        <h4 class="question__range-title">${item.title[0]}</h4>
                        <input name="size-kitchen-${nameSize[id-1]}" type="number" placeholder="0" class="question__range-count" min="0" max="500">
                    </div>                                                  
                    <input name="size-kitchen-${nameSize[id-1]}" class="question__range-input" type="range" min="0" max="500" value="0">
                </div>    
                `
            }).join('')}
        </div>
        `
    }else if(data.type === 'checkbox-img'){
        return store.answers.map(item => {
            id++
            return`
                <div class="question__checkbox">
                    <input class="question__checkbox-input" type="checkbox" name="selected-technique-${id}" value="${item.answer}" id="checkbox-${id}">
                    <label for="checkbox-${id}">
                        <div class="question__checkbox__container">                                              
                            <img src="${item.img}">
                            <div class="question__checkmark-checkbox"></div>
                        </div>
                        <h4 class="question__checkbox-title title">${item.answer}</h4>                                                   
                    </label>
                </div>
            `
        }).join(''); 
    }else if(data.type === 'radio'){
        return store.answers.map(item => {
            id++
            return `
                <div class="question__radio-budget">
                    <input type="radio" name="budget-kitchen" value="${item}" id="radio-${id}">
                    <label for="radio-${id}">
                        <div class="question__radio-budget__container">
                            <h4 class="question__radio-budget-title">${item}</h4>
                            <div class="question__checkmark"></div>
                        </div>                                                   
                    </label>
                </div>
            `
        }).join('');
    }else{
        console.log('Нет таких вопросов')
    }
}

export {wrapperQuiz, startTemplate, markupTemplate, markup, formTemplate}