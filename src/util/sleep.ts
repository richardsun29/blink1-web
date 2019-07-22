// resolve Promise in ms milliseconds with value result
export default function sleep<T> (ms: number, result?: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), ms);
  });
}
