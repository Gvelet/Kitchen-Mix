function tabs(){

    const tabsBtn = document.querySelector('.tabs__btns-inner');
    const tabsContent = document.querySelector('.tabs__content-inner');
    const tabBtn = document.querySelectorAll('.tabs__btn')

    let store = {
        img: [],
        category: localStorage.getItem('tabs') || 'economy'
    }

    const fetchTabs = async () => {
        const response = await fetch(`http://localhost:3000/kitchenStyle`);
        const data = await response.json('');
        
        getTabContent(data, store.category)
        renderTabsContent();
    }

    tabsBtn.addEventListener('click', (e) => {
        const target = e.target;

        if(target.tagName === "BUTTON" && target){            
            store = {
                ...store,
                category: target.dataset.tabName,
                img: []
            }

            localStorage.setItem('tabs', store.category)

            hiddenContentTabs()
            showActiveTab(store.category)

            fetchTabs();
        }
    })

    const getTabContent = (data, сheckCategory) => {
        return data.filter(item => {
            if(item.category === сheckCategory){
                store.img.push(item.img)
            }
        });
    }

    const showActiveTab = (storeCategory) => {
        tabBtn.forEach(btn => {
            if(btn.dataset.tabName == storeCategory){
                btn.classList.add('tabs__active');
            }
        })
    }

    showActiveTab(store.category)

    const hiddenContentTabs = () => {
        tabBtn.forEach(tab => {
            tab.classList.remove('tabs__active');
        })
    }

    const renderTabsContent = () => { //markup
        tabsContent.innerHTML = '';

        store.img.forEach(item => {
            tabsContent.innerHTML +=  `
                <div class="tabs__images">
                    <img class="tabs__img" src="${item}" alt="Kitchen-style">
                    <div class="tabs__img-glass">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                            <circle cx="25" cy="25" r="25" fill="#FBD846" fill-opacity="0.8"/>
                            <path d="M22.9078 14.4678C27.5699 14.4678 31.3469 18.2447 31.3469 22.9068C31.3469 24.9221 30.6422 26.7697 29.4648 28.2221L35.2656 34.0229C35.6094 34.3666 35.6094 34.9209 35.2656 35.2646C34.9219 35.6084 34.3676 35.6084 34.0238 35.2646L28.223 29.4639C26.7707 30.6412 24.923 31.3459 22.9078 31.3459C18.2457 31.3459 14.4687 27.5689 14.4687 22.9068C14.4687 18.2447 18.25 14.4678 22.9078 14.4678ZM22.9078 29.5928C26.5988 29.5928 29.5937 26.5979 29.5937 22.9068C29.5937 19.2158 26.5988 16.2209 22.9078 16.2209C19.2168 16.2209 16.2219 19.2158 16.2219 22.9068C16.2219 26.5979 19.2168 29.5928 22.9078 29.5928Z" fill="black"/>
                        </svg>
                    </div>
                </div>
            `
        })
    }

    fetchTabs()
}

export default tabs;