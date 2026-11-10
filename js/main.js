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
  // Видимая подпись с названием товара.
  const selectedProductText = document.getElementById('selected-product-text');
  // Кнопка, которая открыла окно: после закрытия вернём на неё фокус.
  let lastTrigger = null;

  // Все кнопки «Заказать» в карточках товаров.
  document.querySelectorAll('.product-card__button').forEach((button) => {
    button.addEventListener('click', () => {
      // Название товара берём из data-атрибута кнопки.
      selectedProductInput.value = button.dataset.product;
      selectedProductText.textContent = button.dataset.product;
      lastTrigger = button;

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

  // Щелчок по затемнённому фону тоже закрывает окно.
  orderDialog.addEventListener('click', (event) => {
    if (event.target === orderDialog) {
      orderDialog.close();
    }
  });

  // После закрытия возвращаем фокус туда, откуда окно открыли.
  orderDialog.addEventListener('close', () => {
    if (lastTrigger) {
      lastTrigger.focus();
    }
  });
}

/* ===============================
   2. Проверка форм
   =============================== */

// Показываем или убираем текст ошибки под полем.
function setFieldError(field, message) {
  const errorElement = document.getElementById(field.id + '-error');

  if (message) {
    field.setAttribute('aria-invalid', 'true');
  } else {
    field.removeAttribute('aria-invalid');
  }

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.hidden = !message;
  }
}

// Текст ошибки: свой из data-error или стандартный текст браузера.
function getFieldError(field) {
  if (field.checkValidity()) {
    return '';
  }

  return field.dataset.error || field.validationMessage;
}

// Одна и та же проверка работает для всех форм с классом .js-form:
// быстрая заявка в окне, заявка на order.html и форма на contacts.html.
document.querySelectorAll('.js-form').forEach((form) => {
  // Сообщение об успешной отправке указано в data-success.
  const successMessage = document.getElementById(form.dataset.success);

  // Ошибку у поля убираем сразу, как только его исправили.
  form.addEventListener('input', (event) => {
    if (event.target.getAttribute('aria-invalid') === 'true') {
      setFieldError(event.target, getFieldError(event.target));
    }
  });

  form.addEventListener('submit', (event) => {
    // Отменяем стандартную отправку: backend пока не подключён.
    event.preventDefault();

    const fields = Array.from(form.elements).filter((element) => element.willValidate);

    // Проверяем каждое поле и выводим текст ошибки под ним.
    fields.forEach((field) => {
      setFieldError(field, getFieldError(field));
    });

    const firstInvalid = fields.find((field) => !field.checkValidity());

    if (firstInvalid) {
      // Переносим фокус на первое поле с ошибкой:
      // скринридер прочитает подпись поля и текст ошибки (aria-describedby).
      firstInvalid.focus();
      return;
    }

    // Текст появляется в области role="status" — скринридер его озвучит.
    successMessage.textContent = 'Форма успешно отправлена! Мы свяжемся с вами.';
    // Сообщение может оказаться за краем экрана — прокручиваем к нему.
    successMessage.scrollIntoView({ block: 'nearest' });

    // Очищаем форму.
    form.reset();

    // Если форма находится в модальном окне — закрываем его.
    if (orderDialog && orderDialog.contains(form)) {
      orderDialog.close();
    }
  });

  // Кнопка «Очистить» убирает и сообщения об ошибках.
  form.addEventListener('reset', () => {
    Array.from(form.elements).forEach((field) => {
      if (field.id) {
        setFieldError(field, '');
      }
    });
  });
});
