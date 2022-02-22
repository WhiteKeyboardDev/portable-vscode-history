package array;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Lvl2_ArrayPick {
	
	Logger log = LogManager.getLogger(this.getClass());
	
	//https://programmers.co.kr/learn/courses/30/lessons/42746
	//가장 큰 수
	public String solution(int[] numbers) {
        String answer = "";

        List<Integer> list = new ArrayList<>();
        for(int i = 0; i < numbers.length; i++) {
            list.add(numbers[i]);
        }
        
        Collections.sort(list, (a, b) -> {
            String as = String.valueOf(a); log.debug(as);
            String bs = String.valueOf(b); log.debug(bs);
            
            log.debug(Integer.parseInt(as + bs));
            log.debug(Integer.parseInt(bs + as));
            log.debug(Integer.compare(1, 2));
            log.debug(Integer.compare(2, 1));
            log.debug(-Integer.compare(Integer.parseInt(as + bs), Integer.parseInt(bs + as)));
            return -Integer.compare(Integer.parseInt(as + bs), Integer.parseInt(bs + as)); 
        });
        
        StringBuilder sb = new StringBuilder();
        for(Integer i : list) {
            sb.append(i);
        }
        answer = sb.toString();
        if(answer.charAt(0) == '0') {
            return "0";
        }else {
            return answer;
        }
    }
	
	public static void main(String[] args) {
		int[] numbers = {6, 10, 2};
		new Lvl2_ArrayPick().solution(numbers);
	}
}
