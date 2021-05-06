export default function waitForAction(store: any) {
  return new Promise((resolve, reject) => {
    store.subscribe(() => {
      resolve(store.getState());
    });
  });
}
