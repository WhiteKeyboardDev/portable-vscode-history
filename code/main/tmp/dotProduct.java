package tmp;

import java.util.stream.IntStream;

public class dotProduct {
	public static void main(String[] args) {
		int[] a = {1, 2, 3, 4};
		int[] b = {-3, -1, 0, 2};
		System.out.println(mySolution.solution(a, b));
	}
	
	//my1
	static class mySolution {
		public static int solution(int[] a, int[] b) {
	        int answer = 1234567890;
	        answer = 0;
	        for (int i = 0; i < a.length; i++) {
				answer += a[i]*b[i];
			}
	        
	        return answer;
	    }
	}
	
	//doc
	static class docSolution {
		public static int solution(int[] a, int[] b) {
			return IntStream.range(0, a.length).map(cnt -> a[cnt] * b[cnt]).sum();
		}
	}
}
