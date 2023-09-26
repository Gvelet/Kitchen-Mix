let store = {
    type: '',
    title: '',
    img: '',
    numberQuestions: 1,
    answers: [],
    lengthQuestion: 0,
    side: "",
    location: ''
}

const storeForm = {
    location: '',
    sizeKitchen: {},
    selectedTechnique: [],
    budgetKitchen: ''
}

const pullingData = (question) => {
    const {
        answers,
        title, 
        numberQuestions, 
        type
    } = question;

    store = {
        ...store,
        answers,
        title,
        numberQuestions,
        type
    }
}

export {store, storeForm, pullingData}