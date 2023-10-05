import ListGroup from 'react-bootstrap/ListGroup';

export default function Home() {
    return (
        <>
            <h1 className="text-center mb-5">Qui sont les pires derrières un volant ?</h1>
            <h2>Sources des datasets</h2>
            <ListGroup>
                <ListGroup.Item>Morts sur la route : <a href="https://www.kaggle.com/datasets/malikhamzanawaz/world-wide-road-accidents" target="_blank">https://www.kaggle.com/datasets/malikhamzanawaz/world-wide-road-accidents</a></ListGroup.Item>
                <ListGroup.Item>Population mondiale : <a href="https://www.kaggle.com/datasets/akshatsharma0610/world-population-2000-2023" target="_blank">https://www.kaggle.com/datasets/akshatsharma0610/world-population-2000-2023</a></ListGroup.Item>
                <ListGroup.Item>QI Moyen dans le monde : <a href="https://www.kaggle.com/datasets/zsinghrahulk/international-iq-by-countries" target="_blank">https://www.kaggle.com/datasets/zsinghrahulk/international-iq-by-countries</a></ListGroup.Item>
            </ListGroup>
        </>
    )
}