import fs, { statSync } from 'fs';
import { isArray } from '../../core/utils';
import {
  notExcluded,
  notNull,
} from '../../packages/file-path/tools/notExclude';
import type {
  Bg,
  Excluded,
  PathWithStats,
  ValidPHash,
  WithBaseName,
  WithDir,
  WithExtname,
  WithFullPath,
  WithPHash,
} from '../../packages/file-path/types';
import { WithExclude } from '../../packages/file-path/types';
import { immediateZalgo } from '../../utilities/utils';
import { QueryResultItem, QueryResultObject } from '../img-scout/types';
import { uniqueAddToObj } from '../img-scout/uniqueAddToObj';
import { Strange } from './types';

const humanSize = require('human-size');
// ${
// stats.size > 0 ? humanSize(stats.size, 2) || 0 : 0
// }:
export const count = { index1: 1 };

export function doRedisQuery(
  R: any,

  key: string
) {
  return (
    bgPaths: Bg<
      Promise<
        WithDir &
          WithFullPath &
          WithBaseName &
          WithExtname &
          WithExclude &
          WithPHash
      >
    >
  ): Bg<Promise<Strange>> => {
    return bgPaths.map(async awtPaths => {
      const paths = await awtPaths;
      let getQueryResult = (): any => null;
      let queryResult: Array<QueryResultItem | QueryResultObject> | null = null;

      if (notNull(paths.pHash) && notExcluded(paths)) {
        const stats = statSync(paths.fullPath);
        const phash_ = paths.pHash;
        queryResult = await uniqueAddToObj({
          R,
          title: titleBuilder({ ...paths, ...stats, key }),
          phash_,
          radius: '0',
          k: key,
        });
        getQueryResult = () => queryResult;
      }
      const strange: Strange = {
        queryResult,
        ...paths,
        getQueryResult,
      };
      return immediateZalgo(strange);
    });
  };
}

export function newDoRedisQuery(
  R: any,

  key: string
) {
  return (
    bgPaths: Bg<
      PathWithStats & {
        pHashValue: () => Promise<
          | (Excluded<false> & ValidPHash<true>)
          | (Excluded<true> & ValidPHash<false>)
        >;
      }
    >
  ) => {
    return bgPaths.map(paths => {
      // let getQueryResult = (): any => null;
      // let queryResult: Array<QueryResultItem | QueryResultObject> | null = null;

      let queryResult = async () => {
        const _path = { ...paths, ...(await paths.pHashValue()) };
        if (notNull(_path.pHash) && notExcluded(_path)) {
          const stats = statSync(_path.fullPath);
          const phash_ = _path.pHash;

          return uniqueAddToObj({
            R,
            title: titleBuilder({ ..._path, ...stats, key }),
            phash_,
            radius: '0',
            k: key,
          });
        }
        return null;
      };
      const strange = {
        ...paths,
        queryResult,
      };
      return strange;
    });
  };
}

const count2 = { a1: 0, b: 0, len: 0 };

export function manageRedisQuery(bgItem: Bg<Promise<Strange>>) {
  return bgItem.map(async (item, indx) => {
    const waited = await item;
    try {
      if (notExcluded(waited)) {
        const { queryResult, ...awaited } = waited;
        if (queryResult) {
          const result = {
            queryResult, //: queryResult.reverse(),
            ...awaited,
          };
          count2.a1 = 0;
          // count2.len = a.length;
          result.queryResult.map(
            (qrItem, _, a) =>
              count2.a1++ === 0 &&
              console.log(
                qrItem,
                indx,
                (qrItem as QueryResultObject).radius === '0' &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/Twinks Lover 💙💚💔/jpgs/0/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                (qrItem as QueryResultObject).radius === '-10' &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/Twinks Lover 💙💚💔/jpgs/-10/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                a.length === 1 &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/Twinks Lover 💙💚💔/jpgs/ln1/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                (qrItem as QueryResultObject).radius === '-15' &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/Twinks Lover 💙💚💔/jpgs/-15/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                a.length
              )
          );
          return result.queryResult;
        }
      }
    } catch (error) {
      console.error('in boxedGenerator3', error);
    }
    return item;
  });
}

function linkSync(existingPath: string, newPath: string) {
  if (!fs.existsSync(newPath)) {
    fs.linkSync(existingPath, newPath); //tmp/blue/1654566738095
    return true;
  }
  return false;
}

function titleBuilder({
  key,
  size,
  dir,
  baseName,
  extname,
}: {
  key: string;
  size: number;
  dir: string;
  baseName: string;
  extname: string;
}) {
  return `${key}:${
    size > 0 ? humanSize(size, 2) || 0 : 0
  }:${size}:${dir}:${baseName}:${extname.split('.').slice(1).join('')}`;
}
export function describeMapping<T>(fn: <R>(val: T) => R) {
  return (mapable: T[] | Bg<T>) => {
    if (isArray(mapable)) {
      return mapable.map(fn);
    }
    return mapable.map(fn);
  };
}

export function composer<T, A, R>(fn1: (val: A) => R, fn2: (val: T) => A) {
  return (x: T) => fn1(fn2(x));
}
export function piper<T, A, R>(fn1: (val: T) => A, fn2: (val: A) => R) {
  return (x: T) => fn2(fn1(x));
}

export const le2n: (x: string) => number = composer(
  (n: number) => n * 2,
  (t: string) => t.length
);
export const le4n: (x: string) => number = composer((n: number) => n * 2, le2n);

export const len2: (x: string) => number = piper(
  (t: string) => t.length,
  (n: number) => n * 2
);
export const len4: (x: string) => number = piper(len2, (n: number) => n * 2);

export function listComposer<T, A, R>(fn1: (val: A) => R, fn2: (val: T) => A) {
  return (x: T[]) => x.map(fn2).map(fn1);
}
export function listPiper<T, A, R>(fn1: (val: T) => A, fn2: (val: A) => R) {
  return (x: T[]) => x.map(fn1).map(fn2);
}

export function bgPiper<T, A, R>(fn1: (val: T) => A, fn2: (val: A) => R) {
  return (x: Bg<T>) => x.map(fn1).map(fn2);
}
export function bgComposer<T, A, R>(fn1: (val: A) => R, fn2: (val: T) => A) {
  return (x: Bg<T>) => x.map(fn2).map(fn1);
}
