import { QUERY } from '.';
import { RADIUS } from '../../../constants/radius';
import type { S } from '../../../core/types/IQueryListPhash';
import { syncPhash } from './syncPhash';

export async function queryPhash(
  R: any,
  k: S,
  phash_: S,
  radius: string = RADIUS,
  failSilently = true
) {
  try {
    const R_EXISTS = await R.EXISTS(k);
    if (R_EXISTS === 1) {
      await syncPhash(R, k);
      const result = R.sendCommand([QUERY, k, phash_, radius]);
      return result;
    }
    console.error(`R.EXISTS(${k}) -> ${R_EXISTS}`);
  } catch (error: any) {
    if (!failSilently) throw new Error('queryPhash' + error);
    console.error('queryPhash Failled silently');
  }
  return [];
}
