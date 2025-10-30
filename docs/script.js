  
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


document.addEventListener('DOMContentLoaded', function() {
    const openButtons = document.querySelectorAll('.digging');
    const closeButtons = document.querySelectorAll('[data-close-modal]');
    const modals = document.querySelectorAll('.figma-modal-overlay');

    // 1. 버튼 클릭 시 해당 모달 열기
    openButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-modal-target');
            const targetModal = document.getElementById(targetId);
            
            if (targetModal) {
                targetModal.style.display = 'flex'; // 모달 표시
            }
        });
    });

    // 2. 닫기 버튼 클릭 시 모달 닫기
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 가장 가까운 부모 모달 컨테이너를 찾아서 숨김
            const modal = this.closest('.figma-modal-overlay');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // 3. 모달 외부 영역 클릭 시 모달 닫기
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            // 클릭된 요소가 모달 자체인 경우 (내부 콘텐츠가 아닌 배경을 클릭한 경우)
            if (event.target === this) {
                this.style.display = 'none';
            }
        });
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


/* 
const tl2 = gsap.timeline({ repeat: -1, yoyo: true });
tl.to(".circle_big:nth-child(1)", { boxShadow: "0 0 30px #b0c8ff", scale: 1.18, duration: 1 })
  .to(".circle_big:nth-child(2)", { boxShadow: "0 0 30px #ffddaa", scale: 1.11, duration: 1 }, "-=0.5" 
  ); */


  gsap.registerPlugin(ScrollTrigger);

// .circle_big 순차 강한 바운스
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".project01",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play pause resume reverse", // 진입 시 시작, 벗어나면 정지
  }
});

// 강한 바운스 느낌으로 순차 등장
tl.from(".big01, .big02", {
  scale: 0.2,               // 작게 시작
  opacity: 0,               // 투명 → 나타남
  ease: "bounce.out",       // 바운스 효과
  duration: 0.8,            // 한 개당 애니메이션 시간
  stagger: 0.25             // 순차 등장 (0.25초 간격)
});


gsap.registerPlugin(ScrollTrigger);

// .circle_big 순차 강한 바운스
const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".project03",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play pause resume reverse", // 진입 시 시작, 벗어나면 정지
  }
});

// 강한 바운스 느낌으로 순차 등장
tl2.from(".big03, .big04", {
  scale: 0.2,               // 작게 시작
  opacity: 0,               // 투명 → 나타남
  ease: "bounce.out",       // 바운스 효과
  duration: 0.8,            // 한 개당 애니메이션 시간
  stagger: 0.25             // 순차 등장 (0.25초 간격)
});


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




gsap.registerPlugin(ScrollTrigger);

// section_title 공통 애니메이션
gsap.utils.toArray(".section_title").forEach(title => {
  gsap.fromTo(
    title,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",   // 화면의 80% 위치에서 시작
        toggleActions: "play none none none",
      }
    }
  );
});



gsap.registerPlugin(ScrollTrigger);

// 반원 호 길이 계산(반지름 r=40 → 반원 길이 = πr ≈ 125.66)
const SEMI_LEN = Math.PI * 40; // 125.663706...

document.querySelectorAll(".fan").forEach((fan) => {
  const percent = parseFloat(fan.dataset.percent) || 0;
  const meter = fan.querySelector(".fan-meter");
  const numEl = fan.querySelector(".num");

  // 초기 dash 설정
  meter.style.strokeDasharray = SEMI_LEN;
  meter.style.strokeDashoffset = SEMI_LEN;

  // 목표 오프셋(퍼센트만큼 채우기)
  const targetOffset = SEMI_LEN * (1 - percent / 100);

  // 숫자 카운트용
  const counter = { val: 0 };

  gsap.timeline({
    scrollTrigger: {
      trigger: fan,
      start: "top 85%",
      toggleActions: "play none none none",
    }
  })
  .to(meter, {
    strokeDashoffset: targetOffset,
    duration: 1.2,
    ease: "power2.out"
  })
  .to(counter, {
    val: percent,
    duration: 1.0,
    ease: "power1.out",
    onUpdate: () => {
      numEl.textContent = `${Math.round(counter.val)}%`;
    }
  }, "<"); // 숫자와 게이지 동시 재생
});


gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".circle").forEach(circle => {
  const percent = parseFloat(circle.dataset.percent) || 0;
  const meter = circle.querySelector(".meter");
  const numEl = circle.querySelector(".num");
  const fullLen = 2 * Math.PI * 54; // 339.29
  const targetOffset = fullLen * (1 - percent / 100);
  const counter = { val: 0 };

  gsap.timeline({
    scrollTrigger: {
      trigger: circle,
      start: "top 85%",
      toggleActions: "play none none none",
    }
  })
  .to(meter, {
    strokeDashoffset: targetOffset,
    duration: 1.2,
    ease: "power2.out"
  })
  .to(counter, {
    val: percent,
    duration: 1.0,
    ease: "power1.out",
    onUpdate: () => {
      numEl.textContent = `${Math.round(counter.val)}%`;
    }
  }, "<");
});
