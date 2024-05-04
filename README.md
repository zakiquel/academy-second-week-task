# JSON PARSER

## Описание проекта

Динамический парсер форм представляет собой веб-приложение, целью которого является загрузка и отображение форм,
описанных в формате JSON. Пользователь имеет возможность загрузить JSON файл с описанием формы, после чего происходит
парсинг этого файла и динамическое создание соответствующей формы на странице.

## Цель задания

Основной целью данного задания является отработка следующих навыков:
- Работа с DOM: Вам придется взаимодействовать с DOM для поиска и манипуляции элементами формы.


- Работа с событиями: Обработка различных событий, таких как отправка формы, клики по кнопкам, изменения значений полей и т. д.


- Рендеринг компонентов: Если вы используете фреймворк React или Vue.js, вам придется создать компоненты для отображения формы
  и их динамического обновления в соответствии с вводом пользователя.


- Управление состоянием: Вам нужно будет хранить и обновлять состояние формы, чтобы отслеживать изменения и управлять их обработкой.


- Валидация данных: Вы должны проверить введенные пользователем данные на соответствие определенным требованиям, например, наличие обязательных полей, правильный формат даты или адреса электронной почты.


- Создание собственного Ui-kit: Вам необходимо будет спроектировать и  разработать набор компонентов пользовательского интерфейса (UI), который может быть многократно использован в проектах для обеспечения единообразия и согласованности в дизайне и интеракции пользователей. Этот навык позволяет разработчикам эффективно работать над проектами, сокращая время разработки и обеспечивая качество и стиль.


## Ресурсы

- Макет проекта доступен по ссылке: [Figma](https://www.figma.com/file/7S2O5KurM4GkBO1nj30Zg4/Forms-(2-week)?type=design&node-id=2286%3A7698&mode=design&t=ATrrUxSxxTtIpupx-1)
- Архив с JSON файлами форм: [Архив](/server/json)

## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev - запуск сервера + frontend проекта в dev режиме

Используемая версия Node - v18.17.0
```

----

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev server
- `npm run start:dev` - Запуск frontend проекта на webpack dev server + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design.

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Линтинг

В проекте используется eslint для проверки typescript кода.

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin *eslint-plugin-zavalition-fsd*,
который содержит 3 правила
1) path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2) layer-imports - проверяет корректность использования слоев с точки зрения FSD
   (например widgets нельзя использовать в features и entities)
3) public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix

##### Запуск линтеров
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
----

## Адаптив

Для корректного отображения на различных разрешениях используются медиа-запросы, которые поддерживают разрешения:
1920px, 1024px, 375px, а также все промежуточные значения.

----

## Конфигурация проекта

Для разработки проект использует сборщик Webpack.

Сборщик адаптирован под основные фичи приложения.

Вся конфигурация хранится в /config
- /config/build - конфигурация webpack

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

----

## Отправка данных

Отправка данных осуществляется с помощью fetch-запроса на фэйковый сервер, который запущен на 8000 порту с помощью
json-server. Данные отправляются в виде JSON-файла на эндпоинт /data, после чего сервер возвращает 200 статус-код.

----

## UI-компоненты

Для проекта были написаны собственные UI-компоненты, которые хранятся в /shared/ui

- ### [Button](/src/shared/ui/Button)

Компонент кнопки. Включает в себя стандартные методы для кнопки + отдельными пропсами
мы можем задать стандартизированный размер, тему кнопки, радиус и т.д.

- ### [Modal](/src/shared/ui/Modal)

Компонент модального окна, содержит все необходимые слушатели событий, иконку закрытия,
анимацию открытия/закрытия и обернут в React Portal.

- ### [Input](/src/shared/ui/Input)

Компонент инпут, принимает пропсами маску, паттерн, лэйбл и проверяет введенное пользователем значение на соответствие
регулярному выражению, в случае ошибки выводит сообщение исходя из типа инпута(password, email, date).

- ### [Select](/src/shared/ui/Select)

Компонент select`a. Типизирует стандартный select с помощью Generic props. Принимает набор опций пропсами, которые 
отрисовываются и фильтруются по мере ввода пользователем значения.

- ### [Portal](/src/shared/ui/Portal)

Компонент портала, телепортирует переданную ReactNode в указанный HTMLElement.

- ### [Checkbox](/src/shared/ui/Checkbox)

Компонент чекбокса, включает в себя валидацию и сбор данных поля.

- ### [Color](/src/shared/ui/Color)

Компонент выбора цвета, позволяет выбирать цвет из доступных опций цветов.

- ### [TextArea](/src/shared/ui/TextArea)

Компонент textarea, используется для создания многострочного поля ввода. Например, поля ввода комментария. 
При необходимости поле может иметь изменяемый размер и ограничение в символах.
