import { useEffect, useState } from "react";

import useSelectMonedas from "../hooks/useSelectMonedas";

import styled from "@emotion/styled";

import { monedas } from "../data/monedas";

import Error from "./Error";

const InputSubmit = styled.input`
  display: block;
  width: min(90%, 400px);
  margin: 0 auto;
  margin-top: 30px;
  background-color: #9497ff;
  border: none;
  padding: 10px 0;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

function Formulario({ setMonedas }) {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas);
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
    "Elige tu Criptomoneda",
    criptos
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto;
      });
      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if ([moneda, criptomoneda].includes("")) {
      setError(true);
      return;
    }

    setError(false);

    setMonedas({
      moneda,
      criptomoneda,
    });
  };
  return (
    <>
      {error && <Error>Todos los campos son requeridos</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCriptomoneda />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
}

export default Formulario;
