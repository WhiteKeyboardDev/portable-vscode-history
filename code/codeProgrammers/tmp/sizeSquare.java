package code.codeProgrammers.tmp;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class sizeSquare {
    private static Logger log = LogManager.getLogger();


    public static void main(String[] args) {
        long tmp = mySolution.solution(3, 20, 4);
        log.debug(tmp);
    }

    //my1
    static class mySolution{
    	public static long solution(int price, int money, int count) {
    		long answer = -1;
    		answer++;
    		for (int i = 1; i <= count; i++) {
				answer += i*price;
			}
    		return (answer > money ?  answer - money : 0);
    	}
    }
    
    //doc.
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
