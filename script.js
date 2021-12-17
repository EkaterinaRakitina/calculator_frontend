let = allSpends = JSON.parse(localStorage.getItem('spends')) || [];
let = valueTextInput = '';
let = valueNumInput = null;
let input = null;

window.onload = init = () => {
  input = document.getElementById('where');
  input.addEventListener('change', updateTextValue);
  input = document.getElementById('how-much');
  input.addEventListener('change', updateNumValue);
  render();
};

const onClickButton = () => {
  allSpends.push({
    text: valueTextInput,
    num: valueNumInput,
  });
//   input.value = '';
  localStorage.setItem('spends', JSON.stringify(allSpends));
  console.log(allSpends);
  render();
};

const updateTextValue = (event) => {
  valueTextInput = event.target.value;
};

const updateNumValue = (event) => {
  valueNumInput = event.target.value;
};

const render = () => {
  const content = document.getElementById('content-page');
  const sum = document.createElement('div');
  sum.className = 'spends-sum';
  sum.innerText = 'Summa';

  while(content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allSpends.map((item, index) => {

    const container = document.createElement('div');
    container.id = `spend-${index}`;
    container.className = 'spend-container';

    const where = document.createElement('span');
    where.className = 'spend-text';
    where.innerText = item.text;
    container.appendChild(where);

    const date = document.createElement('span');
    container.appendChild(date);

    const howMuch = document.createElement('span');
    howMuch.className = 'spend-num';
    howMuch.innerText = item.num;
    container.appendChild(howMuch);

    const editIcon = document.createElement('img');
    editIcon.src = 'img/edit.svg';
    container.appendChild(editIcon);

    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'img/delete.svg';
    container.appendChild(deleteIcon);

    content.appendChild(container);
    content.appendChild(sum);
  });
};
