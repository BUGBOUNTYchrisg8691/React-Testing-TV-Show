import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";
import { mockData } from "./mockData";

jest.mock("./api/fetchShow");

test("should fetch and render mission data", async () => {
  mockFetchShow.mockResolvedValueOnce(mockData);
  render(<App />);

  const dropdown = await screen.findByText(/select a season/i);
  userEvent.click(dropdown);
  const season = await screen.findByText(/season 1/i);
  userEvent.click(season);

  await waitFor(() => {
    const episodesCards = screen.getAllByTestId("episode");
    expect(episodesCards).toHaveLength(8);
  });
});
