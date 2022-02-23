package a_test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class main {
	public static void main(String[] args) {
		
		System.out.println(Math.random()*10);
		
		
		List<Integer> list = new ArrayList<>();
		
		for (Integer integer : list) {
			list.add(integer);
		}
		
		
		Collections.sort(list);
	}
}
