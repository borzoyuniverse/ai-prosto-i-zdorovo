export const sleepExpertForm = {
  title: 'Заполните анкету по сну',
  description:
    'Чем больше у нас будет информации — тем меньше времени уйдёт на вопросы, и тем больше останется на разбор проблем и подбор решений',
  fields: [
    {
      id: 'b90ba7f1-1c22-42f1-908c-0d53559e89e9',
      orderNumber: 1,
      type: 'radio',
      variant: 'chip',
      question: 'Как бы вы оценили качество своего сна по шкале от 1 до 10?',
      description: '1 — очень плохой сон, 10 — отличный сон',
      options: [
        {
          value: {
            title: '1',
          },
        },
        {
          value: {
            title: '2',
          },
        },
        {
          value: {
            title: '3',
          },
        },
        {
          value: {
            title: '4',
          },
        },
        {
          value: {
            title: '5',
          },
        },
        {
          value: {
            title: '6',
          },
        },
        {
          value: {
            title: '7',
          },
        },
        {
          value: {
            title: '8',
          },
        },
        {
          value: {
            title: '9',
          },
        },
        {
          value: {
            title: '10',
          },
        },
      ],
      required: true,
    },
    {
      id: '1546a586-3ff8-43dd-9447-d91ad1c25aa9',
      orderNumber: 2,
      type: 'multiple-radio',
      required: true,
      options: [
        {
          question: 'Во сколько ложитесь спать в будние дни?',
          options: [
            {
              value: {
                title: '21:00–22:00',
              },
            },
            {
              value: {
                title: '22:00–23:00',
              },
            },
            {
              value: {
                title: '23:00–00:00',
              },
            },
            {
              value: {
                title: '00:00–01:00',
              },
            },
            {
              value: {
                title: 'После 01:00',
              },
            },
            {
              value: {
                title: 'Время меняется',
              },
            },
          ],
        },
        {
          question: 'Во сколько ложитесь спать в выходные дни?',
          options: [
            {
              value: {
                title: '21:00–22:00',
              },
            },
            {
              value: {
                title: '22:00–23:00',
              },
            },
            {
              value: {
                title: '23:00–00:00',
              },
            },
            {
              value: {
                title: '00:00–01:00',
              },
            },
            {
              value: {
                title: 'После 01:00',
              },
            },
            {
              value: {
                title: 'Время меняется',
              },
            },
          ],
        },
        {
          question: 'Во сколько просыпаетесь в будние дни?',
          options: [
            {
              value: {
                title: '5:00–6:00',
              },
            },
            {
              value: {
                title: '6:00–7:00',
              },
            },
            {
              value: {
                title: '7:00–8:00',
              },
            },
            {
              value: {
                title: '8:00–9:00',
              },
            },
            {
              value: {
                title: '9:00–10:00',
              },
            },
            {
              value: {
                title: 'После 10:00',
              },
            },
            {
              value: {
                title: 'Время меняется',
              },
            },
          ],
        },
        {
          question: 'Во сколько просыпаетесь в выходные дни?',
          options: [
            {
              value: {
                title: '5:00–6:00',
              },
            },
            {
              value: {
                title: '6:00–7:00',
              },
            },
            {
              value: {
                title: '7:00–8:00',
              },
            },
            {
              value: {
                title: '8:00–9:00',
              },
            },
            {
              value: {
                title: '9:00–10:00',
              },
            },
            {
              value: {
                title: 'После 10:00',
              },
            },
            {
              value: {
                title: 'Время меняется',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'c3d109ab-d231-4c5f-b6bf-0b173177dd85',
      orderNumber: 3,
      type: 'radio',
      question:
        'Сколько времени вам обычно требуется, чтобы уснуть после того, как легли?',
      options: [
        {
          value: {
            title: 'Менее 15 минут',
          },
        },
        {
          value: {
            title: '15–30 минут',
          },
        },
        {
          value: {
            title: '30–60 минут',
          },
        },
        {
          value: {
            title: 'Более часа',
          },
        },
      ],
      required: true,
    },
    {
      id: '4a5d9522-6d82-463d-af7c-6d895bce9f6f',
      orderNumber: 4,
      type: 'radio',
      question:
        'Вы обычно используете телефон, планшет, ноутбук или другие гаджеты в постели перед сном?',
      options: [
        {
          value: {
            title: 'Да, почти всегда — это моя привычка перед сном',
          },
        },
        {
          value: {
            title: 'Иногда — пользуюсь гаджетами в постели несколько раз в неделю',
          },
        },
        {
          value: {
            title: 'Редко — бывает, но стараюсь избегать',
          },
        },
        {
          value: {
            title:
              'Нет — никогда или почти никогда не пользуюсь гаджетами в постели перед сном',
          },
        },
      ],
      required: true,
    },
    {
      id: '93d08fb2-50ce-44ff-b383-0dc182ea7352',
      orderNumber: 5,
      type: 'radio',
      question: 'Принимаете ли пищу за 2 часа до сна?',
      options: [
        {
          value: {
            title: 'Да, регулярно (ужинаю поздно)',
          },
        },
        {
          value: {
            title: 'Иногда',
          },
        },
        {
          value: {
            title: 'Нет, стараюсь не есть за 2 часа до сна',
          },
        },
      ],
      required: true,
    },
    {
      id: 'b990b613-6266-441e-9b1f-f1f126365e0d',
      orderNumber: 6,
      type: 'radio',
      question:
        'Употребляете ли вы кофе, энергетические напитки, зелёный чай или другие источники кофеина за 5 часов до сна?',
      options: [
        {
          value: {
            title: 'Да, регулярно (почти каждый день или несколько раз в неделю)',
          },
        },
        {
          value: {
            title: 'Иногда (редко)',
          },
        },
        {
          value: {
            title: 'Нет (никогда или почти никогда)',
          },
        },
      ],
      required: true,
    },
    {
      id: '168d087a-1ad2-4834-a691-a36120576efd',
      orderNumber: 7,
      type: 'radio',
      question: 'Употребляете ли вы алкоголь за 3–4 часа до сна?',
      options: [
        {
          value: {
            title: 'Да, часто',
          },
        },
        {
          value: {
            title: 'Иногда',
          },
        },
        {
          value: {
            title: 'Нет',
          },
        },
      ],
      required: true,
    },
    {
      id: '5fcedae0-4ed1-4bd8-9f29-4163d4eff492',
      orderNumber: 8,
      type: 'radio',
      question:
        'Есть ли у вас привычка выполнять успокаивающие вечерние ритуалы перед сном?',
      options: [
        {
          value: {
            title: 'Да, регулярно',
          },
        },
        {
          value: {
            title: 'Иногда',
          },
        },
        {
          value: {
            title: 'Нет',
          },
        },
      ],
      required: true,
    },
    {
      id: '5a76a0bc-d32c-4c0f-9331-da3c9de3c02a',
      orderNumber: 9,
      type: 'checkbox',
      question:
        'Есть ли у вас диагностированные заболевания или состояния, которые могут влиять на качество сна?',
      description: 'Отметьте все подходящие варианты',
      options: [
        {
          value: {
            title: 'Апноэ сна',
          },
        },
        {
          value: {
            title: 'Гормональные нарушения',
            subTitle: 'Щитовидная железа, климакс',
          },
        },
        {
          value: {
            title: 'Хронические боли',
            subTitle: 'Спина, суставы, мышцы',
          },
        },
        {
          value: {
            title: 'Психоэмоциональные расстройства',
            subTitle: 'Стресс, тревога и др.',
          },
        },
        {
          value: {
            title: 'Неврологические заболевания',
            subTitle: 'Синдром беспокойных ног и др.',
          },
        },
        {
          value: {
            title: 'Сердечно‑сосудистые заболевания',
            subTitle: 'Аритмия, сердечная недостаточность',
          },
        },
        {
          value: {
            title: 'Дыхательные заболевания',
            subTitle: 'Тяжёлая астма, ХОБЛ',
          },
        },
      ],
      additionalField: {
        text: 'Если у вас есть другие заболевания, которые могут влиять на качество сна, пожалуйста, укажите их',
        placeholder: 'Ваши другие заболевания, если есть',
      },
      resetButtonGroup: {
        options: [
          {
            value: {
              title: 'Никаких заболеваний нет',
            },
          },
        ],
      },
      required: true,
    },
    {
      id: 'edc618fe-9e06-4672-8f4e-07c55dc73668',
      orderNumber: 10,
      type: 'radio',
      question: 'Спите ли вы днём?',
      options: [
        {
          value: {
            title: 'Да',
          },
        },
        {
          value: {
            title: 'Нет',
          },
        },
        {
          value: {
            title: 'Иногда',
          },
        },
      ],
      required: true,
    },
    {
      id: '6d8c983b-730e-4a5c-b9f5-7a8c3cf416b1',
      orderNumber: 11,
      type: 'radio',
      question: 'Есть ли у вас особый рабочий график?',
      options: [
        {
          value: {
            title: 'Работа в ночное время',
          },
        },
        {
          value: {
            title: 'Работа сутками',
          },
        },
        {
          value: {
            title: 'Ничего такого нет, график стандартный',
          },
        },
      ],
      additionalField: {
        text: 'Если у вас какой-то другой особый рабочий график, пожалуйста, укажите его',
        placeholder: 'Ваш особый рабочий график, если такой ест',
      },
      required: true,
    },
  ],
};
