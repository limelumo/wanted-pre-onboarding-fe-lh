# **원티드 프리온보딩 프론트엔드 코스**

## 프로젝트 실행 방법

1. [링크 접속](https://limelumo.github.io/wanted-pre-onboarding-fe/)
2. 로컬환경 실행

```bash
// clone
git clone https://github.com/limelumo/wanted-pre-onboarding-fe.git

// Install the dependancies
npm install

// Start the project
npm start
```

<br>

## 과제 수행 여부

<br>

### **1. 로그인 / 회원가입**

- `/` 경로에 로그인, 회원가입 기능을 개발해주세요
  - [x] 페이지 안에 이메일 입력창, 비밀번호 입력창, 제출 버튼이 포함된 형태로 구성해주세요
  - [x] 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다.

<br>

### **Assignment1**

- 이메일과 비밀번호의 유효성 검사기능을 구현해주세요
  - [x] 이메일 조건: `@` 포함
  - [x] 비밀번호 조건: 8자 이상
  - [x] 입력된 이메일과 비밀번호가 위 조건을 만족할 때만 버튼이 활성화 되도록 해주세요
        <br><br>
        <img width="60%" src="https://user-images.githubusercontent.com/81549337/185799933-b31ab6fe-67f4-4605-9375-97f2143f5e9c.gif"/>

<br><br>

### **Assignment2**

- [x] 로그인 API를 호출하고, 올바른 응답을 받았을 때 `/todo` 경로로 이동해주세요
      <br><br>
      <img width="60%" src="https://user-images.githubusercontent.com/81549337/185799937-32afe0ed-4413-42d9-b2bf-f5fa714b2243.gif"/>

<br><br>

### **Assignment3**

- 로그인 여부에 따른 리다이렉트 처리를 구현해주세요
  - [x] 로컬 스토리지에 토큰이 있는 상태로 `/` 페이지에 접속한다면 `/todo` 경로로 리다이렉트 시켜주세요
        <br><br>
        <img width="60%" src="https://user-images.githubusercontent.com/81549337/185800731-5bb1d67e-4c4e-410f-b78f-ff821be66c5a.gif"/>
        <br><br>
  - [x] 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/` 경로로 리다이렉트 시켜주세요
        <br><br>
        <img width="70%" src="https://user-images.githubusercontent.com/81549337/185799938-408930fd-97da-4dbf-bd40-3389c45b83b8.gif"/>

<br><br>

### **2. 투두 리스트**

<br>

### **Assignment4**

- [x] `/todo`경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
- [x] 리스트 페이지에는 투두 리스트의 내용과 완료 여부가 표시되어야 합니다.
- [x] 리스트 페이지에는 입력창과 추가 버튼이 있고, 추가 버튼을 누르면 입력창의 내용이 새로운 투두 리스트로 추가되도록 해주세요
      <br><br>
      <img width="70%" src="https://user-images.githubusercontent.com/81549337/185799939-5a752375-fa70-445e-9b5d-219f30322b88.gif"/>

<br><br>

### **Assignment5**

- 투두 리스트의 수정, 삭제 기능을 구현해주세요
  - [x] 투두 리스트의 개별 아이템 우측에 수정버튼이 존재하고 해당 버튼을 누르면 수정모드가 활성화되고 투두 리스트의 내용을 수정할 수 있도록 해주세요
  - [x] 수정모드에서는 개별 아이템의 우측에 제출버튼과 취소버튼이 표시되며 해당 버튼을 통해서 수정 내용을 제출하거나 수정을 취소할 수 있도록 해주세요
        <br><br>
        <img width="60%" src="https://user-images.githubusercontent.com/81549337/185799940-bd556900-dbb2-41b0-aca9-e7dcb61c2864.gif"/>
        <br><br>
  - [x] 투두 리스트의 개별 아이템 우측에 삭제버튼이 존재하고 해당 버튼을 누르면 투두 리스트가 삭제되도록 해주세요
        <br><br>
        <img width="60%" src="https://user-images.githubusercontent.com/81549337/185799941-69d31faa-2188-41e6-81b7-2d15c4e4d3d1.gif"/>
