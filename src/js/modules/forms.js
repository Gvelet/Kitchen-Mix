function form(){
    const forms = document.querySelectorAll('form');
    
    const fetchForm = async (url, data) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });

        return await response.json()
    }

    function bindFetchForm (form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            fetchForm('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data, ':success')
                })
                .catch(() => {
                    console.log('err')
                })
                .finally(() => {
                    form.reset();
                })
        })
    }

    forms.forEach(item => {
        bindFetchForm(item);
    })
}

export default form;