import { Console } from '@woowacourse/mission-utils';
class App {
  async run() {
    // 1. 사용자에게 입력값 받기
    try {
      const input = await Console.readLineAsync(
        '덧셈할 문자열을 입력해 주세요.\n'
      );

      // 2. 초기 예외 처리
      if (input === '') {
        Console.print('결과 : 0');
        return;
      }

      // 3번 & 4번 로직 호출 및 반환 값 받음
      const splitNumberString = this.processAndValidate(input);
    } catch (error) {}
  }
  // 3. 문자열 파싱 & 4. 유효성 검증을 하나로 처리하는 함수
  processAndValidate(userInputString) {
    // 구분자 모으기
    const basicSeparators = [',', ':'];
    let allSeparator = [...basicSeparators];
    let numberString = userInputString; // 숫자 부분만 남을 문자열

    // 커스텀 구분자
    const customSeparatorStart = '//';
    const customSeparatorEnd = '\n';

    // 커스텀 구분자인지 확인하기
    if (
      userInputString.startsWith(customSeparatorStart) &&
      userInputString.includes(customSeparatorEnd)
    ) {
      // 커스텀 구분자 뽑아내기
      const startPosition = customSeparatorStart.length;
      const endPosition = userInputString.indexOf(customSeparatorEnd);

      //   커스텀 구분자 추출 및 목록 추가
      const customSeparator = userInputString.substring(
        startPosition,
        endPosition
      );
      allSeparator.push(customSeparator); // 최종 목록에 합치기

      //   숫자만 남기기
      numberString = userInputString.substring(endPosition + 1);
    }

    // 모든 구분자를 하나로 합친다.
    const combineSeparator = new RegExp(`[${allSeparator.join('')}]`);
    const splitNumberString = numberString.split(combineSeparator);

    // 4. 유효성 검증
    const negativeNum = []; // 음수 모으는 배열

    splitNumberString.forEach((str) => {
      const num = Number(str); // 문자열 -> 숫자

      //   숫자 아닌 문자 확인
      if (Number.isNaN(num)) {
        throw new Error('[ERROR] 숫자가 아닌 문자가 포함되어 있습니다.');
      }

      //   음수 확인
      if (num < 0) {
        negativeNum.push(num);
      }
    });

    if (negativeNum.length > 0) {
      throw new Error(
        `[ERROR] 음수는 허용되지 않습니다: ${negativeNum.join(', ')}`
      );
    }

    return splitNumberString;
  }
}

export default App;
