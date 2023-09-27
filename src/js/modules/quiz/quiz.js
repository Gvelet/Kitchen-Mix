import {store, storeForm, pullingData} from "./storeQuiz.js";
import {wrapperQuiz, startTemplate, markup, markupTemplate, formTemplate} from "./markupHTML.js";
import useRange from "./inputRange.js";

function quiz(){
    const fetchQuiz = async () => {
        const response = await fetch(' http://localhost:3000/questionsQuiz');
        const data = await response.json('');
        
        store.lengthQuestion = data.length + 1
        
        startTemplate()
        const quizStartBtn = document.querySelector('.questions__about-btn');
        quizStartBtn.addEventListener('click', () => renderQuestion(data, store.numberQuestions));       
    }


    const hiddenQuiz = () => {
        wrapperQuiz.innerHTML = ''
    }

    const getAttributeFromLocation = () => {
        const radioCcontainer = document.querySelectorAll('.question__radio__container');

        radioCcontainer.forEach(item => {
            item.addEventListener('click', () =>  store.side = item.dataset.side )
        })
    }

    const renderQuestion = (data, numberQuestion) => {
        hiddenQuiz();
        
        const selectQuestionOrder = data.filter(question => {
            if(question.numberQuestions === numberQuestion){
                pullingData(question);
                wrapperQuiz.innerHTML = markupTemplate(store);
            }

        });

        getAttributeFromLocation()
        
        useRange()
        
        const quizBtnNext = document.querySelector('.question__btn-next');
        const quizBtnPrev = document.querySelector('.question__btn-prev');
        const formQuiz = document.querySelector('.question__form');
        
        quizBtnNext.addEventListener('click', (e) => {
            e.preventDefault;
            numberQuestion++

            
            const questionRrangeInput = document.querySelectorAll('question__range-input');
            const questionCheckboxIinput = document.querySelectorAll('question__checkbox-input');

            const formData = new FormData(formQuiz);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            const locationKitchen = formData.get('location-kitchen');
            const sizeKitchen = formData.get('size-kitchen');
            const selectedTechnique = formData.get('selected-technique');
            const budgetKitchen = formData.get('budget-kitchen');

            if(locationKitchen){
                storeForm.location = locationKitchen
            }


            questionRrangeInput.forEach(range => {
                const q = JSON.parse(formData.append(range.name, range.value));
                for(let key in q){
                    storeForm.sizeKitchen[key] = q[key]
                }
                // formData.append(range.name, range.value);
            })

            // const json = JSON.stringify(Object.fromEntries(formData.entries()));
                
            

            if(selectedTechnique){
                questionCheckboxIinput.map(checkbox => {
                    formData.append(checkbox.value);
                }) 
            }
            storeForm.selectedTechnique = JSON.parse(json);

            if(budgetKitchen){
                storeForm.budgetKitchen = budgetKitchen
            }

            (numberQuestion !== store.lengthQuestion) ? renderQuestion(data, numberQuestion) : formTemplate()
            
            
        });
        
        quizBtnPrev.addEventListener('click', (e) => {
            e.preventDefault;
            numberQuestion--

            if(numberQuestion === 0){
                startTemplate();
                fetchQuiz();
            }else{
                renderQuestion(data, numberQuestion)
            }
            
        });

    }

    fetchQuiz();
}

export default quiz;