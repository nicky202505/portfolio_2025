  
  /* 모달 열림 */
  document.querySelectorAll('.digging').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modal;
      document.getElementById(`modal${modalId}`).style.display = 'flex';
    });
  });   

    document.querySelectorAll('.close_btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.target.closest('.modal_wrap').style.display = 'none';
  });
}); 


function openModalById(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  // 1) 배경 스크롤 잠금 (선택)
  document.body.classList.add('modal-open');

  // 2) 모달 표시 (이전에 flex로 열었으므로 통일)
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');

  // 3) 다른 모달의 비디오 중지 (선택: 안전)
  document.querySelectorAll('.modal_wrap video').forEach(v => {
    if (!modal.contains(v)) { try { v.pause(); } catch(_){} }
  });

  // 4) 비디오 재생: 표시가 반영된 다음 프레임에 실행
  const vid = modal.querySelector('video');
  if (!vid) return;

  // 자동재생 정책 대비
  vid.muted = true;                 // 거의 필수
  vid.playsInline = true;           // iOS 사파리
  vid.currentTime = 0;

  // 레이아웃 반영 후 재생 시도
  requestAnimationFrame(() => {
    const p = vid.play();
    if (p && typeof p.catch === 'function') {
      p.catch(err => {
        console.warn('video play() failed:', err);
        // 사용자 조작 유도
        vid.controls = true;
      });
    }
  });
} 

function closeModalById(modalId) {
  const modal = document.getElzzzzzzzzementById(modalId);
  if (!modal) return;

  // 비디오 정지
  const vid = modal.querySelector('video');
  if (vid) { try { vid.pause(); } catch(_){} }

  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');

  // 열려 있는 모달이 더 없다면 스크롤 잠금 해제
  const anyOpen = [...document.querySelectorAll('.modal_wrap')]
    .some(m => getComputedStyle(m).display !== 'none');
  if (!anyOpen) document.body.classList.remove('modal-open');
}


// 메인 메뉴 반전 효과 
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header-wrap');
  const headerH = header ? header.offsetHeight : 0;
  document.documentElement.style.setProperty('--header-h', headerH + 'px');

  const links = Array.from(document.querySelectorAll('.menu a[href^="#"]'));
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  // 스크롤 시 섹션에 진입하면 해당 링크 활성화
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.menu li a[href="#${id}"]`);
      if (entry.isIntersecting && link) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, {
    // 헤더 높이만큼 위쪽 여백 보정 + 화면의 위 30% 지점을 기준으로 하이라이트
    rootMargin: `-${headerH + 10}px 0px -70% 0px`,
    threshold: 0  
  });

  sections.forEach(s => io.observe(s));

  // 클릭 시 스무스 스크롤 + 즉시 하이라이트
  links.forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - (headerH + 10),
        behavior: 'smooth'
      });
      links.forEach(l => l.classList.remove('active'));
      a.classList.add('active');
    });
  });
});

const tl = gsap.timeline({ repeat: -1, yoyo: true });
 tl.to(".circle:nth-child(1)", { boxShadow: "0 0 30px #b0c8ff", scale: 1.12, duration: 1 })
   .to(".circle:nth-child(2)", { boxShadow: "0 0 30px #ffddaa", scale: 1.12, duration: 1 }, "-=0.5"); 

const tl2 = gsap.timeline({ repeat: -1, yoyo: true });
tl.to(".circle_big:nth-child(1)", { boxShadow: "0 0 30px #b0c8ff", scale: 1.11, duration: 1 })
  .to(".circle_big:nth-child(2)", { boxShadow: "0 0 30px #ffddaa", scale: 1.11, duration: 1 }, "-=0.5" 
  );




gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.singles .fill').forEach(bar => {
  const targetWidth = bar.style.width;
  bar.style.width = "0%";

  gsap.to(bar, {
    width: targetWidth,
    duration: 1.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: bar,
      start: "top 90%",
      toggleActions: "play none none reverse"
    }
  });
});  






