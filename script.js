// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 技能条动画效果
    animateSkillBars();
    
    // 添加滚动动画
    addScrollAnimation();
    
    // 打印按钮功能
    addPrintButton();
});

// 技能条动画
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // 初始设置为0
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        // 延迟动画
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// 滚动动画
function addScrollAnimation() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// 打印功能
function addPrintButton() {
    // 创建打印按钮
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '🖨️ 打印简历';
    printBtn.className = 'print-btn';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 12px 24px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        z-index: 1000;
    `;
    
    printBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
    });
    
    printBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    });
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printBtn);
    
    // 打印时隐藏按钮
    window.addEventListener('beforeprint', function() {
        printBtn.style.display = 'none';
    });
    
    window.addEventListener('afterprint', function() {
        printBtn.style.display = 'block';
    });
}
