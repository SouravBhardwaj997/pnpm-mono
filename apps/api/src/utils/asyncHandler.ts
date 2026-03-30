import type { NextFunction, Request, RequestHandler, Response } from "express";

export function asyncHandler(fn: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// function customFilter<T>(arr: T[], cb: (el: T, i?: number) => boolean) {
//   const filteredArr: T[] = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (cb(arr[i], i)) {
//       filteredArr.push(arr[i]);
//     }
//   }
//   return filteredArr;
// };

// console.log("customFilter", customFilter([1, 2, 3, 4, 5, 6], (el) => {
//   return el % 2 === 0;
// }));
