// 1. Swap content between blocks 'x' and 'y'
document.addEventListener('DOMContentLoaded', () => {
    const blockX = document.querySelector('.subitem.x');
    const blockY = document.querySelector('.subitem.y');

    // Swap content
    const tempContent = blockX.innerHTML;
    blockX.innerHTML = blockY.innerHTML;
    blockY.innerHTML = tempContent;
});

// 2. Calculate area of a circle and display result in block '3'
function calculateCircleArea() {
    const radius = 5; // Example radius
    const area = Math.PI * radius ** 2;
    const block3 = document.querySelector('.item3');
    block3.innerHTML += `<p>Circle Area: ${area.toFixed(2)}</p>`;
}
calculateCircleArea();

// 3. Determine count of max numbers and handle cookies
function handleMaxNumbers() {
    const block3 = document.querySelector('.item3');
    const form = document.createElement('form');
    form.id = 'maxNumbersForm';
    for (let i = 0; i < 10; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.name = `value${i}`;
        form.appendChild(input);
    }
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.type = 'button';
    form.appendChild(submitButton);
    block3.appendChild(form);

    submitButton.addEventListener('click', () => {
        const values = Array.from(form.elements).map(e => parseFloat(e.value) || 0);
        const max = Math.max(...values);
        const count = values.filter(v => v === max).length;
        alert(`Maximum Value Count: ${count}`);
        document.cookie = `maxCount=${count}; path=/;`;
    });

    const cookies = document.cookie.split('; ').find(row => row.startsWith('maxCount='));
    if (cookies) {
        const maxCount = cookies.split('=')[1];
        const deleteCookies = confirm(`Stored Max Count: ${maxCount}. Do you want to delete this data?`);
        if (deleteCookies) {
            document.cookie = 'maxCount=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            location.reload();
        } else {
            alert('Cookies are present. Reload the page if needed.');
            form.style.display = 'none';
        }
    }
}
handleMaxNumbers();

// 4. Change background color of block '2' on blur and save to localStorage
document.querySelector('#item_lorem_middle2').addEventListener('blur', (event) => {
    const newColor = event.target.value;
    document.querySelector('.item2').style.backgroundColor = newColor;
    localStorage.setItem('block2BackgroundColor', newColor);
});

window.addEventListener('load', () => {
    const savedColor = localStorage.getItem('block2BackgroundColor');
    if (savedColor) {
        document.querySelector('.item2').style.backgroundColor = savedColor;
    }
});

// 5. Edit content of numbered blocks (1..6)
function enableContentEditing() {
    const blocks = document.querySelectorAll('.grid-container .item');
    blocks.forEach((block, index) => {
        const editLink = document.createElement('a');
        editLink.href = '#';
        editLink.textContent = ' Edit';
        block.appendChild(editLink);

        editLink.addEventListener('dblclick', () => {
            const currentContent = block.innerHTML;
            const textArea = document.createElement('textarea');
            textArea.value = currentContent;
            block.innerHTML = '';
            block.appendChild(textArea);

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            block.appendChild(saveButton);

            saveButton.addEventListener('click', () => {
                const newContent = textArea.value;
                block.innerHTML = newContent;
                localStorage.setItem(`blockContent${index + 1}`, newContent);
                block.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                block.appendChild(deleteButton);

                deleteButton.addEventListener('click', () => {
                    localStorage.removeItem(`blockContent${index + 1}`);
                    block.innerHTML = currentContent;
                });
            });
        });

        const savedContent = localStorage.getItem(`blockContent${index + 1}`);
        if (savedContent) {
            block.innerHTML = savedContent;
        }
    });
}
enableContentEditing();
