/* utils/miniSite.js ------------------------------------------------------- */
import vidBg from "../assets/black.jpg";

// helper – convert a Blob/File to a base64 data‑URL (async)
const blobToDataURL = (blob) =>
  new Promise((res) => {
    const reader = new FileReader();
    reader.onloadend = () => res(reader.result);
    reader.readAsDataURL(blob);
  });

export async function exportMiniSite(vibe) {
  /* 1.  Gather media as data‑URIs (keeps file 100% offline).  */
  const mediaWithData = await Promise.all(
    vibe.media.map(async (m) => ({
      ...m,
      data: await blobToDataURL(m.file),
    }))
  );

  /* 2.  Build HTML string.  */
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${vibe.title}</title>
  <!-- Tailwind via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* extra blur backdrop for the hero */
    .hero::before {
      content: '';
      @apply absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm -z-10;
    }
  </style>
</head>
<body class="font-sans text-gray-800">
  <main class="flex flex-col items-center gap-6 py-6">
    <!-- HEADER -->
    <h1 class="text-2xl font-bold">${vibe.title}</h1>

    <!-- GRID -->
    <section class="grid grid-cols-1 sm:grid-cols-6 w-[90%] gap-5">
      <!-- SLIDE + THUMBS -->
      <div class="col-span-1 sm:col-span-4 flex flex-col items-center gap-6">
        <!-- SLIDE -->
        <div id="slide"
             class="relative w-full h-[300px] sm:h-[500px] border border-gray-300 rounded-xl overflow-hidden">
          <!-- dynamic bg filled by JS -->
          <div id="slideBg" class="absolute inset-0 blur-sm -z-10"></div>
          <div id="slideContent"
               class="w-full h-full flex items-center justify-center bg-black/40"></div>
        </div>

        <!-- THUMBNAILS -->
        <div id="thumbs"
             class="flex flex-wrap justify-center gap-2 sm:gap-3 w-full"></div>
      </div>

      <!-- JOURNAL -->
      <aside class="col-span-1 sm:col-span-2 w-full space-y-3">
        <h2 class="text-lg font-semibold">
          ${vibe.title}
          <span class="block text-sm text-gray-500">${vibe.date} · ${
    vibe.location
  }</span>
        </h2>

        ${
          vibe.tags?.length
            ? `<div class="flex flex-wrap gap-2">
            ${vibe.tags
              .map(
                (t) =>
                  `<span class="px-2 py-[2px] text-xs border rounded-full">${t}</span>`
              )
              .join("")}
           </div>`
            : ""
        }

        ${
          vibe.journal
            ? `<p class="text-sm whitespace-pre-wrap leading-relaxed">${vibe.journal}</p>`
            : ""
        }
      </aside>
    </section>
  </main>

  <!-- AMBIENT AUDIO -->
  ${
    vibe.ambientSound
      ? `<audio id="ambience" src="${vibe.ambientSound}" autoplay loop></audio>`
      : ""
  }

  <!-- Mini‑site player script -->
  <script>
    const vibe = ${JSON.stringify({ ...vibe, media: mediaWithData })};
    let current = 0;

    const slide      = document.getElementById('slideContent');
    const slideBg    = document.getElementById('slideBg');
    const thumbsWrap = document.getElementById('thumbs');

    function renderSlide(idx) {
      const m = vibe.media[idx];
      slide.innerHTML = m.type.startsWith('image/')
        ? '<img class="max-h-full max-w-full object-contain" src="'+m.data+'"/>'
        : '<video class="max-h-full max-w-full object-contain" src="'+m.data+'" autoplay controls></video>';

      slideBg.style.backgroundImage =
        m.type.startsWith('video/') ? 'url(${vidBg})' : 'url('+m.data+')';
        slideBg.style.backgroundSize = 'cover';
        slideBg.style.backgroundRepeat = 'no-repeat';
        slideBg.style.backgroundPosition = 'center';

    }

    function buildThumbs() {
      vibe.media.forEach((m, i) => {
        const el = document.createElement(m.type.startsWith('image/') ? 'img' : 'video');
        el.src = m.data;
        if (m.type.startsWith('video/')) { el.muted = true; el.loop = true; el.autoplay = true; }
        el.className =
          'h-[30px] w-[30px] sm:h-[50px] sm:w-[50px] object-cover border border-gray-300 rounded cursor-pointer';
        el.onclick = () => { current = i; renderSlide(current); };
        thumbsWrap.appendChild(el);
      });
    }

    buildThumbs();
    renderSlide(current);

    /* auto‑advance when slide is image */
    setInterval(() => {
      const m = vibe.media[current];
      if (m.type.startsWith('image/')) {
        current = (current + 1) % vibe.media.length;
        renderSlide(current);
      }
    }, 5000);
  </script>
</body>
</html>`;

  /* 3.  Trigger download --------------------------------------------------- */
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${vibe.title || "vibe"}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
