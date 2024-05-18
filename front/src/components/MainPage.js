import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import WebsiteHeader from './WebsiteHeader';


const MainPage = () => {
  return (
    <div class="main-container">
        <WebsiteHeader />
        <div class="content">
            <div class="first-content">
                <div class="side-image-container">
                    <img src="/stick.jpg" alt="stick" class="side-image" />
                    <h2>Даже древний самурай разберётся</h2>
                </div>
                <div class="image-container">
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
                        <img src="/icon.jpg" alt="icon" class="main-image" />
                        <span class="image-caption">ZKT</span>
                    </Link>
                    <span class="sub-caption">теперь вы под защитой</span>
                </div>
                <div class="news-container">
                    <header class="news_head">
                        Свежие новости ZKT Group
                    </header>
                    <div class="news_content">
                        <aside class="tl_main_side_blog">
                            <nav>
                                <ul>
                                    <li>Первый и единственный публичный защищённый месенджер открыл альфа тестирование.</li>
                                    <li>Миллиардер Павел Опаздунов прокомментировал новость о мессенджере ZKT.</li>
                                    <li>Эксперты в области технологий отметили что новый продукт ZKT Group выглядит перспективно, но всё ещё требует доработки.</li>
                                </ul>
                            </nav>
                        </aside>
                    </div>
                </div>

            </div>
            <div class="image-pair-container">
                <div class="image-with-text">
                    <img src="/dem2.jpg" alt="char demo 1" class="additional-image" />
                    <span class="image-text">для него</span>
                </div>
                <div class="image-with-text">
                    <img src="/dem1.jpg" alt="char demo 2" class="additional-image" />
                    <span class="image-text">для неё</span>
                </div>
            </div>
        </div>
    </div>

  );
}

export default MainPage;