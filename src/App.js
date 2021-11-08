import { useState } from 'react'
import { Formik, Form } from "formik"
import * as Yup from "yup"
import Input from "./components/input"
import Button from "./components/button"
import Container from "./components/container"
import Section from "./components/section"
import Balance from "./components/Balance"



const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)
  }

  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})


function App() {
  const [balance, setBalance] = useState("")
  const handleSubmit = ({deposit, contribution, years, rate}) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }

  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: "",
            contribution: "",
            years: "",
            rate: ""
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number().required("obligatorio").typeError("Debe ser un numero"),
            contribution: Yup.number().required("obligatorio").typeError("Debe ser un numero"),
            years: Yup.number().required("obligatorio").typeError("Debe ser un numero"),
            rate: Yup.number().required("obligatorio").typeError("Debe ser un numero").min(0, 'El valor minimo es cero').max(1, 'El valor maximo es uno'),
          })}
        >
          <Form>
            <Input name="deposit"  label="Deposito inicial"/>
            <Input name="contribution"  label="Contribucion anual"/>
            <Input name="years"  label="Años"/>
            <Input name="rate"  label="Interes estimado"/>
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Balance final: {balance} </Balance> : null}
      </Section>
    </Container>
  );
}

export default App;
