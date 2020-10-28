# TypeChain Example

타입스크립트를 활용한 블록체인 구현 프로젝트입니다.
노마드코더의 [Typescript로 블록체인 만들기](https://nomadcoders.co/typescript-for-beginners/lectures/1645) 을 듣고 정리한 프로젝트입니다.

## node, npm, typescript, yarn 설치, 프로젝트 초기화

```bash
sudo apt update
sudo apt install nodejs npm
sudo npm i typescript --g

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn

cd projectName
yarn init
yarn add tsc-watch --dev
npm i - D @types/node typescript ts-node
yarn add crypto-js # 암호화 관련 모듈
```

## tsconfig.json

```js
{
    "compilerOptions": {
        "module": "CommonJS",
        "target": "ES2015",
        "sourceMap": true,
        "moduleResolution": "node",
        "outDir": "dist" // 컴파일 결과를 dist 폴더 밑으로 저장
    },
    "include": ["src/**/*"], //  src 밑에 있는 것들을 모두 컴파일
    "exclude": ["node_modules"]
}
```

## Compile & execute

### package.json에 다음 추가

```js
"scripts": {
    "start": "tsc-watch --onSuccess \"node dist/index.js\""
},
```

```bash
# js 실행
yarn start
```

## 블록 체인

### 개념

블록은 인덱스, 해시, 이전 해시, 데이터, 타임스탬프로 이뤄져 있다.
블록 체인은 블록끼리 연결되어 있는 구조를 말한다.

```ts
import * as CryptoJs from "crypto-js";
class Block {
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJs.SHA256(index + previousHash + timestamp, data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "202154485786", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("second block");
createNewBlock("thrid block");
createNewBlock("fourth block");

console.log(blockchain);
export {};
```

### 완성된 블록체인 출력

블록 끼리 연결되어 있으며, 이전의 해시값들을 가지고 있다.

```js
[ Block {
    index: 0,
    hash: '202154485786',
    previousHash: '',
    data: 'Hello',
    timestamp: 123456 },
  Block {
    index: 1,
    hash:
     'd9203d0ef7fe73838d26d4a16ea98e96953c9db363bbbf1be6ea34ee908f904d',
    previousHash: '202154485786',
    data: 'second block',
    timestamp: 1603874584 },
  Block {
    index: 2,
    hash:
     'c2582506abefb28c6ac8fa67344e09dbc294d22f2b7d611e89e13f009a60ce4d',
    previousHash:
     'd9203d0ef7fe73838d26d4a16ea98e96953c9db363bbbf1be6ea34ee908f904d',
    data: 'thrid block',
    timestamp: 1603874584 },
  Block {
    index: 3,
    hash:
     '3a5dd3bcfd8cca5b4da441729ede428b5d461a64b84998297e44ec168695f63e',
    previousHash:
     'c2582506abefb28c6ac8fa67344e09dbc294d22f2b7d611e89e13f009a60ce4d',
    data: 'fourth block',
    timestamp: 1603874584 }
]
```
