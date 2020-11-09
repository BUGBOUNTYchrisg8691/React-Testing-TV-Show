import React from "react";
import { screen, fireEvent, waitFor, render } from "@testing-library/react";

import Episodes from "./Episodes";

test("should render without errors", () => {
  render(<Episodes episodes={[]} />);
});

const episodes = [
  { id: "1", name: "Episode 1", season: "1", number: "1", runtime: "127" },
  { id: "2", name: "Episode 2", season: "2", number: "2", runtime: "127" },
];

test("should rerender correctly when pass new episodes data", () => {
  const { rerender } = render(<Episodes episodes={[]} />);
  let episodeObjs = screen.queryAllByTestId("episode");
  expect(episodeObjs).toStrictEqual([]);

  rerender(<Episodes episodes={episodes} />);
  episodeObjs = screen.queryAllByTestId("episode");
  expect(episodeObjs).toHaveLength(2);
});
