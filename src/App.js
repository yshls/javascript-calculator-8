import { Console } from '@woowacourse/mission-utils';
class App {
  async run() {
    // 1. 사용자에게 입력값 받기
    try {
      const input = await Console.readLineAsync(
        '덧셈할 문자열을 입력해 주세요.\n"'
      );

      // 2. 초기 예외 처리
      if (input === '') {
        Console.print('결과 : 0');
        return;
      }
    } catch (error) {}
  }
}

export default App;
