export default function waitForAction(store: any) {
  return new Promise(resolve => {
    store.subscribe(() => {
      resolve(store.getState());
    });
  });
}
