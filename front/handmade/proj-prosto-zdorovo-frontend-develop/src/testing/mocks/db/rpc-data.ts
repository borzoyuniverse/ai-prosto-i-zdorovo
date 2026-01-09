import { useConfirmAppointment } from '@/api/rpc-request/appointment/use-confirm-appointment';
import { useCreateAppointment } from '@/api/rpc-request/appointment/use-create-appointment';
import { useGetAppointmentTypes } from '@/api/rpc-request/appointment/use-get-appointment-types';
import { useGetFreeSlots } from '@/api/rpc-request/appointment/use-get-free-slots';
import { useGetGoals } from '@/api/rpc-request/appointment/use-get-goals';
import { useSpecialistAvailable } from '@/api/rpc-request/appointment/use-specialist-available';
import { useFormSubmission } from '@/api/rpc-request/form/use-form-submission';
import { useGetFormTemplateById } from '@/api/rpc-request/form/use-get-form-template-by-id';
import { useSearchForm } from '@/api/rpc-request/form/use-search-form';
import { useGetProfile } from '@/api/rpc-request/profile/use-get-profile';
import { useGetRules } from '@/api/rpc-request/profile/use-get-rules';
import { useUpdateInsurancePolicy } from '@/api/rpc-request/profile/use-update-insurance-policy';

import { messagesWithPagination } from './chats-data';
import { supplementsForm } from './form-template/supplements-form';

/* eslint-disable no-irregular-whitespace */
const rulesMarkdown = `
## 1. Направление работы

Каждый клиент сервиса может получить квалифицированное сопровождение и консультации по пяти основным направлениям:
питание, физическая активность, сон, мотивация и релаксация.

Эти области охватывают ключевые аспекты здоровья и качества жизни, а специалисты сервиса помогают достигать результата через максимально точные, индивидуальные и реалистичные рекомендации.

## 2. Методика и научная база

Наша методология построена на синтезе доказательной медицины, клинических рекомендаций, данных мета-анализов и многолетнего практического опыта.

Мы проводим комплексный анализ ваших персональных показателей и данных из релевантных внешних источников (научных, клинических, поведенческих). Соединяя эти большие массивы структурированной информации с профессиональной экспертизой в области питания, физиологии, сна и ментального здоровья, мы формируем индивидуальные и эффективные решения.

## 3. Что потребуется от вас

Чтобы получить максимально точные персональные рекомендации, мы просим заполнить опросники, ответить на вопросы куратора, экспертов и регулярно заполнять дневники наблюдений (питания, сна, активности и состояния).

Эти данные станут базой для анализа и создания индивидуальных рекомендаций.

## 4. Ограниченный формат рекомендаций

Если вы не заполняете анкеты и опросники, не ведёте дневник и не даёте обратную связь,  
эксперты не смогут провести полноценный анализ данных.

В результате вы получите типовые рекомендации, основанные на усреднённых данных:

- базовые упражнения и общие нормы;
- стандартные рекомендации.

Такие рекомендации формируются без глубокой адаптации под ваш уровень подготовки,  
состояние здоровья и образ жизни, а также без применения комплексного анализа данных  
и экспертной персонализации.

## 5. Достоверность и актуальность информации

Для формирования персональных рекомендаций важно, чтобы все данные, которые вы предоставляете (анкеты, опросники, дневники, ответы на вопросы куратора и экспертов), были максимально точными и правдивыми.

При изменении состояния здоровья, образа жизни, приёма лекарств, пожалуйста, сообщайте об этом персональному куратору.

Неполные или недостоверные данные могут привести к тому, что рекомендации окажутся менее точными и релевантными вашей ситуации.

## 6. Алгоритм работы сервиса

1. Вы заполняете анкеты и опросники.
2. Мы выделили по каждому из пяти направлений ключевые цели — жизненные и понятные.  
   Вы выбираете ту, которая наиболее откликается именно вам.
3. Куратор поддерживает и помогает пошагово собрать необходимые данные  
   (анкеты, опросники, дневники).
4. Система анализирует ваши ответы и дневники, рассчитывает ключевые показатели  
   и выявляет паттерны.
5. Наши эксперты дополняют цифровой анализ своим опытом, уточняют детали образа жизни  
   и медицинские ограничения.
6. Вы проходите онлайн-встречи с профильными экспертами  
   (нутрициолог, тренер, мастер-коуч, эксперт по сну и эксперт по восстановлению)  
   для детального разбора вашей ситуации, ответов на вопросы и уточнения плана.
7. Создаются персональные рекомендации, адаптированные под ваши цели, условия  
   и образ жизни.

## 7. Баланс ответственности

Наш сервис делает всё, чтобы создать персонализированные, выполнимые рекомендации и мотивировать вас на пути к здоровому образу жизни.

Но финальные результаты — это всегда совместный труд.

Мы даём карту пути, но идти по ней ваш выбор и ваше движение к цели.

## 8. Индивидуальные результаты 

Реакция организма на изменения питания, физической активности, режима сна и уровня стресса всегда индивидуальна и зависит от множества факторов, включая состояние здоровья, генетические особенности, образ жизни и соблюдение рекомендаций.

Сервис и специалисты не могут гарантировать достижение конкретных результатов в заданные сроки (например, определённое снижение веса, набор мышечной массы), но делают всё возможное для формирования научно-обоснованных и реалистичных рекомендаций.

## 9. Персональный куратор

С вами на протяжении всего процесса работает персональный куратор — специалист, который помогает двигаться шаг за шагом:
- объясняет смысл рекомендаций;
- поддерживает морально и мотивирует в ключевых точках процесса;
- напоминает о записях и обновлениях рекомендаций.

Куратор — это ваш ориентир и опора на пути к результату.

## 10. Безопасность данных

Все основные коммуникации осуществляются только в личном кабинете.
Это обеспечивает защиту персональных данных и исключает доступ посторонних лиц.

Мы применяем сертифицированные протоколы шифрования, защищённые серверы и авторизацию, что соответствует стандартам хранения персональной информации.

## 11. Отмена или перенос консультации

Если вам необходимо отменить или перенести консультацию, пожалуйста, сделайте это не менее чем за 24 часа до начала.

При отмене позже или отсутствии на приёме консультация списывается с баланса.

## 12. Доступ к личному кабинету

Даже после завершения действия вашей программы у вас сохраняется доступ к личному кабинету, истории, дневникам и персональным рекомендациям.

## 13. Уточнения
- Сервис не интерпретирует и не назначает медицинские анализы, не назначает лечение и не ставит диагнозы.
- Мы не являемся медицинской организацией, а наши программы имеют рекомендательный формат и направлены на повышение качества жизни.
- Все рекомендации, полученные в рамках сервиса, следует согласовывать с вашим лечащим врачом, в том числе если у вас есть хронические заболевания или вы проходите лечение.
- Назначения, полученные в рамках сервиса, носят рекомендательный характер.

## 14. Ограничения по использованию сервиса и экстренные состояния

Наш сервис не предназначен для оказания неотложной помощи, ведения острых состояний или обострений хронических заболеваний, а также для купирования выраженных психических расстройств и кризисных состояний.

При резком ухудшении самочувствия, появлении острых болей, выраженной одышки, потере сознания и других угрожающих симптомах необходимо немедленно обратиться за экстренной медицинской помощью (вызвать скорую помощь, обратиться в ближайший медицинский центр) и следовать указаниям врачей.

## 15. Соблюдение рекомендаций

Следование предложенным рекомендациям это путь к достижению целей.
Чем точнее вы выполняете рекомендации, тем быстрее формируются устойчивые изменения, которые закрепляются не усилием, а привычкой.
Мы помогаем сделать этот маршрут лёгким, осознанным и выполнимым.

## 16. Конфиденциальность и защита информации

Вся предоставляемая вами информация является строго конфиденциальной.

Передача доступа третьим лицам невозможна. 
Никакая информация, позволяющая прямо идентифицировать вас как конкретного человека не раскрывается.

Мы гарантируем полное соблюдение требований законодательства о защите персональных данных.

## 17. Изменение правил пользования сервисом

Правила пользования сервисом могут обновляться и дополняться. Актуальная версия всегда доступна в вашем личном кабинете.

Продолжая пользоваться сервисом после внесения изменений, вы подтверждаете своё согласие с обновлённой редакцией правил.

## 18. Возрастные ограничения

Сервис предназначен только для совершеннолетних пользователей.

## 19. Финальное напоминание

Просто&Здорово это пространство, где профессиональные знания, цифровые технологии и человеческое внимание соединяются ради одной цели — вашего здоровья.

Мы рядом, чтобы сопровождать вас на пути к здоровому образу жизни.
`;

export const rpcData: Record<string, object> = {
  'get-appointments': {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: [
      {
        id: 'a00f1396-7319-41cf-90db-c8095b5629df',
        startDate: '2025-07-27T22:24:35.009Z',
        isRepeated: true,
        consultationTypeName: 'Нутрициолог',
        consultationTypeId: 'c9cdb3aa-24f8-454b-a22c-79aba5cee31c',
        specialistType: 'NUTRITIONIST',
        unfilledQuestionnaires: [
          {
            formId: '7c2ab650-ba36-4e9f-a34b-014e6f436e76',
            formType: 'GENERAL',
          },
        ],
        consultationUrl: 'https://glass-legging.biz/',
      },
      {
        id: 'f4958001-1d44-4731-bdb3-fbad82e7ce4d',
        startDate: '2026-05-21T12:11:10.569Z',
        isRepeated: true,
        consultationTypeName: 'Мастер-тренер',
        consultationTypeId: 'ed0b1f96-ea0d-4112-ab5f-2b22c94df30d',
        specialistType: 'MASTER_TRAINER',
        unfilledQuestionnaires: [
          {
            formId: 'b7e1b911-6cbc-4a34-a6cc-4deb18db2dfb',
            formType: 'GENERAL',
          },
          {
            formId: '97c6d515-5e4d-4e2a-bc22-e547faea95aa',
            formType: 'CONSULTATION_TYPE',
          },
        ],
        consultationUrl: 'https://scary-mountain.org/',
      },
      {
        id: 'e738e024-dff0-476a-a588-1d673c1cfbe5',
        startDate: '2025-06-28T03:07:55.001Z',
        isRepeated: false,
        consultationTypeName: 'Релаксолог',
        consultationTypeId: '131200fe-bc0b-48f1-94f7-feb89c1f0bc6',
        specialistType: 'RELAXOLOGIST',
        unfilledQuestionnaires: [
          {
            formId: 'f017775a-7b4f-4ca0-9633-a88a61c41827',
            formType: 'GENERAL',
          },
          {
            formId: '401223ed-1b59-484d-9fcb-2dc8e1b74da8',
            formType: 'CONSULTATION_TYPE',
          },
        ],
        consultationUrl: 'https://rosy-coal.com',
      },
      {
        id: 'dac95167-77d6-451e-bee9-d55a257d68c6',
        startDate: '2026-12-01T13:38:39.827Z',
        isRepeated: true,
        consultationTypeName: 'Нутрициолог',
        consultationTypeId: 'f322d2a1-949c-4745-a70c-ee2c974f74b5',
        specialistType: 'NUTRITIONIST',
        unfilledQuestionnaires: [
          {
            formId: '4d4bb2e9-3dfd-40f0-9435-34331a67e4c3',
            formType: 'GENERAL',
          },
        ],
        consultationUrl: 'https://impure-rawhide.net/',
      },
      {
        id: 'c628cac3-a329-4cfe-80ac-b3b26c4aaf67',
        startDate: '2026-09-27T06:09:43.532Z',
        isRepeated: false,
        consultationTypeName: 'Эксперт по сну',
        consultationTypeId: 'ae336933-bb01-43b9-a730-56e539225823',
        specialistType: 'SLEEP_EXPERT',
        unfilledQuestionnaires: [],
        consultationUrl: 'https://insistent-instance.info',
      },
    ],
  },
  'recommendations-specialist': {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: ['MASTER_COACH', 'RELAXOLOGIST', 'SLEEP_EXPERT'],
  },
  'get-recommendations': {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: {
      recommendations: [
        {
          id: '3ebbb312-79ca-4918-a6ce-6936ad1b191f',
          specialistType: 'NUTRITIONIST',
          text: 'Старайтесь включать больше овощей и фруктов, уменьшите потребление сахара и обработанных продуктов.',
          createdAt: '2025-12-17T09:00:09.382Z',
          attachments: [
            {
              key: 'attachments/6fe1d833-4208-41b4-ad77-d5f7ec757dcf.jpg',
              url: 'https://picsum.photos/seed/EyjfBxrNw/2930/1538',
              title: 'Пример здорового обеда',
              type: 'JPG',
            },
          ],
        },
        {
          id: 'f56974be-a664-43ff-90f6-60d59f097365',
          specialistType: 'SLEEP_EXPERT',
          text: 'Ложитесь спать и просыпайтесь в одно и то же время, избегайте гаджетов за час до сна.',
          createdAt: '2025-12-17T00:30:36.874Z',
          attachments: [
            {
              key: 'attachments/1b0b8d9a-df14-4e51-a884-be025122640b.svg',
              url: 'https://loremflickr.com/543/2155?lock=2765432175528625',
              title: 'Правильная поза для сна',
              type: 'SVG',
            },
          ],
        },
        {
          id: '602be733-b668-4971-9d68-1e5f3a06a16d',
          specialistType: 'RELAXOLOGIST',
          text: 'Ежедневно делайте дыхательные упражнения и короткие медитации для снижения стресса.',
          createdAt: '2025-12-16T13:26:20.766Z',
          attachments: [
            {
              key: 'attachments/ef11cac2-5b89-4d84-98f9-2ad5d3cc3853.png',
              url: 'https://picsum.photos/seed/DPRRZHGLOD/2535/1481',
              title: 'Пример дыхательного упражнения',
              type: 'PNG',
            },
          ],
        },
        {
          id: '4c64c90f-2c91-4c2a-be38-a7ab36a6cba9',
          specialistType: 'SLEEP_EXPERT',
          text: 'Перед сном избегайте кофеина и тяжелой пищи, создайте комфортную обстановку в спальне.',
          createdAt: '2025-12-16T17:49:18.365Z',
          attachments: [
            {
              key: 'attachments/72116eb0-0227-495c-862c-fec3868ec211.jpg',
              url: 'https://loremflickr.com/2686/2670?lock=745126389131559',
              title: 'Темная и тихая спальня',
              type: 'JPG',
            },
          ],
        },
        {
          id: '32668384-ac1c-4c3a-8877-c147f4374fbf',
          specialistType: 'SLEEP_EXPERT',
          text: 'Спите 7–8 часов в сутки, регулярные физические нагрузки помогают улучшить качество сна.',
          createdAt: '2025-12-17T08:37:56.555Z',
          attachments: [
            {
              key: 'attachments/f3218644-b01e-4392-9e0c-0ad8e6766e04.jpg',
              url: 'https://loremflickr.com/839/346?lock=4123137393742439',
              title: 'Легкая вечерняя зарядка',
              type: 'JPG',
            },
          ],
        },
        {
          id: '5036c259-bdc2-4c7e-b485-65a77994d57b',
          specialistType: 'MASTER_COACH',
          text: 'Ставьте себе маленькие цели на день и постепенно увеличивайте нагрузку, чтобы избежать стресса для организма.',
          createdAt: '2025-12-17T00:14:35.999Z',
          attachments: [
            {
              key: 'attachments/5a9d5d4c-4589-48e5-be9e-a7b785cb09d7.pdf',
              url: 'https://picsum.photos/seed/8kXKt8M1/2735/2323',
              title: 'План дневной активности',
              type: 'PDF',
            },
          ],
        },
        {
          id: '31997005-14ef-46cd-bc65-53199281e20e',
          specialistType: 'MASTER_COACH',
          text: 'Разминка перед тренировкой и заминка после помогут снизить риск травм и ускорить восстановление.',
          createdAt: '2025-12-16T12:38:04.468Z',
          attachments: [
            {
              key: 'attachments/6aae41b9-42ce-4904-9d36-96b115a63c8c.jpg',
              url: 'https://picsum.photos/seed/2ESVF3SJL/2160/584',
              title: 'Пример разминки перед тренировкой',
              type: 'JPG',
            },
          ],
        },
        {
          id: 'f0c43def-6859-4a38-a9e5-8afe0ee7fe94',
          specialistType: 'RELAXOLOGIST',
          text: 'Выделяйте 10 минут в день на отдых без гаджетов, слушайте спокойную музыку или делайте дыхательные упражнения.',
          createdAt: '2025-12-16T13:49:48.819Z',
          attachments: [
            {
              key: 'attachments/d6d2fda4-c699-4982-ad5e-21ca0964caea.jpg',
              url: 'https://loremflickr.com/3514/2709?lock=7202071995487092',
              title: 'Медитация и отдых',
              type: 'JPG',
            },
          ],
        },
        {
          id: 'a2769edc-3ad6-4a00-b79d-ba1d4b42a14a',
          specialistType: 'MASTER_COACH',
          text: 'Следите за техникой выполнения упражнений и постепенно увеличивайте нагрузку, чтобы избежать травм.',
          createdAt: '2025-12-16T12:22:30.483Z',
          attachments: [
            {
              key: 'attachments/1ce6c053-e0f2-47a5-825d-247e21e5a171.jpg',
              url: 'https://picsum.photos/seed/iu0FEN7nt/1476/375',
              title: 'Правильная техника упражнений',
              type: 'JPG',
            },
          ],
        },
        {
          id: '810569fb-c2b8-4e74-8675-c7295cbebb6b',
          specialistType: 'NUTRITIONIST',
          text: 'Ешьте небольшими порциями 5–6 раз в день, выбирайте продукты с высоким содержанием белка и клетчатки.',
          createdAt: '2025-12-17T09:59:13.920Z',
          attachments: [
            {
              key: 'attachments/088297b1-1a87-4b9c-9483-9291a916c4fa.pdf',
              url: 'https://loremflickr.com/2111/2258?lock=59388989796276',
              title: 'Пример здорового меню на день',
              type: 'PDF',
            },
          ],
        },
      ],
    },
  },
  'get-chats': {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: {
      chats: [
        {
          id: '1',
          lastMessage: 'Консультация прошла отлично, вы делаете успехи',
          unreadCount: 0,
          lastMessageDate: '2025-12-17T21:10:15.765Z',
        },
      ],
    },
  },
  'get-messages': {
    pagination: messagesWithPagination,
  },
  [useGetAppointmentTypes.method]: {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: {
      consultationTypes: [
        {
          consultationTypeId: '4baef84b-dada-43db-bcfc-216dd0b81ef3',
          name: 'Мастер-тренер',
          description:
            'Эффективные и безопасные тренировочные программы, направленные на достижение индивидуальных целей',
          specialistType: 'MASTER_TRAINER',
          newAppointmentStatus: 'REPEATED',
        },
        {
          consultationTypeId: '37975a15-d6cf-4884-91a6-1e40bf0ca04b',
          name: 'Нутрициолог',
          description:
            'Научно обоснованные рекомендации по питанию, учитывающие индивидуальные потребности и предпочтения',
          specialistType: 'NUTRITIONIST',
          newAppointmentStatus: 'REPEATED',
        },
        {
          consultationTypeId: '99567102-afa6-4fac-bc7c-3af04f8a1da3',
          name: 'Релаксолог',
          description:
            'Специальные техники для снятия стресса, улучшения эмоционального состояния и повышения уровня энергии',
          specialistType: 'RELAXOLOGIST',
          newAppointmentStatus: 'DEFAULT',
        },
        {
          consultationTypeId: 'c6555b8f-160e-48d2-973f-0b58c1a6ab43',
          name: 'Мастер-коуч',
          description:
            'Помощь в достижении целей через осознанность, личную ответственность и раскрытие потенциала',
          specialistType: 'MASTER_COACH',
          newAppointmentStatus: 'DEFAULT',
        },
        {
          consultationTypeId: 'da13dd65-714d-4d15-bf95-f0b8fa0b0efd',
          name: 'Мастер-тренер',
          description:
            'Эффективные и безопасные тренировочные программы, направленные на достижение индивидуальных целей',
          specialistType: 'MASTER_TRAINER',
          newAppointmentStatus: 'BLOCKED',
        },
      ],
    },
  },
  [useSearchForm.method]: {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: {
      forms: [
        {
          formId: 'form-1',
          formType: 'string',
          isFilled: true,
          filledAt: '2025-12-18T11:02:52.647Z',
          title: 'string',
        },
        {
          formId: 'form-2',
          formType: 'string',
          isFilled: true,
          filledAt: '2025-12-18T11:02:52.647Z',
          title: 'string',
        },
      ],
    },
  },
  [useGetGoals.method]: {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: {
      goals: [
        {
          id: '1',
          name: 'Снижение веса',
          description:
            'Безопасное и устойчивое снижение массы тела за счёт сбалансированного питания и изменения пищевых привычек',
        },
        {
          id: '2',
          name: 'Набор мышечной массы',
          description:
            'Увеличение мышечной массы с помощью калорийного рациона, достаточного белка и правильного режима питания',
        },
        {
          id: '3',
          name: 'Поддержание веса',
          description:
            'Сохранение текущего веса и формы тела при сбалансированном рационе и умеренной физической активности',
        },
        {
          id: '4',
          name: 'Коррекция пищевых привычек',
          description:
            'Формирование здорового отношения к еде и выработка устойчивых пищевых привычек на долгосрочную перспективу',
        },
        {
          id: '5',
          name: 'Улучшение пищеварения',
          description:
            'Поддержка здоровья ЖКТ за счёт индивидуального подбора продуктов и режима питания',
          formId: 'formId',
        },
      ],
    },
  },
  [useGetFormTemplateById.method]: {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: supplementsForm,
  },
  [useGetFreeSlots.method]: {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: {
      slots: [
        {
          slotIds: ['event-001', 'event-008'],
          time: '14:40',
        },
        {
          slotIds: ['event-002', 'event-009'],
          time: '15:00',
        },
        {
          slotIds: ['event-003', 'event-010'],
          time: '15:20',
        },
        {
          slotIds: ['event-004', 'event-011'],
          time: '15:40',
        },
      ],
    },
  },
  [useCreateAppointment.method]: {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: {
      id: 'cnsl-9955',
      consultationTypeId: 'string',
      goalId: 'string',
      eventId: 'string',
      specialistId: 'string',
    },
  },
  [useConfirmAppointment.method]: {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: {
      id: 'cnsl-9955',
      eventId: 'string',
      specialistId: 'string',
    },
  },
  [useSpecialistAvailable.method]: {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: {
      canBook: true,
    },
  },
  [useFormSubmission.method]: {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: {
      answers: {
        additionalProp1: {
          answer: 'string',
          question: 'string',
          orderNumber: 0,
          type: 'input',
          additionalAnswer: 'string',
        },
      },
    },
  },
  [useGetProfile.method]: {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: {
      package: {
        totalConsultations: 12,
        usedConsultations: 4,
        validUntil: '2025-12-31',
      },
      personalInfo: {
        phone: '+7 999 123-45-67',
        email: 'anna.morozova@mail.ru',
        birthDate: '1990-01-01',
        insurerName: 'ООО Страховая компания',
        policyNumber: '1234567890',
        policyValidUntil: '2026-01-01',
        firstName: 'Анна',
        lastName: 'Морозова',
        middleName: 'Николаевна',
      },
    },
  },
  [useGetRules.method]: {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: {
      text: rulesMarkdown,
    },
  },
  [useUpdateInsurancePolicy.method]: {
    jsonrpc: '2.0',
    id: '9c78675f-1d41-41be-a891-abc48e807e6c',
    result: {
      policyNumber: 'POL-1234-5678',
    },
  },
};
