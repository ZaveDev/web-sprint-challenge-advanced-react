import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders",  () => {
  render(<CheckoutForm/>)
  screen.getByText(/checkout form/i)

});

test("form shows success message on submit with form details", () => {
  render(<CheckoutForm/>)
  const fname = screen.getByLabelText(/first/i)
  const lName = screen.getByLabelText(/last/i)
  const address = screen.getByLabelText(/address/i)
  const city = screen.getByLabelText(/city/i)
  const state = screen.getByLabelText(/state/i)
  const zip = screen.getByLabelText(/zip/i)

  fireEvent.change(fname, {target: { value: "Zave"}})
  fireEvent.change(lName, {target: { value: "Sooner"}})
  fireEvent.change(address, {target: { value: "123 Address"}})
  fireEvent.change(city, {target: { value: "Dolac"}})
  fireEvent.change(state, {target: { value: "DT"}})
  fireEvent.change(zip, {target: { value: "32132"}})

  const click = screen.getByRole('button', /checkout/i)
  fireEvent.click(click)

  
  expect(screen.getByText(/zave sooner/i)).toBeInTheDocument()
  expect(screen.getByText(/123 address/i)).toBeInTheDocument()
  expect(screen.getByText(/Dolac, DT 32132/i)).toBeInTheDocument()
});
