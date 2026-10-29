// 구독 · 결제 화면: 항목 이름 · 섹션 제목 · 버튼 앞에 아이콘을 붙임 (문구는 바꾸지 않음)
(function () {
  var P = {
    plan: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
    status: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    money: '<circle cx="12" cy="12" r="9"/><path d="M8 8.5l2 7 2-5 2 5 2-7M7.5 12h9"/>',
    card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/>',
    site: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16M20 20v-4h-4"/>',
    archive: '<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10h14V9M10 13h4"/>',
    alert: '<path d="M12 3.5 2.5 20h19L12 3.5Z"/><path d="M12 10v4.5M12 17.5v.01"/>',
    plus: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    doc: '<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8L3 12Z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    box: '<circle cx="12" cy="12" r="9.5"/><path d="M12 11v6M12 7.5v.01"/>',
    edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
    x: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    msg: '<path d="M4 5h16v11H8l-4 4V5Z"/>',
    hash: '<path d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16"/>',
    truck: '<path d="M2 6h11v10H2zM13 10h4l4 4v2h-8"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'
  };
  // 순서가 중요: 앞에서 먼저 맞는 규칙을 씀
  var RULES = [
    [/거래번호|문서 번호/, 'hash', ''],
    [/실패|미납|사유|유예|만료/, 'alert', 'is-alert'],
    [/추가 트래픽|추가$|적용 후/, 'plus', ''],
    [/트래픽|사용량|제공량|용량|기본$/, 'chart', 'is-chart'],
    [/집계/, 'refresh', ''],
    [/메시지/, 'msg', ''],
    [/배송/, 'truck', ''],
    [/결제수단|카드/, 'card', ''],
    [/금액|요금|정상가|차액|부가세|청구 내용|청구 예정|청구 항목|결제$|다음 결제$/, 'money', 'is-money'],
    [/일$|일자|기간|회차|일수|예정$|전환/, 'cal', ''],
    [/플랜|버전/, 'plan', ''],
    [/상태/, 'status', ''],
    [/사이트/, 'site', ''],
    [/데이터 보관|보관/, 'archive', ''],
    [/문서|내역|청구/, 'doc', ''],
    [/이용 가능|종료/, 'clock', '']
  ];
  var BTN = [
    [/해지/, 'x'], [/취소/, 'undo'], [/변경/, 'edit'], [/구매|추가/, 'plus'],
    [/결제/, 'card'], [/내역|상세|보기|이용 내역/, 'doc'], [/이동|확인하기|으로$/, 'arrow']
  ];
  function make(name, cls) {
    var s = document.createElement('span');
    s.className = 'ux-ic' + (cls ? ' ' + cls : '');
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = '<svg viewBox="0 0 24 24">' + P[name] + '</svg>';
    return s;
  }
  function label(el) { return (el.textContent || '').replace(/\s+/g, ' ').replace(/\d+$/, '').trim(); }
  function pick(text, rules) {
    for (var i = 0; i < rules.length; i++) if (rules[i][0].test(text)) return rules[i];
    return null;
  }
  var root = document.querySelector('.main-center') || document;
  root.querySelectorAll('.kv-row > dt, .section-title').forEach(function (el) {
    if (el.querySelector('.ux-ic')) return;
    var r = pick(label(el), RULES);
    if (r) el.insertBefore(make(r[1], el.classList.contains('section-title') ? r[2] : ''), el.firstChild);
  });
  root.querySelectorAll('a.btn, button.btn').forEach(function (el) {
    if (el.querySelector('.ux-ic')) return;
    var r = pick(label(el), BTN);
    if (r) el.insertBefore(make(r[1]), el.firstChild);
  });
  root.querySelectorAll('.info-box, .info-box-danger').forEach(function (el) {
    if (el.querySelector(':scope > .ux-ic')) return;
    el.insertBefore(make(el.classList.contains('info-box-danger') ? 'alert' : 'box', 'is-box'), el.firstChild);
  });
})();
