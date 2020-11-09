import React from "react";
import {
  queryAllByTestId,
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react";

import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";
import { mockData } from "./mockData";

jest.mock("./api/fetchShow");

test("should render without error", () => {
  render(<App />);
});

test("should fetch and render mission data", async () => {
  render(<App />);
  mockFetchShow.mockResolvedValueOnce(mockData);

  await waitFor(() => {
    const dropdown = screen.getByText(/select a season/i);
    userEvent.click(dropdown);
    const seasonOne = screen.getByText(/season 1/i);
    userEvent.click(seasonOne);
    expect(screen.queryAllByTestId("episode")).toHaveLength(2);
  });
});
