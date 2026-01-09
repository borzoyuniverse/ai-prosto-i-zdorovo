const viewableTypes = new Set([
  'jpeg',
  'jpg',
  'png',
  'gif',
  'html',
  'txt',
  'pdf',
  'mp3',
  'mp4',
  'pdf',
  'ogg',
]);
export const downloadFile = (url: string, fileName: string, type: string) => {
  if (viewableTypes.has(type)) {
    window.open(url, '_blank');
  } else {
    downloadURI(url, fileName);
  }
};

const downloadURI = (url: string | undefined, fileName: string | undefined) => {
  if (!url) return;

  fetch(url, {
    method: 'GET',
    referrerPolicy: 'no-referrer',
  })
    .then((res) => res.blob())
    .then((res) => {
      const aElement = document.createElement('a');
      aElement.setAttribute('download', fileName ?? '');
      const href = URL.createObjectURL(res);
      aElement.href = href;
      aElement.setAttribute('target', '_blank');
      aElement.click();
      URL.revokeObjectURL(href);
    });
};
