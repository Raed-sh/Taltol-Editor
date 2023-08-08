export const handleEnterKey = (
  event: React.KeyboardEvent<HTMLInputElement>
): string | number => {
  const value = event.currentTarget.value;
  if (event.key === "Enter" && value) {
    event.preventDefault();
    event.stopPropagation();
    return value;
  }
  return "";
};

export function stringToArray(str: string) {
  var str_: any = str.replace(/\d+|^\s+|\s+$/g, "");
  const val: string[] = [];
  str_ = str_.split(`\n`);
  str_.forEach((element: string) => {
    if (element) {
      val.push(element);
    }
  });
  return val;
}

export const getCanvasIdx = (id: string) => {
  if (!id) return 0;
  const numberStr = id.replace(/\D/g, ""); // remove all non-numeric characters
  const number = parseInt(numberStr); // parse the resulting string as an integer
  return number;
};


export function moveArray(arr: string[], fromIndex: number, toIndex: number) {
  arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
  return arr;
};