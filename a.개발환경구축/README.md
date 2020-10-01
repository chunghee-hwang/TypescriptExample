## 개발 환경 구축
1. Node.js 설치
2. Typescript 모듈 설치
    ```bash
    npm i typescript --g
    ```
3. 컴파일 환경 설정, 컴파일
* ts 초기화 (tsconfig.json 생성)
    ```bash
    tsc --init
    ```

* ES6로 컴파일(ts > js 변환)  
   tsconfig.json에 다음 항목 추가
    ```
    {
        "compilerOptions": {
            "target": "ES6"
        }
    }
    ```

* ts 파일의 변경 사항을 감시하며 변경될 때마다 컴파일
    ```bash
    tsc source.ts -w
    ```
* 같은 디렉토리 안에 있는 모든 ts 파일들과 tsconfig.json의 변경 사항을 감시하며 변경될 때마다 컴파일
    ```bash
    tsc --project tsconfig.json -w
    ```

4. 실행
* tsc 명령어로 컴파일된 js 파일 실행
    ```
    node source.js
    ```