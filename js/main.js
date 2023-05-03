import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js';


/* HEADER / BASKET */
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation(); // stopPropagation() : 이벤트 버블링 방지

  if (basketEl.classList.contains('show')) { // contains() : 해당하는 요소에 특정한 클래스 존재 여부 확인
    // 숨기기
    // basketEl.classList.remove('show');
    hideBasket();
  } else {
    // 보이기
    // basketEl.classList.add('show');
    showBasket();
  }
});

basketEl.addEventListener('click', function (event) {
  event.stopPropagation();
});

window.addEventListener('click', function () {
  // basketEl.classList.remove('show');
  hideBasket();
});

function showBasket() {
  basketEl.classList.add('show');
}

function hideBasket() {
  basketEl.classList.remove('show');
}

/*
  이벤트 버블링
  내가 선택한 특정한 요소가 있고 그 요소를 감싸고 있는 부모요소, 또 그 부모요소로 이벤트가 전파되는 것
*/


/* HEADER / SEARCH */
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]; // [] : 배열 데이터, ... : 전개 연산자, 얕은 복사
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

/*
searchStarterEl.addEventListener('click', function () {
  showSearch();
});

searchCloserEl.addEventListener('click', function () {
  hideSearch();
});

searchShadowEl.addEventListener('click', function () {
  hideSearch();
});

익명 함수로 실행하던 것을 아래와 같이 기명 함수로 실행 가능
*/
searchStarterEl.addEventListener('click', showSearch);

/*
searchCloserEl.addEventListener('click', hideSearch);

모바일 모드 검색 기능과의 충돌을 막기 위한 이벤트 버블링 방지
*/
searchCloserEl.addEventListener('click', function (event) {
  event.stopPropagation();
  hideSearch();
});

searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching');

  // document.documentElement.classList.add('fixed'); documentElement : document의 최상위 요소인 HTML
  stopScroll();

  headerMenuEls.reverse().forEach(function (el, index) { // reverse() : 배열의 순서 뒤집기
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's' // length : 배열의 개수
  });

  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  });

  setTimeout(function () { // setTimeout() : 몇 초 뒤에 실행할 것인지 지정
    searchInputEl.focus();
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove('searching');

  // document.documentElement.classList.remove('fixed');
  playScroll();
  
  headerMenuEls.reverse().forEach(function (el, index) { 
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  });

  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  });
  searchDelayEls.reverse();

  searchInputEl.value = ''; // input에 입력된 값 초기화
}

function playScroll() {
  document.documentElement.classList.remove('fixed');
}

function stopScroll() {
  document.documentElement.classList.add('fixed');
}


/* HEADER / MENU - 모바일 */
const menuStarterEl = document.querySelector('header .menu-starter');

menuStarterEl.addEventListener('click', function () {
  if (headerEl.classList.contains('menuing')) {
    headerEl.classList.remove('menuing');
    searchInputEl.value = '';
    playScroll();
  } else {
    headerEl.classList.add('menuing');
    stopScroll();
  }
});


/* HEADER / SEARCH - 모바일 */
const searchTextFieldEl = document.querySelector('header .textfield');
const searchCancelEl = document.querySelector('header .search-canceler');

searchTextFieldEl.addEventListener('click', function () {
  headerEl.classList.add('searching--mobile');
  searchInputEl.focus();
});

searchCancelEl.addEventListener('click', function () {
  headerEl.classList.remove('searching--mobile');
});


/* 화면 크기 변동에 따른 기능 충돌을 막기 위한 최적화 */
window.addEventListener('resize', function () { // resize : 화면 크기 변동
  if (window.innerWidth <= 740) { // innerWidth : 화면의 가로 너비 정보
    headerEl.classList.remove('searching');
  } else {
    headerEl.classList.remove('searching--mobile');
  }
});


/* NAVIGATION - 모바일 */
const navEl = document.querySelector('nav');
const navMenuToggleEl = navEl.querySelector('.menu-toggler');
const navMenuShadowEl = navEl.querySelector('.shadow');

navMenuToggleEl.addEventListener('click', function () {
  if (navEl.classList.contains('menuing')) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});

navEl.addEventListener('click', function (event) {
  event.stopPropagation();
});

navMenuShadowEl.addEventListener('click', hideNavMenu);

window.addEventListener('click', hideNavMenu);

function showNavMenu() {
  navEl.classList.add('menuing');
}

function hideNavMenu() {
  navEl.classList.remove('menuing');
}


/* 요소의 가시성 관찰 - 아래에서 위로 나타나는 효과 */
const io = new IntersectionObserver(function (entries) { 
  // IntersectionObserver() : 어떤 요소가 화면의 영역과 교차하는지 관찰하는 기능, 생성자 함수 
  // entries : 화면과의 교차를 관찰하는(io.observe(el)로 등록된) 모든 대상 요소, 배열 데이터
  entries.forEach(function (entry) { 
    // forEach() : 배열 데이터를 순차적으로 반복 처리
    // entry : 관찰하는 요소의 정보
    if (!entry.isIntersecting) {
      // ! :  부정 연산자
      // isIntersecting : 해당 요소가 화면 안으로 들어온 상태 여부, boolean 데이터
      return; // 함수 종료
    }
    entry.target.classList.add('show') // target : 관찰 중인 해당 요소
  });
});
const infoEls = document.querySelectorAll('.info');

infoEls.forEach(function (el) {
  io.observe(el); // observe() : 어떤 요소를 관찰할 것인지 지정
});


/* CAMERA - VIDEO 재생 */
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', function () {
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});

pauseBtn.addEventListener('click', function () {
  video.pause();
  playBtn.classList.remove('hide');
  pauseBtn.classList.add('hide');
});


/* COMPARE - 제품 랜더링 */
const itemsEl = document.querySelector('section.compare .items');

ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div'); // createElement() : 요소를 자바스크립트를 통해서 생성

  itemEl.classList.add('item');

  let colorList = '';

  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`;
  });

  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <p class="new">${ipad.new}</p>
    <h3 class="name">${ipad.name}</h3>
    <h4 class="version">${ipad.version}</h4>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p> <!-- toLocaleString('en-US') : 미국에서 숫자를 표현하는 방식으로 출력 -->
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `; 
  // innerHTML : 삽입하는 문자를 그래도 출력하는 textContent와 다르게 HTML 구조로 출력

  itemsEl.append(itemEl); // append() : 요소 삽입
});


/* FOOTER / NAVIGATIONS */
const navigationsEl = document.querySelector('footer .navigations');

navigations.forEach(function (nav) {
  const mapEl = document.createElement('div');

  mapEl.classList.add('map');

  let mapList = '';

  nav.maps.forEach(function (map) {
    mapList += /* html */`<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;

  navigationsEl.append(mapEl);
});


/* FOOTER / NAVIGATIONS - 모바일 */
const mapEls = document.querySelectorAll('footer .navigations .map');

mapEls.forEach(function (el) {
  const h3El = el.querySelector('h3');

  h3El.addEventListener('click', function () {
    el.classList.toggle('active'); // toggle() : 해당 클래스를 가지고 있으면 제거하고 가지고 있지 않으면 추가, add와 remove 메소드의 기능을 동시에 수행
  });
});


/* FOOTER / LEGAL */
const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContent = new Date().getFullYear();