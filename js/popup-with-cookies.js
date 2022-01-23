function getRedirect() {
  const url = getCookiePopupWithCookies('redirect');
  window.location.href = url;
}


function redirectLinkEnabled(e) {
  e.preventDefault();
  
  const href = this.href
  
  setCookiePopupWithCookies('browserLanguage', 'userLang');
  setCookiePopupWithCookies('redirect', href);

  document.location.href = href;
}

function closePopupWithCookies(e) {
  popup = e.currentTarget.closest('.popup-with-cookies__active');  
  popup.classList.remove('popup-with-cookies__active');
  document.body.classList.remove('has-popup-with-cookies-active');
  setCookiePopupWithCookies('browserLanguage', 'ownerLang');
}

function initPopupWithCookies() {
  const popup = [...document.querySelectorAll('.popup-with-cookies')];

  if (!popup.length) {
    return;
  }

  popup.forEach((popup) => {
    const buttonDefaultLang = popup.querySelector('.popup-with-cookies__button');
    const redirectLinks = [...popup.querySelectorAll('.popup-with-cookies__link')];

    redirectLinks.forEach(link => {
      link.addEventListener('click', redirectLinkEnabled);
    });

    buttonDefaultLang.addEventListener('click', closePopupWithCookies);

    popup.classList.add('popup-with-cookies__active');
  });
  document.body.classList.add('has-popup-with-cookies-active');
}

function setCookiePopupWithCookies(name, val) {
  document.cookie = name+'='+val;
}

function getCookiePopupWithCookies(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function compareLanguage() {
  const browserLang = window.navigator.language.slice(0, 2);
  const webLang = document.documentElement.lang;

  if (browserLang === webLang) {
    return true;
  }
  else {
    return false;
  }
}

function showPopupWithCookies() {
  const lang = compareLanguage();
  const cookie = getCookiePopupWithCookies('browserLanguage');
  
  if (!lang && cookie !== 'ownerLang') {
    if (cookie !== 'userLang') {
      initPopupWithCookies();
    }
    else {
      getRedirect();
    }
  } 
  else if (lang || cookie === 'ownerLang') {
    return;
  }
}

showPopupWithCookies();