import { redisQuery } from '../doRedisQuery';
import { getBigStrPHashFromFile } from '../tools';
import { SideFunctionParam } from '../types';
import { averageReducer } from './averageReducer';
import { getCachedPhash } from './getCachedPhash';

export function sideFunctionBuilder(RC: any, times: number[]) {
  return async ({ fullPath, count, debug }: SideFunctionParam) => {
    debug &&
      process.stdout.write(
        `\u009B33m[\u009B93m ${(++count.a).toLocaleString()}\u009B33m] \u009B32m${averageReducer(
          times
        ).toFixed(2)} > \u009B37m${fullPath}\u009B0m\n`
      );
    const cachedPhash = getCachedPhash(RC, fullPath, getBigStrPHashFromFile);
    const redisQueryResult = redisQuery(RC, 'key', fullPath, cachedPhash);
    // console.log(await redisQueryResult.queryResult());
    await redisQueryResult.queryResult();
    return redisQueryResult;
  };
}


let x:number | string  | boolean  = 5;
x = 'string';
let y: typeof x = 'A string';
x = true;

x;
typeof y === 'number';
