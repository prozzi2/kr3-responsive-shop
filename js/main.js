/*
  main.js — небольшой скрипт сайта.
  Основа перенесена из КР №1: открытие модального окна и проверка формы.
  Для КР №3 добавлены мобильное меню, фильтр каталога,
  страница товара по id, сводка заказа и кнопка «Наверх».
  Если JavaScript выключен, сайт остаётся рабочим:
  меню и фильтр просто показываются развёрнутыми.
*/

// Класс .js на <html> сообщает стилям, что скрипты работают
// и меню с фильтром можно сворачивать.
document.documentElement.classList.add('js');

/* ===============================
   1. Данные о товарах
   =============================== */

// Те же товары, что в карточках каталога.
// Нужны для страницы товара (product.html?id=N) и сводки заказа.
const PRODUCTS = [
  {
    "id": 1,
    "name": "Рука «Титан» — правая мужская",
    "img": "pravaya_ruka",
    "alt": "Рисунок: согнутая в локте правая мужская рука с крупным бицепсом и сжатым кулаком",
    "price": 32000,
    "old": null,
    "stock": true,
    "desc": "Флагман магазина. «Титан» создан для тех, кто выходит к столу за победой: усиленное предплечье, мёртвый хват и запас прочности на целый турнирный сезон. Подходит для борьбы правой рукой в любой весовой категории.",
    "specs": {
      "Сила хвата": "120 кг",
      "Вес": "4,8 кг",
      "Техника": "верх, крюк, трицепс",
      "Гарантия": "2 турнирных сезона"
    }
  },
  {
    "id": 2,
    "name": "Рука «Титан» — левая мужская",
    "img": "levaya_ruka",
    "alt": "Рисунок: согнутая в локте левая мужская рука с крупным бицепсом и сжатым кулаком",
    "price": 31000,
    "old": null,
    "stock": true,
    "desc": "Левая версия флагмана для тех, кто борется на обе руки. Тот же мёртвый хват и усиленное предплечье, зеркальная посадка и отдельная настройка под левостороннюю борьбу.",
    "specs": {
      "Сила хвата": "115 кг",
      "Вес": "4,7 кг",
      "Техника": "верх, крюк",
      "Гарантия": "2 турнирных сезона"
    }
  },
  {
    "id": 3,
    "name": "Рука «Валькирия» — правая женская",
    "img": "prav_zhenskaya_ruka",
    "alt": "Рисунок: согнутая в локте правая женская рука с рельефным бицепсом",
    "price": 21000,
    "old": null,
    "stock": true,
    "desc": "Лёгкая и быстрая рука для женского армрестлинга. Резкий старт, цепкая кисть и отличный контроль в борьбе верхом — выбор тех, кто побеждает техникой, а не только силой.",
    "specs": {
      "Сила хвата": "85 кг",
      "Вес": "3,6 кг",
      "Техника": "верх, боковое давление",
      "Гарантия": "2 турнирных сезона"
    }
  },
  {
    "id": 4,
    "name": "Рука «Валькирия» — левая женская",
    "img": "lev_zhenskaya_ruka",
    "alt": "Рисунок: согнутая в локте левая женская рука с рельефным бицепсом",
    "price": 20500,
    "old": 24000,
    "stock": true,
    "desc": "Левая «Валькирия» для борьбы на обе руки. Та же быстрая кисть и контроль, а сейчас ещё и по сниженной цене.",
    "specs": {
      "Сила хвата": "80 кг",
      "Вес": "3,5 кг",
      "Техника": "верх, боковое давление",
      "Гарантия": "2 турнирных сезона"
    }
  },
  {
    "id": 5,
    "name": "Рука «Будни» — правая мужская",
    "img": "prav_ruka_kontur",
    "alt": "Контурный рисунок: опущенная вниз правая мужская рука обычного телосложения",
    "price": 10000,
    "old": null,
    "stock": true,
    "desc": "Надёжная рука на каждый день: открыть банку, донести пакеты, пожать руку преподавателю после защиты. Для армрестлинга не предназначена — честно предупреждаем.",
    "specs": {
      "Сила хвата": "40 кг",
      "Вес": "3,9 кг",
      "Техника": "не предусмотрена",
      "Гарантия": "1 год бытовых задач"
    }
  },
  {
    "id": 6,
    "name": "Рука «Будни» — левая мужская",
    "img": "lev_ruka_kontur",
    "alt": "Контурный рисунок: опущенная вниз левая мужская рука обычного телосложения",
    "price": 10000,
    "old": null,
    "stock": false,
    "desc": "Левая рука для повседневных дел. Комплектуется с правой «Будни» для полного набора бытовых возможностей. Сейчас доступна под заказ.",
    "specs": {
      "Сила хвата": "38 кг",
      "Вес": "3,9 кг",
      "Техника": "не предусмотрена",
      "Гарантия": "1 год бытовых задач"
    }
  },
  {
    "id": 7,
    "name": "Рука «Грация» — правая женская",
    "img": "prav_tonkaya_zhenskaya_ruka",
    "alt": "Контурный рисунок: опущенная вниз тонкая правая женская рука",
    "price": 9000,
    "old": null,
    "stock": true,
    "desc": "Изящная рука на каждый день: печатать курсовую, держать кофе и листать конспекты. Для армрестлинга не предназначена.",
    "specs": {
      "Сила хвата": "25 кг",
      "Вес": "2,8 кг",
      "Техника": "не предусмотрена",
      "Гарантия": "1 год бытовых задач"
    }
  },
  {
    "id": 8,
    "name": "Рука «Грация» — левая женская",
    "img": "lev_tonkaya_zhenskaya_ruka",
    "alt": "Контурный рисунок: опущенная вниз тонкая левая женская рука",
    "price": 9000,
    "old": null,
    "stock": true,
    "desc": "Левая «Грация» в пару к правой: удобно держать телефон, пока правая пишет конспект. Для армрестлинга не предназначена.",
    "specs": {
      "Сила хвата": "24 кг",
      "Вес": "2,8 кг",
      "Техника": "не предусмотрена",
      "Гарантия": "1 год бытовых задач"
    }
  }
];

// Форматируем цену: 32000 → «32 000 ₽».
function formatPrice(value) {
  return value.toLocaleString('ru-RU') + ' ₽';
}

// Ищем товар по id из адресной строки, например product.html?id=3.
function getProductFromUrl(paramName) {
  const id = Number(new URLSearchParams(window.location.search).get(paramName));
  return PRODUCTS.find((product) => product.id === id);
}

/* ===============================
   2. Мобильное меню
   =============================== */

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  // Кнопка в разметке скрыта (hidden) — показываем её только при работающем JS.
  navToggle.hidden = false;

  const setNavOpen = (isOpen) => {
    siteNav.classList.toggle('site-nav--open', isOpen);
    // aria-expanded сообщает скринридеру, открыто меню или закрыто.
    navToggle.setAttribute('aria-expanded', String(isOpen));
  };

  navToggle.addEventListener('click', () => {
    setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  // Esc закрывает меню и возвращает фокус на кнопку.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      setNavOpen(false);
      navToggle.focus();
    }
  });

  // Щелчок вне шапки закрывает меню.
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.page-header')) {
      setNavOpen(false);
    }
  });

  // При переходе на широкий экран сбрасываем состояние меню.
  window.matchMedia('(min-width: 768px)').addEventListener('change', () => {
    setNavOpen(false);
  });
}

/* ===============================
   3. Модальное окно быстрой заявки
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
   4. Проверка форм
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

/* ===============================
   5. Фильтр каталога
   =============================== */

const filtersForm = document.getElementById('catalog-filters');

if (filtersForm) {
  const grid = document.getElementById('catalog-grid');
  const cards = Array.from(grid.querySelectorAll('.product-card'));
  const countElement = document.getElementById('catalog-count');
  const emptyElement = document.getElementById('catalog-empty');
  const sortSelect = document.getElementById('catalog-sort');
  const priceRange = document.getElementById('filter-price');
  const priceOutput = document.getElementById('filter-price-output');
  const filtersToggle = document.querySelector('.filters-toggle');

  // Склонение слова «товар»: 1 товар, 2 товара, 5 товаров.
  const pluralize = (count) => {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod10 === 1 && mod100 !== 11) {
      return 'товар';
    }

    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
      return 'товара';
    }

    return 'товаров';
  };

  const applyFilters = () => {
    const data = new FormData(filtersForm);
    const search = data.get('search').trim().toLowerCase();
    const category = data.get('category');
    const genders = data.getAll('gender');
    const sides = data.getAll('side');
    const maxPrice = Number(data.get('price'));
    const onlyInStock = data.has('stock');

    priceOutput.textContent = formatPrice(maxPrice);

    let visibleCount = 0;

    cards.forEach((card) => {
      const info = card.dataset;
      const isVisible =
        (!search || info.name.toLowerCase().includes(search)) &&
        (category === 'all' || info.category === category) &&
        (genders.length === 0 || genders.includes(info.gender)) &&
        (sides.length === 0 || sides.includes(info.side)) &&
        Number(info.price) <= maxPrice &&
        (!onlyInStock || info.stock === 'true');

      // Атрибут hidden убирает карточку и с экрана, и из дерева доступности.
      card.hidden = !isVisible;

      if (isVisible) {
        visibleCount += 1;
      }
    });

    // Область с role="status" озвучит новое количество.
    countElement.textContent = 'Найдено: ' + visibleCount + ' ' + pluralize(visibleCount);
    emptyElement.hidden = visibleCount > 0;
  };

  const applySort = () => {
    const sorted = cards.slice().sort((a, b) => {
      switch (sortSelect.value) {
        case 'price-asc':
          return Number(a.dataset.price) - Number(b.dataset.price);
        case 'price-desc':
          return Number(b.dataset.price) - Number(a.dataset.price);
        case 'name':
          return a.dataset.name.localeCompare(b.dataset.name, 'ru');
        default:
          return Number(a.dataset.id) - Number(b.dataset.id);
      }
    });

    // append переносит уже существующие карточки в новом порядке.
    sorted.forEach((card) => grid.append(card));
  };

  // Фильтр срабатывает сразу при изменении любого поля.
  filtersForm.addEventListener('input', applyFilters);

  filtersForm.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFilters();
  });

  // reset сначала возвращает значения полей, поэтому пересчёт — на следующем шаге.
  filtersForm.addEventListener('reset', () => {
    setTimeout(applyFilters, 0);
  });

  sortSelect.addEventListener('change', applySort);

  // Кнопка «Сбросить фильтры» в сообщении «ничего не найдено».
  emptyElement.querySelector('button').addEventListener('click', () => {
    filtersForm.reset();
  });

  // Сворачивание фильтра на телефоне и планшете.
  filtersToggle.hidden = false;
  filtersToggle.addEventListener('click', () => {
    const isOpen = filtersToggle.getAttribute('aria-expanded') !== 'true';

    filtersForm.classList.toggle('catalog-filters--open', isOpen);
    filtersToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Категорию можно передать в адресе: catalog.html?category=sport.
  const categoryFromUrl = new URLSearchParams(window.location.search).get('category');
  const categoryInput = filtersForm.querySelector(
    'input[name="category"][value="' + CSS.escape(categoryFromUrl || '') + '"]'
  );

  if (categoryInput) {
    categoryInput.checked = true;
  }

  applyFilters();
}

/* ===============================
   6. Страница товара
   =============================== */

const productSection = document.getElementById('product');

if (productSection) {
  // Без параметра id страница показывает товар, записанный в HTML.
  const product = getProductFromUrl('id');

  if (product) {
    const setText = (id, text) => {
      document.getElementById(id).textContent = text;
    };

    // Собираем srcset из трёх размеров одного изображения.
    const buildSrcset = (extension) =>
      [320, 480, 640]
        .map((width) => 'images/' + product.img + '-' + width + '.' + extension + ' ' + width + 'w')
        .join(', ');

    document.title = product.name + ' — Shop_ot_bob';
    setText('product-title', product.name);
    setText('product-crumb', product.name);
    setText('product-description', product.desc);

    const priceElement = document.getElementById('product-price');
    priceElement.textContent = formatPrice(product.price);

    if (product.old) {
      const oldPrice = document.createElement('del');
      oldPrice.textContent = formatPrice(product.old);
      priceElement.append(' ', oldPrice);
    }

    const stockElement = document.getElementById('product-stock');
    stockElement.textContent = product.stock ? 'В наличии' : 'Под заказ, 7–10 дней';
    stockElement.classList.toggle('product__stock--out', !product.stock);

    const image = document.getElementById('product-image');
    document.getElementById('product-image-webp').srcset = buildSrcset('webp');
    image.srcset = buildSrcset('jpg');
    image.src = 'images/' + product.img + '-640.jpg';
    image.alt = product.alt;

    // Строки таблицы характеристик.
    const specsBody = document.getElementById('product-specs');
    specsBody.textContent = '';

    Object.entries(product.specs).forEach(([name, value]) => {
      const row = specsBody.insertRow();
      const header = document.createElement('th');

      header.scope = 'row';
      header.textContent = name;
      row.append(header);
      row.insertCell().textContent = value;
    });

    document.getElementById('product-order-link').href = 'order.html?product=' + product.id;
    document.getElementById('product-quick-order').dataset.product = product.name;
  }
}

/* ===============================
   7. Сводка заказа на order.html
   =============================== */

const orderSummary = document.getElementById('order-summary');

if (orderSummary) {
  const productSelect = document.getElementById('order-product');
  const quantityInput = document.getElementById('order-quantity');
  const pageForm = productSelect.form;

  const DELIVERY_PRICE = 500;
  const FREE_DELIVERY_FROM = 30000;

  // Товар можно передать в адресе: order.html?product=3.
  const productFromUrl = getProductFromUrl('product');

  if (productFromUrl) {
    productSelect.value = String(productFromUrl.id);
  }

  const updateSummary = () => {
    const product = PRODUCTS.find((item) => item.id === Number(productSelect.value));
    const quantity = Math.min(Math.max(Number(quantityInput.value) || 1, 1), 10);
    const isCourier = pageForm.elements.delivery.value === 'courier';
    const goods = product ? product.price * quantity : 0;
    const delivery = isCourier && goods > 0 && goods < FREE_DELIVERY_FROM ? DELIVERY_PRICE : 0;

    const setText = (id, text) => {
      document.getElementById(id).textContent = text;
    };

    setText('summary-product', product ? product.name : 'не выбран');
    setText('summary-quantity', quantity + ' шт.');
    setText('summary-goods', formatPrice(goods));
    setText('summary-delivery', delivery ? formatPrice(delivery) : 'бесплатно');
    setText('summary-total', formatPrice(goods + delivery));
  };

  pageForm.addEventListener('input', updateSummary);
  pageForm.addEventListener('reset', () => {
    setTimeout(updateSummary, 0);
  });

  updateSummary();
}

/* ===============================
   8. Кнопка «Наверх»
   =============================== */

const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  // Кнопка появляется, когда страница прокручена больше чем на экран.
  const toggleBackToTop = () => {
    backToTop.hidden = window.scrollY < window.innerHeight;
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();
}
