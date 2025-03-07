// 假设图片文件夹路径为 'images/'
const imageFolder = '../picture/award/';
const imagesPerRow = 9; // 每行显示的图片数量
const totalImages = 19; // 总图片数量

const gallery = document.getElementById('gallery');

// 动态加载图片
for (let i = 0; i <= totalImages; i++) {
    const img = document.createElement('img');
    img.src = `${imageFolder}${i}.jpg`; // 假设图片命名为 image1.jpg, image2.jpg, ...
    img.alt = `Image ${i}`;
    gallery.appendChild(img);
}

// 调整图片布局
function adjustLayout() {
    const galleryWidth = gallery.offsetWidth; // 画廊容器的宽度
    const images = document.querySelectorAll('#gallery img');
    const targetHeight = 150; // 统一高度
    let currentRowWidth = 0;

    images.forEach(img => {
        const imgWidth = (img.naturalWidth / img.naturalHeight) * targetHeight; // 根据比例计算宽度
        if (currentRowWidth + imgWidth > galleryWidth) {
            // 如果当前行放不下，换行
            gallery.appendChild(document.createElement('br'));
            currentRowWidth = 0;
        }
        img.style.width = `${imgWidth}px`; // 设置图片宽度
        currentRowWidth += imgWidth + 5; // 加上间距
    });
}

// 初始调整
adjustLayout();

// 窗口大小改变时重新调整
window.addEventListener('resize', adjustLayout);