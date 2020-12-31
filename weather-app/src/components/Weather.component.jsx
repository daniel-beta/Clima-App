import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

const Weather = (props) => {
    return (
        <div className="container">
            <div className="cards">
                <h5 className="py-4">
                    <i className={`wi ${props.weatherIcon} display-1`}></i>
                </h5>
                <h1>{props.city}</h1>
                <h1 className="py-2">{props.temp_celsius}&deg;</h1>

                {/* Muestra temperatura máxima y minima */}
                {minmaxTemp(props.temp_min, props.temp_max)}

                <h4 className="py-3">{props.description}</h4>
                <Accordion defaultActiveKey="1">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Más información
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <p className="fs-2 text">Velocidad del viento: {props.wind} m/s</p>
                                <p className="fs-2 text">Humedad: {props.humidity} %</p>
                                <p className="fs-2 text">Presión: {props.pressure} hPa</p>
                                <p className="fs-2 text">Hora del amanecer: {props.sunrise}</p>
                                <p className="fs-2 text">Hora del atardecer: {props.sunset}</p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                            <Line
                data={{
                    labels: props.diasSiguientes,

                    datasets: [{
                        label: 'Temp min ºC',
                        borderColor: '#18A2B8',
                        data: props.tempMinDiasSiguientes,
                    }, {
                        label: 'Temp max ºC',
                        borderColor: '#000',
                        data: props.tempMaxDiasSiguientes,
                    }
                    ]
                }}
                height={30}
                width={100}
            />
            </div>
        </div>
    );
};

function minmaxTemp(min, max) {
    if (min && max) {
        return (
            <h3>
                <span className="px-4">{min}&deg;</span>
                <span className="px-4">{max}&deg;</span>
            </h3>
        );
    }
}

export default Weather;