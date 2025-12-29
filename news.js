const news = document.getElementById("news");

news.classList.add("hidden");

news.innerHTML = `

<small>
            <br />
            <span style="font-size: 16px !important">
              <b> Что нового <span class="version"></span>?</b></span
            >
            <br />
            <br />
            - Lyrics <- оно же текст песни
            <br />
            • Space button <- Следующая линия
            <br />
            • Shift + Space <- undo, назад
            <br />
            <br />

            - Анимация анти-героев или же друженблюных персонажей
            <br />
            - Новый герой Воин Судьбы(Он же Супермэн).
            <br />
            - Кнопка <span style="text-decoration: underline"> <b>ВОИН</b></span
            >.
            <br />
            - Hint <- Подсказки стали динамичными 👍
            <br />

            <br />
            <br />

            <!-- От автора:<br />
                -  -->
          </small>

`;
