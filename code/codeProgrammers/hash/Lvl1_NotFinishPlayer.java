/**
 * 
 */
package hash;

import java.net.Socket;
import java.util.HashMap;

/**
 * @author df321
 * "getOrDefault"가 핵심인 것 같다.
 */
public class Lvl1_NotFinishPlayer {

	/**
	 * https://programmers.co.kr/learn/courses/3 0/lessons/42576
	 */
	
	public String solution(String[] participant, String[] completion) {
		String answer = "";
		HashMap<String, Integer> hm = new HashMap<>();
		for (String player : participant) {
			System.out.println(hm.getOrDefault(player, 3) + 1);
			hm.put(player, hm.getOrDefault(player, 3) + 1);
		}
			

		for (String player : completion) {
			System.out.println(hm.get(player) - 1);
			hm.put(player, hm.get(player) - 1);
		}

		for (String key : hm.keySet()) {
			if (hm.get(key) != 0) {
				answer = key;
			}
		}
		System.out.println("answer : "+ answer);
		return answer;
	}
	
	
	public static void main(String[] args) {
		String[] part = {"leo", "kiki", "eden"};
		String[] comp = {"eden", "kiki"};
		new Lvl1_NotFinishPlayer().solution(part, comp);
		
	}

}
