package array;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.IntStream;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


/**
 * @author bfh3000@naver.com
 * 1. lamda 기본적으로 느낌.
 * 2. List 정렬은 Arrays가 아닌 Collections로 처리한다.
 * 3. sort에 인자값으로 인터페이스가 들어갈 수 있구나.
 * 4. 람다식(Lambda)으로 Comparator 생성
 *
 */
public class Lvl2_ArrayPick {
	
	static Logger log = LogManager.getLogger();
	
	//https://programmers.co.kr/learn/courses/30/lessons/42746
	//가장 큰 수
	public String solution(int[] numbers) {
        String answer = "";

        List<Integer> list = new ArrayList<>();
        for(int i = 0; i < numbers.length; i++) {
            list.add(numbers[i]);
        }
        
        //Sorts the specified list according to the order induced by the specified comparator.
        //https://codechacha.com/ko/java-sorting-comparator/ << "람다식(Lambda)으로 Comparator 생성"에 관한 것 있다.
        Collections.sort(list, (a, b) -> {
        	log.debug("list : "+list);
        	log.debug("a : "+a);
			log.debug("b : "+b);
			log.debug("String.valueOf(a)=as : "+String.valueOf(a));
			log.debug("String.valueOf(b)=bs : "+String.valueOf(b));
            String as = String.valueOf(a);
            String bs = String.valueOf(b);
            log.debug("-Integer.compare(Integer.parseInt(as + bs), Integer.parseInt(bs + as)) : "+ -Integer.compare(Integer.parseInt(as + bs), Integer.parseInt(bs + as)));
            System.out.println();

            return -Integer.compare(Integer.parseInt(as + bs), Integer.parseInt(bs + as)); 
        });
        
        StringBuilder sb = new StringBuilder();
        for(Integer i : list) {
            sb.append(i);
        }
        answer = sb.toString();
        if(answer.charAt(0) == '0') { //이건 무슨 뜻이지?
            return "0";
        }else {
        	System.out.println("answer : "+ answer);
            return answer;
        }
    }
	
	public static void main(String[] args) {
		int[] numbers = {6, 10, 2, 3};
		new Lvl2_ArrayPick().solution(numbers);
		
//		List<Integer> list = new ArrayList<>();
//        for(int i = 0; i < numbers.length; i++) {list.add(numbers[i]);}
//		Collections.sort(list, (a,b)->{
//			log.debug("a : "+a);
//			log.debug("b : "+b);
//			log.debug("Integer.compare(a, b) : "+Integer.compare(a, b));
//			System.out.println("");
//            return Integer.compare(a, b);
//		}); 
//		log.debug(list);
	}
}
