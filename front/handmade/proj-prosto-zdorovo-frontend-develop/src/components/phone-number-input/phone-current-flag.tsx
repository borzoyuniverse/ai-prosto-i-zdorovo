import { useEffect, useState } from 'react';

import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js/max';

import { cn } from '@/lib/shadcn/lib/utils';

import countries from './countries.json';

type PhoneCurrentFlagProps = {
  value: string;
  className?: string;
};

const sortedCountries = [...countries].sort(
  (a, b) => b.dial_code.length - a.dial_code.length,
);

export const PhoneCurrentFlag = ({ value, className }: PhoneCurrentFlagProps) => {
  const [detectedCountryCode, setDetectedCountryCode] = useState<
    CountryCode | undefined
  >();

  useEffect(() => {
    const parsed = parsePhoneNumberFromString(value || '');
    if (parsed?.country) {
      setDetectedCountryCode(parsed.country);
      return;
    }

    if (!value) {
      setDetectedCountryCode(undefined);
      return;
    }

    const numberToParse = value.startsWith('+') ? value : `+${value}`;

    const matchedCountry = sortedCountries.find((country) =>
      value.startsWith(country.dial_code),
    );

    if (matchedCountry) {
      const reparsed = parsePhoneNumberFromString(
        numberToParse,
        matchedCountry.code as CountryCode,
      );
      setDetectedCountryCode(reparsed?.country);
    } else {
      setDetectedCountryCode(undefined);
    }
  }, [value]);

  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      {detectedCountryCode ? (
        <div className="text-h5">{emojiFlag(detectedCountryCode)}</div>
      ) : null}
    </div>
  );
};

function emojiFlag(countryCode: string) {
  const code = countryCode.toUpperCase();
  const offset = 127_397;
  return [...code]
    .map((char) => String.fromCodePoint((char.codePointAt(0) ?? 0) + offset))
    .join('');
}
