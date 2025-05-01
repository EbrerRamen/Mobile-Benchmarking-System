import React from 'react';
import './News.css'; // Import the CSS file

const NewsPage = () => {
    const newsItems = [
        {
            title: 'Acer returns to smartphones with Super ZX and Super ZX Pro',
            text: 'The Acer smartphone brand is back with two newly announced phones. Say hello to the Acer Super ZX and Super ZX Pro - two affordable devices made in India by Indikal Technologies.',
            image: 'https://fdn.gsmarena.com/imgroot/news/25/04/acer-super-zx-series-ofic/inline/-1200/gsmarena_001.jpg',
            link: 'https://www.gsmarena.com/acer_launches_super_zx_and_super_zx_pro-news-67407.php',
        },
        {
            title: 'Nvidia announces RTX 5060 and 5060 Ti graphics cards',
            text: 'Nvidia today announced the RTX 5060 and the RTX 5060 Ti, which are the entry-level offerings in the companys 50-series graphics.',
            image: 'https://fdn.gsmarena.com/imgroot/news/25/04/nvidia-5060/inline/-1200/gsmarena_002.jpg',
            link: 'https://www.gsmarena.com/nvidia_announces_rtx_5060_and_5060_ti_graphics_cards-news-67405.php',
        },
        {
            title: 'Google Pixel 9 First Look',
            text: 'Pixel 9 may come with a new design and improved Tensor chip.',
            image: 'https://via.placeholder.com/400x200',
            link: '#',
        },
    ];

    return (
        
        <div className="news-page">
            <h1 className="news-title">Latest Phone News</h1>
            
            <div className="news-grid">
                {newsItems.map((item, index) => (
                    <div key={index} className="news-item">
                        <img src={item.image} alt={item.title} className="news-image" />
                        <div className="news-content">
                            <h5 className="news-item-title">{item.title}</h5>
                            <p className="news-item-text">{item.text}</p>
                            <a href={item.link} className="read-more-btn">Read More</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
