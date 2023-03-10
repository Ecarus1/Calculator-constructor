# Приложение для конструирования калькулятора

![](https://shields.io/badge/-HTML-orange)
![](https://shields.io/badge/-CSS-blue)
![](https://shields.io/badge/-TypeScript-yellow)
![](https://shields.io/badge/-React-05D9FF)

## Описание
 - В данном приложение есть две области. Слева - элементы для сборки, а справа холст для размещения этих элементов. Есть кнопка переключения режима работы приложения. В режиме *Constructor* элементы можно перемещать. В режиме *Runtime* элементы размещенные справа выполняют функции калькулятора, то есть кнопки нажимаются, дисплей показывает введенные данные.

## Функциональность калькулятора (Runtime)
 - Кнопка равно (*=*) производит расчет и сбрасывает память введенных данных. То есть нажатие на любую следующую кнопку калькулятора очищает дисплей.
 - Если делить на ноль, на дисплее будет написано *Не определено*.

 ## Функциональность конструктора (Constructor)
  - Слева направо элементы можно перенести если потянуть их мышью. Обратно, только если произвести двойное нажатие на элемент справа.
 - Дисплей всегда находится сверху.
 - При размещение элемента в правой части происходит отображения места, куда он приземлиться.
 - Если перемещать дисплей, то место приземления не отображается, так как дисплей всегда сверху.
 - Элемент, которого перенесли, слева становится полупрозрачным.
 - Кнопка переключения режима работы приложения реализована с помощью *react-redux*. 

<tr>
    <hr>
</tr>

 [Ссылка на макет в Figma](https://www.figma.com/file/pdYzuOkvXY3Q00YRAMsLuz/Calculator-Constructor?node-id=0%3A1&t=QTpI0lzSxUKX6V2Z-0).

 [Ссылка на готовый проект](https://calculator-constructor-six.vercel.app/).

 ## Запуск приложения
1. npm i
2. npm run start
