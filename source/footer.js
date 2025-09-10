// -------------------- 全局页脚配置部分 --------------------
window.siteConfig = {
    footer: {
        brand: {
            name: "XSEC",
            description: "致力于提供专业的信息化解决方案,助力企业数字化转型升级。"
        },
        links: [
            {
                title: "关于我们",
                items: [
                    { text: "企业简介", href: "/leadership/me/" },
                    { text: "企业动态", href: "/leadership/" },
                    { text: "领导团队", href: "/leadership/me/lead/" },
                    { text: "发展历程", href: "#" },
                    { text: "隐私政策", href: "/legal/privacy/" }
                ]
            },
            {
                title: "工作机会",
                items: [
                    { text: "XSEC 职业机会", href: "/careers/cn/" },
                    { text: "在 XSEC 生活", href: "/careers/cn/life-at-xsec.html" },
                    { text: "在 XSEC 工作", href: "/careers/cn/work-at-xsec.html" }
                ]
            },
            {
                title: "资源",
                items: [
                    { text: "技术博客", href: "https://blog.csdn.net/qq_73252299?spm=1000.2115.3001.5343", target: "_blank" },
                    { text: "支持中心", href: "https://work.weixin.qq.com/kfid/kfc5c60f929a2e703af" },
                    { text: "公共服务", href: "/business/g/" }
                ]
            },
            {
                title: "联系我们",
                items: [
                    { text: "客服咨询", href: "https://work.weixin.qq.com/kfid/kfc5c60f929a2e703af", target: "_blank" },
                    { text: "商务合作", href: "/business/c/subscription.html", target: "_blank" },
                    { text: "客户服务", href: "/business/c/", target: "_blank" }
                ]
            }
        ],
        copyright: "© 2025 海口希灵赛斯网络科技有限公司.保留所有权利.",
        beian: {
            icp: "琼ICP备2025060601号",
            police: "本站已支持 IPv6"
        }
    }
};

// -------------------- 样式部分 --------------------
const footerStyle = `
.footer {
    background: linear-gradient(135deg, #1d1d1f 0%, #111 100%);
    color: #f5f5f7;
    padding: 40px 20px 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}
.footer::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(10,132,255,0.08), transparent 70%);
    pointer-events: none;
    animation: moveBG 20s linear infinite;
}
@keyframes moveBG {
    0% { transform: translate(0,0); }
    50% { transform: translate(20px,10px); }
    100% { transform: translate(0,0); }
}
.footer h3, .footer h4 {
    color: #ffffff;
    font-weight: 600;
    margin-bottom: 15px;
    font-size: 16px;
    letter-spacing: 0.5px;
}
.footer p {
    color: #d1d1d6;
    font-size: 14px;
    line-height: 1.5;
    transition: all 0.3s ease;
}
.footer ul {
    padding: 0;
    list-style: none;
    margin: 0;
}
.footer ul li {
    margin-bottom: 12px;
}
.footer ul li a {
    color: #d1d1d6;
    text-decoration: none;
    font-size: 14px;
    display: inline-block;
    transition: all 0.3s ease, transform 0.2s ease;
}
.footer ul li a:hover {
    color: #0a84ff;
    transform: translateY(-2px);
}
.footer-bottom {
    text-align: center;
    border-top: 1px solid #2c2c2e;
    margin-top: 30px;
    padding-top: 15px;
    font-size: 13px;
    color: #8e8e93;
    opacity: 0;
    animation: fadeIn 1s forwards;
}
.footer-bottom a {
    color: #8e8e93;
    text-decoration: none;
    transition: none;
}
.footer-bottom a:hover {
    color: #8e8e93;
    transform: none;
}
.footer .row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
}
.footer .col {
    flex: 1 1 0;
    min-width: 150px;
    transition: all 0.3s ease;
}
/* 移动端折叠栏目动画 */
.footer .footer-section h4 {
    cursor: pointer;
    position: relative;
}
.footer .footer-section h4::after {
    content: '▼';
    position: absolute;
    right: 0;
    transition: transform 0.3s ease;
}
.footer .footer-section.collapsed h4::after {
    transform: rotate(-90deg);
}
.footer .footer-section ul {
    display: block;
    max-height: 1000px;
    overflow: hidden;
    transition: max-height 0.5s ease;
}
.footer .footer-section.collapsed ul {
    max-height: 0;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.visitor-ip-info {
    opacity: 0;
    transition: opacity 1s ease;
}
.visitor-ip-info.show {
    opacity: 1;
}
@media (max-width: 768px) {
    .footer .row {
        flex-direction: column;
    }
    .footer .col {
        min-width: auto;
    }
}
`;

// 注入样式
const styleTag = document.createElement('style');
styleTag.innerHTML = footerStyle;
document.head.appendChild(styleTag);

// -------------------- 渲染页脚 --------------------
function renderFooter(containerId = "site-footer") {
    const container = document.getElementById(containerId);
    if (!container || !window.siteConfig || !window.siteConfig.footer) return;

    const cfg = window.siteConfig.footer;
    const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="row footer-top">
                <div class="col footer-brand">
                    <h3>${cfg.brand.name}</h3>
                    <p>${cfg.brand.description}</p>
                    <p class="visitor-ip-info">正在获取您的 IP 信息...（本站支持 IPv6）</p>
                </div>
                ${cfg.links.map(section => `
                    <div class="col footer-section">
                        <h4>${section.title}</h4>
                        <ul>
                            ${section.items.map(item => `
                                <li><a href="${item.href}" ${item.target ? `target="${item.target}"` : ""} rel="noopener noreferrer">${item.text}</a></li>
                            `).join("")}
                        </ul>
                    </div>
                `).join("")}
            </div>
            <div class="footer-bottom">
                <p>${cfg.copyright}</p>
                <p class="beian-info"></p>
            </div>
        </div>
    </footer>
    `;
    container.innerHTML = footerHTML;

    // 设置备案信息
    const beianElem = container.querySelector('.beian-info');
    if(beianElem && cfg.beian) {
        beianElem.innerHTML = `
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">${cfg.beian.icp}</a> | 
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${cfg.beian.police.replace('琼公网安备','')}" target="_blank" rel="noopener noreferrer">${cfg.beian.police}</a>
        `;
    }

    // -------------------- 移动端折叠栏目逻辑 --------------------
    const sections = container.querySelectorAll('.footer-section');

    function updateLayout() {
        const isMobile = window.innerWidth <= 768;
        sections.forEach(sec => {
            const list = sec.querySelector('ul');
            if(isMobile){
                sec.classList.add('collapsed');
                list.style.maxHeight = 0;
            } else {
                sec.classList.remove('collapsed');
                list.style.maxHeight = list.scrollHeight + "px";
            }
        });
    }

    sections.forEach(sec => {
        const header = sec.querySelector('h4');
        const list = sec.querySelector('ul');
        header.addEventListener('click', () => {
            if(window.innerWidth > 768) return;
            const isCollapsed = sec.classList.contains('collapsed');
            if(isCollapsed){
                sec.classList.remove('collapsed');
                list.style.maxHeight = list.scrollHeight + "px";
            } else {
                list.style.maxHeight = list.scrollHeight + "px";
                setTimeout(() => {
                    sec.classList.add('collapsed');
                    list.style.maxHeight = 0;
                }, 10);
            }
        });
    });

    updateLayout();
    window.addEventListener('resize', updateLayout);

    // -------------------- 获取访问者 IP 信息并自动刷新 --------------------
    const ipInfoElem = container.querySelector('.visitor-ip-info');
    if(!ipInfoElem) return;

    function updateIP() {
        ipInfoElem.classList.remove('show');
        fetch('https://api.ip.sb/geoip/')
        .then(res => res.json())
        .then(data => {
            const ip = data.ip || '未知';
            const country = data.country || '未知';
            const region = data.region || '未知';
            const isp = data.isp || '未知';
            const timezone = data.timezone || '未知';
            let ipv4 = '未知', ipv6 = '未知';
            if(ip.includes(':')) ipv6 = ip; else ipv4 = ip;
            ipInfoElem.innerHTML = `
                IPv4: ${ipv4}<br>
                IPv6: ${ipv6}<br>
                国家/地区: ${country} / ${region}<br>
                ISP: ${isp}<br>
                时区: ${timezone}<br>
                
            `;
            setTimeout(() => ipInfoElem.classList.add('show'), 50);
        })
        .catch(err => {
            ipInfoElem.textContent = '无法获取 IP 信息 （本站支持 IPv6）';
            ipInfoElem.classList.add('show');
            console.error('IP 获取失败', err);
        });
    }

    updateIP();
    setInterval(updateIP, 60000);
}

document.addEventListener('DOMContentLoaded', () => renderFooter("site-footer"));
