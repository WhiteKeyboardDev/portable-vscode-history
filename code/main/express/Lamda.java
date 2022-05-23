package express;

import java.util.stream.IntStream;

public class Lamda {
	
	public static void main(String[] args) {
		for (int i = 0; i < 10; i++) {System.out.println(i);}
	    IntStream.range(0, 10).forEach((int value) -> System.out.println(value));
	    IntStream.range(0, 10).forEach(value -> System.out.println(value));
	    IntStream.range(0, 10).forEach(System.out::println);
	}
	
	public boolean max(int a, int b) {
		return a > b ? true : false;
	}
	
//	 	(int a, int b) -> {
//	    	return a > b ? a : b;
//	    }
//	    
//	    (int a, int b) -> a > b ? a : b;
//	    		
//		(a, b) -> a > b ? a : b;
	   
}
