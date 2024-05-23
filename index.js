const search = document.getElementById('search');
const autocomplete = document.getElementById('autocomplete');
const repository = document.getElementById('repository');


search.addEventListener('input', debounce(handleSearch, 500));

function handleSearch() {
    autocomplete.innerHTML = '';
    if (search.value.trim() !== '') {
        fetch(`https://api.github.com/search/repositories?q=${search.value}`)
            .then(response => response.json())
            .then(data => {
                data.items.slice(0, 5).forEach(item => {
                    const repository = document.createElement('div');
                    repository.textContent = item.full_name;
                    repository.addEventListener('click', () => {
                        addRepositoryToList(item);
                        search.value = '';
                        autocomplete.innerHTML = '';
                    });
                    autocomplete.appendChild(repository);
                });
            });
    }
}

function addRepositoryToList(repo) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `Репозиторий: ${repo.name}, Пользователь: ${repo.owner.login}, Звезд: ${repo.stargazers_count}`;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', () => {
        repository.removeChild(listItem);
        repository.removeChild(deleteButton);
    });
    repository.appendChild(listItem);
    repository.appendChild(deleteButton);
}

function debounce(func, timeout) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(func, timeout);
    };
}