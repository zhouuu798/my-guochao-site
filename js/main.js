// ==================== 1. 全局通用：吸顶导航栏特效 ====================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// 页面加载完成后自动分配运行各页面特效
document.addEventListener("DOMContentLoaded", function() {
    // 触发首页特有逻辑
    if (document.querySelector('.slider')) {
        initSlider();
        initFadeIn();
    }
    // 触发关于我们特有逻辑
    if (document.getElementById('typewriter')) {
        initTypewriter();
    }
});

// ==================== 2. 首页：自动/手动轮播图特效 ====================
function initSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showSlide(index) {
        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
    }

    nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    setInterval(() => showSlide(currentIndex + 1), 4000); // 每4秒自动切图
}

// ==================== 3. 首页：滚动内容淡入特效 ====================
function initFadeIn() {
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));
}

// ==================== 4. 详情页：Tab选项卡切换 ====================
function switchTab(category) {
    // 切换按钮高亮样式
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // 筛选卡片内容
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==================== 5. 详情页：动态详情弹窗特效 ====================
function openModal(title, desc) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    document.getElementById('productModal').style.display = 'flex';
}
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

// ==================== 6. 关于我们：动态打字机特效 ====================
function initTypewriter() {
    const text = "潮起东方，承载千年华夏审美。我们用现代视角重塑传统符号，将非遗手作与现代生活无缝衔接。每一件作品，都是一份跨越时空的文化情书。";
    let index = 0;
    const speed = 100; // 字幕吐出速度（毫秒）
    function type() {
        if (index < text.length) {
            document.getElementById('typewriter').innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ==================== 7. 关于我们：智能表单验证 ====================
function validateForm(event) {
    event.preventDefault(); // 阻止默认的刷新页面提交行为
    const name = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 邮箱格式验证正则表达式

    if (name === "" || email === "" || message === "") {
        alert("⚠️ 提示：所有项均为必填项，请填写完整！");
        return false;
    }
    if (!emailReg.test(email)) {
        alert("⚠️ 提示：请输入合法的电子邮箱地址！");
        return false;
    }
    
    alert(`🎉 提交成功！\n感谢您，${name}！您的留言已成功保存至本地模拟器。`);
    document.getElementById('commentForm').reset(); // 清空表单
    return true;
}