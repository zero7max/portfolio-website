/* ============================================
   Gallery Data — 替换为自己的作品图片
   ============================================ */
const galleryData = [
    {
        id: 1,
        src: 'https://picsum.photos/id/1/800/600',
        title: '品牌视觉识别系统',
        category: 'brand',
        ratio: 'normal'
    },
    {
        id: 2,
        src: 'https://picsum.photos/id/26/600/800',
        title: '移动端UI设计',
        category: 'ui',
        ratio: 'tall'
    },
    {
        id: 3,
        src: 'https://picsum.photos/id/28/800/600',
        title: '夏日系列插画',
        category: 'illustration',
        ratio: 'normal'
    },
    {
        id: 4,
        src: 'https://picsum.photos/id/36/800/450',
        title: '音乐节海报设计',
        category: 'poster',
        ratio: 'wide'
    },
    {
        id: 5,
        src: 'https://picsum.photos/id/48/800/600',
        title: '咖啡品牌包装',
        category: 'brand',
        ratio: 'normal'
    },
    {
        id: 6,
        src: 'https://picsum.photos/id/55/600/800',
        title: 'App 界面设计',
        category: 'ui',
        ratio: 'tall'
    },
    {
        id: 7,
        src: 'https://picsum.photos/id/60/800/600',
        title: '概念插画 — 未来城市',
        category: 'illustration',
        ratio: 'normal'
    },
    {
        id: 8,
        src: 'https://picsum.photos/id/65/800/450',
        title: '电影节海报',
        category: 'poster',
        ratio: 'wide'
    },
    {
        id: 9,
        src: 'https://picsum.photos/id/69/800/600',
        title: '科技品牌手册',
        category: 'brand',
        ratio: 'normal'
    },
    {
        id: 10,
        src: 'https://picsum.photos/id/80/600/800',
        title: '电商App Redesign',
        category: 'ui',
        ratio: 'tall'
    },
    {
        id: 11,
        src: 'https://picsum.photos/id/86/800/600',
        title: '水墨风格插画',
        category: 'illustration',
        ratio: 'normal'
    },
    {
        id: 12,
        src: 'https://picsum.photos/id/91/800/450',
        title: '展览宣传海报',
        category: 'poster',
        ratio: 'wide'
    },
    {
        id: 13,
        src: 'https://picsum.photos/id/96/800/600',
        title: '餐饮品牌设计',
        category: 'brand',
        ratio: 'normal'
    },
    {
        id: 14,
        src: 'https://picsum.photos/id/101/600/800',
        title: '仪表盘UI设计',
        category: 'ui',
        ratio: 'tall'
    },
    {
        id: 15,
        src: 'https://picsum.photos/id/104/800/600',
        title: '自然系列插画',
        category: 'illustration',
        ratio: 'normal'
    }
];

const PAGE_SIZE = 6;
let currentPage = 1;
let currentFilter = 'all';
let filteredData = [...galleryData];

/* ============================================
   Video Data — 替换为自己的B站视频BVID
   ============================================ */
const videoData = [
    {
        bvid: 'BV1n1o1BBE13',   // ← 替换为你的B站视频ID
        title: '设计过程全记录 — 品牌视觉系统从0到1',
        desc: '记录了一个完整品牌项目的设计思考与执行过程'
    },
    {
        bvid: 'BV1GJ411x7',
        title: 'UI设计教程：如何打造高质感界面',
        desc: '分享界面设计中的细节处理与设计规范'
    },
    {
        bvid: 'BV1GJ411x7',
        title: '插画创作流程 — 从草图到成稿',
        desc: '展示数字插画的完整绘制流程和技巧'
    },
    {
        bvid: 'BV1GJ411x7',
        title: '设计工具分享：我的工作流',
        desc: '分享日常设计工作中使用的工具与效率技巧'
    }
];

/* ============================================
   DOM References
   ============================================ */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const galleryGrid = document.getElementById('galleryGrid');
const filterBar = document.getElementById('filterBar');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const videoGrid = document.getElementById('videoGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxCounter = document.querySelector('.lightbox-counter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxInfo = document.getElementById('lightboxInfo');

let currentLightboxIndex = -1;
let lightboxItems = [];

/* ============================================
   Navigation
   ============================================ */
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
});

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

/* ============================================
   Gallery — Render & Filter
   ============================================ */
function getVisibleItems() {
    if (currentFilter === 'all') return galleryData;
    return galleryData.filter(item => item.category === currentFilter);
}

function renderGallery(page = 1, append = false) {
    filteredData = getVisibleItems();
    const end = page * PAGE_SIZE;
    const items = filteredData.slice(0, end);

    if (!append) galleryGrid.innerHTML = '';

    items.forEach((item, idx) => {
        const globalIdx = galleryData.findIndex(d => d.id === item.id);
        const extraClass = item.ratio === 'tall' ? ' tall' : item.ratio === 'wide' ? ' wide' : '';
        const div = document.createElement('div');
        div.className = `gallery-item${extraClass}`;
        div.innerHTML = `
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="gallery-item-overlay">
                <h4>${item.title}</h4>
                <span>${getCategoryLabel(item.category)}</span>
            </div>
        `;
        div.addEventListener('click', () => openLightbox(globalIdx));
        galleryGrid.appendChild(div);

        // trigger scroll animation after layout
        requestAnimationFrame(() => {
            requestAnimationFrame(() => div.classList.add('visible'));
        });
    });

    // Show/hide load more
    loadMoreBtn.style.display = end >= filteredData.length ? 'none' : 'inline-flex';
}

function getCategoryLabel(cat) {
    const map = { brand: '品牌设计', ui: 'UI/UX', illustration: '插画', poster: '海报' };
    return map[cat] || cat;
}

// Filter
filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentFilter = btn.dataset.filter;
    currentPage = 1;
    renderGallery(1);
});

// Load more
loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    renderGallery(currentPage, true);
});

/* ============================================
   Lightbox
   ============================================ */
function openLightbox(index) {
    currentLightboxIndex = index;
    lightboxItems = [...galleryData];
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function updateLightbox() {
    const item = lightboxItems[currentLightboxIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${lightboxItems.length}`;
    lightboxInfo.style.display = 'flex';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    updateLightbox();
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxItems.length;
    updateLightbox();
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);

lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
});

/* ============================================
   Video — Render Bilibili Embeds
   ============================================ */
function renderVideos() {
    videoData.forEach(video => {
        const div = document.createElement('div');
        div.className = 'video-item';
        div.innerHTML = `
            <div class="video-wrapper">
                <iframe
                    src="https://player.bilibili.com/player.html?bvid=${video.bvid}&autoplay=0"
                    allowfullscreen
                    loading="lazy"
                ></iframe>
            </div>
            <div class="video-info">
                <h4>${video.title}</h4>
                <p>${video.desc}</p>
            </div>
        `;
        videoGrid.appendChild(div);
    });
}

/* ============================================
   Scroll Animations — IntersectionObserver
   ============================================ */
function initScrollReveal() {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe video items
    document.querySelectorAll('.video-item').forEach(el => observer.observe(el));
}

/* ============================================
   Init
   ============================================ */
renderGallery(1);
renderVideos();
initScrollReveal();
