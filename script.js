let allSpends = JSON.parse(localStorage.getItem('spends')) || [];
let valueTextInput = '';
let valueNumInput = null;
let inputWhere = '';
let inputHowMuch = null;
let editSpends = null;
let inputResultWhere = '';
let inputResultHowMuch = null;

window.onload = init = () => {
  inputWhere = document.getElementById('where');
  inputWhere.addEventListener('change', updateTextValue);
  inputHowMuch = document.getElementById('how-much');
  inputHowMuch.addEventListener('change', updateNumValue);
  render();
};

const onClickButton = () => {
  allSpends.push({
    text: valueTextInput,
    num: valueNumInput,
  });
  inputWhere.value = '';
  inputHowMuch.value = null;
  valueTextInput = '';
  valueNumInput = null;
  localStorage.setItem('spends', JSON.stringify(allSpends));
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
  const total = document.createElement('div');
  total.className = 'spends-total';
  total.innerText = 'Итого: ' + sumTotal() + ' p.';

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allSpends.map((item, index) => {
    const container = document.createElement('div');
    container.id = `spend-${index}`;
    container.className = 'spend-container';
    const { text, num } = item;

    if (editSpends !== index) {
      const where = document.createElement('span');
      where.className = 'spend-text';
      where.innerText = text;
      container.appendChild(where);

      const rightBlock = document.createElement('div');
      rightBlock.className = 'spend-right-block';
      container.appendChild(rightBlock)

      const date = document.createElement('span');
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      date.innerText = day + '.' + month + '.' + year;
      rightBlock.appendChild(date);

      const howMuch = document.createElement('span');
      howMuch.className = 'spend-num';
      howMuch.innerText = `${num} p.`;
      rightBlock.appendChild(howMuch);

      const imgBlock = document.createElement('div');
      imgBlock.className = 'image-block';
      rightBlock.appendChild(imgBlock);

      const editIcon = document.createElement('img');
      editIcon.src = 'img/edit.svg';
      editIcon.onclick = () => editSpendFunction(index);
      imgBlock.appendChild(editIcon);

      const deleteIcon = document.createElement('img');
      deleteIcon.src = 'img/delete.svg';
      deleteIcon.onclick = () => removeSpend(index);
      imgBlock.appendChild(deleteIcon);
    } else {
      container.className = 'spend-container spend-container-edit';

      inputWhere = document.createElement('input');
      inputWhere.type = 'text';
      inputWhere.value = text;
      inputWhere.onchange = (event) => {
        inputResultWhere = event.target.value;
      };
      container.appendChild(inputWhere);

      const rightBlockEdit = document.createElement('div');
      rightBlockEdit.className = 'spend-right-block-edit';
      container.appendChild(rightBlockEdit)

      inputHowMuch = document.createElement('input');
      inputHowMuch.type = 'number';
      inputHowMuch.value = num;
      inputHowMuch.onchange = (event) => {
        inputResultHowMuch = event.target.value;
      };
      rightBlockEdit.appendChild(inputHowMuch);

      const imgBlock = document.createElement('div');
      imgBlock.className = 'image-block';
      rightBlockEdit.appendChild(imgBlock);

      const doneIcon = document.createElement('img');
      doneIcon.src = 'img/done.svg';
      doneIcon.onclick = () => saveEditSpend(index);
      imgBlock.appendChild(doneIcon);

      const closeIcon = document.createElement('img');
      closeIcon.src = 'img/cancel.svg';
      closeIcon.onclick = () => closeSpend(index);
      imgBlock.appendChild(closeIcon);
    }

    content.appendChild(container);
    content.prepend(total);
  });
};

const sumTotal = () =>  allSpends.reduce((prev, next) => prev + +next.num, 0);

const removeSpend = (index) => {
  allSpends.splice(index, 1);
  localStorage.setItem('spends', JSON.stringify(allSpends));
  render();
};

const editSpendFunction = (index) => {
  editSpends = index;
  inputResultWhere = allSpends[index].text;
  inputResultHowMuch = allSpends[index].num;
  localStorage.setItem('spends', JSON.stringify(allSpends));
  render();
};

const closeSpend = () => {
  editSpends = null;
  localStorage.setItem('spends', JSON.stringify(allSpends));
  render();
};

const saveEditSpend = (index) => {
  allSpends[index].text = inputResultWhere;
  allSpends[index].num = inputResultHowMuch;
  editSpends = null;
  localStorage.setItem('spends', JSON.stringify(allSpends));
  render();
};
