// static/js/custom.js
function updateImages() {
  const imgs = document.querySelectorAll('.theme-doc-markdown img');

  imgs.forEach((img) => {
    const alt = img.getAttribute('alt') || '';
    const match = alt.match(/##(.*?)##/);

    if (match) {
      const rawWidth = match[1].trim();
      const isPercent = rawWidth.endsWith('%');

      img.style.display = 'block';
      img.style.margin = '1rem auto';
      img.style.width = '100%';

      if (isPercent) {
        img.style.maxWidth = rawWidth; // 如 100%
      } else {
        img.style.maxWidth = parseInt(rawWidth, 10) + 'px'; // 如 300px
      }

      img.setAttribute('alt', alt.replace(/##.*?##/, '').trim()); // 清理 alt 文本
    } else {
      // 普通图片也居中
      img.style.display = 'block';
      img.style.margin = '1rem auto';
      img.style.maxWidth = '100%';
      img.style.width = '100%';
    }

    console.log(imgs);
  });
}

window.addEventListener('load', updateImages);
