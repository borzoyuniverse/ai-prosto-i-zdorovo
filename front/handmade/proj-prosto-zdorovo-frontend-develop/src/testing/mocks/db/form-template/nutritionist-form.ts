export const formNutritionist = {
  title: 'Заполните анкету по питанию',
  description:
    'Чем больше у нас будет информации — тем меньше времени уйдёт на вопросы, и тем больше останется на разбор проблем и подбор решений',
  fields: [
    {
      id: '11d16ca5-a2bf-44ad-82da-f58f8cc1e37b',
      orderNumber: 1,
      type: 'input',
      question: 'Какой у вас желаемый вес (в кг)?',
      placeholder: 'Ваш желаемый вес в кг',
      required: true,
      resetButtonGroup: {
        options: [
          {
            value: {
              title: 'Не знаю — затрудняюсь определить или не задумывался(ась) об этом',
            },
          },
        ],
      },
    },
    {
      id: '35b97785-50e5-4103-a604-280236ebd42d',
      orderNumber: 2,
      type: 'input',
      question: 'В какой срок вы хотели бы достичь желаемого веса?',
      placeholder: 'Ваш желаемый срок в месяцах',
      required: true,
      resetButtonGroup: {
        options: [
          {
            value: {
              title: 'Не знаю — не задумывался(ась) о конкретных сроках',
            },
          },
          {
            value: {
              title:
                'Зависит от рекомендаций специалиста — готов(а) придерживаться программы столько, сколько потребуется для здорового результата',
            },
          },
        ],
      },
    },
    {
      id: 'fbe53625-3600-4983-9f81-e1276e385ba6',
      orderNumber: 3,
      type: 'input',
      question:
        'Есть ли у вас пищевая аллергия или непереносимость продуктов? Укажите на что',
      placeholder: 'На что аллергия и какие продукты не переносите',
      required: true,
      resetButtonGroup: {
        options: [
          {
            value: {
              title: 'Нет пищевой аллергии и непереносимости продуктов',
            },
          },
        ],
      },
    },
    {
      id: 'f4670395-4022-4ea2-a8dd-695005ea4056',
      orderNumber: 4,
      type: 'input',
      question: 'Есть ли у вас аллергия на лекарства или добавки? Укажите на что',
      placeholder: 'На какие лекарства или добавки у вас аллергия',
      required: true,
      resetButtonGroup: {
        options: [
          {
            value: {
              title: 'Нет аллергии на лекарства и добавки',
            },
          },
        ],
      },
    },
    {
      id: 'b2158190-5245-484e-a95e-f1dfaaca5956',
      orderNumber: 5,
      type: 'input',
      question:
        'Принимаете ли вы постоянно какие‑либо БАДы (включая витамины, минералы, травы)',
      placeholder: 'Какие БАДы принимаете',
      required: true,
      resetButtonGroup: {
        options: [
          {
            value: {
              title: 'Не принимаю БАДы',
            },
          },
        ],
      },
    },
    {
      id: 'e40454b7-a027-4b74-8ca0-6bfb1c64141a',
      orderNumber: 6,
      type: 'input',
      question: 'Принимаете ли вы постоянно какие‑либо лекарственные препараты?',
      placeholder: 'Какие лекарственные препараты принимаете',
      required: true,
      resetButtonGroup: {
        options: [
          {
            value: {
              title: 'Не принимаю лекарственные препараты',
            },
          },
        ],
      },
    },
    {
      id: '2fd8a415-bd1c-467c-bf29-0ea2816278b5',
      orderNumber: 7,
      type: 'input',
      question:
        'Какие продукты вы исключаете из своего питания (не любите, не пененосите, из-за религиозных норм или убеждений)?',
      placeholder: 'Продукты, которые исключаете',
      required: true,
    },
    {
      id: 'fd1e2780-2201-417e-9ef1-972ea95910ee',
      orderNumber: 8,
      type: 'radio',
      variant: 'chip',
      question: 'Сколько раз обычно кушаете в течение дня?',
      description: 'Учитывайте все основные приёмы пищи и перекусы, даже небольшие',
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
      id: '7b14b827-29ce-4fc0-9ffc-60b07e719876',
      orderNumber: 9,
      type: 'radio',
      question:
        'Как вы обычно организуете своё питание — готовите сами или предпочитаете покупать готовую еду?',
      options: [
        {
          value: {
            title: 'В основном готовлю сам(а)',
            subTitle: 'Покупаю готовое только иногда',
          },
        },
        {
          value: {
            title: 'В основном покупаю готовое',
            subTitle: 'Готовлю дома редко',
          },
        },
        {
          value: {
            title: 'Комбинирую оба варианта',
            subTitle: 'Примерно поровну готовлю дома и покупаю готовые блюда',
          },
        },
      ],
      required: true,
    },
    {
      id: 'e8c7e6af-64b4-4fb6-a489-e5154532b3da',
      orderNumber: 10,
      type: 'radio',
      question: 'Как бы вы описали свой текущий стиль питания?',
      options: [
        {
          value: {
            title: 'Ем что хочу и когда хочу',
          },
        },
        {
          value: {
            title: 'Стараюсь питаться полезно, но без строгих ограничений',
          },
        },
        {
          value: {
            title: 'Придерживаюсь конкретного плана или системы питания',
          },
        },
        {
          value: {
            title: 'Периодически сижу на диетах',
          },
        },
      ],
      required: true,
    },
    {
      id: '99d7358f-ee47-4608-a1eb-d53f8a484c3a',
      orderNumber: 11,
      type: 'radio',
      question: 'Где вы чаще всего завтракаете?',
      options: [
        {
          value: {
            title: 'Дома',
          },
        },
        {
          value: {
            title: 'В кафе или ресторане',
          },
        },
        {
          value: {
            title: 'В столовой',
          },
        },
        {
          value: {
            title: 'Приношу с собой',
          },
        },
        {
          value: {
            title: 'Покупаю фаст-фуд или еду в автоматах',
          },
        },
        {
          value: {
            title: 'Заказываю готовую еду',
          },
        },
      ],
      required: true,
    },
    {
      id: 'c3bcd854-54d6-4e03-b8bd-b8978b862d06',
      orderNumber: 12,
      type: 'radio',
      question: 'Где вы обычно обедаете?',
      options: [
        {
          value: {
            title: 'Дома',
          },
        },
        {
          value: {
            title: 'В кафе или ресторане',
          },
        },
        {
          value: {
            title: 'В столовой',
          },
        },
        {
          value: {
            title: 'Приношу с собой',
          },
        },
        {
          value: {
            title: 'Покупаю фаст-фуд или еду в автоматах',
          },
        },
        {
          value: {
            title: 'Заказываю готовую еду',
          },
        },
      ],
      required: true,
    },
    {
      id: '0c076135-79a2-481e-bb9d-9b866ba8f2e8',
      orderNumber: 13,
      type: 'radio',
      question: 'Где вы чаще всего ужинаете?',
      options: [
        {
          value: {
            title: 'Дома',
          },
        },
        {
          value: {
            title: 'В кафе или ресторане',
          },
        },
        {
          value: {
            title: 'В столовой',
          },
        },
        {
          value: {
            title: 'Приношу с собой',
          },
        },
        {
          value: {
            title: 'Покупаю фаст-фуд или еду в автоматах',
          },
        },
        {
          value: {
            title: 'Заказываю готовую еду',
          },
        },
      ],
      required: true,
    },
  ],
};
