// navigation.js
let navigateFunction;

export const setNavigate = (navFn) => {
  navigateFunction = navFn;
};

export const navigateTo = (...args) => {
  if (navigateFunction) {
    navigateFunction(...args);
  } else {
    console.error("Navigate function not set");
  }
};

export const navigateBack = () => {
  if (navigateFunction) {
    navigateFunction(-1);
  } else {
    console.error("Navigate function not set");
  }
};
