import React from 'react';

const Ciudad = props => {
    return (
        <div className="container">
            <form onSubmit={props.loadweather}>
                <div className="row justify-content-center my-2">
                    <div className="col-md-2 align-self-center">
                        <label htmlFor="ciudad">Ciudad:</label>
                    </div>
                    <div className="col-md-4 align-self-center">
                    <select
                        name="city"
                        id="city"
                        className="form-control"
                    >
                        <option value="medellin">Medellín</option>
                        <option value="bogota">Bogotá</option>
                        <option value="rionegro">Rionegro</option>
                        <option value="barranquilla">Barranquilla</option>
                        <option value="cartagena">Cartagena</option>
                        <option value="manizales">Manizales</option>
                    </select>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-info px-5 py-2 my-2">Go!</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Ciudad;