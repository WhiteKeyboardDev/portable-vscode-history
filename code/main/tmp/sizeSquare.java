package code.main.tmp;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class sizeSquare {
    private static Logger log = LogManager.getLogger();


    public static void main(String[] args) {
        long tmp = Solution.solution(2, 20, 5);
        log.debug(tmp);
    }

    static class Solution {

        public static long solution(int price, int money, int count) {

            long answer = money;

            for (int cnt = 0; cnt < count; ++cnt) {
                answer -= (price * (cnt + 1));
            }

            return (answer > 0 ? 0 : -answer);
        }
    }
}
