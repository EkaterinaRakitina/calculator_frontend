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
  inputHowMuch.value = '';
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

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allSpends.map((item, index) => {
    const container = document.createElement('div');
    container.id = `spend-${index}`;
    container.className = 'spend-container';

    if (editSpends !== index) {
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
      editIcon.onclick = () => editSpendFunction(index);
      container.appendChild(editIcon);

      const deleteIcon = document.createElement('img');
      deleteIcon.src = 'img/delete.svg';
      deleteIcon.onclick = () => removeSpend(index);
      container.appendChild(deleteIcon);
    } else {
      inputWhere = document.createElement('input');
      inputWhere.type = 'text';
      inputWhere.value = item.text;
      // where.onclick = (event) => {
      //   inputResultWhere = event.target.value;
      // };
      container.appendChild(inputWhere);

      inputHowMuch = document.createElement('input');
      inputHowMuch.type = 'number';
      inputHowMuch.value = item.num;
      container.appendChild(inputHowMuch);

      const doneIcon = document.createElement('img');
      doneIcon.src = 'img/done.svg';
      doneIcon.onclick = () => saveEditSpend(index);
      container.appendChild(doneIcon);

      const closeIcon = document.createElement('img');
      closeIcon.src = 'img/cancel.svg';
      closeIcon.onclick = () => closeSpend(index);
      container.appendChild(closeIcon);
    }

    content.appendChild(container);
    content.appendChild(sum);
  });
};

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
}

const saveEditSpend = (index) => {
  console.log('click');
  allSpends[index].text = inputResultWhere;
  allSpends[index].num = inputResultHowMuch;
  editSpends = null;
  localStorage.setItem('spends', JSON.stringify(allSpends));
  render();
}
