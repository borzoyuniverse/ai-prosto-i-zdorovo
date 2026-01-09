import { t } from 'i18next';
import parsePhoneNumberFromString, { type CountryCode } from 'libphonenumber-js';
import { z } from 'zod';

function tr(key: string) {
  return t('booking-page.personal-details.' + key);
}

export const zPhone = z
  .object({
    code: z.string({
      required_error: tr('phoneNumber.required-code'),
    }),
    number: z.string({
      required_error: tr('phoneNumber.required-number'),
    }),
  })
  .transform((arg, ctx) => {
    const phone = parsePhoneNumberFromString(arg.number, {
      defaultCountry: arg.code as CountryCode,
      extract: false,
    });

    if (phone && phone.isValid()) {
      if (phone.country !== arg.code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: tr('phoneNumber.invalid-country'),
        });
        return z.NEVER;
      }

      return {
        code: arg.code,
        number: arg.number,
      };
    }

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: tr('phoneNumber.invalid-number'),
    });
    return z.NEVER;
  });
