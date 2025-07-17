// 存储用户设置的键名
const THEME_KEY = 'startpage_theme';
const LINKS_KEY = 'startpage_links';
const BG_IMAGE_KEY = 'startpage_bg_image';
const BG_BLUR_KEY = 'startpage_bg_blur';

// 名言警句库
const quotes = [
    {
        text: "生活不是等待风暴过去，而是学会在雨中跳舞。",
        author: "维维安·格林"
    },
    {
        text: "成功不是终点，失败也并非末日，重要的是继续前进的勇气。",
        author: "温斯顿·丘吉尔"
    },
    {
        text: "你生命中最美好的日子是你决定自己生活方向的日子。",
        author: "丹·米尔曼"
    },
    {
        text: "不要为昨天叹息，不要为明天忧虑，活在当下。",
        author: "达赖喇嘛"
    },
    {
        text: "生活中有两个目标：首先获得你想要的，然后享受它。只有最明智的人才能做到第二点。",
        author: "洛根·皮尔索尔·史密斯"
    },
    {
        text: "唯一限制你实现明天的，是你今天的怀疑。",
        author: "富兰克林·罗斯福"
    }
];

// 更新时间日期
function updateDateTime() {
    const now = new Date();
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    
    // 格式化时间
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // 格式化日期
    const date = `${now.getFullYear()}年 ${months[now.getMonth()]}${now.getDate()}日`;
    const day = days[now.getDay()];
    
    // 更新DOM元素
    document.getElementById('current-time').textContent = timeString;
    document.getElementById('current-date').textContent = `${date} ${day}`;
    
    // 更新问候语
    const hour = now.getHours();
    let greeting = '';
    
    if (hour < 5) {
        greeting = '夜深了，请注意休息';
    } else if (hour < 9) {
        greeting = '早上好，开启美好的一天！';
    } else if (hour < 12) {
        greeting = '上午好，工作顺利吗？';
    } else if (hour < 14) {
        greeting = '中午好，记得享用午餐';
    } else if (hour < 18) {
        greeting = '下午好，保持高效工作';
    } else if (hour < 22) {
        greeting = '晚上好，放松一下吧';
    } else {
        greeting = '夜深了，该休息了';
    }
    
    document.getElementById('greeting-text').textContent = greeting;
}

// 设置搜索引擎
function setupSearchEngine() {
    const engineBtns = document.querySelectorAll('.engine-btn');
    
    engineBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有active类
            engineBtns.forEach(b => b.classList.remove('active'));
            // 为当前按钮添加active类
            this.classList.add('active');
        });
    });
    
    // 处理搜索
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const query = document.querySelector('.search-input').value.trim();
    if (!query) return;
    
    const activeEngine = document.querySelector('.engine-btn.active').textContent;
    let searchUrl = '';
    
    switch(activeEngine) {
        case 'Google':
            searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            break;
        case 'Bing':
            searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
            break;
        case '百度':
            searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`;
            break;
        case 'DuckDuckGo':
            searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
            break;
        default:
            searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
    
    window.open(searchUrl, '_blank');
    document.querySelector('.search-input').value = '';
}

// 设置面板功能
function setupSettingsPanel() {
    const settingsBtn = document.getElementById('settingsBtn');
    const closeBtn = document.getElementById('closeSettings');
    const settingsPanel = document.getElementById('settingsPanel');
    
    settingsBtn.addEventListener('click', () => {
        settingsPanel.classList.add('active');
    });
    
    closeBtn.addEventListener('click', () => {
        settingsPanel.classList.remove('active');
    });
}

// 背景图片设置
function setupBackground() {
    const bgOptions = document.querySelectorAll('.bg-option');
    const bgUpload = document.getElementById('bgUpload');
    const bgBlur = document.getElementById('bgBlur');
    const blurValue = document.getElementById('blurValue');
    
    // 加载保存的背景图片
    const savedBgImage = localStorage.getItem(BG_IMAGE_KEY);
    const savedBgBlur = localStorage.getItem(BG_BLUR_KEY) || '5px';
    
    if (savedBgImage) {
        document.documentElement.style.setProperty('--bg-image', `url(${savedBgImage})`);
    }
    
    // 设置模糊值
    document.documentElement.style.setProperty('--bg-blur', savedBgBlur);
    bgBlur.value = parseInt(savedBgBlur);
    blurValue.textContent = savedBgBlur;
    
    // 背景模糊滑块事件
    bgBlur.addEventListener('input', function() {
        const blur = `${this.value}px`;
        document.documentElement.style.setProperty('--bg-blur', blur);
        blurValue.textContent = blur;
        localStorage.setItem(BG_BLUR_KEY, blur);
    });
    
    // 预设背景点击事件
    bgOptions.forEach(option => {
        option.addEventListener('click', () => {
            // 移除所有active类
            bgOptions.forEach(opt => opt.classList.remove('active'));
            // 设置当前选项为active
            option.classList.add('active');
            
            const bgType = option.dataset.type;
            const bgValue = option.dataset.bg;
            
            if (bgType === 'preset') {
                if (bgValue === 'gradient') {
                    document.documentElement.style.removeProperty('--bg-image');
                    localStorage.removeItem(BG_IMAGE_KEY);
                } else {
                    const bgImage = option.style.backgroundImage;
                    document.documentElement.style.setProperty('--bg-image', bgImage);
                    localStorage.setItem(BG_IMAGE_KEY, bgImage.split('"')[1]);
                }
            }
        });
    });
    
    // 自定义背景上传
    bgUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.size > 2 * 1024 * 1024) {
            alert('图片大小不能超过2MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            document.documentElement.style.setProperty('--bg-image', `url(${imageUrl})`);
            localStorage.setItem(BG_IMAGE_KEY, imageUrl);
            
            // 激活自定义选项
            bgOptions.forEach(opt => opt.classList.remove('active'));
            document.getElementById('customBgOption').classList.add('active');
        };
        reader.readAsDataURL(file);
    });
}

// 名言警句
function setupQuotes() {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    // 随机选择一条名言
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = `"${randomQuote.text}"`;
    quoteAuthor.textContent = `- ${randomQuote.author}`;
}

// 快捷链接管理
function setupQuickLinks() {
    const linkForm = document.getElementById('linkForm');
    const quickLinksContainer = document.getElementById('quickLinks');
    const addLinkBtn = document.getElementById('addLinkBtn');
    
    // 加载保存的链接
    let savedLinks = JSON.parse(localStorage.getItem(LINKS_KEY)) || [];
    
    // 初始链接（如果没有保存的链接）
    if (savedLinks.length === 0) {
        savedLinks = [
            { name: "GitHub", url: "https://github.com", icon: "fab fa-github" },
            { name: "YouTube", url: "https://youtube.com", icon: "fab fa-youtube" },
            { name: "Twitter", url: "https://twitter.com", icon: "fab fa-twitter" },
            { name: "Reddit", url: "https://reddit.com", icon: "fab fa-reddit" },
            { name: "Spotify", url: "https://open.spotify.com", icon: "fab fa-spotify" },
            { name: "Gmail", url: "https://mail.google.com", icon: "fas fa-envelope" },
            { name: "Discord", url: "https://discord.com", icon: "fab fa-discord" },
            { name: "Trello", url: "https://trello.com", icon: "fab fa-trello" }
        ];
    }
    
    // 渲染链接
    function renderLinks() {
        // 清空除添加按钮外的所有链接
        quickLinksContainer.innerHTML = '';
        
        savedLinks.forEach((link, index) => {
            const linkElement = document.createElement('a');
            linkElement.className = 'link-item';
            linkElement.href = link.url;
            linkElement.target = '_blank';
            
            linkElement.innerHTML = `
                <button class="edit-link" data-index="${index}">
                    <i class="fas fa-edit"></i>
                </button>
                <i class="${link.icon} link-icon"></i>
                <span class="link-name">${link.name}</span>
            `;
            
            quickLinksContainer.appendChild(linkElement);
            
            // 添加编辑事件
            const editBtn = linkElement.querySelector('.edit-link');
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                editLink(index);
            });
        });
        
        // 重新添加添加按钮
        quickLinksContainer.appendChild(addLinkBtn);
        
        // 保存到本地存储
        localStorage.setItem(LINKS_KEY, JSON.stringify(savedLinks));
    }
    
    // 添加新链接
    function addLink(name, url, icon) {
        savedLinks.push({
            name: name,
            url: url,
            icon: icon || "fas fa-globe"
        });
        renderLinks();
    }
    
    // 编辑链接
    function editLink(index) {
        const link = savedLinks[index];
        document.getElementById('linkName').value = link.name;
        document.getElementById('linkUrl').value = link.url;
        document.getElementById('linkIcon').value = link.icon;
        
        // 显示设置面板
        document.getElementById('settingsPanel').classList.add('active');
        
        // 修改表单提交行为为编辑
        linkForm.onsubmit = (e) => {
            e.preventDefault();
            savedLinks[index] = {
                name: document.getElementById('linkName').value,
                url: document.getElementById('linkUrl').value,
                icon: document.getElementById('linkIcon').value || "fas fa-globe"
            };
            renderLinks();
            linkForm.reset();
            return false;
        };
    }
    
    // 表单提交处理
    linkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addLink(
            document.getElementById('linkName').value,
            document.getElementById('linkUrl').value,
            document.getElementById('linkIcon').value
        );
        linkForm.reset();
    });
    
    // 添加链接按钮事件
    addLinkBtn.addEventListener('click', () => {
        document.getElementById('settingsPanel').classList.add('active');
        // 重置表单为添加模式
        linkForm.reset();
        linkForm.onsubmit = null;
    });
    
    // 初始渲染
    renderLinks();
}

// 初始化函数
function init() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    setupSearchEngine();
    setupSettingsPanel();
    setupBackground();
    setupQuotes();
    setupQuickLinks();
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);