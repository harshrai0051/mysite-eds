export default function decorate(block) {
  const link = block.querySelector('a');
  if (!link) return;

  const url = new URL(link.href);

  const videoId =
    url.searchParams.get('v') ||
    url.pathname.split('/').pop();

  // Get custom image if exists
  const image = block.querySelector('img');
  const thumbnail = image
    ? image.src
    : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  block.innerHTML = `
    <div class="embed-placeholder">
      <img src="${thumbnail}" alt="Video Thumbnail">
      <div class="play-button"></div>
    </div>
  `;

  const placeholder = block.querySelector('.embed-placeholder');

  placeholder.addEventListener('click', () => {
    block.innerHTML = `
      <div style="position:relative; padding-bottom:56.25%; height:0;">
        <iframe
          src="https://www.youtube.com/embed/${videoId}?autoplay=1"
          allow="autoplay; encrypted-media"
          allowfullscreen
          style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;">
        </iframe>
      </div>
    `;
  });
}
