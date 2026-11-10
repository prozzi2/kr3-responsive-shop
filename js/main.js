/*
  main.js — небольшой скрипт сайта.
  Основа перенесена из КР №1: открытие модального окна и проверка формы.
*/

/* ===============================
   1. Модальное окно быстрой заявки
   =============================== */

// Получаем модальное окно по id. На страницах без окна будет null.
const orderDialog = document.getElementById('order-dialog');

if (orderDialog) {
  // Скрытое поле, в которое записывается выбранный товар.
  const selectedProductInput = document.getElementById('selected-product');

  // Все кнопки «Заказать» в карточках товаров.
  document.querySelectorAll('.product-card__button').forEach((button) => {
    button.addEventListener('click', () => {
      // Название товара берём из data-атрибута кнопки.
      selectedProductInput.value = button.dataset.product;

      // showModal() открывает окно поверх страницы,
      // удерживает фокус внутри и включает закрытие по Esc.
      orderDialog.showModal();
    });
  });

  // Кнопки закрытия окна.
  orderDialog.querySelectorAll('[data-close-dialog]').forEach((button) => {
    button.addEventListener('click', () => {
      orderDialog.close();
    });
  });
}

/* ===============================
   2. Проверка форм
   =============================== */

// Одна и та же проверка работает для всех форм с классом .js-form:
// быстрая заявка в окне, заявка на order.html и форма на contacts.html.
document.querySelectorAll('.js-form').forEach((form) => {
  // Сообщение об успешной отправке указано в data-success.
  const successMessage = document.getElementById(form.dataset.success);

  form.addEventListener('submit', (event) => {
    // Отменяем стандартную отправку: backend пока не подключён.
    event.preventDefault();

    const fields = Array.from(form.elements).filter((element) => element.willValidate);

    // Сбрасываем предыдущие признаки ошибок.
    fields.forEach((field) => {
      field.removeAttribute('aria-invalid');
    });

    // Проверяем встроенные HTML-ограничения формы.
    if (!form.checkValidity()) {
      fields.forEach((field) => {
        if (!field.checkValidity()) {
          field.setAttribute('aria-invalid', 'true');
        }
      });

      // Показываем стандартные сообщения браузера.
      form.reportValidity();
      return;
    }

    // Показываем сообщение об успешной отправке.
    successMessage.hidden = false;

    // Очищаем форму.
    form.reset();

    // Если форма находится в модальном окне — закрываем его.
    if (orderDialog && orderDialog.contains(form)) {
      orderDialog.close();
    }
  });
});
