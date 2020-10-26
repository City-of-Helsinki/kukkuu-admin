export const includesHeaders = (element: Element, id: number) => {
  const words = [
    'Nimi',
    'Vastaanottajat',
    'Tapahtuma',
    'Vastaanottajia',
    'Julkaisu',
  ];
  const value = element.textContent;

  if (!value) {
    return false;
  }

  return words.reduce((acc, word) => value.includes(word) && acc, true);
};
