export const formatPhoneNumber = (phoneNumber: string): string => {
  // Удаляем все нецифровые символы
  const cleaned = phoneNumber.replaceAll(/\D/g, '');

  // Проверяем длину номера (должно быть 11 цифр)
  if (cleaned.length !== 11) return phoneNumber;

  // Форматируем номер
  return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
};
