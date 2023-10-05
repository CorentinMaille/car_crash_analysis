import ListGroup from 'react-bootstrap/ListGroup';

export default function Home() {
    return (
        <>
            <h1 className="text-center mb-5">Qui sont les pires derrières un volant ?</h1>
            <h2>Sources des datasets</h2>
            <ListGroup>
                <ListGroup.Item>Morts sur la route : <a href="https://www.kaggle.com/datasets/malikhamzanawaz/world-wide-road-accidents" target="_blank">https://www.kaggle.com/datasets/malikhamzanawaz/world-wide-road-accidents</a></ListGroup.Item>
                <ListGroup.Item>Santé mondiale : <a href="https://www.kaggle.com/datasets/kamaumunyori/global-health-data-analysis-1990-2019/" target="_blank">https://www.kaggle.com/datasets/kamaumunyori/global-health-data-analysis-1990-2019</a></ListGroup.Item>
            </ListGroup>
        </>
    )
}