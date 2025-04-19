import React from 'react';

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
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-10 text-gray-800"> Latest Phone News</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {newsItems.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                        <div className="p-5">
                            <h5 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h5>
                            <p className="text-gray-600 mb-4">{item.text}</p>
                            <a href={item.link} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                                Read More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
