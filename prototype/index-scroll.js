// 좌측 인덱스 스크롤 위치를 화면 이동 사이에 유지하고, 현재 화면 항목이 보이도록 맞춤
(function () {
  var nav = document.querySelector('.sidebar-left');
  if (!nav) return;
  var KEY = 'proto-index-scroll';

  try {
    var saved = sessionStorage.getItem(KEY);
    if (saved !== null) nav.scrollTop = Number(saved);
  } catch (e) {}

  var cur = nav.querySelector('.is-current');
  if (cur) {
    var r = cur.getBoundingClientRect();
    var n = nav.getBoundingClientRect();
    if (r.top < n.top || r.bottom > n.bottom) cur.scrollIntoView({ block: 'center' });
  }

  window.addEventListener('pagehide', function () {
    try { sessionStorage.setItem(KEY, String(nav.scrollTop)); } catch (e) {}
  });
})();
