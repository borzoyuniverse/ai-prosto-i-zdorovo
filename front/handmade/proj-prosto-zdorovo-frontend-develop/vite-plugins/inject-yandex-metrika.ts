import { type Plugin } from 'vite';

// Плагин для инжекции кода Яндекс Метрики только в production-сборке
export function injectYandexMetrika(): Plugin {
  const yandexMetrikaCode = `
    <!-- Yandex.Metrika counter -->
    <script type="text/javascript">
      (function (m, e, t, r, i, k, a) {
        m[i] =
          m[i] ||
          function () {
            (m[i].a = m[i].a || []).push(arguments);
          };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) {
            return;
          }
        }
        (k = e.createElement(t)),
          (a = e.getElementsByTagName(t)[0]),
          (k.async = 1),
          (k.src = r),
          a.parentNode.insertBefore(k, a);
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

      ym(86901374, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    </script>

    <noscript
      ><div>
        <img
          src="https://mc.yandex.ru/watch/86901374"
          style="position: absolute; left: -9999px"
          alt=""
        /></div
    ></noscript>
    <!-- /Yandex.Metrika counter -->
  `;

  return {
    name: 'inject-yandex-metrika',
    apply(config, { command }) {
      // Только применять плагин для сборки в prod
      return command === 'build' && config.mode === 'prod';
    },
    transformIndexHtml(html) {
      // Вставляем код Яндекс Метрики
      return html.replace('</head>', `${yandexMetrikaCode}\n</head>`);
    },
  };
}
