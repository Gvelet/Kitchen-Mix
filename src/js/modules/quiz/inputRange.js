export default function useRange(){
    const range = document.querySelectorAll('.question__range-input');
    const output = document.querySelectorAll('.question__range-count');

    output.forEach(item => {
        item.addEventListener('input', () => {
            const parent = item.closest('.question__range-item');
            const outputRange = parent.querySelector('.question__range-input');

            let value = item.value;

            const min = +item.min;
            const max = +item.max; 

            const value1 = +item.value;
            if (value1 > max) { item.value = max }
            if (value1 < min) { item.value = min }

            range.forEach(item => {
                let trackWidth = (value - item.min) / (item.max - item.min) * 100;
                outputRange.style.background = 'linear-gradient(to right, #FBD846 ' + trackWidth + '%, #DCDCDC ' + trackWidth + '%)';
            })

            if(item.value){
                outputRange.value = item.value
            }else{
                outputRange.value = 0
            }
            
        })
    })

    range.forEach(item => {
        item.addEventListener('input', () => {          
            const parent = item.closest('.question__range-item');
            const output = parent.querySelector('.question__range-count');

            let value = item.value;
            let trackWidth = (value - item.min) / (item.max - item.min) * 100;
            item.style.background = 'linear-gradient(to right, #FBD846 ' + trackWidth + '%, #DCDCDC ' + trackWidth + '%)';
            
            output.value = item.value
        })
    })
}