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