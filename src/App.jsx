import { useState, useEffect } from "react";
import styled from "@emotion/styled";

import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

import ImagenCripto from "./img/imagen-criptos.png";

const Contenedor = styled.div`
  width: min(90%, 900px);
  margin: 0 auto;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  width: min(80%, 400px);
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  font-size: 34px;
  margin: 50px 0 50px 0;

  &::after {
    content: "";
    width: 125px;
    height: 5px;
    background-color: #66a2f3;
    display: block;
    margin: 10px auto 0 auto;
  }

  @media (min-width: 992px) {
    margin-top: 100px;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setResultado({});
        setCargando(true);
        const { moneda, criptomoneda } = monedas;

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        setCargando(false);
      };
      cotizarCripto();
    }
  }, [monedas]);
  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="Imagen Cripto Monedas" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Formulario setMonedas={setMonedas} />

        {cargando && <Spinner></Spinner>}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Contenedor>
  );
}

export default App;
