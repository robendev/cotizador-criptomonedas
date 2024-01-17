import { useState } from "react";

import styled from "@emotion/styled";

const Label = styled.label`
  color: #fff;
  display: block;
  width: min(90%, 400px);
  margin: 0 auto;
  font-family: "Lato", sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const Select = styled.select`
  display: block;
  width: min(90%, 400px);
  margin: 0 auto;
  font-weight: 700;
  font-size: 18px;
  padding: 14px 0 14px 14px;
  border-radius: 5px;
  font-family: "Lato", sans-serif;
`;

function useSelectMonedas(label, opciones) {
  const [state, setState] = useState("");

  const SelectMonedas = () => (
    <>
      <Label>{label}</Label>
      <Select
        value={state}
        onChange={({ target: { value } }) => setState(value)}
      >
        <option value="" defaultChecked>
          -- Seleccione --
        </option>
        {opciones.map((opcion) => (
          <option key={opcion.id} value={opcion.id}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </>
  );
  return [state, SelectMonedas];
}

export default useSelectMonedas;
