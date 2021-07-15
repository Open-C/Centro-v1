import centroMainAbi from "./abi/CentroMain.json";
import storageAbi from "./abi/Storage.json";

import centroMainAddress from "./addresses/main.mainnet.addresses.json";
import storageAddress from "./addresses/storage.mainnet.addresses.json";

export default {
  main: {
    abi: centroMainAbi,
    address: centroMainAddress,
  },
  storage: {
    abi: storageAbi,
    address: storageAddress,
  },
};
