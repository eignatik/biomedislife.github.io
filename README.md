# ДОКУМЕНТАЦИЯ
## Информация обязательная к прочтению разработчикам, которые будут внедрять данный шаблон

P.S.: все {$var} являются выдуманными, показаны в качестве примера использования шаблонизаторов

Новый шаблон максимально переработан и адаптирован под все устройства и экраны.

Версии библиотек, используемых в проекте:
* JQuery - 2.2.4
* Bootstrap - 3.3.6
* Slick.js - 1.6.0

В index.html содержится финальная версия меню и шапки. Эти элементы необходимо брать из index. На остальных страницах не хватает несколько пунктов меню и т.д., лучше брать с главной.
Так же на главной и всех страницах, кроме страницы профиля реализовано меню для неавторизованных пользователей. Пример меню для партнера можно увидеть именно со страницы профиля пользователя. 

В проекте есть файл PAGES.html Это шаблон для будущих кастомных страниц, да и в целом для любых страниц. Комментарием указано, куда добавлять контент страниц.

На странице есть некоторая структура: 

* `<!-- HEADER -->` - здесь всё, что относится к шапке, кроме навигационного меню
* `<!-- NAVBAR -->` - навигационное меню + меню партнерсокое
* `<!-- CONTENT -->` - контент страниц
* После `<!--CONTENT -->` желательно использовать `<div class=row> </div>` внутри которого размещать блок хлебных крошек и блок контента

Пример:
```html
<!-- CONTENT -->
<div class="row">
    <!-- BREADCRUMBS -->
    <div class="col-lg-12">
        <ul class="list-inline breadcrumb">
            <li><a href="{$home_url}">На главную</a></li>
            <li><a href="{$page}">{$page_title}</a></li>
        </ul>
    </div>
    <div class="col-sm-offset-1 col-sm-10">
        <!-- put content here -->
        ${page_content}
    </div>
</div>
```

## Слайды на главной
Слайды на главной сетятся внутри блока  div с классом carousel-main. Каждый слайд - отдельный div внутри нее. В данный момент реализовано так, что у каждого слайда есть свой стиль, который указывается в нотации carousel-main-slide-N, где N - номер слайда (этот номер не влияет на видимый порядок следования, только разделение стилей).

Пример слайда:
```html
<div class="carousel-main-slide-0" 
     style="
            background-image: url('images/slider/4.jpeg'); 
            background-repeat: no-repeat; 
            background-position: right; 
            height: 572px;">
    <div class="carousel-container slide0">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-offset-6 col-xs-12 col-sm-6 col-md-5">
                    <p>Собери команду и получи подарок!</p>

                    <div>
                        <a href="business.php" class="btn btn-green pull-left">ПОДРОБНЕЕ</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```
Фон слайда задается в теге style, а не в файле CSS, чтобы было удобнее при генерации с бэкэнда. Не сделано вообще отдельным изображением, так как необходима была адаптация, а слайдер, где нужно наложение текста на изображение очень тяжело адаптировать, если изображение не фон. Так же вынесены в style backgroudn-position для регулирования позиции фона. 

Пример слайда, в который можно добавлять кастомное наполнение: 
```html
<div class="carousel-main-slide-0" 
     style="
            background-image: url('{$SOME_KIND_OF_GENERATED_RESOURCE_PATH}');
            background-repeat: no-repeat; background-position: right; height: 572px;">
    <div class="carousel-container slideN">
      <!-- put slide content here -->
    </div>
</div>
```
Рекомендуется использоваться бутстрап контейнер внутри слайдов.

## Корзина
Элементы корзины добавляются в виде новых tr под/над существующими в верстке.
Пример элемента: 
```html
<tr>
    <td>{$title}</td>
    <td>
        <div class="form-inline">
            <input class="form-control input-sm" value="1" style="width: 40px;"/>
        </div>
    </td>
    <td>{$sum} {$curency}</td>
    <td><a href="partnersprogram.html">{$points}</a></td>
    <td>{$discount}{$curency}</td>
    <td>{$delivery-flg}</td>
    <td>{$amount}</td>
    <td>
        <a href="#">
            <span class="glyphicon glyphicon-remove"></span>
        </a>
    </td>
</tr>
```

## Новости
Добавление записей новостей по похожим принципам. Есть список `<ul class="news"></ul>`, и в него надо добавлять новости в виде li блоков.
Пример шаблона для новостей
```html
<li>
    <h3>{$title}</h3>
    <p>{$text}</p>
    <div class="info">
        <span class="date">{$date}</span>
        <a href="{$linkToEntry}" class="link">
            Подробнее &gt;
        </a>
    </div>
</li>
```

## Магазин

Продукты в магазине добавляется в `<div class="... shop-content"> <div class="row"> HERE </div> </div>`
Добавляются так же по общему шаблону, в котором надо только подставить данные
```html
<div class="col-xs-12 col-sm-4">
    <div class="item">
        <form name="formBuyUnit126" style="margin:0px;" method="post" action="shoppingcart.php">
            <div class="img">
                <a href="{$product_page}">
                    <img src="{$image_path}" alt="">
                </a>
            </div>
            <div class="info">
                <h3>
                    <a href="{$product_page}">{$product_title}</a>
                </h3>
                <span class="price">Цена: {$product_sum} &nbsp; {$product_curency}</span>
                <div class="count-wrap"><span>Кол-во: </span>
                    <div class="count">
                        <a href="#" class="minus">-</a>
                        <input type="text" name="addQuantity" class="num" data-count="1" value="1">
                        <a href="#" class="plus">+</a>
                    </div>
                    <div style="clear: both;"></div>
                </div>

                <div class="style-buy">
                    <a href="#">
                        <div>Купить</div>
                        <div><img src="images/basket-wh.png"/></div>
                        <div></div>
                    </a>
                </div>

            </div>
        </form>
    </div>
</div>
```
