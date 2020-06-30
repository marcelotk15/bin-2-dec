import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  H1,
  Alert,
  Fieldset,
  Form,
  Input,
} from "@bootstrap-styled/v4";

function App() {
  const [binaryText, setBinaryText] = useState("");
  const [decimalText, setDecimalText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //Binary input
  useEffect(() => {
    // Make sure we accept only either 0 or 1
    if (binaryText.match(/^[0-1]+$/g) === null && binaryText !== "") {
      setErrorMessage("Enter either 0 or 1");

      return;
    }

    if (binaryText === "") return;

    setErrorMessage("");

    const reversedBinaryText = binaryText
      .split("")
      .map(Number) // Convert to a number from string
      .reverse();

    // Calculate the result by accumulating previous vaue
    const result = reversedBinaryText.reduce(
      (accumulator, currentValue, idx) =>
        accumulator + currentValue * Math.pow(2, idx)
    );
    setDecimalText(result);
  }, [binaryText]);

  useEffect(() => {
    setBinaryText((decimalText >>> 0).toString(2));
    console.log(decimalText);
  }, [decimalText]);

  return (
    <>
      <Container>
        <Row>
          <H1>Bin2Dec</H1>
        </Row>

        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

        <Row>
          <Form>
            <Fieldset>
              Binary:{" "}
              <Input
                type="number"
                name="binary"
                placeholder="Enter 0 or 1"
                value={binaryText}
                onChange={(e) => setBinaryText(e.target.value)}
              />
              Decimal:{" "}
              <Input
                type="number"
                name="decimal"
                value={decimalText}
                onChange={(e) => setDecimalText(e.target.value)}
              />
            </Fieldset>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default App;
