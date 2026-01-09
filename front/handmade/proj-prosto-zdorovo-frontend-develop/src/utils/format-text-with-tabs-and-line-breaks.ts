export const formatTextWithTabsAndLineBreaks = (text: string) => {
  if (text === '') {
    return '';
  }

  const formattedText = text.replaceAll('\r', '');

  return formattedText.replaceAll(/(?<!\n)\n(?!\n)/g, '\n\n');
};
