const createAutoComplete = ({root,renderOption, onOptionSelect,inputValue,fetchData}) => {
    // const root = document.querySelector('.autocomplete');
    root.innerHTML = 
    `
    <label><b>Search Below</b></label>
    <input class='input'/>
     <div class='dropdown'>
       <div class='dropdown-menu'>
        <div class='dropdown-content results'></div>
    </div>
    </div>
    `;

    const input = document.querySelector('input');
    const dropdown = document.querySelector('.dropdown');
    const resultsWrapper = document.querySelector('.results');

    const onInput = async(event) => {
        const items = await fetchData(event.target.value)

        resultsWrapper.innerHTML = '';
        if (!items.length) {
            dropdown.classList.remove('is-active')
            return;
        }

        dropdown.classList.add('is-active')
        for (let item of items) {
            const option = document.createElement('a');


            option.classList.add('dropdown-item')
            option.innerHTML = renderOption(item)

            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item)
                onOptionSelect(item);
            })
            resultsWrapper.appendChild(option);
        }
    };

    input.addEventListener('input', debounce(onInput, 1000));

    document.addEventListener('click', (event) => {
        if (!root.contains(event.target)) {
            console.log(event.target)
            dropdown.classList.remove('is-active');
            // resultsWrapper.innerHTML='';
        }
    })
}