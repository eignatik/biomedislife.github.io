# Информация обязательная к прочтению разработчикам, которые будут внедрять данный шаблон

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
    <div class="col-lg-12">
        <ul class="list-inline breadcrumb">
            <li><a href="index.html">На главную</a></li>
            <li><a href="#">Название страницы</a></li>
        </ul>
    </div>
    <div class="col-sm-offset-1 col-sm-10">
        <!-- put content here -->
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
P.S.: все {$var} являются выдуманными, показаны в качестве примера использования шаблонизаторов
