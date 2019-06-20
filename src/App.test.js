import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "./App";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("displays header message", () => {
  const wrapper = shallow(<App />);
  const welcome = <header>Conway's Game of Life</header>;
  // expect(wrapper.contains(welcome)).toBe(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});

it("should perform play", () => {
  const startGameSpy = jest.spyOn(App.prototype, "startGame");
  const wrapper = shallow(<App />);

  const playButtonWrapper = wrapper.find("button.play");
  expect(playButtonWrapper.length).toBe(1);

  playButtonWrapper.simulate("click");
  expect(startGameSpy).toHaveBeenCalled();
});

it("should perform pause", () => {
  const pauseGameSpy = jest.spyOn(App.prototype, "pauseGame");
  const wrapper = shallow(<App />);

  const pauseButtonWrapper = wrapper.find("button.pause");
  expect(pauseButtonWrapper.length).toBe(1);

  pauseButtonWrapper.simulate("click");
  expect(pauseGameSpy).toHaveBeenCalled();
});

it("should perform step", () => {
  const stepGameSpy = jest.spyOn(App.prototype, "stepGame");
  const wrapper = shallow(<App />);

  const stepButtonWrapper = wrapper.find("button.step");
  expect(stepButtonWrapper.length).toBe(1);

  stepButtonWrapper.simulate("click");
  expect(stepGameSpy).toHaveBeenCalled();
});

it("should perform reset", () => {
  const resettGameGameSpy = jest.spyOn(App.prototype, "resettGame");
  const wrapper = shallow(<App />);

  const resetButtonWrapper = wrapper.find("button.reset");
  expect(resetButtonWrapper.length).toBe(1);

  resetButtonWrapper.simulate("click");
  expect(resettGameGameSpy).toHaveBeenCalled();
});
