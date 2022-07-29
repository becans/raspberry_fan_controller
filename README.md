# raspberry_fan_controller

## 개요
라즈베리파이에 쿨링팬을 달고 CPU 온도에 따라 쿨링팬 작동을 제어하는 코드입니다.

## 언어
nodejs

## 실행방법
```
$ node fan_controller.js
```

## 실행결과
```
{"level":"info","message":{"contents":[["cpu temperture",55.991,1]],"timestamp":"2022-07-29 16:52:05"}}
{"level":"info","message":{"contents":[["cpu temperture",55.017,1]],"timestamp":"2022-07-29 16:52:15"}}
{"level":"info","message":{"contents":[["cpu temperture",55.504,1]],"timestamp":"2022-07-29 16:52:25"}}
{"level":"info","message":{"contents":[["cpu temperture",53.556,0]],"timestamp":"2022-07-29 16:52:35"}}
{"level":"info","message":{"contents":[["cpu temperture",55.504,1]],"timestamp":"2022-07-29 16:52:45"}}
{"level":"info","message":{"contents":[["cpu temperture",55.017,1]],"timestamp":"2022-07-29 16:52:55"}}
{"level":"info","message":{"contents":[["cpu temperture",54.53,0]],"timestamp":"2022-07-29 16:53:05"}}
{"level":"info","message":{"contents":[["cpu temperture",54.043,0]],"timestamp":"2022-07-29 16:53:15"}}
{"level":"info","message":{"contents":[["cpu temperture",55.017,1]],"timestamp":"2022-07-29 16:53:25"}}
{"level":"info","message":{"contents":[["cpu temperture",55.017,1]],"timestamp":"2022-07-29 16:53:35"}}
{"level":"info","message":{"contents":[["cpu temperture",54.043,0]],"timestamp":"2022-07-29 16:53:45"}}
{"level":"info","message":{"contents":[["cpu temperture",53.069,0]],"timestamp":"2022-07-29 16:53:55"}}
{"level":"info","message":{"contents":[["cpu temperture",54.043,0]],"timestamp":"2022-07-29 16:54:05"}}
```

## 의존성
GPIO 제어와 로깅, 쉘명령 실행에 필요한 의존성 모듈입니다.
모두 npm을 통해 설치가 가능합니다.

###### [onoff](https://www.npmjs.com/package/onoff)
###### [winston](https://www.npmjs.com/package/winston)
###### [date-utils](https://www.npmjs.com/package/date-utils)
###### [child-process](https://www.npmjs.com/package/child-process)

## 블로그
https://viewise.tistory.com/entry/%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B4-%EC%98%A8%EB%8F%84%EC%97%90-%EB%94%B0%EB%9D%BC-%EB%83%89%EA%B0%81%ED%8C%AC-%EC%A1%B0%EC%A0%88%ED%95%98%EA%B8%B0-nodejs


