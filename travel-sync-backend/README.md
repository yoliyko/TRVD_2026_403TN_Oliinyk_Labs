<<<<<<< HEAD
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
=======
ЗВІТ З ЛАБОРАТОРНОЇ РОБОТИ №1
Специфікація вимог до програмного забезпечення (SRS)
1. Тема проєкту

Вебдодаток для персонального планування подорожей та контролю витрат "TravelSync". Система дозволяє користувачам структурувати майбутні поїздки, вести облік фінансів та керувати чек-листами справ.
2. Ідентифікація зацікавлених сторін (Stakeholders)

    Мандрівники (Користувачі): Створюють поїздки, планують бюджет, відмічають виконані завдання.

    Адміністратори системи: Контролюють загальну активність сервісу, бачать глобальну статистику користувачів та поїздок.

3. Функціональні вимоги (User Stories)
ФВ-01	Гість	Як Гість, я хочу зареєструватися через модальне вікно, щоб створити свій акаунт.

ФВ-02	Користувач	Як Користувач, я хочу входити в систему за допомогою пошти та пароля.

ФВ-03	Користувач	Як Користувач, я хочу, щоб моя сесія оновлювалася автоматично (Refresh Token) без виходу з системи.

ФВ-04	Користувач	Як Користувач, я хочу створювати картку нової подорожі, вказуючи її назву.

ФВ-05	Користувач	Як Користувач, я хочу бачити список усіх своїх поїздок на головній сторінці.

ФВ-06	Користувач	Як Користувач, я хочу додавати витрати до кожної поїздки (назва + сума).

ФВ-07	Користувач	Як Користувач, я хочу бачити автоматичний підрахунок загального бюджету поїздки.

ФВ-08	Користувач	Як Користувач, я хочу створювати плани (Activity) у вигляді чек-листа для кожної поїздки.

ФВ-09	Користувач	Як Користувач, я хочу відмічати плани як "виконані" для відстеження прогресу підготовки.

ФВ-10	Користувач	Як Користувач, я хочу видаляти поїздки, витрати або плани, якщо вони стали неактуальними.

ФВ-11	Користувач	Як Користувач, я хочу бачити особистий Dashboard із загальною сумою витрат по всіх поїздках.

ФВ-12	Користувач	Як Користувач, я хочу бачити візуальний прогрес-бар виконання планів підготовки.

ФВ-13	Адмін	Як Адмін, я хочу мати доступ до панелі глобальної статистики всієї системи.

ФВ-14	Адмін	Як Адмін, я хочу бачити загальну кількість юзерів та сумарний фінансовий оборот сервісу.

ФВ-15	Користувач	Як Користувач, я хочу отримувати спливаючі повідомлення (Toasts) про успішність моїх дій.

5. Нефункціональні вимоги (НФВ)

    Безпека: Паролі повинні зберігатися у вигляді хешів (bcrypt).

    Автентифікація: Доступ до даних здійснюється тільки за валідним JWT токеном.

    Продуктивність: Час відгуку API на створення запису не повинен перевищувати 200 мс.

    Масштабованість: Архітектура бекенду має бути модульною (NestJS).

    Адаптивність: Інтерфейс має коректно працювати на мобільних пристроях (Tailwind CSS).

    Надійність: Дані не повинні зникати після перезавантаження сервера (PostgreSQL persistence).

    Доступність: Проєкт повинен легко розгортатися на будь-якій машині через Docker Compose.

    Юзабіліті: Використання модальних вікон для зменшення кількості перезавантажень сторінок.

    Консистентність: Використання TypeScript на обох рівнях (Frontend/Backend) для мінімізації помилок типів.

    Ізоляція: База даних повинна бути доступною тільки всередині Docker-мережі або за закритим паролем.

Контрольні запитання

1. Яка різниця між функціональними та нефункціональними вимогами? Наведіть приклади.

    Функціональні вимоги (ФВ) відповідають на питання "Що система повинна вміти робити?". Це її бізнес-логіка та фічі. (Приклад: Система повинна підраховувати загальну суму витрат учасника).

    Нефункціональні вимоги (НФВ) відповідають на питання "Як саме система повинна працювати?". Це обмеження та стандарти якості (швидкість, безпека, навантаження). (Приклад: Підрахунок балансу має виконуватись менше ніж за 0.5 секунди).

2. Назвіть та опишіть основні методи збору вимог.

    Інтерв'ювання: Пряме спілкування зі стейкхолдерами (наприклад, опитування досвідчених туристів про їхній біль при плануванні).

    Анкетування: Онлайн-опитувальники для масового збору статистики.

    Аналіз конкурентів (Benchmarking): Вивчення існуючих додатків (наприклад, Splitwise або TripIt) для розуміння базового функціоналу.

    Мозковий штурм (Brainstorming): Колективна генерація ідей всередині команди розробників.

    Прототипування: Створення ескізів (wireframes), які показують користувачам для отримання раннього фідбеку.

3. Що таке "Історія користувача" (User Story) і з яких елементів вона складається?
Це неформальний, стислий опис того, що хоче отримати користувач, написаний зрозумілою для бізнесу мовою.
Складається з трьох частин за шаблоном:

    Хто? (Роль) — "Як[учасник поїздки]..."

    Що? (Дія/Фіча) — "...я хочу[прикріпити фото чека]..."

    Навіщо? (Цінність) — "...щоб [інші повірили в суму витрати]."

4. Поясніть важливість нефункціональних вимог для корпоративного вебдодатку.
Без НФВ корпоративний додаток може бути функціонально досконалим, але абсолютно непридатним для використання. Наприклад, якщо фінансова статистика (ФВ) завантажуватиметься 5 хвилин (погана продуктивність), або дані клієнтів можуть бути легко викрадені (погана безпека), бізнес зазнає колосальних збитків. НФВ — це фундамент стабільності, масштабованості та безпеки системи.

5. Що таке "критерії прийнятності" (Acceptance Criteria) і як вони пов'язані з функціональними вимогами?
Acceptance Criteria — це детальні умови, за яких User Story (або ФВ) вважається повністю реалізованою і може бути прийнята замовником/тестувальником.
Наприклад, для ФВ-06 (Додавання витрати) критерії можуть бути такими:

    Користувач повинен мати змогу ввести назву, суму та валюту.

    Сума не може бути від'ємною або нульовою.

    Після збереження витрата одразу з'являється у загальному списку.
    Вони доповнюють функціональну вимогу конкретикою, щоб розробник точно знав, коли робота завершена.
>>>>>>> 3d0242cb0ef5115bc182e215f559e69495e0216f
