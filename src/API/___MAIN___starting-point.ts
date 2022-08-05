import { isDir } from '../tools';
import { sideFunctionBuilder } from './sideFunctionBuilder';
import { doTraverseDirs } from './sync-directory-traversal';

const localFolderAbsolutePath = '/tmp/jpgs';
// '/media/luxcium/Archive_Locale/jpgs';

//

// '/media/luxcium/Archive_Locale/import/GAYBOYSTUBE/users';

// const Rc = () => rConnect();

const flags = {
  isOpenDirSYNC: true,
  isReadSYNC: true,
  isCloseDirSYNC: false,
  VERBOSE: false,
  DEBUGS: true,
  AWAITS: false,
};
const counts = { await: 0 };

void (async function __MAIN__(traverseDir: string) {
  const times: number[] = [];
  if (await isDir(traverseDir)) {
    // const RC = Rc();
    const sideFunction = sideFunctionBuilder(times);
    doTraverseDirs(traverseDir, sideFunction, flags, counts);
  }
})(localFolderAbsolutePath);
