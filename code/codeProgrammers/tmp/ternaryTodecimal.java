package code.codeProgrammers.tmp;

public class ternaryTodecimal {
    public static void main(String[] args) {
        int tmp = mySolution.solution(45);

        System.out.println(tmp);
    }

    static class mySolution {
        public static int solution(int n) {
            int answer = 0;

            String second = Integer.toString(n, 3);
            int tmp = Integer.reverse(Integer.parseInt(second));

            answer = Integer.parseInt(Integer.toString(tmp), 10);

            return answer;
        }
    }

    class docSolution {
        public int solution(int n) {
            int answer = 0;
            return answer;
        }
    }
}
