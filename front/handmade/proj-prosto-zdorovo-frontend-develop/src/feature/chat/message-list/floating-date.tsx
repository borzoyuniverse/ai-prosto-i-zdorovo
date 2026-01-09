import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';

import { Typography } from '@/components/typography/typography';

type FloatingDateProps = {
  date?: string | null;
  isShow: boolean;
};

export const FloatingDate = ({ date, isShow }: FloatingDateProps) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {date && isShow ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 top-unit-16 mx-auto w-fit rounded-5 bg-secondary-700 px-unit-4 py-unit-2 shadow-md"
        >
          <Typography.body7>{t('dates.dayOfFullMonth', { date })}</Typography.body7>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
