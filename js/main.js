'use strict';

const menu = document.querySelector('.menu');
const navOpen = document.querySelector('.hamburger');
const navClose = document.querySelector('.close');
const navBar = document.querySelector('.nav');

/**
 * Element.getBoundingClientRect()
 * 해당 element의 DOMRect를 return해줌.
 * DOMRect란, rectangle요소의 size, position에 대한 정보를 담고 있음.
 * 그래서 left(=== x),right,top(=== y),bottom,width,height등의 정보를 각각 return받을 수 있다.
 * MDN 참고.
 */
let navLeft = menu.getBoundingClientRect().left;

navOpen.addEventListener('click', () => {
  // navLeft < 0라는 것은, .menu의 x좌표가 마이너스 값이라는, 즉 모바일 사이즈에서 메뉴창이 화면밖으로 나가있는 상태를 의미함.
  if (navLeft < 0){
    menu.classList.add('show');
    document.body.classList.add('show');
    navBar.classList.add('show');
    // 그니까, hamburger아이콘을 클릭하면 .menu, body, .nav 에 각각 'show'라는 클래스명을 더해서 해당하는 selector의 css를 적용시키라는 거지!

  }
});

navClose.addEventListener('click', () => {
  // 여기 조건문이 'navLeft === 0' 인데도 if구문이 잘 실행되는 이유
  // navLeft는 const 즉, 상수로 선언을 했기 때문에 한 번 할당한 값을 바꾸지 않는다.
  // 그리고 애초에 css 문서로 .menu의 left값이 0이 되었다고 해서, js에서 그 값이 할당된 것은 아니기 때문에!! (이게 중요)
  // 그래서 const의 값은 맨 처음에 할당한 -100%값 그대로인 상태인 것이다. 변화가 전혀 없는 것이지.
  // navLeft = menu.getBoundingClientRect().left 사실 요거를 if문 앞에 써줘서 navLeft === 0 이렇게 하는게 코드가 좀 더 직관적으로 이해가 갈텐데...
  if (navLeft < 0){
    menu.classList.remove('show');
    document.body.classList.remove('show');
    navBar.classList.remove('show');
    // 반대로, X아이콘을 클릭하면 .menu, body, .nav 에 각각 'show'라는 클래스명을 제거라는 것.
  }
});


// Fix Nav
// 우선 .nav의 height값을 가져옴
const navHeight = navBar.getBoundingClientRect().height;

// Window 인터페이스는 DOM 문서를 담은 창을 나타냅니다. 
// document 속성이 창에 불러온 DOM 문서를 가리킵니다.
// window가 scroll이라는 이벤트를 받으면 해당 콜백함수를 수행하는 거지?
window.addEventListener('scroll', () => {
  /**
   * Window 인터페이스의 pageYOffset 읽기 전용 속성은 scrollY의 다른 이름으로, 
   * 문서가 수직으로 얼마나 스크롤됐는지 픽셀 단위로 반환합니다.
   * 수평 스크롤을 나타내는 pageXOffset 속성 역시 scrollX의 다른 이름입니다.
   */
  const scrollHeight = window.pageYOffset;
  //즉, .nav의 높이 길이만큼 수직 스크롤을 했다면 "fix-nav"라는 클래스를 붙여주고, 그 길이만큼 수직 스크롤이 안되어있다면 제거해라. 
  if(scrollHeight > navHeight){
    navBar.classList.add("fix-nav");
  } else {
    navBar.classList.remove("fix-nav");
  }
});

// Scroll To
// array copy 
// '...' 이거는 array에 들어있는 item 하나하나씩을 각각 낱개로 가져와서 복사해 온다는 것을 말함.
// console.log(document.querySelectorAll(".scroll-link")); 요거 한번 확인해볼 것. array 형태로 출력됨.
const links = [...document.querySelectorAll(".scroll-link")];

/**
 * map()은 
 * array element들이 지정한 function을 거쳐서 다시 새로운 값으로 변환하는 것을 말함.
 * 우리가 전달한 콜백함수가 어떤 일을 하느냐에 따라서 각각의 element가 다른값으로 
 * mapping되어서 새로운 array로 만들어진다는 것.
*/

// const result = 
links.map(link => {
  if(!link) return; 
  // 즉, link가 실제 links 배열에 있는 item이 아니라면, 그냥 함수실행을 끝냄.
  // return; 명령문에 도달하면 해당 시점에서 함수실행이 중단되고, 리턴값을 명시하지 않은 경우 undefined를 return하고 끝냄.
  link.addEventListener("click", (e) => {
    // preventDefault() 이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소합니다.
    e.preventDefault();

    /**
     * getAttribute() 은 
     * 해당 요소에 지정된 값을 반환 합니다. 
     * 만약 주어진 속성이 존재 하지 않는 다면, null 값이나 ""(빈문자열); 을 반환 할 것
     * 즉, 클릭을 받은 <a> 태그의 href(연결된 url 주소값이겠지?)이거를 가져와서 const id에 할당한다는 뜻.
     * 
     * array.slice(begin, end) 메서드는 
     * 어떤 배열의 begin부터 end까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환함.
     * slice(1)이라고 하면 index 1부터, 즉, 2번째 item부터 새로운 배열의 복사본을 만든다는 뜻.
     * 여기서 slice는 [#, h, o, m, e] 이런식으로 되어있는 href값을 하나의 array로 보고, 
     * 첫번째 index즉, # 다음 문자인 h부터 잘라서 새로운 array [h, o, m, e]를 만들어서 const id에 넣어준 것.
     */
    const id = e.target.getAttribute("href").slice(1);
    console.log(id); //요렇게 찍어보면 slice가 뭘 어떻게 해준 것인지 짐작 가능.
    
    // 이거는 해당 id값을 가진 요소를 const el에 할당하라는 뜻. 
    const el = document.getElementById(id);
    // offsetTop은 해당 요소가 부모노드에서 top방향으로 얼마나 떨어졌는지, 그 떨어진 거리(top + margin-top)를 return해줌
    /**
     * offsetAPI는 부모의 position이 relative인 경우 상대위치값을 retrun하는데, 부모가 relative가 아니면
     * 그 위에 부모요소들 중에서 relative인 부모요소를 찾아서 그 부모를 기준으로 상대위치값을 계산해 return해준다.
     * 근데 부모요소들 중에서 relative가 하나도 없다? 그럼 결국 절대위치값을 return해준다.
    */ 
    // 거기에 .nav의 높이를 뺀 값을 position에 할당한다는 것. 
    // 이 값은 결국 해당 id값을 가지고있는 태그 element와 .nav 사이에 떨어진 거리를 의미하겠쥬
    let position = el.offsetTop - navHeight;

    // window.scrollTo() 문서의 지정된 위치로 스크롤합니다.
    // 구문: window.scrollTo(x-좌표, y-좌표) 
    // x-좌표는 문서의 왼쪽상단부터 시작하는 픽셀단위의 가로축. y-좌표는 문서의 왼쪽상단부터 시작하는 픽셀단위의 세로축
    // 한마디로, 해당 id값의 태그 element와 .nav가 떨어진 거리만큼 스크롤을 이동해달라. 즉, 해당 id값의 element 태그로 이동해달라 이겁니다.
    // window.scrollTo(0, position); 이렇게 MDN에서 나온 구문처럼 써도 잘 된다잉.
    // 튜토리얼 1편에서는 이동하기를 원하는 곳에 id값을 지정하지 않은 상태라 아직 작동은 안됨.
    window.scrollTo(
      {
        top: position,
        left: 0,
      }
    );
    
    // 또 스크롤 이동과 동시에 햄버거 메뉴창도 닫아달라는 거죵.
    menu.classList.remove('show');
    document.body.classList.remove('show');
    navBar.classList.remove('show');
  }); // link가 실제 item이 맞다면 해당 link에 대해 'click' 이벤트를 parameter로 전달받아서 콜백함수를 실행할 것.
});
// console.log(result); 이런 경우, link.map(link => {})의 콜백함수는 어떤 값을 리턴해주는 함수가 아니라, 
// link.addEventListener("click",(e) => {}) 단지 이거를 실행하고나서 undefined를 return해버리는 함수다. return값을 따로 명시하지 않았으니까.
// 그러니까 links의 모든 link들에 대해 undefined가 return되기 때문에 콘솔창에는 [undefined, undefined, undefined, undefined,] 가 찍힘.

// 이거는 The GreenSock Animation Platform (줄여서 GSAP) 타임라인 기반 애니메이션 js 라이브러리를 사용해서 애니메이션 구현한 것.
/**
 * 프로그래밍에서 화면 좌표값은 화면 왼쪽 끝을 기준으로 (0,0) 
 * X값은 오른쪽 방향이 양의 값, 왼쪽 방향이 음의 값이며
 * Y값은 아래방향이 양의 값, 위 방향의 음의 값이다. 
 * 
 * 그니까 화면 밖으로 나갈수록 마이너스값이고, 화면 안으로 들어올수록 플러스 값인 거지.
 */
gsap.from(".logo", { opacity: 0, duration: 1, delay: 0.5, y: -10});
gsap.from(".hamburger", { opacity: 0, duration: 1, delay: 1, x: 20});
gsap.from(".hero-img", { opacity: 0, duration: 1, delay: 1.5, x: 200});
gsap.from(".hero-content h2", { opacity: 0, duration: 1, delay: 2, y: -50});
gsap.from(".hero-content h1", { opacity: 0, duration: 1, delay: 2.5, y: -45});
gsap.from(".hero-content a", { opacity: 0, duration: 1, delay: 3.5, y: 50});

