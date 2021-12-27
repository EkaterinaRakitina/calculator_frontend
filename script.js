let allSpends = [];
let valueTextInput = '';
let valueNumInput = null;
let inputWhere = '';
let inputHowMuch = null;
let editSpends = null;
let inputResultWhere = '';
let inputResultHowMuch = null;
let inputResultDate = '';

window.onload = init = async () => {
  inputWhere = document.getElementById('where');
  inputWhere.addEventListener('change', updateTextValue);
  inputHowMuch = document.getElementById('how-much');
  inputHowMuch.addEventListener('change', updateNumValue);
  const resp = await fetch('http://localhost:5000/allSpends', {
    method: 'GET',
  });
  const result = await resp.json();
  allSpends = result.data;
  render();
};

const onClickButton = async () => {
  const resp = await fetch('http://localhost:5000/createSpend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      text: valueTextInput,
      date: valueDateFunc(),
      num: valueNumInput,
    }),
  });

  const result = await resp.json();
  allSpends.push(result);

  inputWhere.value = '';
  inputHowMuch.value = null;
  valueTextInput = '';
  valueNumInput = null;
  render();
};

const valueDateFunc = () =>
  new Date().toISOString().substring(0, 10).split('-').reverse().join('.');

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
    const { text, date, num } = item;

    if (editSpends !== index) {
      const where = document.createElement('span');
      where.className = 'spend-text';
      where.innerText = text;
      container.appendChild(where);

      const rightBlock = document.createElement('div');
      rightBlock.className = 'spend-right-block';
      container.appendChild(rightBlock);

      const dateSpend = document.createElement('span');
      dateSpend.innerText = date;
      rightBlock.appendChild(dateSpend);

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
      deleteIcon.onclick = () => removeSpend(item);
      imgBlock.appendChild(deleteIcon);
    } else {
      container.className = 'spend-container spend-container-edit';

      const inputWhere = document.createElement('input');
      inputWhere.type = 'text';
      inputWhere.value = text;
      inputWhere.onchange = (event) => {
        inputResultWhere = event.target.value;
      };
      container.appendChild(inputWhere);

      const rightBlockEdit = document.createElement('div');
      rightBlockEdit.className = 'spend-right-block-edit';
      container.appendChild(rightBlockEdit);

      const inputDate = document.createElement('input');
      inputDate.type = 'date';
      inputDate.className = 'spend-date';
      inputDate.value = new Date().toISOString().substring(0, 10);
      inputDate.setAttribute('min', '2021 - 01 - 01');
      inputDate.setAttribute('max', '2021 - 12 - 31');

      inputDate.onchange = (event) => {
        inputResultDate = event.target.value;
      };
      rightBlockEdit.appendChild(inputDate);

      const inputHowMuch = document.createElement('input');
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

const sumTotal = () => allSpends.reduce((prev, next) => prev + +next.num, 0);

const removeSpend = async (item) => {
  const resp = await fetch(`http://localhost:5000/deleteSpend?id=${item._id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });

  const result = await resp.json();
  allSpends = result;

  render();
};

const editSpendFunction = (index) => {
  editSpends = index;
  inputResultWhere = allSpends[index].text;
  inputResultHowMuch = allSpends[index].num;
  inputResultDate = allSpends[index].date;
  render();
};

const closeSpend = () => {
  editSpends = null;
  render();
};

const saveEditSpend = async (index) => {
  allSpends[index].text = inputResultWhere;
  inputResultWhere = '';
  allSpends[index].num = inputResultHowMuch;
  inputResultHowMuch = '';
  allSpends[index].date = inputResultDate
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('.');
  inputResultDate = '';
  const resp = await fetch('http://localhost:5000/changeSpend', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(allSpends[index]),
  });
  const result = await resp.json();
  allSpends = result.data;

  render();
};
