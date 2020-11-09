import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";

jest.mock("./api/fetchShow");

test("should render without error", () => {
  render(<App />);
});

test("should fetch and render mission data", async () => {
  render(<App />);
  mockFetchShow.mockResolvedValueOnce({
    data: [{ id: 1, name: "Stranger Things", summary: "blah blah blah" }],
  });

  await waitFor(() => {
    const summary = screen.getByText(/blah blah blah/i);
    expect(summary).toBeInTheDocument();
  });
});
