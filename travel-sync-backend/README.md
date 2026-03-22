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

Вебдодаток для спільного планування подорожей та розділення витрат "TravelSync" — система, яка дозволяє групам друзів або колег разом створювати маршрути, зберігати квитки, проводити голосування за локації та автоматично підраховувати, хто кому скільки винен грошей у поїздці.
2. Ідентифікація зацікавлених сторін (Stakeholders)

    Мандрівники (Організатори та Учасники): Основні користувачі системи, які створюють поїздки, додають витрати, завантажують квитки та спілкуються.
    
    Адміністратори системи: Технічний персонал, який слідкує за стабільністю платформи, модерує контент та керує тарифами (якщо є платні функції).
    
    Партнерські сервіси (Готелі, Авіакомпанії): Сторонні API-провайдери, чиї послуги можуть інтегруватися для швидкого пошуку житла чи квитків.

    Маркетологи / Аналітики: Сторона бізнесу, що використовує знеособлені дані про популярні напрямки для налаштування реклами або партнерств.

3. Функціональні вимоги (ФВ)
ID	Роль	Історія користувача (User Story)
ФВ-01	Мандрівник	Як Мандрівник, я хочу створювати нову "Кімнату подорожі" та генерувати лінк-запрошення, щоб додати туди своїх друзів.

ФВ-02	Мандрівник	Як Мандрівник, я хочу додавати точки на інтерактивну карту (маршрут), щоб візуально бачити план поїздки.

ФВ-03	Мандрівник	Як Мандрівник, я хочу створювати опитування (наприклад, "Де будемо вечеряти?"), щоб група могла демократично ухвалити рішення.

ФВ-04	Мандрівник	Як Мандрівник, я хочу завантажувати файли (PDF-квитки, броні), щоб усі учасники мали до них швидкий доступ в одному місці.

ФВ-05	Мандрівник	Як Мандрівник, я хочу фіксувати спільну витрату (наприклад, "Оренда авто - $200"), вказуючи, хто за неї заплатив, щоб система запам'ятала цей чек.

ФВ-06	Мандрівник	Як Мандрівник, я хочу розділяти витрату порівну між усіма або задавати власні пропорції, щоб врахувати індивідуальні витрати кожного.

ФВ-07	Мандрівник	Як Мандрівник, я хочу бачити фінальний "Баланс" (хто кому винен скільки грошей), щоб швидко розрахуватися в кінці поїздки.

ФВ-08	Мандрівник	Як Мандрівник, я хочу конвертувати витрати з різних валют у базову валюту поїздки за актуальним курсом, щоб не рахувати це вручну.

ФВ-09	Мандрівник	Як Мандрівник, я хочу відмічати борг як "Погашений", коли я переказав гроші другу, щоб баланс оновився.

ФВ-10	Організатор	Як Організатор поїздки, я хочу мати можливість видаляти учасників з кімнати, якщо їхні плани змінилися.

ФВ-11	Адміністратор	Як Адміністратор, я хочу бачити дашборд із загальною кількістю активних поїздок, щоб оцінювати навантаження на систему.

ФВ-12	Адміністратор	Як Адміністратор, я хочу мати можливість примусово блокувати акаунти, які генерують спам або порушують правила платформи.

4. Нефункціональні вимоги (НФВ)
ID	Категорія	Опис вимоги (Кількісно та чітко)

НФВ-01	Продуктивність	Синхронізація доданих витрат у спільній кімнаті для всіх учасників має відбуватися в реальному часі із затримкою не більше 500 мілісекунд.

НФВ-02	Продуктивність	Додаток має швидко рендерити інтерактивну карту; максимальний час початкового завантаження карти з 50 точками маршруту — менше 2 секунд.

НФВ-03	Продуктивність	Система підтримує одночасне знаходження до 100 учасників в одній "Кімнаті подорожі" без втрати швидкодії.

НФВ-04	Надійність	Доступність системи (SLA/Uptime) повинна бути не меншою за 99.5% на місяць.

НФВ-05	Надійність	У разі збою сервера, система повинна автоматично відновлювати роботу зі збереженої резервної копії не довше ніж за 15 хвилин.

НФВ-06	Безпека	Дані користувачів та прикріплені документи (квитки) повинні шифруватися в базі даних за допомогою алгоритму AES-256.

НФВ-07	Безпека	Передача даних між клієнтом і сервером повинна відбуватися виключно по захищеному протоколу HTTPS (TLS 1.3).

НФВ-08	Зручність (Usability)	Інтерфейс (UI) має бути спроєктований за принципом Mobile-First, оскільки понад 80% користувачів використовуватимуть додаток з мобільних пристроїв під час подорожі.

НФВ-09	Зручність (Usability)	Усі основні кнопки (додати витрату, завантажити квиток) повинні мати розмір клікабельної зони не менше 44x44 пікселів для зручності використання на сенсорних екранах.

НФВ-10	Сумісність	Додаток (PWA) має підтримувати встановлення на домашній екран (Add to Home Screen) для ОС iOS 15+ та Android 11+.

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
Наприклад, для ФВ-05 (Додавання витрати) критерії можуть бути такими:

    Користувач повинен мати змогу ввести назву, суму та валюту.

    Сума не може бути від'ємною або нульовою.

    Після збереження витрата одразу з'являється у загальному списку.
    Вони доповнюють функціональну вимогу конкретикою, щоб розробник точно знав, коли робота завершена.
>>>>>>> 3d0242cb0ef5115bc182e215f559e69495e0216f
