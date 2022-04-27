import React, {useState, useEffect} from 'react';

const NewsWidget = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://gnews.io/api/v4/top-headlines?token=77e1cf8e43d41dae8953333b65af675b&max=4&lang=en&country=gb');
                if (response.ok && response.status === 200) {
                    setIsLoading(true);
                    const data = await response.json();
                    setNewsData(data.articles);
                    setIsLoading(false)
                } else {
                    setIsLoading(false);
                    throw new Error('Failed to fetch news data');
                }
            } catch (e) {
                setIsLoading(false);
                alert(`Error:${e.message}`)
            }
        };
        fetchNewsData();
    }, [])
    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
            <div className='news_widgets_container'>
                <h1>News</h1>
                <div className='news_widgets_wrapper'>
                    {newsData?.map(article => {
                        return (
                            <div key={article.source.url} className='news_widget_container'>
                                <img src={article.image}/>
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                                <h3>{article.source.name}</h3>
                                <a href={article.source.url} target="_blank">Read this article</a>
                            </div>
                        )
                    })}
                </div>
            </div>
            }

        </div>
    );
};

export default NewsWidget;